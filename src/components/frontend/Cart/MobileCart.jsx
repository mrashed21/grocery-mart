"use client";
import { useAllProducts } from "@/lib/getAllProducts";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const MobileCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [limit, setLimit] = useState(20);
  const [page, setpage] = useState(1);

  const { data: productData = [], isloading } = useAllProducts({
    limit,
    page,
  });

  useEffect(() => {
    const syncCart = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("grocery_mart")) || {};
        const productsInCart = cart.products || [];
        const merged = productsInCart
          .filter((item) => item.quantity > 0)
          .map((cartItem) => {
            const product = productData?.data?.find(
              (p) => p._id === cartItem.productId
            );
            if (!product) return null;

            return {
              ...product,
              quantity: cartItem.quantity,
            };
          })
          .filter(Boolean);

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
  }, [productData]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.product_discount_price || item.product_price;
      return total + itemPrice * item.quantity;
    }, 0);
  }, [cartItems]);

  return (
    <div className="">
      {cartItems.length > 0 && (
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
      )}
    </div>
  );
};

export default MobileCart;
