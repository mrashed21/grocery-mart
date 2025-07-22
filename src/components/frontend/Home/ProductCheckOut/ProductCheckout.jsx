"use client";
import Contain from "@/components/common/Contain";
import MiniSpinner from "@/components/Skeleton/MiniSpinner";
import { districtOptions } from "@/data/district";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "react-toastify";
import DeliveryInformation from "./DevliveryInformation";
const ProductCheckout = ({
  singleProduct,
  quantity,
  selectedVariations,
  productPrice,
}) => {
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
  const [districtsData, setDistrictsData] = useState([]);
  const [districtId, setDistrictId] = useState("");

  const [division, setDivision] = useState(
    userInfo?.data?.user_division || null
  );
  const [district, setDistrict] = useState(
    userInfo?.data?.user_district || null
  );
  const [isOpenDistrict, setIsOpenDistrict] = useState(true);
  const shippingCharge = division === "Dhaka" ? ` 100` : `150 `;

  let total = productPrice * quantity;
  let grandToal = productPrice * quantity + parseInt(shippingCharge);

  const getSelectedVariation = (product, selectedVariations) => {
    if (
      !product ||
      !product.variations ||
      Object.keys(selectedVariations).length === 0
    ) {
      return null;
    }
    const selectedAttributeNames = Object.keys(selectedVariations)
      .map((key) => selectedVariations[key].attribute_value_name?.trim())
      .filter(Boolean)
      .sort();
    if (selectedAttributeNames.length === 0) {
      return null;
    }

    for (const variation of product.variations) {
      if (variation.variation_name) {
        const variationNameParts = variation.variation_name
          .split("-")
          .map((part) => part.trim());
        const matches = selectedAttributeNames.every((selectedName) =>
          variationNameParts.some((part) => part === selectedName)
        );

        if (
          matches &&
          selectedAttributeNames.length === variationNameParts.length
        ) {
          return variation;
        }
      }
    }

    return null;
  };

  useEffect(() => {
    if (districtId) {
      const districtData = districtOptions.filter(
        (district) => district?.division_id === districtId
      );
      setDistrictsData(districtData);
    }
  }, [districtId]);

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
    if (!district || !division)
      return toast.error("Please select a district and division.");

    // Validate phone number if it's coming from react-hook-form
    if (data.customer_phone && !isValidPhoneNumber(data.customer_phone)) {
      return toast.error("Please enter a valid phone number.");
    }

    const sendData = {
      ...data,
      order_status: "pending",
      pending_time: today,
      billing_country: "Bangladesh",
      billing_division: division,
      billing_district: district,
      shipping_location:
        division === "Dhaka"
          ? ` Inside Dhaka ${settingData?.data[0]?.inside_dhaka_shipping_days} Days`
          : `Outside Dhaka ${settingData?.data[0]?.outside_dhaka_shipping_days} Days`,

      order_products: [
        (() => {
          const selectedVar = getSelectedVariation(
            singleProduct,
            selectedVariations
          );
          const variationId = selectedVar?._id || null;
          const variation_name = selectedVar?.variation_name || null;
          const actual_product_price =
            selectedVar?.variation_discount_price ||
            selectedVar?.variation_price ||
            productPrice;

          return {
            order_product_id: singleProduct?._id,
            is_variation: singleProduct?.is_variation,
            variation_id: variationId,
            variation_name: variation_name,
            order_product_price: actual_product_price,
            order_product_quantity: quantity,
          };
        })(),
      ],
      sub_total_amount: total ? total : 0,
      discount_amount: 0,
      shipping_cost: parseInt(shippingCharge) || 0,
      grand_total_amount: grandToal ? grandToal : 0,
    };
    if (userInfo?.data?._id) {
      sendData.customer_id = userInfo?.data?._id;
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

  // if (userGetLoading || settingLoading) return <MiniSpinner />;

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
                setDivision={setDivision}
                setDistrictId={setDistrictId}
                setDistrict={setDistrict}
                setIsOpenDistrict={setIsOpenDistrict}
                isOpenDistrict={isOpenDistrict}
                districtsData={districtsData}
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
