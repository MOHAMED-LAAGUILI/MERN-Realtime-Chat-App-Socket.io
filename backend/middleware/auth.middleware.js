import jwt from "jsonwebtoken"
import UserModel from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const jwt_token = req.cookies.jwt_token
    if (!jwt_token) {
        return res.status(401).json({
            message:"Unauthorized Access - No Provided Token",
            error: true,
            success: false,
          });   
    }

    const decode_jwt_token = jwt.verify(jwt_token, process.env.JWT_SECRET_KEY)
    if(!decode_jwt_token){
        return res.status(401).json({
            message:"Unauthorized Access - Invalid Token",
            error: true,
            success: false,
          });   
    }

    const user = await UserModel.findById(decode_jwt_token.user_id).select("-password")

    if (!user) {
        return res.status(404).json({
            message:"User Not Found",
            error: true,
            success: false,
          });
    }
    req.user = user

    next()
  } catch (e) {
    return res.status(500).json({
        message: e.message || e,
        error: true,
        success: false,
      });
  }  
}