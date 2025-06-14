const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

// @desc register new user
// @route POST /api/auth/register
// @access Public
const registerUser = async (req, res, next) => {
	const { name, email, password } = req.body;
	try {
		if (!name || !email || !password) {
			const error = new Error("Please add all fields");
			error.status = 400;
			return next(error);
		}

		// check if user exists
		const userExists = await User.findOne({ email });

		if (userExists) {
			const error = new Error("User already exists");
			error.status = 400;
			throw error;
			// return next(error);
		}

		// hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// create user
		const user = await User.create({
			name,
			email,
			password: hashedPassword,
		});

		// Generate JWT
		/* const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "30d",
		}); */

		if (user) {
			res.status(201).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				token: generateToken(user._id),
			});
		} else {
			const error = new Error("Invalid user data");
			error.status = 400;
			return next(error);
		}
	} catch (err) {
		next(err);
	}
};

// @desc authenticate a user
// @route POST /api/auth/login
// @access Public
const loginUser = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		// check for user email
		const user = await User.findOne({ email });

		if (user && (await bcrypt.compare(password, user.password))) {
			// Generate JWT
			/* const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
				expiresIn: "30d",
			}); */

			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				token: generateToken(user._id),
			});
		} else {
			const error = new Error("Invalid credentials");
			error.status = 400;
			return next(error);
		}
	} catch (err) {
		next(err);
	}
};

// Generate JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};

module.exports = { registerUser, loginUser };
