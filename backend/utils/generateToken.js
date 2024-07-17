import jwt from "jsonwebtoken"

const generateTokenAndSetCookies = async (userId,res) => {
const token = jwt.sign({userId}, process.env.JWT_SECRET,{
    expiresIn: "1d"
})
res.cookie("jwt",token,{
    maxAge:new Date(Date.now() + 24*60*60*1000),
    httpOnly: true,
    sameSite: "strict",
    secure:process.env.NODE_ENV !== "development",
})
}

export default generateTokenAndSetCookies;