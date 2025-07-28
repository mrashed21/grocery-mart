"use client";
import MiniSpinner from "@/components/Skeleton/MiniSpinner";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { CiEdit } from "react-icons/ci";
import { RiImageAddFill } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Select from "react-select";
import { toast } from "react-toastify";

const UserAccountDetails = () => {
  //   const {
  //     data: userInfo,
  //     isLoading: userGetLoading,
  //     refetch,
  //   } = useUserInfoQuery();
  const userInfo = false;
  const userGetLoading = false;
  const [isEditMode, setIsEditMode] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  //Image preview....
  const [imagePreview, setImagePreview] = useState(userInfo?.data?.user_image);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("user_image", file);
    }
  };
  const clearImagePreview = () => {
    setImagePreview(null);
    setValue("user_image", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleUserDetails = async (data) => {
    setIsLoading(true);

    let user_image;

    if (data?.user_image) {
      const logoUpload = await ImageUploader(data?.user_image);
      user_image = logoUpload[0];
    }

    const sendData = {
      _id: userInfo?.data?._id,
      user_image: user_image || userInfo?.data?.user_image,
      user_name: data?.user_name || userInfo?.data?.user_name,
      user_phone: data?.user_phone || userInfo?.data?.user_phone,
      user_division: user_division || userInfo?.data?.user_division,
      user_district: user_district || userInfo?.data?.user_district,
      user_address: data?.user_address || userInfo?.data?.user_address,
    };

    // return;

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
      toast.success(
        result?.message ? result?.message : "User update successfully",
        {
          autoClose: 1000,
        }
      );
      setIsLoading(false);
      setIsEditMode(false);
      refetch();
    } else {
      toast.error(result?.message || "Something went wrong", {
        autoClose: 1000,
      });
    }
  };

  const handleCancel = () => {
    setIsEditMode(false);
  };

  return (
    <div className="border border-gray-200 md:mt-6 lg:mt-5  p-2.5">
      <form onSubmit={handleSubmit(handleUserDetails)}>
        {userGetLoading ? (
          <div className="">
            <h2>Loading......</h2>{" "}
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-medium text-lg">Account Details</h2>

              {!isEditMode ? (
                <button
                  type="button "
                  className="flex items-center gap-1.5 border font-medium rounded-sm px-1.5 py-1 text-sm border-[#084C4F] cursor-pointer "
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

            <div className="space-y-4 grid lg:grid-cols-2 gap-3">
              {/* Name */}
              <div>
                <label htmlFor="user_name" className="text-sm text-[#4f4f4f]">
                  Name
                </label>

                <input
                  id="user_name"
                  defaultValue={userInfo?.data?.user_name}
                  disabled={!isEditMode}
                  {...register("user_name")}
                  placeholder="Enter your full name"
                  className={`w-full rounded-md border border-gray-200 px-2 py-2 text-black ${
                    !isEditMode ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                  }`}
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="user_phone" className="text-sm text-[#4f4f4f]">
                  Phone Number
                </label>
                <PhoneInput
                  id="user_phone"
                  disabled
                  value={userInfo?.data?.user_phone}
                  defaultCountry="BD"
                  international
                  countryCallingCodeEditable={false}
                  // onChange={setUserPhone}
                  className={`w-full rounded-md border border-gray-200 px-2 py-2 text-black ${
                    !isEditMode ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                  }`}
                  placeholder="Enter phone number"
                  // error={
                  //   userPhone
                  //     ? !isValidPhoneNumber(userPhone) && "Invalid phone number"
                  //     : "Phone number required"
                  // }
                />
              </div>

              {/* division */}

              <div>
                <label className="text-xs font-medium text-gray-700 flex items-center justify-start gap-1">
                  Zone
                </label>
                <Select
                  id="division"
                  name="division"
                  isDisabled={!isEditMode}
                  className="mt-1"
                  aria-label="Select a division"
                  //   options={divisionOptions}
                  // defaultValue={{
                  //   name: user_division,
                  // }}
                  //   value={divisionOptions?.find(
                  //     (opt) => opt?.name === user_division
                  //   )}
                  //   getOptionLabel={(x) => x?.name}
                  //   getOptionValue={(x) => x?.id}
                  //   onChange={(selectedOption) => {
                  //     setIsOpenDistrict(false);
                  //     setDistrict();
                  //     setDistrictId(selectedOption?.id);
                  //     setDivision(selectedOption?.name);
                  //     setTimeout(() => {
                  //       setIsOpenDistrict(true);
                  //     }, 100);
                  //   }}
                  //   menuPortalTarget={document.body}
                  //   styles={{
                  //     menuPortal: (base) => ({
                  //       ...base,
                  //       zIndex: 999,
                  //     }), // Set a high z-index
                  //   }}
                ></Select>
              </div>

              {/* address */}
              <div>
                <label
                  htmlFor="user_address"
                  className="normal-case text-[#4f4f4f] text-sm"
                >
                  Address
                </label>
                <input
                  className=" w-full rounded-md border-gray-200 bg-white px-2 py-2  text-black ps-4 placeholder:text-white-dark text-xl custom-phone-input border "
                  type="text"
                  defaultValue={userInfo?.data?.user_address}
                  disabled={!isEditMode}
                  id="user_address"
                  {...register("user_address")}
                />
              </div>

              {/* Image Upload */}
              <div className="mt-2 flex items-center justify-center">
                {imagePreview ? (
                  <div className="relative inline-block">
                    <img
                      src={imagePreview}
                      alt="User"
                      className="w-36 h-28   rounded-md border border-gray-200"
                    />
                    {isEditMode && (
                      <button
                        type="button"
                        onClick={clearImagePreview}
                        className="absolute top-0 right-0 bg-white p-1 rounded-full shadow-md hover:bg-red-500 hover:text-white transition-colors"
                        title="Remove Image"
                      >
                        <RxCross1 size={16} />
                      </button>
                    )}
                  </div>
                ) : (
                  isEditMode && (
                    <div>
                      <label
                        htmlFor="user_image"
                        className="flex items-center gap-2 cursor-pointer text-[#5E8B8C] hover:text-[#084C4F] font-medium"
                      >
                        <RiImageAddFill size={20} />
                        Upload Image
                      </label>
                      <input
                        id="user_image"
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default UserAccountDetails;
