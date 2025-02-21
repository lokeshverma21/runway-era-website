import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

// const verifyJWT = asyncHandler( async (req, _, next) => {
    
//     const {token} = req.headers;

//     if (!token) {
//         return new ApiError(401, "Not authorized login again!")
//     }

//     try {
//        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
//        req.body.userId = token_decode
//        next()
//     } catch (error) {
//         console.log(error)
//         throw new ApiError(401, error?.message || "Invalid access token")
//     }
    
    
// })

// export default verifyJWT;




const verifyJWT = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;  // Extract authorization header

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ApiError(401, "Not authorized, login again!");
    }

    const token = authHeader.split(" ")[1]; // Extract token

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded.id; // Attach user ID to request
        next();
    } catch (error) {
        console.log(error);
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});

export default verifyJWT;

