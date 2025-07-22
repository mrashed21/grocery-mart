"use client";

import Image from "next/image";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import logo from "./../../../public/image/logo.png";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";

const UserAuthModal = ({ setIsUserAuthOpen }) => {
  const [isLoginShow, setIsLoginShow] = useState(true);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  //   useEffect(() => {
  //     document.body.style.overflow = "hidden";
  //     return () => {
  //       document.body.style.overflow = "auto";
  //     };
  //   }, []);

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="relative overflow-hidden bg-white w-[500px] p-5  max-h-[90vh] rounded overflow-y-auto shadow-md">
          {/* Close Button */}
          <button
            onClick={() => setIsUserAuthOpen(false)}
            className="absolute top-5 right-5 text-black cursor-pointer"
          >
            <RxCross1 size={26} />
          </button>

          {/* Logo */}
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center mb-6 w-20 h-20 rounded-full border-2 border-[#084C4E] p-2">
              <Image
                height={400}
                width={400}
                src={logo}
                alt="Logo"
                className="w-16 h-16 rounded-full"
              />
            </div>
          </div>

          {isForgotPasswordOpen ? (
            <ForgotPassword setIsForgotPasswordOpen={setIsForgotPasswordOpen} />
          ) : (
            <>
              {/* Toggle buttons */}
              <div className="flex bg-gray-100 rounded-full p-1 mb-3">
                <button
                  onClick={() => setIsLoginShow(true)}
                  className={`flex-1 font-nunito font-medium py-1 rounded-full transition-all duration-200 cursor-pointer ${
                    isLoginShow
                      ? "bg-[#0d4a42] text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsLoginShow(false)}
                  className={`flex-1 font-nunito font-medium py-1  rounded-full transition-all duration-200 cursor-pointer ${
                    !isLoginShow
                      ? "bg-[#0d4a42] text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Signup
                </button>
              </div>

              {/* Auth Form */}
              <div>
                {isLoginShow ? (
                  <Login
                    setIsLoginShow={setIsLoginShow}
                    setIsForgotPasswordOpen={setIsForgotPasswordOpen}
                  />
                ) : (
                  <SignUp setIsLoginShow={setIsLoginShow} />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UserAuthModal;
