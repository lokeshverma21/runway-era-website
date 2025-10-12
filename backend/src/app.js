import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { notFound, errorHandler } from "./middlewares/error.middleware.js"; // Import middleware

const app = express();

const allowedOrigins = process.env.CORS_ORIGIN?.split(",").map(origin => origin.trim()) || [];

app.use(
    cors({
        origin: function (origin, callback) {
            console.log("Request Origin:", origin); // Debugging

            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error(`Not allowed by CORS: ${origin}`));
            }
        },
        credentials: true,
    })
);


app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));

app.use(cookieParser());




// Routes
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import orderRouter from "./routes/order.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/orders", orderRouter)
app.use("/api/v1/dashboard", dashboardRouter)



// Middleware for handling 404 errors
app.use(notFound);

// Global error handler
app.use(errorHandler);

export { app };