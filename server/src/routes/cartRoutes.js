const express = require("express");
const {
	getCart,
	addToCart,
	editCartItem,
	deleteCartItem,
	syncCart,
} = require("../controllers/cartController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getCart);
router.get("/addToCart", authMiddleware, addToCart);
router.get("/editCartItem", authMiddleware, editCartItem);
router.get("/deleteBook", authMiddleware, deleteCartItem);
router.get("/sync", authMiddleware, syncCart);

module.exports = router;
