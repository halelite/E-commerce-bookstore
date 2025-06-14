const Author = require("../models/Author");

// @desc   Get all authors
// @route  Get /api/authors
const getAuthors = async (req, res, next) => {
	try {
		const authors = await Author.find();

		res.status(200).json(authors);
	} catch (err) {
		next(err);
	}
};

// @desc   Get single author
// @route  Get /api/authors/:id
const getAuthor = async (req, res, next) => {
	try {
		const author = await Author.findById(req.params.id);

		if (!author) {
			const error = new Error("Author not found");
			error.status(404);
			return next(error);
		}
	} catch (err) {
		next(err);
	}
};

module.exports = { getAuthors, getAuthor };
