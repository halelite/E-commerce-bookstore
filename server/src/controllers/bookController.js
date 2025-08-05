const Book = require("../models/Book");

// @desc   Get all books
// @route  Get /api/books
const getBooks = async (req, res, next) => {
	try {
		const { page = 1, limit = 10, author, category } = req.query;
		const skip = (page - 1) * limit;

		let query = {};

		// add category filter if provided
		if (category && category !== "همه") {
			// category can be a string or array from repeated params
			const categories = Array.isArray(category) ? category : [category];
			query.category = { $in: categories };
		}

		// add author filter if provided
		if (author) {
			const authors = Array.isArray(author) ? author : [author];
			query.author = { $in: authors };
		}

		// Fetch filtered books with pagination
		const books = await Book.find(query).skip(skip).limit(limit).lean();

		// Total count for pagination
		const total = await Book.countDocuments(query);

		// Get all unique categories for filters UI
		const categories = await Book.distinct("category");
		const authors = await Book.distinct("author");

		res.status(200).json({
			books,
			pagination: {
				total,
				page,
				limit,
				totalPages: Math.ceil(total / limit),
			},
			filters: {
				categories,
				authors,
			},
		});
	} catch (error) {
		next(error);
	}
};

// @desc   Get bestseller books
// @route  Get /api/books/best-sellers
const getBestSellerBooks = async (req, res, next) => {
	try {
		const { page = 1, limit = 10, category, author } = req.query;
		const skip = (page - 1) * limit;

		let query = { isBestSeller: true };

		if (category) {
			const categories = Array.isArray(category) ? category : [category];
			query.category = { $in: categories };
		}

		if (author) {
			const authors = Array.isArray(author) ? author : [author];
			query.author = { $in: authors };
		}

		const [books, total, allCategories, allAuthors] = await Promise.all([
			Book.find(query).skip(skip).limit(limit),
			Book.countDocuments(query),
			Book.distinct("category"),
			Book.distinct("author"),
		]);

		res.status(200).json({
			books,
			pagination: {
				page: +page,
				limit: +limit,
				total,
				totalPages: Math.ceil(total / limit),
			},
			filters: {
				categories: allCategories,
				authors: allAuthors
			},
		});
	} catch (error) {
		next(error);
	}
};

// @desc   Get new books
// @route  Get /api/books/new
const getNewBooks = async (req, res, next) => {
	try {
		const { page = 1, limit = 10, category, author } = req.query;
		const skip = (page - 1) * limit;

		let query = { isNewBook: true };

		if (category) {
			const categories = Array.isArray(category) ? category : [category];
			query.category = { $in: categories };
		}

		if (author) {
			const authors = Array.isArray(author) ? author : [author];
			query.author = { $in: authors };
		}

		const [books, total, allCategories, allAuthors] = await Promise.all([
			Book.find(query).skip(skip).limit(limit),
			Book.countDocuments(query),
			Book.distinct("category"),
			Book.distinct("author"),
		]);

		res.status(200).json({
			books,
			pagination: {
				page: +page,
				limit: +limit,
				total,
				totalPages: Math.ceil(total / limit),
			},
			filters: {
				categories: allCategories,
				authors: allAuthors
			},
		});
	} catch (error) {
		next(error);
	}
};

// @desc   Get single book
// @route  Get /api/books/:slug
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

// @desc   Get searched books
// @route  Get /api/books/q=query
const getSearchedBooks = async (req, res, next) => {
	const { query, category } = req.query;
	console.log("query", query);

	if (!query) {
		return res.json([]);
	}

	//const regex = new RegExp(query, i); // case-insensitive

	try {
		let searchQuery = {
			$or: [
				{ title: { $regex: query, $options: "i" } },
				{ en_title: { $regex: query, $options: "i" } },
				{ author: { $regex: query, $options: "i" } },
				{ en_author: { $regex: query, $options: "i" } },
			],
		};

		// Add category filter if provided
		if (category && category !== "همه") {
			const categories = Array.isArray(category) ? category : [category];
			searchQuery.category = { $in: categories };
		}

		const books = await Book.find(searchQuery).limit(10).lean();

		res.json(books);
	} catch (error) {
		next(error);
	}
};

module.exports = { getBooks, getBook, getSearchedBooks, getBestSellerBooks, getNewBooks };
