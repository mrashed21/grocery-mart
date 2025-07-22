"use client";
import MiniSpinner from "@/components/Skeleton/MiniSpinner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CiLock } from "react-icons/ci";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";

const OtpVerifyModal = ({
  user_phone,
  user_name,
  setIsChangePasswordOpen,
  setIsForgotPasswordOpen,
  setIsUserLoginOpen,
}) => {
  const [login_credentials, setLogin_credentials] = useState(user_phone);
  //   const [user_name, setUser_name] = useState("");
  const [otp_system, setOtp_system] = useState("");
  const [timerCount, setTimer] = useState(15);
  const [OTPinput, setOTPinput] = useState(["", "", "", ""]);
  const [disable, setDisable] = useState(true);
  const [isPasswordShow, setPasswordShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const router = useRouter();

  //   const [verify, { isLoading }] = useChangePasswordMutation();
  const verify = false;
  //   const [resendOtp] = useResendOtpMutation();
  const resendOtp = false;

  const handleUpdatePassword = async (data) => {
    try {
      const otp = OTPinput.join("");
      if (!otp) {
        toast.error("Must provide OTP!", {
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
        user_phone: login_credentials,
        user_otp: otp,
        user_password: data?.user_password,
      };
      const res = await verify(sendData);
      if (res?.data?.success) {
        toast.success(`${res?.data?.message}, Now Please Login`, {
          autoClose: 1000,
        });
        setIsChangePasswordOpen(false);
        setIsForgotPasswordOpen(false);
        setIsUserLoginOpen(true);
      } else if (res?.error?.status === 400) {
        toast.error(res?.error?.data?.message);
      }
    } catch (error) {
      console.error("OTP verification error", error);
      toast.error("An error occurred during verification");
    }
  };

  const handleResend = async () => {
    try {
      if (disable) return;
      if (!login_credentials) {
        toast.error("Something went wrong!", {
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
      const data = {
        user_phone: login_credentials,
        user_name: user_name,
      };
      const res = await resendOtp(data);
      if (res.data?.statusCode === 200 && res.data?.success === true) {
        setDisable(true);
        toast.info(res?.data?.message);
        setTimer(15);
      } else {
        toast.error(res.error.data?.message, {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Resend OTP error", error);
      toast.error("Failed to resend OTP");
    }
  };

  const handleInputChange = (index, value) => {
    const newOTPinput = [...OTPinput];
    newOTPinput[index] = value;
    setOTPinput(newOTPinput);

    // Automatically move to the next input field
    if (index < newOTPinput.length - 1 && value !== "") {
      document.getElementById(`otpInput-${index + 1}`).focus();
    }
  };

  const handleInputKeyDown = (index, e) => {
    // Move to the previous input field on backspace
    if (e.key === "Backspace" && index > 0 && OTPinput[index] === "") {
      document.getElementById(`otpInput-${index - 1}`).focus();
    }
  };

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [disable]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-full sm:w-[700px] max-h-[100vh] overflow-y-auto scrollbar-thin uppercase">
        <div className="bg-[#e4e0e1]">
          <p
            className="sm:text-[20px] text-center py-4 font-bold"
            id="modal-title"
          >
            Change Your Password
          </p>
          <button
            type="button"
            className="btn text-white  p-1 absolute right-2 rounded-full top-2 bg-black border-2 border-white cursor-pointer transition-all duration-300"
            onClick={() => setIsChangePasswordOpen(false)}
          >
            {" "}
            <RxCross1 size={20}></RxCross1>
          </button>
        </div>

        <div className="flex justify-center items-center bg-gray-50">
          <div className="px-6 pt-5 pb-9  rounded-lg">
            <div className="mx-auto flex flex-col space-y-4">
              <div className="flex flex-col items-center justify-center text-center">
                <p className="text-gray-600">
                  We have sent a code to {user_phone}
                </p>
              </div>

              <form onSubmit={handleSubmit(handleUpdatePassword)}>
                <div className="flex flex-col space-y-5">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div key={index} className="w-12 h-12">
                        <input
                          maxLength="1"
                          id={`otpInput-${index}`}
                          className="w-full h-full flex flex-col items-center justify-center text-center  outline-none rounded-lg border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-2 ring-blue-500"
                          type="text"
                          onChange={(e) =>
                            handleInputChange(index, e.target.value)
                          }
                          onKeyDown={(e) => handleInputKeyDown(index, e)}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="Password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="Password"
                        name="user_password"
                        type={isPasswordShow ? "text" : "password"}
                        placeholder="Enter Password"
                        className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 outline-none ps-10 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                        {...register("user_password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        })}
                      />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <CiLock size={18} />
                      </span>
                      <button
                        type="button"
                        onClick={() => setPasswordShow(!isPasswordShow)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {isPasswordShow ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors.user_password && (
                      <p className="text-xs text-red-500">
                        {errors.user_password.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-lg  font-medium transition duration-200 flex items-center justify-center cursor-pointer border"
                      disabled={isLoading}
                    >
                      {isLoading ? <MiniSpinner /> : "Change Password"}
                    </button>
                  </div>
                </div>
              </form>

              <div className="flex flex-col space-y-5">
                <div className="flex flex-col md:flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                  <p>Did not receive code?</p>
                  <button
                    className={`${
                      disable
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-blue-600 hover:underline cursor-pointer"
                    }`}
                    onClick={handleResend}
                    disabled={disable}
                  >
                    {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerifyModal;
