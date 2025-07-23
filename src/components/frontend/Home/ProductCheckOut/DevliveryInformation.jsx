"use client";
import { useEffect, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Select from "react-select";

const DeliveryInformation = ({ register, userInfo, errors, setValue }) => {
  const [deliveryInformationOpen, setDeliveryInformationOpen] = useState(true);
  const [localCustomerPhone, setLocalCustomerPhone] = useState("");

  useEffect(() => {
    if (userInfo?.data?.user_phone) {
      setLocalCustomerPhone(userInfo.data.user_phone);
    }
  }, [userInfo]);

  const handleDeliveryInformationToggle = () => {
    setDeliveryInformationOpen((prev) => !prev);
  };

  return (
    <div className="bg-[#F4F6F880] shadow-md p-4 rounded-lg">
      <div
        onClick={handleDeliveryInformationToggle}
        className="flex items-center justify-between cursor-pointer border-b-2 pb-2 border-gray-200"
      >
        <p className="text-[20px] text-black xl:text-xl ">
          Delivery Information
        </p>
        <p className=" cursor-pointer text-base xl:text-xl">
          {deliveryInformationOpen ? <BsChevronUp /> : <BsChevronDown />}
        </p>
      </div>
      {deliveryInformationOpen && (
        <div className="grid grid-cols-1 gap-4 mt-3 font-nunito">
          <div>
            <label
              htmlFor="customer_name"
              className="block text-base font-medium text-[#0000004D]"
            >
              Name
            </label>

            <input
              {...register("customer_name", {
                required: "Fill the Name",
              })}
              type="text"
              defaultValue={userInfo?.data?.user_name}
              placeholder="Your Name"
              className="mt-2 w-full border-gray-200 shadow-sm p-2 border-2 rounded-md focus:outline-0 placeholder:text-[#0000004D]"
              id="customer_name"
            />
            {errors.customer_name && (
              <p className="text-red-600 text-sm ml-2">
                {errors.customer_name?.message}
              </p>
            )}
          </div>
          <div className="">
            <label
              htmlFor="customer_phone"
              className="block text-base font-medium text-[#0000004D]"
            >
              Phone Number
            </label>

            {userInfo?.data?.user_phone ? (
              <div>
                <input
                  {...register("customer_phone", {
                    required: "Phone number is required",
                    validate: (value) =>
                      isValidPhoneNumber(value) || "Invalid phone number",
                  })}
                  type="text"
                  defaultValue={userInfo?.data?.user_phone}
                  placeholder="Your Phone"
                  className="mt-2 w-full !border !border-gray-200 shadow-sm  p-1 "
                  id="customer_phone"
                />
                {errors.customer_phone && (
                  <p className="text-red-600 text-sm ml-2">
                    {errors.customer_phone?.message}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <PhoneInput
                  id="customer_phone"
                  value={localCustomerPhone}
                  defaultCountry="BD"
                  international
                  countryCallingCodeEditable={false}
                  countries={["BD"]}
                  onChange={(value) => {
                    const cleanedValue = value?.replace(/\s/g, "") || "";
                    setLocalCustomerPhone(cleanedValue);
                    setValue("customer_phone", cleanedValue, {
                      shouldValidate: true,
                    });
                  }}
                  className="custom-phone-input w-full mt-2 !border !border-gray-200 bg-white px-3 py-2 rounded-md  text-black placeholder:text-white-dark"
                />

                {errors.customer_phone && (
                  <p className="text-red-600 text-sm ml-2">
                    {errors.customer_phone?.message}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Zone */}
          <div>
            <label
              htmlFor="zone"
              className="block text-base font-medium text-[#0000004D]"
            >
              Zone
            </label>
            <Select
              // defaultValue={
              //   userInfo?.data?.user_division
              //     ? divisionOptions.find(
              //         (opt) => opt.name === userInfo.data.user_division
              //       )
              //     : null
              // }
              // options={divisionOptions}
              // getOptionLabel={(x) => x?.name}
              // getOptionValue={(x) => x?.id}
              // onChange={(selectedOption) => {
              //   setIsOpenDistrict(false);
              //   setDistrict("");
              //   setDistrictId(selectedOption?.id);
              //   setDivision(selectedOption?.name);
              //   setTimeout(() => {
              //     setIsOpenDistrict(true);
              //   }, 100);
              // }}

              id="zone"
              name="zone"
              className="mt-1"
              aria-label="Select a Zone"
              menuPortalTarget={document.body}
              styles={{
                control: (base, state) => ({
                  ...base,
                  borderColor: state.isFocused ? "#e5e7eb" : base.borderColor,
                  boxShadow: "none",
                  padding: "2px",
                  borderRadius: "6px",
                  "&:hover": {
                    borderColor: "#e5e7eb",
                  },
                  outline: "none !important",
                }),
                input: (base) => ({
                  ...base,
                  outline: "none !important",
                  boxShadow: "none !important",
                }),

                indicatorSeparator: (base) => ({
                  ...base,
                  display: "none",
                }),

                dropdownIndicator: (base, state) => ({
                  ...base,
                  outline: "none !important",
                  boxShadow: "none !important",
                }),

                option: (base, state) => ({
                  ...base,
                  outline: "none !important",
                  boxShadow: "none !important",
                  backgroundColor: state.isFocused
                    ? "#f0f0f0"
                    : state.isSelected
                    ? "#0d4a42"
                    : null,
                  color: state.isSelected ? "white" : "inherit",
                  "&:active": {
                    backgroundColor: "#0d4a42",
                  },
                }),
                menuPortal: (base) => ({
                  ...base,
                  zIndex: 999,
                }),
              }}
            ></Select>
          </div>

          <div className="">
            <label
              htmlFor="billing_address"
              className="block text-base font-medium text-[#0000004D]"
            >
              Address
            </label>

            <input
              {...register("billing_address", {
                required: "Fill the address",
              })}
              defaultValue={userInfo?.data?.user_address}
              type="text"
              placeholder="Your Address"
              className="mt-2 w-full border-gray-200 shadow-sm p-2 border-2 rounded-md focus:outline-0 placeholder:text-[#0000004D]"
              id="billing_address"
            />
            {errors.billing_address && (
              <p className="text-red-600 text-sm ml-2">
                {errors.billing_address?.message}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryInformation;
