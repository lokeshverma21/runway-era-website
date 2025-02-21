import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const adminAuth = asyncHandler( async(req,res,next) => {
    const {token} = req.headers;
    // console.log(token)

    if (!token) {
        throw new ApiError(401, "Not authorized login again!")
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    if (token_decode !== process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD) {
        throw new ApiError(401,"Not authorized admin login!")
    }

    next()
})

export default adminAuth