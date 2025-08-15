"use client";

import MiniSpinner from "@/components/Skeleton/MiniSpinner";
import { BASE_URL } from "@/utils/baseURL";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";

const UpdateZone = ({ setZoneUpdateModal, zoneUpdateData, refetch }) => {
  const [loading, setLoading] = useState(false);

  const imageInputRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // Handle Update Banner
  const handleDataPost = async (data) => {
    const sendData = {
      ...data,
      _id: zoneUpdateData?._id,
    };

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/zone`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });

      const result = await response.json();
      if (result?.statusCode === 200 && result?.success === true) {
        toast.success(result?.message || "Zone updated successfully", {
          autoClose: 1000,
        });
        refetch();
        setLoading(false);
        setZoneUpdateModal(false);
      } else {
        toast.error(result?.message || "Something went wrong", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error(error?.message || "Request failed", {
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-50 p-2">
          <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[650px] p-6 max-h-[100vh] overflow-y-auto scrollbar-thin uppercase">
            <div className="flex items-center justify-between mt-4">
              <h3
                className="sm:text-[26px] font-bold "
                id="modal-title "
              >
                Update Zone
              </h3>
              <button
                type="button"
                className="btn  p-1 absolute right-3 rounded-full top-3 bg-red-500 text-white hover:bg-red-600 cursor-pointer transition-all duration-300"
                onClick={() => setZoneUpdateModal(false)}
              >
                {" "}
                <RxCross1 size={20}></RxCross1>
              </button>
            </div>

            <hr className="mt-2 mb-6 border-t border-gray-200" />

            <form onSubmit={handleSubmit(handleDataPost)} className="">
              <div>
                <label className="block text-xs font-medium ">
                  Delivery Zone <span className="text-red-500">*</span>
                </label>

                <input
                  {...register("zone_name", {
                    required: "zone name is required",
                  })}
                  defaultValue={zoneUpdateData?.zone_name}
                  type="text"
                  placeholder="ZONE NAME"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
                {errors?.zone_name && (
                  <p className="text-red-600">{errors.zone_name?.message}</p>
                )}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium ">
                    Zone Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("zone_status", {
                      required: "Zone Status is required",
                    })}
                    defaultValue={zoneUpdateData?.zone_status}
                    className="mt-2 rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2 w-full"
                  >
                    <option value="active">Active</option>
                    <option value="in-active">In-Active</option>
                  </select>
                  {errors.zone_status && (
                    <p className="text-red-600">{errors.zone_status.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium ">
                    Delivery Charge <span className="text-red-500">*</span>
                  </label>

                  <input
                    {...register("zone_delivery_charge", {
                      required: "Delivery is required",
                      validate: (value) => {
                        if (value < 1) {
                          return "Delivery charge must be greater than 0";
                        }
                      },
                    })}
                    defaultValue={zoneUpdateData?.zone_delivery_charge}
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    placeholder="TYPE NUMBER"
                    className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                  />
                  {errors.zone_delivery_charge && (
                    <p className="text-red-600">
                      {errors.zone_delivery_charge?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-8 mt-4 justify-end">
                {loading == true ? (
                  <div className="px-10 py-2 flex items-center justify-center  rounded">
                    <MiniSpinner />
                  </div>
                ) : (
                  <button
                    className="rounded-[8px] py-[10px] px-[18px] bg-[#084C4E] transform hover:translate-y-[-2px] transition duration-200 text-white font-semibold text-sm cursor-pointer uppercase"
                    type="submit"
                  >
                    Update Zone
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateZone;
