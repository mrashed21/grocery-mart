"use client";
import Contain from "@/components/common/Contain";
import MiniSpinner from "@/components/Skeleton/MiniSpinner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "react-toastify";
import DeliveryInformation from "./DevliveryInformation";
const ProductCheckout = ({ totalPrice, product, quantity }) => {
  console.log(product);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const userInfo = false;
  const settingData = false;
  const navigate = useRouter();
  const [loading, setLoading] = useState(false);
  const shippingCharge = 80;
  const grandToal = totalPrice + shippingCharge;
  useEffect(() => {
    if (userInfo?.data) {
      setValue("customer_name", userInfo.data.user_name);
      setValue("customer_phone", userInfo.data.user_phone);
      setValue("billing_address", userInfo.data.user_address);
    }
  }, [userInfo, setValue]);

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
      sub_total_amount: totalPrice ? totalPrice : 0,
      discount_amount: 0,
      shipping_cost: parseInt(shippingCharge) || 0,
      orderProduct: [
        {
          product_name: product?.name,
          Product_price: product?.discountedPrice || product?.price,
          product_quantity: quantity,
          product_id: product?.id,
        },
      ],
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
    <Contain>
      <div className="pb-8">
        <form onSubmit={handleSubmit(handleDataPost)}>
          <div className="  ">
            <div className="w-full">
              {/* Delivery Information */}
              <DeliveryInformation
                register={register}
                userInfo={userInfo}
                errors={errors}
                setValue={setValue}
              />
              {/* {orderData && <OrderSummaryTable orderData={orderData} />} */}
            </div>
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
                    <p className="">৳ {shippingCharge}</p>
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  <p className="text-base font-bold">Total</p>
                  <p className="font-bold text-[#000000CC]">৳ {grandToal}</p>
                </div>
              </div>
              <div className="flex py-4 gap-2 mt-4">
                {loading == true ? (
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
        </form>
      </div>
    </Contain>
  );
};

export default ProductCheckout;
