import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoute from "./routes/auth.route.js"
import messageRoute from "./routes/message.route.js"

import { connectDB } from './db/db.js';

// Initialize dotenv and load environment variables
dotenv.config();

// Create an Express application instance
const app = express();

// Middleware setup
app.use(express.json());      // For parsing JSON bodies
app.use(cookieParser())


// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || err });
});

// Set up route handlers

app.use("/api/v1/auth", authRoute); // Authentication routes
app.use("/api/v1/chat", messageRoute); // Messages routes

// Set the port and start the server
const PORT = process.env.PORT || 3000;
const LOCALHOST = process.env.HOST || "http://localhost";

// Start the server and ensure the database connection is successful
const startServer = async () => {
  try {
    await connectDB(); // Ensure database is connected before starting the server
    app.listen(PORT, () => {
      console.log(`Server is running on ${LOCALHOST}:${PORT}`);
    });
  } catch (e) {
    console.error("Error Running Server:", e);
    process.exit(1); // Exit on error
  }
};

// Start the server
startServer();
