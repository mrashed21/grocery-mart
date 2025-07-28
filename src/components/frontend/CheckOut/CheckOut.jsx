"use client";
import MiniSpinner from "@/components/Skeleton/MiniSpinner";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SlArrowRight } from "react-icons/sl";
import DeliveryInformation from "../Home/ProductCheckOut/DevliveryInformation";
import productData from "./../../../../public/productData.json";
import CheckOutTable from "./CheckOutTable";

const CheckOut = () => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const userInfo = false;
  const isLoding = false;
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

  return (
    <div>
      <div className="lg:my-5">
        <h2 className="flex mb-2">
          <Link href={"/"} className="flex items-center">
            Home
            <span>
              <SlArrowRight className="text-sm mx-1" />
            </span>
            Cart
          </Link>
        </h2>
      </div>

      <div className="lg:grid grid-cols-3 gap-10">
        <div className="col-span-2">
          <div className="mb-5">
            <CheckOutTable cartItems={cartItems} />
          </div>

          <div className="w-full lg:w-fit flex">
            <Link
              href={"/"}
              className="text-[#6E9F8C] w-full text-center font-bold font-nunito px-5 py-2 border border-gray-200 rounded-lg bg-[#5E8B8C0A]"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
        <div className="col-span-1 mt-5">
          <DeliveryInformation
            register={register}
            userInfo={userInfo}
            errors={errors}
            setValue={setValue}
          />

          <div className="py-6 font-nunito">
            <div className=" p-4 bg-[#F4F6F880] rounded-md shadow-md">
              <p className="text-xl font-medium border-b-2 pb-1.5 border-gray-200">
                Order Summary
              </p>
              <div className="flex justify-between mt-4">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm text-[#000000CC]">Product Price</p>

                  <p className="text-sm text-[#000000CC]">Discount</p>
                  <p className="text-sm text-[#000000CC]">Delivery Charge</p>
                </div>
                <div className="flex flex-col text-end space-y-1">
                  <p className="fo">৳ 640</p>
                  <p className="">৳ 0</p>
                  <p className="">৳ 80</p>
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <p className="text-base font-bold">Total</p>
                <p className="font-bold text-[#000000CC]">৳ 520</p>
              </div>
            </div>
            <div className="flex py-4 gap-2 mt-4">
              {isLoding == true ? (
                <div className="px-10 py-2 flex items-center justify-center bg-primary text-white rounded">
                  <MiniSpinner />
                </div>
              ) : (
                <button
                  className="w-full text-white text-sm sm:text-base font-bold px-4 lg:px-7 py-2 rounded bg-[#5E8B8C] shadow-md   hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
                  type="submit"
                >
                  Place Order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
