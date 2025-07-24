"use client";
import UserAuthModal from "@/components/Auth/UserAuthModal";
import ProductSearch from "@/components/frontend/Home/ProductSearch/ProductSearch";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react"; // Import useState
import { CiLocationOn } from "react-icons/ci";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import { IoBagHandleOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { TbUser } from "react-icons/tb";
import { useSelector } from "react-redux";
import Contain from "../../common/Contain";
import logo from "./../../../../public/image/logo.png";
const TopNavBar = () => {
  const [isUserAuthOpen, setIsUserAuthOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartProducts = useSelector((state) => state.grocery_mart.products);
  const [cartLength, setCartLength] = useState(cartProducts.length);

  const handleAuthModal = () => {
    setIsUserAuthOpen(true);
    console.log(isUserAuthOpen);
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const updateWishlistAndCart = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("grocery_mart")) || {};
        setCartLength(cart?.products?.length || 0);
      } catch (error) {
        console.error("Error reading localStorage", error);
      }
    };

    updateWishlistAndCart();

    window.addEventListener("localStorageUpdated", updateWishlistAndCart);
    window.addEventListener("storage", updateWishlistAndCart);

    return () => {
      window.removeEventListener("localStorageUpdated", updateWishlistAndCart);
      window.removeEventListener("storage", updateWishlistAndCart);
    };
  }, []);

  return (
    <div className="pt-3 lg:pt-6 pb-3.5  z-90 bg-[#084C4E0A] ">
      <Contain>
        <div className="flex items-center justify-between ">
          {/* left section */}
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

          {/* right section */}
          <div className="flex items-center gap-1 lg:gap-10">
            {/* search option */}
            <div className="hidden lg:flex z-50">
              <ProductSearch />
            </div>

            {/* Wishlist, Bag, User icons for desktop */}
            <div className="flex items-center gap-3">
              {/* <button>
              <CiHeart className="text-[#385C5D] text-3xl" />
            </button> */}
              <Link href={"/checkout"} className="relative">
                <IoBagHandleOutline className="text-[#385C5D] text-3xl" />

                <span className="text-xs bg-[#5E8B8C] text-white rounded-full w-5 h-5 flex items-center justify-center absolute -bottom-2 -right-2">
                  {cartLength}
                </span>
              </Link>
              <button onClick={handleAuthModal}>
                <TbUser className="text-[#385C5D] text-3xl cursor-pointer" />
              </button>
            </div>
          </div>
        </div>

       
      </Contain>

      {isUserAuthOpen && (
        <UserAuthModal setIsUserAuthOpen={setIsUserAuthOpen} />
      )}
    </div>
  );
};

export default TopNavBar;
