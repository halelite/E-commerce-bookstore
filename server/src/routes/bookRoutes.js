const express = require("express");
const {
	getBooks,
	getBook,
	getSearchedBooks,
	getBestSellerBooks,
} = require("../controllers/bookController");

const router = express.Router();

router.get("/", getBooks);
router.get("/best-sellers", getBestSellerBooks);
router.get("/search", getSearchedBooks);
router.get("/:slug", getBook);

module.exports = router;
