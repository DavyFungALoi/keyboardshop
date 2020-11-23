import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from '../utils/generateToken.js'

//@desc        Auth user & get token
//@route       POST /api/users/login
//@access      Public

const authUser = asyncHandler(async(req, res) => {
    const { email, password} = req.body
    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))) {
     res.json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin:user.isAdmin,
         token: generateToken(user._id)
     })   
    } else {
        res.status(401)
        throw new Error('invalid email or password')
    }
  

})

//@desc        Auth user profile
//@route       GET /api/users/profile
//@access      Private

const getUserProfile = asyncHandler(async(req, res) => {
  res.send('success')
})

export { authUser, getUserProfile}