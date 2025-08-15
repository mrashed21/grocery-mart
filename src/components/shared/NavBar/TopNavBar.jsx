"use client";
import UserAuthModal from "@/components/Auth/UserAuthModal";
import ProductSearch from "@/components/frontend/Home/ProductSearch/ProductSearch";
import GroceryMartSkeleton from "@/components/Skeleton/GroceryMartSkeleton";
import { useSearch } from "@/context/SearchProvider";
import { useAllProducts } from "@/lib/getAllProducts";
import useGetSettingData from "@/lib/getSettingData";
import { useUserInfoQuery } from "@/redux/feature/auth/authApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoBagHandleOutline } from "react-icons/io5";
import { TbUser } from "react-icons/tb";
import { useSelector } from "react-redux";
import Contain from "../../common/Contain";

const TopNavBar = () => {
  const [isUserAuthOpen, setIsUserAuthOpen] = useState(false);
  const cartProducts = useSelector((state) => state.grocery_mart.products);
  const [cartLength, setCartLength] = useState(cartProducts.length);
  const { searchTerm, setSearchTerm, setSearchResults } = useSearch();
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: userInfo } = useUserInfoQuery();
  const router = useRouter();
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);

  const { data: settingsData, isLoading: settingDataLoading } =
    useGetSettingData();
  const settingData = settingsData?.data?.[0];
  const { data: productData = [], isloading: productLoading } = useAllProducts({
    limit,
    page,
  });
  const handleUserDasboard = () => {
    router.push("/user-profile");
  };

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
    <nav
      className={`transition-all duration-300 pt-3 lg:pt-6 pb-3.5  ${
        isScrolled ? " bg-gray-300 shadow-md" : "bg-[#084C4E0A]"
      }`}
    >
      <Contain>
        <div className="flex items-center justify-between ">
          {/* left section */}
          <div className="flex items-center gap-4 lg:gap-10">
            {/* logo */}
            {settingDataLoading ? (
              <GroceryMartSkeleton />
            ) : (
              <>
                {settingData?.logo && (
                  <Link href={"/"} className="flex items-center shrink-0 gap-1">
                    <img
                      src={settingData?.logo}
                      width={40}
                      height={40}
                      loading="lazy"
                      className="w-5 h-5 lg:h-10 lg:w-10"
                      alt={settingData?.title}
                    />
                    <h2 className="text-[#385C5D] font-abhaya text-[20px] lg:text-2xl">
                      {settingData?.title}
                    </h2>
                  </Link>
                )}
              </>
            )}

            {/* location */}
            {/* <div className="flex flex-col">
              <p className="text-[#084C4E] text-sm hidden lg:flex font-nunito">
                Location
              </p>
              <div className="flex items-center gap-1">
                <UserLocation />
                
              </div>
            </div> */}
          </div>

          {/* right section */}
          <div className="flex items-center gap-1 lg:gap-10">
            {/* search option */}
            <div className="hidden lg:flex z-50">
              <ProductSearch
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setDisplayedProducts={setSearchResults}
                productData={productData?.data}
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

              {!userInfo?.data ? (
                <button type="button" onClick={handleAuthModal}>
                  <TbUser className="text-[#385C5D] text-3xl cursor-pointer" />
                </button>
              ) : (
                <div
                  onClick={handleUserDasboard}
                  className="flex shrink-0 items-center cursor-pointer gap-2 mx-2 md:mr-5 lg:mr-0"
                >
                  {userInfo.data.user_image ? (
                    <img
                      src={userInfo.data.user_image}
                      alt="User"
                      className="w-9 h-9 lg:w-[45px] lg:h-[45px] rounded-full border-2 border-[#084C4F]  "
                    />
                  ) : (
                    <FaUserCircle className="w-[40px] h-[40px] text-[#4e979a]" />
                  )}
                  <div className="hidden xl:block">
                    <p className="text-lg font-semibold">Hello</p>
                    <p className="text-xs font-medium mt-px">
                      {userInfo.data.user_name}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Contain>

      {isUserAuthOpen && (
        <UserAuthModal setIsUserAuthOpen={setIsUserAuthOpen} />
      )}
    </nav>
  );
};

export default TopNavBar;
