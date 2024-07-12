import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookies from "../utils/generateToken.js";
export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "password doesnt match" });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "username already exists" });
    }
    //hashpassword

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    //http://avatar-placeholder.iran.liara.run/
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    if (newUser) {
      //generate token
      generateTokenAndSetCookies(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        message: "user created successfully",
        newUser: {
          _id: newUser._id,
          fullName: newUser.fullName,
          username: newUser.username,
          gender: newUser.gender,
          profilePic: newUser.profilePic,
        },
      });
    } else {
      res.status(400).json({ error: "invalid user data" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcryptjs.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      return res
        .status(401)
        .json({ error: "username or password is incorrect" });
    }
    generateTokenAndSetCookies(user._id, res);
    res.status(200).json({
      message: "user logged in successfully",
      user: {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
};
export const logout = (req, res) => {
try{
    res.clearCookie("token");
    res.status(200).json({message: "user logged out successfully"});
//     or res.cookies("jwt","",{maxAge:0});
//     //or res.status(200).json({message: "user logged out successfully"});
 }
 catch(error){
    console.error(error);
    res.status(500).json({error: "server error"});
 }
};
