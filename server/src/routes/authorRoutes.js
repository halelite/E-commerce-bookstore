const express = require("express");
const { getAuthors, getAuthor } = require("../controllers/authorController");

const router = express.Router();

router.get("/", getAuthors);
router.get("/:id", getAuthor);

module.exports = router;
