"use client";
import MiniSpinner from "@/components/Skeleton/MiniSpinner";
import { useUserInfoQuery } from "@/redux/feature/auth/authApi";
import { BASE_URL } from "@/utils/baseURL";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CiEdit } from "react-icons/ci";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { toast } from "react-toastify";

const UserAccountPassword = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const {
    data: userInfo,
    isLoading: userGetLoading,
    refetch,
  } = useUserInfoQuery();

  const handleCancel = () => {
    setIsEditMode(false);
    reset();
  };

  const handleUserPasswordChange = async (data) => {
    setIsLoading(true);
    if (data?.user_current_password !== data?.user_new_password) {
      toast.error("New Password And Confirm Password Did Not Match");
      return;
    }
    const sendData = {
      _id: userInfo?.data?._id,
      user_name: data?.user_name || userInfo?.data?.user_name,
      user_phone: data?.user_phone || userInfo?.data?.user_phone,
      user_password: data?.user_new_password,
    };

    const response = await fetch(`${BASE_URL}/get_me`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
    });
    const result = await response.json();
    if (result?.statusCode === 200 && result?.success === true) {
      toast.success("Password update successfully", {
        autoClose: 1000,
      });
      setIsLoading(false);
      setIsEditMode(false);
      reset();
    } else {
      toast.error(result?.message || "Something went wrong", {
        autoClose: 1000,
      });
    }
  };
  // empty div for better design
  if (userGetLoading) {
    return <div className=""></div>;
  }
  return (
    <div className="border pt-4 p-2.5 mt-10 border-gray-200">
      <form onSubmit={handleSubmit(handleUserPasswordChange)}>
        <div className="flex items-center justify-between mb-3">
          <h2>Security</h2>
          {!isEditMode ? (
            <button
              type="button"
              className="flex items-center gap-1.5 border font-medium rounded-sm px-1.5 py-1 text-sm border-[#084C4F] cursor-pointer"
              onClick={() => setIsEditMode(true)}
            >
              <CiEdit />
              Edit
            </button>
          ) : (
            <div className="flex gap-1">
              <button
                type="button"
                className="text-gray-600 font-medium px-3 py-1 cursor-pointer"
                onClick={handleCancel}
              >
                Cancel
              </button>

              {isLoading ? (
                <MiniSpinner />
              ) : (
                <button
                  type="submit"
                  className="text-white bg-gradient-to-l from-[#084C4F] to-[#5E8B8C] px-3 py-1 rounded cursor-pointer"
                >
                  Save
                </button>
              )}
            </div>
          )}
        </div>

        <hr className="mb-4 border-t border-gray-200" />

        <div className="space-y-4 grid lg:grid-cols-2 lg:gap-3">
          {/* Current Password */}
          <div>
            <label
              htmlFor="user_current_password"
              className="text-sm text-[#4f4f4f]"
            >
              New Password
            </label>
            <div className="relative">
              <input
                id="user_current_password"
                type={showCurrentPassword ? "text" : "password"}
                disabled={!isEditMode}
                {...register("user_current_password", {
                  required: "Current password is required",
                })}
                className={`mt-2 w-full rounded-md border border-gray-200 px-2 py-2 text-black ${
                  !isEditMode ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                }`}
              />
              {isEditMode && (
                <button
                  type="button"
                  disabled={!isEditMode}
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-5 text-xl"
                >
                  {showCurrentPassword ? (
                    <LuEye className="cursor-pointer text-gray-400" />
                  ) : (
                    <LuEyeOff className="cursor-pointer text-gray-400" />
                  )}
                </button>
              )}
              {errors.user_current_password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.user_current_password.message}
                </p>
              )}
            </div>
          </div>

          {/* New Password */}
          <div>
            <label
              htmlFor="user_new_password"
              className="text-sm text-[#4f4f4f]"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="user_new_password"
                type={showNewPassword ? "text" : "password"}
                disabled={!isEditMode}
                {...register("user_new_password", {
                  required: "New password is required",
                })}
                className={`mt-2 w-full rounded-md border border-gray-200 px-2 py-2 text-black ${
                  !isEditMode ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                }`}
              />
              {isEditMode && (
                <button
                  type="button"
                  disabled={!isEditMode}
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-5 text-xl"
                >
                  {showNewPassword ? (
                    <LuEye className="cursor-pointer text-gray-400" />
                  ) : (
                    <LuEyeOff className="cursor-pointer text-gray-400" />
                  )}
                </button>
              )}
              {errors.user_new_password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.user_new_password.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserAccountPassword;
