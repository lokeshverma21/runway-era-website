import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import validator from "validator";
import jwt from "jsonwebtoken";


const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}


const loginUser = asyncHandler( async (req,res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        throw new ApiError(400,"All feilds are required")
    }

    const userExists = await User.findOne({email})

    if (!userExists) {
        throw new ApiError(404,"User with this email does not exists!")
    }

    const isPasswordValid = await userExists.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401,"Password is incorrect")
    }

    const token = createToken(userExists._id)

    res.status(200).json(
        new ApiResponse(200, token, "Login successfull!!")
    )

});


const registerUser = asyncHandler( async(req,res) => {

        const {name, email, password, role} = req.body;
    
        if (!name || !email || !password) {
            throw new ApiError(400,"All feilds are required!")
        }
    
        const userExists = await User.findOne({email})
    
        if (userExists) {
            throw new ApiError(409,"User with this email already exists!")
        }
    
        if (!validator.isEmail(email)) {
            throw new ApiError(409,"Please enter a valid email!")
        }
    
        if (password.length < 8) {
            throw new ApiError(409,"Password must be 8 characters long!")
        }
    
        const newUser = new User({
            name,
            email,
            password,
            role
        })
    
        const user = await newUser.save()
    
        const token = createToken(user._id)
    
        res.status(200).json(
            new ApiResponse(200,token, "User registered successfully!!")
        )
});


const adminLogin = asyncHandler( async(req,res) => {
    const {email, password} = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign(email+password, process.env.JWT_SECRET);
        return res.status(200).json(
            new ApiResponse(200,token, "Admin logged in successfully!!")
        )
    }else{
        throw new ApiError(400,"Invalid admin credentials!")
    }
});


export {
    loginUser,
    registerUser,
    adminLogin
}