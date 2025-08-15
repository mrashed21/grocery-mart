"use client";
import Contain from "@/components/common/Contain";
import MiniSpinner from "@/components/Skeleton/MiniSpinner";
import { useUserInfoQuery } from "@/redux/feature/auth/authApi";
import { BASE_URL } from "@/utils/baseURL";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "react-toastify";
import DeliveryInformation from "./DevliveryInformation";

const ProductCheckout = ({ totalPrice, singleProduct, quantity }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const { data: userInfo } = useUserInfoQuery();

  const navigate = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedZone, setSelectedZone] = useState(null);
  const [localCustomerPhone, setLocalCustomerPhone] = useState("");

  const shippingCharge = selectedZone?.zone_delivery_charge || 0;
  const grandToal = totalPrice + shippingCharge;
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
      user_phone: userInfo?.data.user_phone || localCustomerPhone,
      user_name: userInfo?.data.user_name || data?.user_name,
      order_products: [
        {
          order_product_price: parseInt(
            singleProduct?.product_discount_price ||
              singleProduct?.product_price
          ),
          order_product_quantity: quantity,
          order_product_id: singleProduct?._id,
        },
      ],
    };
    if (userInfo?.data?._id) {
      sendData.user_id = userInfo?.data?._id;
    } else {
      sendData.need_user_create = true;
    }

    // return;
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/order/single_order`, {
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
        if (!userInfo) {
          reset();
          setLocalCustomerPhone("");
          setSelectedZone("");
        }

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
      <section className="pb-8">
        <form onSubmit={handleSubmit(handleDataPost)}>
          <div className="  ">
            <div className="w-full">
              {/* Delivery Information */}
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
                    <p className="fo">৳ {totalPrice?.toFixed(2)}</p>
                    <p className="">৳ 0</p>
                    <p className="">৳ {shippingCharge?.toFixed(2)}</p>
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
                  <div className="px-10 py-2 flex items-center justify-center bg-primary text-white rounded">
                    <MiniSpinner />
                  </div>
                ) : (
                  <button
                    className={`w-full text-white text-sm sm:text-base font-bold px-4 lg:px-7 py-2 rounded shadow-md transition-all duration-300 ease-in-out
    ${
      singleProduct?.product_quantity > 0
        ? "bg-[#5E8B8C] hover:shadow-lg hover:scale-105 cursor-pointer"
        : "bg-gray-400 cursor-not-allowed"
    }`}
                    disabled={singleProduct?.product_quantity <= 0}
                    type="submit"
                  >
                    Place Order
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </section>
    </Contain>
  );
};

export default ProductCheckout;
