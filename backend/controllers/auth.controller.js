import bcryptjs from "bcryptjs";
import validator from "validator";
import UserModel from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;

    // Input validation
    if (!full_name || !email || !password) {
      return res.status(400).json({
        message: "Full name, email, and password are required.",
        error: true,
        success: false,
      });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email format.",
        error: true,
        success: false,
      });
    }

    // Password strength validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.",
        error: true,
        success: false,
      });
    }

    // Check if the email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists. Please use a different one.",
        error: true,
        success: false,
      });
    }

    // Hash password
    const salt = await bcryptjs.genSalt(12);
    const hashPassword = await bcryptjs.hash(password, salt);

    // Create user data object
    const userData = {
      full_name: validator.escape(full_name), // Sanitize full_name
      email: validator.normalizeEmail(email),
      password: hashPassword,
    };

    // Save user
    const newUser = new UserModel(userData);
    await newUser.save();

    // Send success response
    return res.status(201).json({
      message: "User registered successfully.",
      error: false,
      success: true,
    });
  } catch (e) {
    console.error("Error during signup:", e); // Log error for debugging

    // Avoid exposing sensitive error details to the client
    return res.status(500).json({
      message: `An error occurred while processing your request.${ e.message || e}`,
      error: true,
      success: false,
    });
    
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "email & password are required",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User is Not Registered Yet",
        error: true,
        success: false,
      });
    }

    const checkPassword = await bcryptjs.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({
        message: "Password is Incorrect",
        error: true,
        success: false,
      });
    }

     // Generate token
     generateToken(user._id, res);

    return res.json({
      message: "Login Successfully",
      error: false,
      success: true,
      data: user
    });
  } catch (e) {
    return res.status(500).json({
        message: `An error occurred while processing your request.${ e.message || e}`,
        error: true,
      success: false,
    });
  }
};

export const logout = async (req, res) => {
    try {
      // Clear JWT token from cookies
      res.clearCookie("jwt_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Secure cookie in production
        sameSite: "strict",
      });
  
      return res.status(200).json({
        message: "Logout successful.",
        error: false,
        success: true,
      });
    } catch (e) {
      console.error("Error during logout:", e);
      return res.status(500).json({
        message: `An error occurred while processing your request.${ e.message || e}`,
        error: true,
        success: false,
      });
    }
  };

  export const updateProfile = async (req, res) => {
    try {
      const { profile_avatar } = req.body;
      const user_id = req.user_id;
  
      // Validate the presence of the profile_avatar
      if (!profile_avatar) {
        return res.status(400).json({
          message: "profile_avatar is required",
          error: true,
          success: false,
        });
      }
  
      // Check if the user exists
      const user = await UserModel.findById(user_id);
      if (!user) {
        return res.status(404).json({
          message: "User not found.",
          error: true,
          success: false,
        });
      }
  
      // Upload image to Cloudinary
      let uploadResult;
      try {
        uploadResult = await cloudinary.uploader.upload(profile_avatar, {
          folder: 'user_profiles', // You can specify a folder in Cloudinary
        });
      } catch (uploadError) {
        return res.status(500).json({
          message: "Error uploading image to Cloudinary",
          error: true,
          success: false,
        });
      }
  
      // Update user profile with the new avatar URL
      const updatedUser = await UserModel.findByIdAndUpdate(
        user_id,
        { profile_avatar: uploadResult.secure_url },
        { new: true } // Return the updated user data
      );
  
      return res.status(200).json({
        message: "Profile updated successfully.",
        error: false,
        success: true,
        data: updatedUser,
      });
    } catch (e) {
      return res.status(500).json({
        message: e.message || e,
        error: true,
        success: false,
      });
    }
  };
  
export const checkAuth = (req, res) => {
   try{
      return res.status(200).json(req.user);
    } catch (e) {
      return res.status(500).json({
        message: e.message || e,
        error: true,
        success: false,
      });
    }
  };