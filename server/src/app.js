const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const connectDB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");
const authorRoutes = require("./routes/authorRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// // Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Allow frontend to access backend
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false }));

// Serve static files (images)
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Catch-all handler (for undefined routes)
app.use(notFound);

// Error handler middleware (must be after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
