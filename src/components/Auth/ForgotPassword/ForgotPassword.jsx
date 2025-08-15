import MiniSpinner from "@/components/Skeleton/MiniSpinner";
import { useForgetPasswordMutation } from "@/redux/feature/auth/authApi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoReturnUpBack } from "react-icons/io5";
import PhoneInput, {
  formatPhoneNumber,
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { toast } from "react-toastify";
import OtpVerifyModal from "./OtpModal";

const ForgotPassword = ({ setIsForgotPasswordOpen }) => {
  const [user_phone, setUser_phone] = useState("");
  const [user_name, setUser_name] = useState("");
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleReset = async (data) => {
    try {
      if (user_phone) {
        const formatPhoneNumberValueCheck = formatPhoneNumber(user_phone);
        const isPossiblePhoneNumberValueCheck =
          isPossiblePhoneNumber(user_phone);
        const isValidPhoneNumberValueCheck = isValidPhoneNumber(user_phone);
        if (formatPhoneNumberValueCheck == false) {
          toast.error("Mobile number not valid !", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return;
        }
        if (isPossiblePhoneNumberValueCheck == false) {
          toast.error("Mobile number not valid !", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return;
        }
        if (isValidPhoneNumberValueCheck == false) {
          toast.error("Mobile number not valid !", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return;
        }
      }
      if (!user_phone) {
        toast.error("Phone is required !", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
      const sendData = {
        user_phone: user_phone,
      };
      const res = await forgetPassword(sendData);
      if (res.data?.statusCode === 200 && res.data?.success === true) {
        toast.success(" OTP Send Successfull", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setUser_name(res?.data?.data?.user_name);
        setIsChangePasswordOpen(true);
        return;
      } else {
        toast.error(res.error.data?.message, {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      console.log("done");
    }
  };

  return (
    <>
      {!isChangePasswordOpen ? (
        <div className="w-full bg-[#084C4E26] p-5 lg:p-10 rounded-md font-nunito relative">
          {/* modal */}
          <button
            onClick={() => setIsForgotPasswordOpen(false)}
            className="absolute -top-1 right-3 text-[#084C4E] rounded-md py-3 cursor-pointer font-nunito font-semibold"
          >
            {" "}
            <span className="flex items-center gap-0.5">
              {" "}
              <IoReturnUpBack size={20} /> Login
            </span>
          </button>
          <div className="w-full  ">
            <h2 className="text-[#3A3A3A] text-2xl lg:mb-5 font-medium">
              Reset Your Password
            </h2>

            {/* login form */}
            <div className="">
              <form onSubmit={handleSubmit(handleReset)} className="space-y-4">
                <div className="mt-2">
                  <label
                    htmlFor="user_phone"
                    className="text-[#3A3A3A] cursor-pointer"
                  >
                    Phone Number
                  </label>
                  <PhoneInput
                    className="mt-2 w-full rounded-md border-gray-200 bg-white px-2 py-2  text-black ps-2 lg:ps-4 placeholder:text-white-dark lg:text-xl custom-phone-input border "
                    placeholder="Enter phone number"
                    id="user_phone"
                    value={user_phone}
                    defaultCountry="BD"
                    international
                    countryCallingCodeEditable={false}
                    onChange={setUser_phone}
                    error={
                      user_phone
                        ? !isValidPhoneNumber(user_phone) &&
                          "Invalid phone number"
                        : "Phone number required"
                    }
                  />
                  {user_phone && !isValidPhoneNumber(user_phone) && (
                    <p className="text-red-500 text-sm mt-1">
                      Invalid phone number
                    </p>
                  )}
                </div>

                {/* login Button */}
                {isLoading === true ? (
                  <button className="uppercase bg-[#6a6a6a] text-white rounded px-10 py-1 cursor-pointer">
                    <MiniSpinner />
                  </button>
                ) : (
                  <div className="flex items-center gap-2 lg:gap-5">
                    <button
                      type="submit"
                      className="uppercase px-2.5 lg:px-5 bg-[#084C4E] text-white rounded-md py-3 cursor-pointer lg:font-[28px] font-nunito font-semibold mt-3"
                    >
                      Send OTP
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* {isChangePasswordOpen && ( */}
          <OtpVerifyModal
            user_phone={user_phone}
            user_name={user_name}
            setIsForgotPasswordOpen={setIsForgotPasswordOpen}
            setIsChangePasswordOpen={setIsChangePasswordOpen}
          
          />
          {/* )} */}
        </>
      )}
    </>
  );
};

export default ForgotPassword;
