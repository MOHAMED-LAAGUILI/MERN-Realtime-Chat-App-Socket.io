import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minLength: 6,
  },

  profile_avatar: {
    type: String,
    default: "",
  },

},{
timestamps:true
});


const UserModel = mongoose.model("user",userSchema)

export default UserModel