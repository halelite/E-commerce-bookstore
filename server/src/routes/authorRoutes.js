const express = require("express");
const {
	getAuthors,
	getAuthor,
	getSearchedAuthors,
} = require("../controllers/authorController");

const router = express.Router();

router.get("/", getAuthors);
router.get("/search", getSearchedAuthors);
router.get("/:id", getAuthor);

module.exports = router;
