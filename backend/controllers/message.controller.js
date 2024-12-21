import UserModel from "../models/user.model.js";


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
    const {user_id} = req.params;

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
