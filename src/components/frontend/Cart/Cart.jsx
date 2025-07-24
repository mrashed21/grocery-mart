"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useSelector } from "react-redux";

const Cart = () => {
  const cartProducts = useSelector((state) => state.grocery_mart.products);
  const [cartLength, setCartLength] = useState(cartProducts.length);

  useEffect(() => {
    const updateWishlistAndCart = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("grocery_mart")) || {};
        setCartLength(cart?.products?.length || 0);
      } catch (error) {
        console.error("Error reading localStorage", error);
      }
    };

    updateWishlistAndCart();

    window.addEventListener("localStorageUpdated", updateWishlistAndCart);
    window.addEventListener("storage", updateWishlistAndCart);

    return () => {
      window.removeEventListener("localStorageUpdated", updateWishlistAndCart);
      window.removeEventListener("storage", updateWishlistAndCart);
    };
  }, []);

  return (
    <Link href={"/checkout"}>
      <div
        onClick={() => setIsCartOpen(true)}
        className="fixed right-1 top-1/2 -translate-y-1/2 z-30 hidden md:block cursor-pointer "
      >
        <div className="bg-[#084C4E] flex flex-col items-center p-1.5 rounded-md">
          <MdOutlineShoppingBag className="text-3xl text-white" />
          <p className="text-white text-sm font-bold">{cartLength} items</p>
        </div>
        {/* <div className="bg-[#a98153] flex items-center justify-center p-1.5">
          <TbCoinTaka className="text-white text-xl" />{" "}
          <p className="text-white text-sm ml-1 font-bold">0</p>
        </div> */}
      </div>
    </Link>
  );
};

export default Cart;
