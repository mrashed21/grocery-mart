import Image from "next/image";
import { CiHeart, CiLocationOn } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { IoBagHandleOutline } from "react-icons/io5";
import { TbUser } from "react-icons/tb";
import Contain from "../common/Contain";
import logo from "./../../../public/image/logo.png";
const TopNavBar = () => {
  return (
    <Contain>
      <div className="flex items-center justify-between  ]">
        {/* right section */}
        <div className="flex items-center gap-10">
          {/* logo */}
          <div className="flex items-center gap-1">
            <Image src={logo} width={40} height={40}></Image>
            <h2 className="text-[#385C5D] font-abhaya text-2xl">
              Grocery Mart
            </h2>
          </div>
          {/* location */}
          <div className="">
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
        <div className="flex items-center gap-10">
          {/* search option */}
          <div className="relative hidden md:flex w-96">
            <input
              type="text"
              placeholder="Search for products"
              className="outline-none  bg-white border border-[#0000001A] text-[#0000004D] py-3 px-[18px] rounded-[10px]  sm:text-sm w-full pl-3"
              // value={searchValue}
              // onChange={(e) => setSearchValue(e.target.value)}
              // onFocus={() => setShowResults(true)}
            />
            <span className="absolute inset-y-0 end-0 grid w-10 place-content-center  ">
              <button
                type="button"
                // onClick={handleSearchClick}
                className="bg-[#5E8B8C] text-white p-[13px] rounded-[10px] cursor-pointer"
              >
                <FiSearch className="text-lg text-white" />
              </button>
            </span>
          </div>
          {/* wishlist */}
          <div className="flex items-center gap-2">
            <button>
              <CiHeart className="text-[#385C5D] text-3xl" />
            </button>
            <button>
              <IoBagHandleOutline className="text-[#385C5D] text-3xl" />
            </button>
            <button>
              <TbUser className="text-[#385C5D] text-3xl" />
            </button>
          </div>
        </div>
      </div>
    </Contain>
  );
};

export default TopNavBar;
