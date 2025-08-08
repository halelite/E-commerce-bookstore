const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const User = require("../models/User");

// Create Ethereal transporter
const createTransporter = async () => {
	const testAccount = await nodemailer.createTestAccount();
	return nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		auth: {
			user: testAccount.user,
			pass: testAccount.pass,
		},
	});
};

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

// @desc   Request password reset
// @route POST /api/auth/forgot-password
const forgotPassword = async (req, res, next) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email });

		if (!user) {
			const error = new Error("کاربری با این ایمیل یافت نشد");
			error.status = 404;
			throw error;
		}

		// Generate reset token
		const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});
		user.resetCode = resetToken;
		user.resetCodeExpires = Date.now() + 60 * 60 * 1000; // 1 hour
		await user.save();

		// Send reset email
		const transporter = await createTransporter();
		const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
		const mailOptions = {
			from: '"Bookstore" <noreply@bookstore.com>',
			to: email,
			subject: "بازنشانی رمز عبور",
			html: `
        <p>برای بازنشانی رمز عبور خود، روی لینک زیر کلیک کنید:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>این لینک تا یک ساعت معتبر است.</p>
      `,
		};
		const info = await transporter.sendMail(mailOptions);

		res.json({
			message: "لینک بازنشانی رمز عبور:",
			resetUrl: `/reset-password/${resetToken}`,
			previewUrl: nodemailer.getTestMessageUrl(info), // Ethereal preview URL
		});
	} catch (error) {
		next(error);
	}
};

// @desc   Reset password
// @route  POST /api/auth/reset-password/:token
const resetPassword = async (req, res, next) => {
	const { token } = req.params;
	const { password } = req.body;

	try {
		let decoded;
		try {
			decoded = jwt.verify(token, process.env.JWT_SECRET);
		} catch (err) {
			const error = new Error("لینک بازنشانی نامعتبر یا منقضی شده است");
			error.status = 400;
			throw error;
		}

		const user = await User.findOne({
			resetCode: token,
			resetCodeExpires: { $gt: Date.now() },
		});

		if (!user) {
			const error = new Error("لینک بازنشانی نامعتبر یا منقضی شده است");
			error.status = 400;
			throw error;
		}

		user.password = password;
		user.resetCode = undefined;
		user.resetCodeExpires = undefined;
		await user.save();

		res.json({ message: "رمز عبور با موفقیت تغییر یافت" });
	} catch (error) {
		next(error);
	}
};

// Generate JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};

module.exports = { registerUser, loginUser, forgotPassword, resetPassword };
