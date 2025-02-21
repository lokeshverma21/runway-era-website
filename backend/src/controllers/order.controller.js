import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {Product} from "../models/product.model.js";
import { Order } from "../models/order.model.js";
import { Cart } from "../models/cart.model.js";
import Stripe from "stripe";

//global variables
// const currency = 'usd'
// const delivery_charges = 10

//gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


const placeOrder = asyncHandler( async(req,res) => {
    const {userId, items, amount, address} = req.body;

    if (!userId || !items || !amount || !address) {
        throw new ApiError(401, "All feilds are required!")
    }

    const newOrder = new Order({
        userId,
        items,
        amount,
        address,
        paymentMethod: "COD",
        payment:{
            status: false,
            transactionId: null
        }
    })

    const order = await newOrder.save();

    await Cart.findOneAndDelete({userId})

    return res.status(200).json(
        new ApiResponse(200, order, "Order Placed Successfully!!")
    )
});


const placeOrderStripe = asyncHandler(async (req, res) => {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const currency = "usd"; 
    const delivery_charges = 10;

    const orderData = new Order({
        userId,
        items,
        amount,
        address,
        paymentMethod: "Stripe",
        payment: {
            status: false,
            transactionId: null,
        },
    });

    const order = await orderData.save();

    const line_items = items.map((item) => ({
        price_data: {
            currency: currency,
            product_data: {
                name: item.productId.name,
            },
            unit_amount: item.productId.price * 100, // Convert to cents
        },
        quantity: item.quantity,
    }));

    // Add delivery charges
    line_items.push({
        price_data: {
            currency: currency,
            product_data: {
                name: "Delivery Charges",
            },
            unit_amount: delivery_charges * 100,
        },
        quantity: 1,
    });

    // console.log(line_items)

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        success_url: `${origin}/verify?success=true&orderId=${order._id}`,
        cancel_url: `${origin}/verify?success=false&orderId=${order._id}`,
        line_items,
        mode: "payment",
        customer_email: address?.email || "", // Ensure email is included if available
    });

    // console.log(session)

    return res.status(200).json(
        new ApiResponse(200, { session_url: session.url }, "Redirecting to Stripe...")
    );
});



const verifyStripe = asyncHandler( async(req,res) => {
    const {orderId, success, userId} = req.body

    if (success === "true") {
        await Order.findByIdAndUpdate(orderId, {payment: true})
        await Cart.findOneAndUpdate({ userId }, { $set: { items: [] } });

        return res.status(200).json(
            new ApiResponse(200, null, "Payment successfull!!")
        )
    }else{
        await Order.findByIdAndDelete(orderId)
        
        return res.status(503).json(
            new ApiResponse(503, null, "Payment failed!")
        )
    }
})



const placeOrderRazorpay = asyncHandler( async(req,res) => {

});


const allOrders = asyncHandler( async(req,res) => {
    const allOrders = await Order.find({})

    if (!allOrders) {
        throw new ApiError(404, "No orders available!")
    }

    return res.status(200).json(
        new ApiResponse(200,allOrders, "All orders fetched successfully!!")
    )
});


const userOrder = asyncHandler( async(req, res) => {
    const {userId} = req.body

    if (!userId) {
        throw new ApiError(401, "User is required to view orders!")
    }

    const orders = await Order.find({userId})

    if (!orders) {
        throw new ApiError(404,"No orders for the user!")
    }

    return res.status(200).json(
        new ApiResponse(200, orders, "All orders fetched successfully!!")
    )
});


const updateStatus = asyncHandler( async(req,res) => {
    const {orderId, status} = req.body

    if (!orderId || !status) {
        throw new ApiError(400,"OrderId and status is required to update status!")
    }

    const updatedStatus = await Order.findByIdAndUpdate(orderId, {status})

    if (!updatedStatus) {
        throw new ApiError(500,"Error while updating order status!")
    }

    return res.status(200).json(
        new ApiResponse(200,updatedStatus, "Status updated successfully!!")
    )
});


export {
    placeOrder,
    placeOrderStripe,
    placeOrderRazorpay,
    allOrders,
    userOrder,
    updateStatus,
    verifyStripe
}