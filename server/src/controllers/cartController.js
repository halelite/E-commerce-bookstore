const User = require("../models/User");
const Cart = require("../models/Cart");

const getCart = async (req, res, next) => {
	try {
		const cart = await Cart.findOne({ userId: req.user.id }).populate(
			"items.bookId"
		);
		res.status(200).json({ cart: cart ? cart.items : [] });
	} catch (err) {
		next(err);
	}
};

const addToCart = async (req, res, next) => {
	const { bookId, quantity } = req.body;
	try {
		// check if user cart exists, and if yes checks if it contains the book
		/* const cart = await Cart.findOne({
			userId: req.user.id,
			"items.bookId": bookId,
		}); */

		// check if cart exists
		const cart = await Cart.findOne({ userId: req.user.id }).populate(
			"items.bookId"
		);

		// If cart exists and book already in it, do nothing
		if (cart && cart.items.some((item) => item.bookId.toString() === bookId)) {
			const populatedCart = await Cart.findOne({
				userId: req.user.id,
			});

			return res.status(200).json({ cart: populatedCart.items });
		}

		// add new book to cart (or create cart if it doesn't exist)
		const updatedCart = await Cart.findOneAndUpdate(
			{ userId: req.user.id },
			{
				$push: { items: { bookId, quantity } },
				$setOnInsert: { userId: req.user.id },
			},
			{ upsert: true, new: true } // upsert creates a new document if it doesn't exist
		).populate("items.bookId");

		res.status(200).json({ cart: updatedCart.items });

		/* if (cart) {
			// update quantity of the existing book
			const updatedCart = await Cart.findOneAndUpdate(
				{ userId: req.user.id, "items.bookId": bookId }, // filter
				{ $inc: { "items.$.quantity": quantity } }, // update
				{ new: true } // options (return the updated document)
			).populate("items.bookId");
			res.status(200).json({ cart: updatedCart.items });
		} else {
			// add new book to cart (or create cart if it doesn't exist)
			const updatedCart = await Cart.findOneAndUpdate(
				{ userId: req.user.id },
				{
					$push: { items: { bookId, quantity } },
					$setOnInsert: { userId: req.user.id },
				},
				{ upsert: true, new: true } // upsert creates a new document if it doesn't exist
			).populate("items.bookId");
			res.status(200).json({ cart: updatedCart.items });
		} */
	} catch (err) {
		next(err);
	}
};

const editCartItem = async (req, res, next) => {
	const { bookId, quantity } = req.body;

	try {
		const updatedCart = await Cart.findOneAndUpdate(
			{ userId: req.user.id, "items.bookId": bookId },
			{ $set: { "items.$.quantity": quantity } },
			{ new: true }
		).populate("items.bookId");

		if (!updatedCart) {
			return res.status(404).json({ message: "کتاب در سبد خرید یافت نشد" });
		}

		res.status(200).json({ cart: updatedCart.items });
	} catch (err) {
		next(err);
	}
};

const deleteCartItem = async (req, res, next) => {
	const { bookId } = req.body;
	try {
		const updatedCart = await Cart.findOneAndUpdate(
			{ userId: req.user.id },
			{ $pull: { items: { bookId } } },
			{ new: true }
		).populate("items.bookId");

		if (!updatedCart) {
			const error = new Error("سبد خرید یافت نشد");
			error.status = 404;
			return next(error);
		}

		res.status(200).json({ cart: updatedCart.items });
	} catch (err) {
		next(err);
	}
};

const syncCart = async (req, res, next) => {
	const { cart } = req.body;
	try {
		let userCart = await Cart.findOne({ userId: req.user.id });

		if (!userCart) {
			userCart = new Cart({ userId: req.user.id, items: [] });
		}

		const mergedItems = [];
		for (const guestItem of cart) {
			const existingItem = userCart.items.find(
				(item) => item.bookId.toString() === guestItem.bookId
			);

			if (existingItem) {
				existingItem.quantity += guestItem.quantity;
			} else {
				mergedItems.push({
					bookId: guestItem.bookId,
					quantity: guestItem.quantity,
				});
			}
		}

		userCart.items = [...userCart.items, ...mergedItems];
		await userCart.save();
		// populate to get book details
		const updatedCart = await Cart.findOne({ userId: req.user.id }).populate(
			"items.bookId"
		);
		res.status(200).json({ cart: updatedCart.items });
	} catch (err) {
		next(err);
	}
};

module.exports = { getCart, addToCart, editCartItem, deleteCartItem, syncCart };
