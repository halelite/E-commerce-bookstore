const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
	title: { type: String, required: true },
	en_title: String,
	author: { type: [String], required: true },
	en_author: { type: [String], required: true },
	price: { type: Number, required: true },
	slug: { type: String, required: true },
	description: String,
	image: String,
	isBestSeller: Boolean,
	isNewBook: Boolean,
	category: [String],
	publisher: String,
	publishedDate: String,
	ISBN: String,
	selfLink: String,
	// comments: [{
	//     user: String,
	//     content: String,
	//     votes: Number
	// }]
});

module.exports = mongoose.model("Book", bookSchema);
