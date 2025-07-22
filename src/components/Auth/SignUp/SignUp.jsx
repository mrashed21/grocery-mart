import MiniSpinner from "@/components/Skeleton/MiniSpinner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuEye, LuEyeOff } from "react-icons/lu";
import PhoneInput, {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Select from "react-select";

const SignUp = ({ setIsLoginShow }) => {
  const [user_phone, setUser_phone] = useState("");
  const [showSignPassword, setShowSignPassword] = useState(false);
  //   const [userRegistration, { isLoading }] = useUserRegistrationMutation();
  const userRegistration = false;
  const isLoading = false;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleRegister = async (data) => {
    try {
      if (!user_phone) {
        toast.error("Phone is required!", { position: "top-center" });
        return;
      }
      if (
        !isValidPhoneNumber(user_phone) ||
        !isPossiblePhoneNumber(user_phone)
      ) {
        toast.error("Invalid phone number!", { position: "top-center" });
        return;
      }

      const sendData = {
        user_name: data?.user_name,
        user_phone,
        user_password: data?.user_password,
      };

      const res = await userRegistration(sendData);

      if (res?.data?.statusCode === 200 && res?.data?.success === true) {
        reset();
        setUser_phone("");
        toast.success("Register successfully. Now please login.", {
          position: "top-center",
        });
      } else {
        toast.error(res?.error?.data?.message || "Registration failed.");
        setUser_phone("");
        reset();
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="w-full bg-[#084C4E26] p-5  lg:py-4 rounded-md font-nunito">
      <h2 className="text-[#3A3A3A] text-2xl lg:mb-2 font-medium">
        Create An Account
      </h2>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-2"
        autoComplete="off"
      >
        {/* Name Field */}
        <label htmlFor="user_name" className=" text-[#3A3A3A] cursor-pointer">
          Name
        </label>
        <input
          id="user_name"
          type="text"
          placeholder="Enter your name"
          {...register("user_name", { required: "Name is required" })}
          className=" w-full rounded-md border border-gray-200 bg-white px-2 py-1 text-black focus:outline-0"
          name="user_name"
          autoComplete="new-username"
        />
        {errors.user_name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.user_name.message}
          </p>
        )}

        {/* Phone Field */}
        <div className="">
          <label htmlFor="user_phone" className="text-[#3A3A3A] cursor-pointer">
            Phone Number
          </label>
          <PhoneInput
            className="w-full rounded-md border border-gray-200 bg-white px-2 py-1 text-black focus:outline-0 "
            placeholder="Enter phone number"
            id="user_phone"
            value={user_phone}
            defaultCountry="BD"
            international
            countryCallingCodeEditable={false}
            onChange={setUser_phone}
            error={
              user_phone
                ? !isValidPhoneNumber(user_phone) && "Invalid phone number"
                : "Phone number required"
            }
          />
          {user_phone && !isValidPhoneNumber(user_phone) && (
            <p className="text-red-500 text-sm mt-1">Invalid phone number</p>
          )}
        </div>

        {/* Password Field */}
        <label
          htmlFor="user_password"
          className="text-[#3A3A3A] cursor-pointer"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="user_password"
            type={showSignPassword ? "text" : "password"}
            placeholder="Enter your password"
            {...register("user_password", {
              required: "Password is required",
            })}
            className=" w-full rounded-md border border-gray-200 bg-white px-2 py-1 text-black focus:outline-0"
            name="user_password"
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowSignPassword(!showSignPassword)}
            className="absolute right-3 top-3 text-xl text-[#C7C7C7] cursor-pointer"
          >
            {showSignPassword ? <LuEye /> : <LuEyeOff />}
          </button>
        </div>
        {errors.user_password && (
          <p className="text-red-500 text-sm mt-1">
            {errors.user_password.message}
          </p>
        )}

        {/* Zone */}

        <div>
          <label htmlFor="zone" className="text-[#3A3A3A] cursor-pointer">
            Area
          </label>
          <Select
            id="zone"
            name="zone"
            aria-label="Select a Zone"
            menuPortalTarget={document.body}
            styles={{
              control: (base, state) => ({
                ...base,
                borderColor: state.isFocused ? "#e5e7eb" : base.borderColor,
                boxShadow: "none",
                padding: "2px",
                padding: "0px",
                borderRadius: "6px",
                "&:hover": {
                  borderColor: "#e5e7eb",
                },
                outline: "none !important",
              }),
              input: (base) => ({
                ...base,
                padding: "0px",
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
          />
        </div>
        {/* Submit Button */}
        {isLoading === true ? (
          <button className="uppercase bg-[#084C4E] text-white rounded px-10 py-1 cursor-pointer">
            <MiniSpinner />
          </button>
        ) : (
          <button
            type="submit"
            className="uppercase w-full bg-[#084C4E] text-white rounded-md py-1 cursor-pointer  font-nunito font-semibold"
          >
            Create
          </button>
        )}
      </form>

      <div className="font-nunito mt-5 text-center">
        <p className="text-[#2222224D]">
          By signing in, you agree to our{" "}
          <span className="text-[#084C4E]">Terms & Conditions</span> and{" "}
          <span className="text-[#084C4E]">Privacy Policy</span>
        </p>
        <p className="text-[#2222224D] font-semibold mt-3 ">
          Already have an account?{" "}
          <button
            onClick={() => setIsLoginShow(true)}
            className="text-[#084C4E] cursor-pointer"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
