import UserModel from "../models/user.model.js";
import MessageModel from './../models/message.model.js';


export const getSideBarUsers = async (req, res) => {
  try {
    const user_id = req.user._id;

    // fetch all use but not he current logged in user
    const filteredUsers = await UserModel.find({_id:{$ne:user_id}}).select("-password")

    return res.status(200).json(filteredUsers);

  } catch (e) {
    return res.status(500).json({
      message: `An error occurred while processing your request.${ e.message || e}`,
      error: true,
      success: false,
    });
    
  }
};

export const getUserMessages = async (req, res) => {
  try {
    const {receiver_id} = req.params;
    const sender_id = req.user._id;



    // fetch all use but not he current logged in user
    const messages = await MessageModel.find({$or:[
      {sender_id:sender_id,receiver_id:receiver_id},
      {sender_id:receiver_id,receiver_id:sender_id}
    ]}).populate('sender_id','name').populate('receiver_id','name').sort({createdAt:1})

    return res.status(200).json(messages);

  } catch (e) {
    return res.status(500).json({
      message: `An error occurred while processing your request.${ e.message || e}`,
      error: true,
      success: false,
    });
    
  }
};

export const sendMessage = async (req, res) => {
  try {
    const {receiver_id} = req.params;
    const sender_id = req.user._id;
    const {message, image} = req.body;

    let imageUrl

    if (image) {
      const UploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = UploadResponse.secure_url;
    }
    const newMessage = new MessageModel({
      sender_id,
      receiver_id,
      message: message,
      image: imageUrl
    });

    await newMessage.save();

    return res.status(200).json(newMessage);

  } catch (e) {
    return res.status(500).json({
      message: `An error occurred while processing your request.${ e.message || e}`,
      error: true,
      success: false,
    });
    
  }

}