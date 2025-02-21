import { ApiError } from "../utils/ApiError.js";


// 404 Middleware for unknown routes
export const notFound = (req, res, next) => {
    next(new ApiError(404, "Route not found"));
};

// Global Error Handling Middleware
export const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            statusCode: err.statusCode,
            data: err.data,
            success: err.success,
            message: err.message,
            errors: err.errors
        });
    }

    console.error(err); // Log unexpected errors for debugging
    return res.status(500).json({
        statusCode: 500,
        data: null,
        success: false,
        message: "Internal Server Error",
    });
};
