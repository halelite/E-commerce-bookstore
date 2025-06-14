const express = require("express");
const { getMe } = require("../controllers/userController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/me", authMiddleware, getMe);

module.exports = router;
