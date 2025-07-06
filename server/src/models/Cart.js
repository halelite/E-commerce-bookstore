const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
	bookId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Book",
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
		default: 1,
	},
});

const cartSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
		unique: true, // one cart per user
	},
	items: [cartItemSchema],
});

module.exports = mongoose.model("Cart", cartSchema);
