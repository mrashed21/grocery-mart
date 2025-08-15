import {
  addToCart,
  allRemoveFromCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  updateQuantity,
} from "./feature/cart/cartSlice";


export const cartLocalStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  const actionTypes = [
    addToCart.type,
    removeFromCart.type,
    incrementQuantity.type,
    decrementQuantity.type,
    updateQuantity.type,
    allRemoveFromCart.type,
  ];

  if (actionTypes.includes(action.type)) {
    const state = store.getState();
    const cart = state.grocery_mart;
    const cleanedProducts = cart.products.filter((p) => p.quantity > 0);
    const cleanedCart = {
      ...cart,
      products: cleanedProducts,
    };

    if (cart.totalQuantity > 0) {
      localStorage.setItem("grocery_mart", JSON.stringify(cleanedCart));
    } else {
      localStorage.removeItem("grocery_mart");
    }
    window.dispatchEvent(new Event("localStorageUpdated"));
  }

  return result;
};
