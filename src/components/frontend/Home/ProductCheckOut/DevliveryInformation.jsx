"use client";
import useGetZone from "@/lib/getZone";
import { useEffect, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Select from "react-select";

const DeliveryInformation = ({
  register,
  userInfo,
  errors,
  setValue,
  setSelectedZone,
  selectedZone,
  setLocalCustomerPhone,
  localCustomerPhone,
}) => {
  const [deliveryInformationOpen, setDeliveryInformationOpen] = useState(true);

  const { data: zoneData = [], isLoading } = useGetZone();

  const handleDeliveryInformationToggle = () => {
    setDeliveryInformationOpen((prev) => !prev);
  };

  useEffect(() => {
    if (zoneData?.data?.length && userInfo?.data?.user_zone_id?._id) {
      const matchedZone = zoneData.data.find(
        (zone) => zone._id === userInfo.data.user_zone_id._id
      );
      if (matchedZone) {
        setSelectedZone(matchedZone);
      }
    }
  }, [zoneData?.data, userInfo?.data?.user_zone_id?._id]);

  return (
    <section className="bg-[#F4F6F880] shadow-md p-4 rounded-lg">
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
        <section className="grid grid-cols-1 gap-4 mt-3 font-nunito">
          <div>
            <label
              htmlFor="user_name"
              className="block text-base font-medium text-[#0000004D]"
            >
              Name
            </label>

            <input
              {...register("user_name", {
                required: "Fill the Name",
              })}
              type="text"
              defaultValue={userInfo?.data?.user_name}
              placeholder="Your Name"
              className="mt-2 w-full border-gray-200 shadow-sm p-2 border-2 rounded-md focus:outline-0 placeholder:text-[#0000004D]"
              id="user_name"
            />
            {errors.user_name && (
              <p className="text-red-600 text-sm ml-2">
                {errors.user_name?.message}
              </p>
            )}
          </div>
          <div className="">
            <label
              htmlFor="user_phone"
              className="block text-base font-medium text-[#0000004D]"
            >
              Phone Number
            </label>

            {userInfo?.data?.user_phone ? (
              <div>
                <input
                  {...register("user_phone", {
                    required: "Phone number is required",
                    validate: (value) =>
                      isValidPhoneNumber(value) || "Invalid phone number",
                  })}
                  type="text"
                  defaultValue={userInfo?.data?.user_phone}
                  placeholder="Your Phone"
                  className="mt-2 w-full !border !border-gray-200 shadow-sm  p-1 "
                  id="user_phone"
                />
                {errors.user_phone && (
                  <p className="text-red-600 text-sm ml-2">
                    {errors.user_phone?.message}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <PhoneInput
                  id="user_phone"
                  value={localCustomerPhone}
                  defaultCountry="BD"
                  international
                  countryCallingCodeEditable={false}
                  countries={["BD"]}
                  onChange={(value) => {
                    const cleanedValue = value?.replace(/\s/g, "") || "";
                    setLocalCustomerPhone(cleanedValue);
                    setValue("user_phone", cleanedValue, {
                      shouldValidate: true,
                    });
                  }}
                  className="custom-phone-input w-full mt-2 !border !border-gray-200 bg-white px-3 py-2 rounded-md  text-black placeholder:text-white-dark"
                />

                {errors.user_phone && (
                  <p className="text-red-600 text-sm ml-2">
                    {errors.user_phone?.message}
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
              id="zone"
              name="zone"
              className="mt-1"
              aria-label="Select a Zone"
              options={zoneData?.data || []}
              value={selectedZone}
              onChange={(selected) => setSelectedZone(selected)}
              // getOptionLabel={(x) => x?.zone_name}
              formatOptionLabel={(option) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <span>{option.zone_name}</span>
                  <span
                    style={{
                      color: "#6b7280",
                      fontWeight: "600",
                      minWidth: "50px",
                      textAlign: "right",
                    }}
                  >
                    ৳{option.zone_delivery_charge}
                  </span>
                </div>
              )}
              getOptionValue={(x) => x?._id}
              // menuPortalTarget={document.body}
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
              htmlFor="shipping_address"
              className="block text-base font-medium text-[#0000004D]"
            >
              Address
            </label>

            <input
              {...register("shipping_address", {
                required: "Fill the address",
              })}
              defaultValue={userInfo?.data?.user_address}
              type="text"
              placeholder="Your Address"
              className="mt-2 w-full border-gray-200 shadow-sm p-2 border-2 rounded-md focus:outline-0 placeholder:text-[#0000004D]"
              id="shipping_address"
            />
            {errors.shipping_address && (
              <p className="text-red-600 text-sm ml-2">
                {errors.shipping_address?.message}
              </p>
            )}
          </div>
        </section>
      )}
    </section>
  );
};

export default DeliveryInformation;
