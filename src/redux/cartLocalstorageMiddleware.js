import {
  addToCart,
  allRemoveFromCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  updateQuantity,
} from "./feature/cart/cartSlice";

// export const cartLocalStorageMiddleware = (store) => (next) => (action) => {
//   const result = next(action);

//   // Store only the cart value in local storage after the actions have been dispatched
//   if (
//     action.type === addToCart.type ||
//     action.type === removeFromCart.type ||
//     action.type === incrementQuantity.type ||
//     action.type === decrementQuantity.type ||
//     action.type === updateQuantity.type ||
//     action.type === allRemoveFromCart.type
//   ) {
//     localStorage.setItem("grocery_mart", JSON.stringify(store.getState().grocery_mart));
//   }

//   return result;
// };
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
