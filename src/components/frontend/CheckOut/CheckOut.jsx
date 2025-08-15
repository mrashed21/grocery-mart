"use client";
import MiniSpinner from "@/components/Skeleton/MiniSpinner";
import { useAllProducts } from "@/lib/getAllProducts";
import { useUserInfoQuery } from "@/redux/feature/auth/authApi";
import { allRemoveFromCart } from "@/redux/feature/cart/cartSlice";
import { BASE_URL } from "@/utils/baseURL";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { SlArrowRight } from "react-icons/sl";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DeliveryInformation from "../Home/ProductCheckOut/DevliveryInformation";
import CheckOutTable from "./CheckOutTable";

const CheckOut = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const { data: userInfo, isLoding } = useUserInfoQuery();
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [limit, setLimit] = useState(20);
  const [page, setpage] = useState(1);
  const [selectedZone, setSelectedZone] = useState(null);
  const [localCustomerPhone, setLocalCustomerPhone] = useState("");
  const dispatch = useDispatch();

  const shippingCharge = selectedZone?.zone_delivery_charge || 0;
  const { data: productData = [], isloading } = useAllProducts({
    limit,
    page,
  });
  useEffect(() => {
    if (userInfo?.data?.user_phone) {
      setLocalCustomerPhone(userInfo.data.user_phone);
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo?.data) {
      setValue("user_name", userInfo.data.user_name);
      setValue("user_phone", userInfo.data.user_phone);
      setValue("shipping_address", userInfo.data.user_address);
    }
  }, [userInfo, setValue]);

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

  const grandToal = totalPrice + shippingCharge;

  const handleRemoveAll = () => {
    dispatch(allRemoveFromCart());
    localStorage.removeItem("grocery_mart");
    setCartItems([]);
  };

  //data post function
  const handleDataPost = async (data) => {
    // Validate phone number if it's coming from react-hook-form
    if (!localCustomerPhone) {
      return toast.error("Please enter phone number.");
    }
    if (localCustomerPhone && !isValidPhoneNumber(localCustomerPhone)) {
      return toast.error("Please enter a valid phone number.");
    }
    if (!selectedZone) {
      return toast.error("Please Select Zone.");
    }

    const sendData = {
      order_status: "pending",
      sub_total_amount: parseInt(totalPrice ? totalPrice?.toFixed(2) : 0),
      discount_amount: 0,
      shipping_cost: parseInt(shippingCharge?.toFixed(2)) || 0,
      grand_total_amount: parseInt(grandToal ? grandToal?.toFixed(2) : 0),
      zone_id: selectedZone?._id,
      shipping_address: data?.shipping_address,
      user_id: userInfo?.data?._id,
      user_name: userInfo?.data.user_name || data?.user_name,
      user_phone: userInfo?.data.user_phone || localCustomerPhone,
      order_products: cartItems?.map((item) => ({
        order_product_id: item?._id,
        order_product_price: parseInt(
          item?.product_discount_price || item?.product_price
        ),
        order_product_quantity: item?.quantity,
      })),
    };
    if (userInfo?.data?._id) {
      sendData.user_id = userInfo?.data?._id;
    } else {
      sendData.need_user_create = true;
    }

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
        toast.success(
          result?.message ? result?.message : "Order created successfully",
          {
            autoClose: 1000,
          }
        );
        setLoading(false);
        if (!userInfo) {
          reset();
          setLocalCustomerPhone("");
          setSelectedZone("");
        }

        handleRemoveAll();
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
    <main>
      <section className="lg:my-5">
        <h2 className="flex mb-2">
          <Link href={"/"} className="flex items-center">
            Home
            <span>
              <SlArrowRight className="text-sm mx-1" />
            </span>
            Cart
          </Link>
        </h2>
      </section>
      <form onSubmit={handleSubmit(handleDataPost)}>
        <section className="lg:grid grid-cols-3 gap-10">
          <div className="col-span-2">
            <div className="mb-5">
              <CheckOutTable cartItems={cartItems} isloading={isloading} />
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
          <section className="col-span-1 mt-5">
            <DeliveryInformation
              register={register}
              userInfo={userInfo}
              errors={errors}
              setValue={setValue}
              setSelectedZone={setSelectedZone}
              selectedZone={selectedZone}
              setLocalCustomerPhone={setLocalCustomerPhone}
              localCustomerPhone={localCustomerPhone}
            />

            <section className="py-6 font-nunito">
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
                    <p className="fo">৳ {totalPrice?.toFixed(2)}</p>
                    <p className="">৳ 0</p>
                    <p className="">৳{shippingCharge?.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  <p className="text-base font-bold">Total</p>
                  <p className="font-bold text-[#000000CC]">
                    ৳ {grandToal?.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex py-4 gap-2 mt-4">
                {loading == true ? (
                  <div className="px-10 py-2 flex items-center justify-center bg-[#5E8B8C] text-white rounded">
                    <MiniSpinner />
                  </div>
                ) : (
                  <button
                    className={`w-full text-white text-sm sm:text-base font-bold px-4 lg:px-7 py-2 rounded shadow-md transition-all duration-300 ease-in-out ${
                      cartItems?.length > 0
                        ? "bg-[#5E8B8C] hover:shadow-lg hover:scale-105 cursor-pointer"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    disabled={cartItems?.length <= 0}
                    type="submit"
                  >
                    Place Order
                  </button>
                )}
              </div>
            </section>
          </section>
        </section>
      </form>
    </main>
  );
};

export default CheckOut;
