import User from "../models/user.model.js";
export const getUsersForSidebar = async(req,res) =>{
try{
const loggedInUserId = req.user._id;

const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");
//if you want to see your self and send message to yourself you can use:
//  const filteredUsers = await User.find();

res.status(200).json(filteredUsers);

} catch(error){
    console.error(error.message);
    res.status(500).json({error: "Server error"})
 
}
}