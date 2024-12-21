import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"user",
    required: true,
  },
  received_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  text: {
    type: String,
  },

  image: {
    type: String,
  },

},{
timestamps:true
});


const MessageModel = mongoose.model("message",messageSchema)

export default MessageModel