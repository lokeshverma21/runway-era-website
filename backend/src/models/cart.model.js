import mongoose,{Schema} from "mongoose";

const cartSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            size: { type: String, required: true },
            quantity: { type: Number, default: 1 }
        }
    ]
},{timestamps: true})

export const Cart = mongoose.model("Cart", cartSchema)