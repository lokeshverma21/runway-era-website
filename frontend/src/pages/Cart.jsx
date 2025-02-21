import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCartAsync, clearCart, fetchCartAsync, removeFromCartAsync } from "@/features/cart/cartSlice.js";
import Title from "@/components/Title.jsx";
import { assets } from "@/assets/index.js";
import CartTotal from "@/components/cartTotal.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Cart = () => {
    const { cartItems, totalQuantity, totalPrice, loading } = useSelector((state) => state.cart);
    const { currency } = useSelector((state) => state.currency);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Track quantity locally to improve UX
    const [quantities, setQuantities] = useState(
        cartItems.reduce((acc, item) => {
            acc[`${item.productId._id}-${item.size}`] = item.quantity;
            return acc;
        }, {})
    );

    // Remove item from cart
    const removeItem = (itemId, size) => {
        dispatch(removeFromCartAsync({ itemId, size }));
    };

    // Handle quantity change
    const handleQuantityChange = (itemId, size, newQuantity) => {
        if (newQuantity < 1) return;

        // Update local state
        setQuantities((prev) => ({
            ...prev,
            [`${itemId}-${size}`]: newQuantity,
        }));

        // Update backend
        dispatch(updateCartAsync({ itemId, size, quantity: Number(newQuantity) }));
    };


    useEffect(() => {
      dispatch(fetchCartAsync());
    }, [dispatch, currency, totalPrice, totalQuantity]);


    if (!cartItems || cartItems.length === 0) {
      return <div>No items in the cart</div>; // or a loading indicator
  }
  

return (
        <div className="border-t pt-14">
            <div className="text-2xl mb-3">
                <Title text1="Your" text2="Cart" />
            </div>

            {loading ? (
                <p>Loading cart...</p>
            ) : cartItems.length > 0 ? (
                <div>
                    {cartItems.map((item) => (
                        <div
                            key={`${item.productId._id}-${item.size}`}
                            className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_1fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                        >
                            <div className="flex items-start gap-6">
                            <img
                                src={item.productId.image && item.productId.image.length > 0 ? item.productId.image[0] : 'default_image_url'}
                                alt={item.productId.name}
                                className="w-16 sm:w-20"
                            />

                                <div>
                                    <p className="text-sm sm:text-lg font-medium">{item.productId.name}</p>
                                    <div className="flex items-center gap-5 mt-2">
                                        <p>{currency}{item.productId.price}</p>
                                        <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
                                    </div>
                                </div>
                            </div>

                            <input
                                type="number"
                                min={1}
                                value={quantities[`${item.productId._id}-${item.size}`] || item.quantity}
                                onChange={(e) => handleQuantityChange(item.productId._id, item.size, e.target.value)}
                                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                            />
                            <img
                                src={assets.binIcon}
                                alt="Remove"
                                className="w-4 mr-4 sm:w-5 cursor-pointer"
                                onClick={() => removeItem(item.productId._id, item.size)}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <p>Your cart is empty.</p>
            )}

            <div className="flex justify-end my-20">
                <div className="w-full sm:w-[450px]">
                    <CartTotal />
                    <div className="w-full text-end">
                        <button onClick={() => navigate("/place-order")} className="uppercase bg-black text-white text-sm my-8 px-8 py-3 cursor-pointer">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
