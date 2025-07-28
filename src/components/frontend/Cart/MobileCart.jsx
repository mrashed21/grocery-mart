"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import productData from "./../../../../public/productData.json";

const MobileCart = () => {
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
        className="fixed bottom-0 left-0 right-0 z-30 block lg:hidden cursor-pointer "
      >
        <div className="bg-[#084C4E] text-white w-[95vw] mx-auto h-12 shadow flex gap-1 items-center rounded-t-lg justify-center ">
          <p className=" text-center text-sm font-bold">
            View Your Bag (<span className="mr-1">BDT </span>
            {totalPrice})
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MobileCart;
