const mongoose = require("mongoose");

const authorSchema = mongoose.Schema({
	name: { type: String, required: true },
	slug: { type: String, required: true },
	bio: { type: String, default: "" },
	image: String,
});

module.exports = mongoose.model("Author", authorSchema);
