"use client";
import MiniSpinner from "@/components/Skeleton/MiniSpinner";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";

const CreateZone = ({ setZoneCreateModal, user, refetch }) => {
  const [loading, setLoading] = useState(false);
  const imageInputRef = useRef(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleDataPost = (data) => {
    console.log(data);
    return;
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-50 p-2">
        <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[650px] p-6 max-h-[100vh] overflow-y-auto scrollbar-thin uppercase">
          <div className="flex items-center justify-between mt-4">
            <h3 className="sm:text-[26px] font-bold" id="modal-title ">
              Create Zone
            </h3>
            <button
              type="button"
              className="btn  p-1 absolute right-3 rounded-full top-3 cursor-pointer transition-all duration-300"
              onClick={() => setZoneCreateModal(false)}
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
                {...register("zone", {
                  required: "zone name is required",
                })}
                type="text"
                placeholder="ZONE NAME"
                className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
              />
              {errors?.zone && (
                <p className="text-red-600">{errors.zone?.message}</p>
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
                  {...register("delivery_charge", {
                    required: "Delivery is required",
                    validate: (value) => {
                      if (value < 1) {
                        return "Delivery charge must be greater than 0";
                      }
                      // else if (value > 100) {
                      //   return 'Serial must be less then 100'
                      // }
                    },
                  })}
                  type="number"
                  onWheel={(e) => e.target.blur()}
                  placeholder="TYPE NUMBER"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
                {errors.delivery_charge && (
                  <p className="text-red-600">
                    {errors.delivery_charge?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-8 mt-4 justify-end">
              {loading == true ? (
                <div className="px-10 py-2 flex items-center justify-center  bg-btnBgColor text-btnTextColor rounded">
                  <MiniSpinner />
                </div>
              ) : (
                <button
                  className="rounded-[8px] py-[10px] px-[18px] bg-[#084C4E] transform hover:translate-y-[-2px] transition duration-200 text-white font-semibold text-sm cursor-pointer uppercase"
                  type="submit"
                >
                  Create Zone
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateZone;
