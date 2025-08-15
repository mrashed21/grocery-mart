"use client";
import Contain from "@/components/common/Contain";
import useGetSettingData from "@/lib/getSettingData";
import Link from "next/link";
import { useState } from "react";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const { data: settingsData, isLoading: settingDataLoading } =
    useGetSettingData();
  const settingData = settingsData?.data?.[0];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setEmail("");
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 relative overflow-hidden mt-16 font-manrope">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent)] pointer-events-none"></div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <Contain>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {/* Company Info */}
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <div className="w-40 h-20">
                    <img
                      src={settingData?.logo}
                      alt=""
                      className="w-full h-full"
                    />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4 ">
                    Grocery Mart
                  </h2>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                  {settingData?.address && (
                    <div className="flex items-start gap-3 group">
                      <p className="text-gray-300">
                        {" "}
                        Address : {settingData.address}
                      </p>
                    </div>
                  )}

                  {settingData?.contact && (
                    <div className="flex items-center gap-3 group">
                      <Link
                        href={`tel:${settingData.contact}`}
                        className="text-gray-300 hover:text-white transition-colors duration-200"
                      >
                        Call us at: {settingData.contact}
                      </Link>
                    </div>
                  )}

                  {settingData?.email && (
                    <div className="flex items-center gap-3 group">
                      <Link
                        href={`mailto:${settingData.email}`}
                        className="text-gray-300 hover:text-white transition-colors duration-200"
                      >
                        Email: {settingData.email}
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-6 relative">
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  {[
                    { href: "/about-us", label: "About Us" },
                    { href: "/return-policy", label: "Return Policy" },
                    { href: "/privacy-policy", label: "Privacy Policy" },
                    { href: "/refund-policy", label: "Refund Policy" },
                    {
                      href: "/cancellation-policy",
                      label: "Cancellation Policy",
                    },
                    { href: "/terms-condition", label: "Terms & Conditions" },
                    { href: "/shipping-info", label: "Shipping Info" },
                  ].map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-200 inline-block relative group"
                      >
                        <span className="relative z-10">{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter & Payment */}
              <div className="flex">
                {/* <h3 className="text-xl font-semibold text-white mb-4 relative">
                  Stay Connected
                </h3> */}

                {/* Newsletter Signup */}
                {/* <div className="mb-8">
                  <p className="text-gray-400 mb-4">
                    Subscribe to our newsletter for exclusive offers
                  </p>
                  <form
                    onSubmit={handleNewsletterSubmit}
                    className="flex flex-col gap-3"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2  focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
                      required
                    />
                    <button
                      type="submit"
                      className="px-4 py-3 bg-[#4F7A7B] text-white font-bold rounded-lg"
                    >
                      Subscribe
                    </button>
                  </form>
                </div> */}

                {/* Payment Methods */}
                <div className=" mt-auto">
                  <h4 className="text-lg font-semibold text-white mb-4">
                    Payment Methods
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg hover:bg-white/20 transition-all duration-200 transform hover:scale-105">
                      <img
                        src="https://i.ibb.co/SYyq8Nj/image.png"
                        alt="bKash"
                        className="h-6 object-contain"
                      />
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg hover:bg-white/20 transition-all duration-200 transform hover:scale-105">
                      <img
                        src="https://i.ibb.co/8gLqtYjy/image-1.png"
                        alt="Nagad"
                        className="h-6 object-contain"
                      />
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg hover:bg-white/20 transition-all duration-200 transform hover:scale-105">
                      <img
                        src="https://i.ibb.co/0jC8BymJ/image-2.png"
                        alt="Visa"
                        className="h-6 object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Contain>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700/50 bg-gray-900/50 backdrop-blur-sm">
          <Contain>
            <div className="py-8 px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                {/* Social Media Links */}
                <div className="flex items-center gap-4">
                  <span className="text-gray-400 text-sm">Follow us:</span>
                  <div className="flex gap-3">
                    <Link
                      href={settingData?.facebook || ""}
                      className={`w-10 h-10 bg-gray-700 text-gray-300 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:text-white hover:bg-blue-600 group`}
                    >
                      <FaFacebook className="text-lg" />
                    </Link>

                    <Link
                      href={settingData?.watsapp || ""}
                      className={`w-10 h-10 bg-gray-700 text-gray-300 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:text-white hover:bg-green-500 group`}
                    >
                      <FaWhatsapp className="text-lg" />
                    </Link>
                  </div>
                </div>

                {/* Copyright */}
                <div className="text-center sm:flex sm:justify-between sm:text-left">
                  <Link
                    href={"https://www.classicit.com.bd/"}
                    target="_blank"
                    className="mt-4 text-sm text-white sm:order-first sm:mt-0"
                  >
                    &copy; {new Date().getFullYear()} Classic IT &amp; Sky Mart
                    Ltd
                  </Link>
                </div>
              </div>
            </div>
          </Contain>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
