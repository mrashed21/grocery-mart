"use client";
import MiniSpinner from "@/components/Skeleton/MiniSpinner";
import { BASE_URL } from "@/utils/baseURL";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const StoreDetails = ({ refetch, getInitialCurrencyData }) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const handleShippingPost = async (data) => {
    setLoading(true);
    if (getInitialCurrencyData?._id) {
      try {
        const sendData = {
          _id: getInitialCurrencyData?._id,
          facebook: data?.facebook,
          watsapp: data?.watsapp,
        };

        const response = await fetch(`${BASE_URL}/setting`, {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sendData),
        });
        const result = await response.json();
        if (result?.statusCode === 200 && result?.success === true) {
          toast.success(
            result?.message
              ? result?.message
              : "Store Details update successfully",
            {
              autoClose: 1000,
            }
          );
          refetch();
          setLoading(false);
        } else {
          toast.error(result?.message || "Something went wrong", {
            autoClose: 1000,
          });
          setLoading(false);
        }
      } catch (error) {
        toast.error(error?.message, {
          autoClose: 1000,
        });
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleShippingPost)} className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="">
            <label
              htmlFor="facebook"
              className="block text-xs font-medium text-gray-700"
            >
              Facebook
            </label>
            <input
              {...register("facebook")}
              type="url"
              defaultValue={getInitialCurrencyData?.facebook}
              id="facebook"
              placeholder="Enter Your Facebook Link"
              className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
            />
          </div>

          <div className="">
            <label
              htmlFor="watsapp"
              className="block text-xs font-medium text-gray-700"
            >
              WatsApp
            </label>
            <input
              {...register("watsapp")}
              type="url"
              defaultValue={getInitialCurrencyData?.watsapp}
              id="watsapp"
              placeholder="Enter Your WatsApp Link"
              className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
            />
          </div>
        </div>
        <div className="flex gap-6 mt-4 justify-end">
          {loading == true ? (
            <div className="px-10 py-2 flex items-center justify-center  bg-primaryColor text-white rounded">
              <MiniSpinner />
            </div>
          ) : (
            <>
              {getInitialCurrencyData?._id ? (
                <button
                  className="rounded-[8px] py-[10px] px-[18px] bg-[#084C4E] text-white  transform hover:translate-y-[-2px] transition duration-200  text-sm cursor-pointer uppercase"
                  type="submit"
                >
                  Update
                </button>
              ) : (
                <button
                  className="rounded-[8px] py-[10px] px-[18px] bg-[#084C4E] text-white  transform hover:translate-y-[-2px] transition duration-200  text-sm cursor-pointer uppercase"
                  type="submit"
                >
                  Save
                </button>
              )}
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default StoreDetails;
