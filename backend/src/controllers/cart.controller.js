import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {Product} from "../models/product.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";
import {Cart} from "../models/cart.model.js"



const addToCart = asyncHandler(async (req, res) => {
    const { userId, itemId, size } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
        cart = new Cart({ userId, items: [] });
    }

    // Check if the product is already in the cart
    const existingItem = cart.items.find(
        (item) => item.productId.toString() === itemId && item.size === size
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.items.push({ productId: itemId, size, quantity: 1 });
    }

    await cart.save();

    res.status(200).json(new ApiResponse(200, cart, "Item added to cart!"));
});



const updateCart = asyncHandler(async (req, res) => {
    const { userId, itemId, size, quantity } = req.body;

    if (!userId || !itemId || !size || quantity == null) {
        throw new ApiError(400, "All fields (userId, itemId, size, quantity) are required!");
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
        throw new ApiError(404, "Cart not found!");
    }

    // Find the item in the cart
    const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === itemId && item.size === size
    );

    if (itemIndex === -1) {
        throw new ApiError(404, "Item not found in cart!");
    }

    if (quantity > 0) {
        cart.items[itemIndex].quantity = quantity; // Update quantity
    } else {
        cart.items.splice(itemIndex, 1); // Remove item if quantity is 0
    }

    await cart.save();

    return res.status(200).json(new ApiResponse(200, cart, "Cart updated successfully!"));
});



const getUserCart = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        throw new ApiError(400, "User ID is required!");
    }

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
        throw new ApiError(404, "Cart not found!");
    }

    return res.status(200).json(new ApiResponse(200, cart, "Cart fetched successfully!"));
});



const removeFromCart = asyncHandler(async (req, res) => {
    const { userId, itemId, size } = req.body;

    if (!userId || !itemId || !size) {
        throw new ApiError(400, "User ID, Item ID, and Size are required!");
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
        throw new ApiError(404, "Cart not found!");
    }

    // Find the item in the cart
    const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === itemId && item.size === size
    );

    if (itemIndex === -1) {
        throw new ApiError(404, "Item not found in cart!");
    }

    // Remove the item
    cart.items.splice(itemIndex, 1);

    await cart.save();

    return res.status(200).json(new ApiResponse(200, cart, "Item removed from cart!"));
});



export {
    addToCart,
    updateCart,
    getUserCart,
    removeFromCart
}