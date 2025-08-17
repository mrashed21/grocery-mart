import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "grocery_mart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { productId, quantity } = action.payload;

      const existingProduct = state.products.find(
        (p) => p.productId === productId
      );

      if (!existingProduct) {
        state.products.push({ productId, quantity });
        state.totalQuantity += quantity;
      } else {
        existingProduct.quantity += quantity;
        state.totalQuantity += quantity;
      }
    },

    removeFromCart: (state, action) => {
      const { productId, product_quantity: quantity } = action.payload;

      const indexToRemove = state.products.findIndex(
        (p) => p.productId === productId
      );

      if (indexToRemove !== -1) {
        const productToRemove = state.products[indexToRemove];

        if (productToRemove.quantity > quantity) {
          productToRemove.quantity -= quantity;
          state.totalQuantity -= quantity;
        } else {
          state.totalQuantity -= productToRemove.quantity;
          state.products.splice(indexToRemove, 1);
        }
      }
    },

    decrementQuantity: (state, action) => {
      const { productId } = action.payload;

      const existingProduct = state.products.find(
        (item) => item.productId === productId
      );

      if (existingProduct && existingProduct.quantity > 0) {
        existingProduct.quantity -= 1;
        state.totalQuantity -= 1;
      }
    },

    incrementQuantity: (state, action) => {
      const { productId, product_quantity } = action.payload;

      const existingProduct = state.products.find(
        (item) => item.productId === productId
      );

      if (existingProduct && existingProduct.quantity < product_quantity) {
        existingProduct.quantity += 1;
        state.totalQuantity += 1;
      }
    },

    updateQuantity: (state, action) => {
      const { productId, quantity, product_quantity } = action.payload;

      const existingProduct = state.products.find(
        (item) => item.productId === productId
      );

      if (existingProduct && quantity >= 1 && quantity <= product_quantity) {
        existingProduct.quantity = quantity;
        state.totalQuantity = state.products.reduce(
          (total, item) => total + item.quantity,
          0
        );
      }
    },

    allRemoveFromCart: (state) => {
      state.products = [];
      state.totalQuantity = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  allRemoveFromCart,
  decrementQuantity,
  incrementQuantity,
  updateQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
