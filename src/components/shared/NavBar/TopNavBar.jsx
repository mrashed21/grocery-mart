"use client";
import Image from "next/image";
import { useState } from "react"; // Import useState
import { CiHeart, CiLocationOn } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import { IoBagHandleOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { TbUser } from "react-icons/tb";
import Contain from "../../common/Contain";
import logo from "./../../../../public/image/logo.png";
import Link from "next/link";
const TopNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Contain>
      <div className="flex items-center justify-between">
        {/* right section */}
        <div className="flex items-center gap-4 lg:gap-10">
          {/* logo */}
          <Link href={"/"} className="flex items-center shrink-0 gap-1">
            <Image
              src={logo}
              width={40}
              height={40}
              className="w-5 h-5 lg:h-10 lg:w-10"
              alt="Grocery Mart Logo"
            ></Image>
            <h2 className="text-[#385C5D] font-abhaya text-[20px] lg:text-2xl">
              Grocery Mart
            </h2>
          </Link>
          {/* location */}
          <div className="hidden lg:flex flex-col">
            <p className="text-[#084C4E] text-sm font-nunito">Location</p>
            <div className="flex items-center gap-1">
              <span>
                <CiLocationOn className="text-[#5E8B8C]" />
              </span>{" "}
              <p className="text-sm text-[#2C2C2C] font-nunito font-medium">
                Road-3, Uttara, Dhaka
              </p>{" "}
              <span>
                <IoIosArrowDown className="text-[#5E8B8C]" />
              </span>{" "}
            </div>
          </div>
        </div>
        {/* left section */}
        <div className="flex items-center gap-1 lg:gap-10">
          {/* search option */}
          <div className="relative flex-grow w-[110px] lg:w-96">
            <input
              type="text"
              placeholder="Search..."
              className="outline-none bg-white border border-[#0000001A] text-[#0000004D] py-2 px-3 lg:py-3 lg:px-[18px] rounded-[5px] lg:rounded-[10px] text-sm w-full"
            />
            <span className="absolute inset-y-0 end-0 grid w-8 h-full rounded-r-[5px] lg:w-12 place-content-center">
              <button
                type="button"
                className="bg-[#5E8B8C] text-white p-1 lg:p-[13px] rounded-[5px] lg:rounded-[10px] cursor-pointer"
              >
                <FiSearch className="text-base lg:text-lg text-white" />
              </button>
            </span>
          </div>

          {/* Hamburger menu icon for mobile */}
          <div className="lg:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              <HiOutlineBars3BottomRight className="text-3xl text-[#385C5D]" />
            </button>
          </div>

          {/* Wishlist, Bag, User icons for desktop */}
          <div className="hidden lg:flex items-center gap-3">
            {/* <button>
              <CiHeart className="text-[#385C5D] text-3xl" />
            </button> */}
            <button>
              <IoBagHandleOutline className="text-[#385C5D] text-3xl" />
            </button>
            <button>
              <TbUser className="text-[#385C5D] text-3xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay and Content */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transform transition-all duration-300 ease-in-out
          ${isMenuOpen ? " bg-opacity-50 visible" : "bg-opacity-0 invisible"}`}
        onClick={toggleMenu}
      >
        <div
          className={`fixed right-0 top-0 h-screen w-64 bg-white shadow-lg p-5
            transform transition-transform duration-300 ease-in-out
            ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <RxCross1 className="text-xl" />{" "}
            {/* Use RxCross1 for the close button */}
          </button>

          {/* Mobile menu items */}
          <div className="mt-10 flex flex-col space-y-4">
            <div className="flex items-center gap-2 text-[#2C2C2C] font-nunito font-medium">
              <span>
                <CiLocationOn className="text-[#5E8B8C] text-xl" />
              </span>
              <p>Road-3, Uttara, Dhaka</p>
              <span>
                <IoIosArrowDown className="text-[#5E8B8C] text-sm" />
              </span>
            </div>
            {/* <button className="flex items-center gap-2 text-[#385C5D] text-lg hover:text-[#5E8B8C]">
              <CiHeart className="text-2xl" /> Wishlist
            </button> */}
            <button className="flex items-center gap-2 text-[#385C5D] text-lg hover:text-[#5E8B8C]">
              <IoBagHandleOutline className="text-2xl" /> My Bag
            </button>
            <button className="flex items-center gap-2 text-[#385C5D] text-lg hover:text-[#5E8B8C]">
              <TbUser className="text-2xl" /> Account
            </button>
          </div>
        </div>
      </div>
    </Contain>
  );
};

export default TopNavBar;
