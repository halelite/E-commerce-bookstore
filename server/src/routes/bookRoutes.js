const express = require("express");
const {
	getBooks,
	getBook,
	getSearchedBooks,
} = require("../controllers/bookController");

const router = express.Router();

router.get("/", getBooks);
router.get("/search", getSearchedBooks);
router.get("/:slug", getBook);

module.exports = router;
