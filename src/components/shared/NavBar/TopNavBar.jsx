"use client";
import UserAuthModal from "@/components/Auth/UserAuthModal";
import ProductSearch from "@/components/frontend/Home/ProductSearch/ProductSearch";
import { useSearch } from "@/context/SearchProvider";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoBagHandleOutline } from "react-icons/io5";
import { TbUser } from "react-icons/tb";
import { useSelector } from "react-redux";
import Contain from "../../common/Contain";
import logo from "./../../../../public/image/logo.png";
import UserLocation from "./UserLocation";

const TopNavBar = () => {

  const [isUserAuthOpen, setIsUserAuthOpen] = useState(false);
  const cartProducts = useSelector((state) => state.grocery_mart.products);
  const [cartLength, setCartLength] = useState(cartProducts.length);
  const { searchTerm, setSearchTerm, setSearchResults } = useSearch();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAuthModal = () => {
    setIsUserAuthOpen(true);
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
    <div
      className={`transition-all duration-300 pt-3 lg:pt-6 pb-3.5  ${
        isScrolled ? " bg-gray-300 shadow-md" : "bg-[#084C4E0A]"
      }`}
    >
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
            <div className="flex flex-col">
              <p className="text-[#084C4E] text-sm hidden lg:flex font-nunito">Location</p>
              <div className="flex items-center gap-1">
                <UserLocation />
                {/* <span>
                  <CiLocationOn className="text-[#5E8B8C]" />
                </span>
                <p className="text-sm text-[#2C2C2C] font-nunito font-medium">
                  Road-3, Uttara, Dhaka
                </p>
                <span>
                  <IoIosArrowDown className="text-[#5E8B8C]" />
                </span> */}
              </div>
            </div>
          </div>

          {/* right section */}
          <div className="flex items-center gap-1 lg:gap-10">
            {/* search option */}
            <div className="hidden lg:flex z-50">
              <ProductSearch
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setDisplayedProducts={setSearchResults}
              />
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
