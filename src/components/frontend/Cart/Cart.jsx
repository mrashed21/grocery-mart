"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { MdOutlineShoppingBag } from "react-icons/md";
import { TbCoinTaka } from "react-icons/tb";
import productData from "./../../../../public/productData.json";
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const syncCart = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("grocery_mart")) || {};
        const productsInCart = cart.products || [];

        // Merge productData with cart quantity
        const merged = productsInCart
          .filter((item) => item.quantity > 0)
          .map((cartItem) => {
            const product = productData.find(
              (p) => p.id === cartItem.productId
            );
            if (!product) return null;

            return {
              ...product,
              quantity: cartItem.quantity,
            };
          })
          .filter(Boolean); // Remove nulls

        setCartItems(merged);
      } catch (error) {
        console.error("Error reading cart from localStorage", error);
      }
    };

    syncCart();

    window.addEventListener("localStorageUpdated", syncCart);
    window.addEventListener("storage", syncCart);

    return () => {
      window.removeEventListener("localStorageUpdated", syncCart);
      window.removeEventListener("storage", syncCart);
    };
  }, []);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.discountedPrice || item.price;
      return total + itemPrice * item.quantity;
    }, 0);
  }, [cartItems]);

  return (
    <Link href={"/checkout"}>
      <div
        onClick={() => setIsCartOpen(true)}
        className="fixed right-1 top-1/2 -translate-y-1/2 z-30 hidden lg:block cursor-pointer "
      >
        <div className="bg-[#084C4E] flex flex-col items-center p-1.5 rounded-md">
          <MdOutlineShoppingBag className="text-3xl text-white" />
          <p className="text-white text-sm font-bold">
            {cartItems?.length} items
          </p>
        </div>
        <div className="bg-white shadow flex items-center rounded-b-lg justify-center p-1">
          <TbCoinTaka className="" />{" "}
          <p className=" text-center text-sm ml-1 font-bold">{totalPrice}</p>
        </div>
      </div>
    </Link>
  );
};

export default Cart;
