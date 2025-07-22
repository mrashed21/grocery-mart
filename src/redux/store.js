import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import { cartLocalStorageMiddleware } from "./cartLocalstorageMiddleware";
import cartReducer from "./feature/cart/cartSlice";

// Function to load cart state from localStorage
const cartLoadState = () => {
  try {
    const serializedCart = localStorage.getItem("grocery_mart");
    if (serializedCart === null) {
      return undefined;
    }
    return JSON.parse(serializedCart);
  } catch (error) {
    return undefined;
  }
};

const cartPreloadedState = cartLoadState();

// Configure the Redux store
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    grocery_mart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      baseApi.middleware,
      cartLocalStorageMiddleware
    ),
  preloadedState: {
    grocery_mart: cartPreloadedState,
  },
});
