const express = require("express");
const { getBooks, getBook } = require("../controllers/bookController");

const router = express.Router();

router.get("/", getBooks);
router.get("/:slug", getBook);

module.exports = router;
