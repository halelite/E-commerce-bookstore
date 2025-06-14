const User = require("../models/User");

// @desc  Get user data
// @route Get /api/users/me
// @access Private
const getMe = async (req, res) => {
	const { _id, name, email } = await User.findById(req.user.id); // we set user.id in the authMiddleware
	res.status(200).json({
		id: _id,
		name,
		email,
	});
};

module.exports = { getMe };
