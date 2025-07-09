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
router.post("/addToCart", authMiddleware, addToCart);
router.post("/editCartItem", authMiddleware, editCartItem);
router.post("/deleteBook", authMiddleware, deleteCartItem);
router.post("/sync", authMiddleware, syncCart);

module.exports = router;
