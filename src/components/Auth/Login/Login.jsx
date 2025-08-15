import MiniSpinner from "@/components/Skeleton/MiniSpinner";
import {
  useUserInfoQuery,
  useUserLoginMutation,
} from "@/redux/feature/auth/authApi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuEye, LuEyeOff } from "react-icons/lu";
import PhoneInput, {
  formatPhoneNumber,
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { toast } from "react-toastify";

const Login = ({
  setIsLoginShow,
  setIsForgotPasswordOpen,
  setIsUserAuthOpen,
}) => {
  const [user_phone, setUser_phone] = useState();
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userLogin] = useUserLoginMutation();
  const { data: userInfo, refetch: refetchUserInfo } = useUserInfoQuery();

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset,
  } = useForm();

  const handleLogin = async (data) => {
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
        user_password: data?.user_password,
      };

      const res = await userLogin(sendData);

      if (res.data?.statusCode === 200 && res.data?.success === true) {
        if (res.data?.data?.need_password_set == true) {
          // reset();
          // setUser_name(res.data?.data?.user_name)
          // setUser_phone(res.data?.data?.user_phone)
          // setIsChangeGuestOrderUserPasswordOpen(true)
          toast.error("Please Registration With The Same Number !", {
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
        refetchUserInfo();
        toast.success("Login Successfull", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        reset();
        setIsUserAuthOpen(false);
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
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-[#084C4E26] p-5  rounded-md font-nunito">
      <h2 className="text-[#3A3A3A] text-2xl font-medium">login</h2>

      {/* login form */}
      <div className="">
        <form
          onSubmit={handleLoginSubmit(handleLogin)}
          className="lg:space-y-1"
        >
          {/* phone */}
          <div className="">
            <label
              htmlFor="user_phone"
              className="text-[#3A3A3A] cursor-pointer"
            >
              Phone Number
            </label>
            <PhoneInput
              className=" w-full rounded-md border-gray-200 bg-white px-2 py-1 text-black ps-2 placeholder:text-white-dark lg:text-lg custom-phone-input border "
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
          {/* password */}
          <div className="">
            <label
              htmlFor="user_password"
              className="text-[#3A3A3A] cursor-pointer"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="w-full rounded-md border-gray-200 bg-white px-2 py-1 text-black ps-2 placeholder:text-white-dark focus:outline-none custom-phone-input border"
                id="user_password"
                type={showLoginPassword ? "text" : "password"}
                placeholder="Enter your password"
                name="user_password"
                {...loginRegister("user_password", {
                  required: "Password is required",
                })}
              />
              <button
                type="button"
                onClick={() => setShowLoginPassword(!showLoginPassword)}
                className="absolute right-3 top-1.5 lg:text-xl cursor-pointer"
              >
                {showLoginPassword ? (
                  <LuEye className="cursor-pointer text-[#C7C7C7]" />
                ) : (
                  <LuEyeOff className="cursor-pointer text-[#C7C7C7]" />
                )}
              </button>
              {loginErrors.user_password && (
                <p className="text-red-500 text-sm mt-2 normal-case">
                  {loginErrors.user_password.message}
                </p>
              )}
            </div>
          </div>

          {/* fotgot password */}
          <button
            onClick={(e) => {
              setIsForgotPasswordOpen(true);
              // setIsUserAuthOpen(false);
              e.stopPropagation();
              e.preventDefault();
            }}
            className=" my-1.5 text-[#084C4E] font-bold cursor-pointer underline"
          >
            Forgot Password
          </button>

          {/* login Button */}
          {isLoading === true ? (
            <button className="uppercase bg-[#6a6a6a] text-white rounded px-10 py-1 cursor-pointer">
              <MiniSpinner />
            </button>
          ) : (
            <button
              type="submit"
              className="uppercase w-full bg-[#084C4E] text-white rounded-md py-1.5 cursor-pointer font-nunito font-semibold"
            >
              login
            </button>
          )}
        </form>
        {/* forgot password */}
      </div>
      <div className="">
        <p className="text-[#2222224D] text-center font-semibold mt-3 ">
          Already have an account?{" "}
          <button
            onClick={() => setIsLoginShow(false)}
            className="text-[#084C4E] cursor-pointer"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
