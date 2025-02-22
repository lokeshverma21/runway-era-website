import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const initialState = {
  products: [],
  loading: false,
  error: null,
};

// Fetch products API call using createAsyncThunk
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendUrl}/products/list`);
      // console.log(response.data.data)
      return (response.data.data).reverse(); // Assuming response.data contains the products array
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },

    addProduct(state, action) {
      state.products.push(action.payload);
    },

    clearProducts(state) {
      state.products = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setProducts, addProduct, clearProducts } = productSlice.actions;
export default productSlice.reducer;
