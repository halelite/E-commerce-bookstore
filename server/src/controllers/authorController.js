const Author = require("../models/Author");

// @desc   Get all authors
// @route  Get /api/authors
const getAuthors = async (req, res, next) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const skip = (page - 1) * limit;

		// const authors = await Author.find();
		const [authors, total] = await Promise.all([
			Author.find().skip(skip).limit(limit),
			Author.countDocuments(),
		]);

		// res.status(200).json(authors);
		res.json({
			authors,
			pagination: {
				total,
				page,
				limit,
				totalPages: Math.ceil(total / limit),
			},
		});
	} catch (err) {
		next(err);
	}
};

// @desc   Get single author
// @route  Get /api/authors/:slug
const getAuthor = async (req, res, next) => {
	try {
		const author = await Author.findOne({ slug: req.params.slug });

		if (!author) {
			const error = new Error("Author not found");
			error.status = 404;
			return next(error);
		}

		res.status(200).json(author);
	} catch (err) {
		next(err);
	}
};

// @desc   Get searched authors
// @route  Get /api/authors/q=query
const getSearchedAuthors = async (req, res, next) => {
	const { query } = req.query;
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 10;
	const skip = (page - 1) * limit;

	if (!query) {
		return res.json([]);
	}

	try {
		const searchQuery = {
			$or: [
				{ fullName: { $regex: query, $options: "i" } },
				{ fullName_en: { $regex: query, $options: "i" } },
			],
		};

		const [authors, total] = await Promise.all([
			Author.find(searchQuery).skip(skip).limit(limit),
			Author.countDocuments(searchQuery),
		]);

		res.json({
			authors,
			pagination: {
				total,
				page,
				limit,
				totalPages: Math.ceil(total / limit),
			},
		});
	} catch (error) {
		next(error);
	}
};

module.exports = { getAuthors, getAuthor, getSearchedAuthors };
