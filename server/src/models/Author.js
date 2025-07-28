const mongoose = require("mongoose");

const authorSchema = mongoose.Schema({
	fullName: { type: String, required: true },
	fullName_en: String,
	slug: { type: String, required: true },
	bio: { type: String, default: "" },
	image: String,
});

module.exports = mongoose.model("Author", authorSchema);
