import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const MONGO_URI="mongodb+srv://mohamed:mohamed2025@cluster0.yojmo.mongodb.net/chatapp?retryWrites=true&w=majority&appName=Cluster0";
    if (!MONGO_URI) {
      console.error("MongoDB URI is not defined!");
      process.exit(1);  // Exit if no URI is found
    }
    
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};
