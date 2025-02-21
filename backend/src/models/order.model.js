import mongoose,{Schema} from "mongoose";

const orderSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },

    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            size: { type: String, required: true },
            quantity: { type: Number, required: true }
        }
    ],

    amount:{
        type: Number,
        required: true
    },

    address:{
        type: Object,
        required: true
    },

    status:{
        type: String,
        enum: ["Order Placed", "Shipped", "Delivered", "Cancelled"],
        required: true,
        default: "Order Placed"
    },

    paymentMethod:{
        type: String,
        required: true
    },

    payment: {
        status: { type: Boolean, required: true, default: false },
        transactionId: { type: String, default: null }
    }
},{timestamps:true})

export const Order = mongoose.model("Order",orderSchema)