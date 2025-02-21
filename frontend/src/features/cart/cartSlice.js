import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API Base URL
const API_BASE_URL = "http://localhost:1000/api/v1/cart"; // Change this to your backend URL

// Helper function to get token from Redux state
const getAuthToken = (getState) => getState().auth.token;

// ✅ Add to Cart API Call
export const addToCartAsync = createAsyncThunk(
    "cart/addToCart",
    async ({ itemId, size }, { getState, rejectWithValue }) => {
        const token = getAuthToken(getState);
        // console.log(token)
        try {
            const response = await axios.post(
                `${API_BASE_URL}/add`,
                { itemId, size },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            return response.data.data; // Returns updated cart
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to add item to cart");
        }
    }
);

// ✅ Update Cart API Call
export const updateCartAsync = createAsyncThunk(
    "cart/updateCart",
    async ({ itemId, size, quantity }, { getState, rejectWithValue }) => {
        const token = getAuthToken(getState);
        try {
            const response = await axios.post(
                `${API_BASE_URL}/update`,
                { itemId, size, quantity },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to update cart");
        }
    }
);

// ✅ Fetch User Cart API Call
export const fetchCartAsync = createAsyncThunk(
    "cart/fetchCart",
    async (_, { getState, rejectWithValue }) => {
        const token = getAuthToken(getState);
        // console.log(token)
        try {
            const response = await axios.get(`${API_BASE_URL}/get`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data.data;
            // console.log(response.data)
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch cart");
        }
    }
);

export const removeFromCartAsync = createAsyncThunk(
    "cart/removeFromCart",
    async ({ itemId, size }, { getState, rejectWithValue }) => {
        const token = getAuthToken(getState);
        try {
            const response = await axios.post(
                `${API_BASE_URL}/remove`,
                { itemId, size },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            return response.data.data; // Updated cart data from backend
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to remove item from cart");
        }
    }
);


const initialState = {
    cartItems: [],
    totalQuantity: 0,
    totalPrice: 0,
    loading: false,
    error: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        removeFromCart: (state, action) => {
            const { itemId, size } = action.payload;
            state.cartItems = state.cartItems.filter(
                (item) => !(item.productId._id === itemId && item.size === size)
            );
            state.totalQuantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);
            state.totalPrice = state.cartItems.reduce(
                (total, item) => total + item.quantity * (item.productId?.price || 0),
                0
            );
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            // ✅ Add to Cart
            .addCase(addToCartAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToCartAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = action.payload.items || [];  // Ensure items are properly set
                state.totalQuantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);
                state.totalPrice = state.cartItems.reduce(
                    (total, item) => total + item.quantity * (item.productId?.price || 0),
                    0
                );
            })
            .addCase(addToCartAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // ✅ Update Cart
            .addCase(updateCartAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCartAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = action.payload.items;
                state.totalQuantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);
                state.totalPrice = state.cartItems.reduce(
                    (total, item) => total + item.quantity * (item.productId?.price || 0),
                    0
                );
            })
            .addCase(updateCartAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // ✅ Fetch Cart
            .addCase(fetchCartAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCartAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = action.payload.items;
                state.totalQuantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);
                state.totalPrice = state.cartItems.reduce(
                    (total, item) => total + item.quantity * (item.productId?.price || 0),
                    0
                );
            })
            .addCase(fetchCartAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //remove
            .addCase(removeFromCartAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeFromCartAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = action.payload.items; // Use updated cart from backend
                state.totalQuantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);
                state.totalPrice = state.cartItems.reduce(
                    (total, item) => total + item.quantity * (item.productId?.price || 0),
                    0
                );
            })
            .addCase(removeFromCartAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});

export const { clearCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
