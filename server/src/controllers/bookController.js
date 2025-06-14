const Book = require("../models/Book");

// @desc   Get all books
// @route  Get /api/books
const getBooks = async (req, res, next) => {
	try {
		const books = await Book.find();
		res.status(200).json(books);
	} catch (error) {
		next(error);
	}
};

// @desc   Get single book
// @route  Get /api/books/:id
const getBook = async (req, res, next) => {
	try {
		const book = await Book.findOne({ slug: req.params.slug });

		if (!book) {
			const error = new Error("Book not found");
			error.status = 404;
			return next(error);
		}

		res.status(200).json(book);
	} catch (error) {
		next(error);
	}
};

module.exports = { getBooks, getBook };
