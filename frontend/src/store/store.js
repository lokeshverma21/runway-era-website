import {configureStore} from '@reduxjs/toolkit';
import productsReducer from '../features/collections/collectionSlice.js';
import currencyReducer from '../features/currency/currencySlice.js';
import searchReducer from '../features/collections/searchSlice.js';
import cartReducer from '../features/cart/cartSlice.js';
import authReducer from '../features/auth/authSlice.js';

const store = configureStore({
    reducer:{
        products : productsReducer,
        currency : currencyReducer,
        search: searchReducer,
        cart: cartReducer,
        auth: authReducer,
    }
})

export default store


