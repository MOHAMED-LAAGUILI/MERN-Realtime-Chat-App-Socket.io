import jwt from "jsonwebtoken"

export const generateToken = (user_id, res) => {
  const jwt_token = jwt.sign({user_id}, process.env.JWT_SECRET_KEY,{
    expiresIn:"10d"
  })


  res.cookie("jwt_token", jwt_token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    httpOnly:true, // prevent XSS attacks from js scripts
    sameSite:"strict",
    secure: process.env.NODE_ENV !== "development"
  })

  return jwt_token;
}

