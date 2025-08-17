"use client";
import MiniSpinner from "@/components/Skeleton/MiniSpinner";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { SlArrowRight } from "react-icons/sl";
import { isValidPhoneNumber } from "react-phone-number-input";
import DeliveryInformation from "../Home/ProductCheckOut/DevliveryInformation";
import productData from "./../../../../public/productData.json";
import CheckOutTable from "./CheckOutTable";

const CheckOut = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const userInfo = false;
  const isLoding = false;
  const shippingCharge = 80;
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const syncCart = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("grocery_mart")) || {};
        const productsInCart = cart.products || [];
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
  }, []);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.discountedPrice || item.price;
      return total + itemPrice * item.quantity;
    }, 0);
  }, [cartItems]);

  const grandToal = totalPrice + shippingCharge;

  //data post function
  const handleDataPost = async (data) => {
    const today =
      new Date().toISOString().split("T")[0] +
      " " +
      new Date().toLocaleTimeString();

    // Validate phone number if it's coming from react-hook-form
    if (data.customer_phone && !isValidPhoneNumber(data.customer_phone)) {
      return toast.error("Please enter a valid phone number.");
    }
    const sendData = {
      ...data,
      order_status: "pending",
      pending_time: today,
      billing_country: "Bangladesh",
      order_product: [
        cartItems.map((item) => ({
          product_name: item?.name,
          product_id: item?.id,
          produxt_price: item?.discountedPrice || item?.price,
          product_quantity: item?.quantity,
        })),
      ],
      sub_total_amount: totalPrice ? totalPrice : 0,
      discount_amount: 0,
      shipping_cost: parseInt(shippingCharge) || 0,
      grand_total_amount: grandToal ? grandToal : 0,
    };
    if (userInfo?.data?._id) {
      sendData.customer_id = userInfo?.data?._id;
    } else {
      sendData.need_user_create = true;
    }
    console.log(sendData);
    return;
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });
      const result = await response.json();

      if (result?.statusCode === 200 && result?.success === true) {
        navigate.push("/orders/order-success");
        toast.success(
          result?.message ? result?.message : "Order created successfully",
          {
            autoClose: 1000,
          }
        );
        setLoading(false);
      } else {
        toast.error(result?.message || "Something went wrong", {
          autoClose: 1000,
        });
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error posting data:", error);
      setLoading(false);
    }
  };

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
      <form onSubmit={handleSubmit(handleDataPost)}>
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
                    <p className="fo">৳ {totalPrice}</p>
                    <p className="">৳ 0</p>
                    <p className="">৳{shippingCharge}</p>
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  <p className="text-base font-bold">Total</p>
                  <p className="font-bold text-[#000000CC]">৳ {grandToal}</p>
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
      </form>
    </div>
  );
};

export default CheckOut;
