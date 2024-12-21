import mongoose from "mongoose";

// MongoDB connection setup
export const connectDB = async () => {
  if (!process.env.MONGO_DB_URI) {
    console.error('Missing MongoDB connection URI (MONGO_DB_URI) in environment variables.');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URI); // Options are no longer needed
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (e) {
    console.error('Error connecting to MongoDB:', e.message);
    process.exit(1);
  }
};
