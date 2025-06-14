const jwt = require("jsonwebtoken");

const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			// Get token from header
			// Bearer [token]
			// we use split to get the token from the string
			token = req.headers.authorization.split(" ")[1];

			// Verify token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			// Get user from the token (token has userId as payload)
			// (we asign the user to the request object so we can use req.user in any route that is protected)
			// we use select("-password") to not return the password in the response (Even though the password is hashed, it's best practice to never expose it)
			req.user = await User.findById(decoded.id).select("-password");

			// call next() to move to the next middleware
			next();
		} catch (err) {
			console.log(err);
			// 401 => not authorized
			res.status(401);
			throw new Error("Not authorized");
		}
	}

	if (!token) {
		const error = new Error("Not authorized, no token");
		error.status = 401;
		return next(error);
	}
};

module.exports = { authMiddleware };
