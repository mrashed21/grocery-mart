import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import logo from "./../../../public/image/logo.png";
const TopNavBar = () => {
  return (
    <div className="flex items-center justify-between mt-6">
      {/* logo */}
      <div className="flex items-center gap-1">
        <Image src={logo} width={40} height={40}></Image>
        <h2 className="text-[#385C5D] font-abhaya text-2xl">Grocery Mart</h2>
      </div>
      {/* location */}
      <div className="">
        <p className="text-[#084C4E] text-sm font-nunito">Location</p>
        <div className="flex items-center gap-1">
          <span>
            <CiLocationOn className="text-[#5E8B8C]" />
          </span>{" "}
          <p className="text-sm text-[#2C2C2C] font-nunito">
            Road-3, Uttara, Dhaka
          </p>{" "}
          <span>
            <IoIosArrowDown className="text-[#5E8B8C]" />
          </span>{" "}
        </div>
      </div>
      {/* search option */}
      <div className="relative hidden md:flex">
        <input
          type="text"
          placeholder="Search for products"
          className="outline-none  bg-white border border-[#0000001A] text-[#0000004D] py-3 px-[18px] rounded  sm:text-sm w-full pl-3"
          // value={searchValue}
          // onChange={(e) => setSearchValue(e.target.value)}
          // onFocus={() => setShowResults(true)}
        />
        <span className="absolute inset-y-0 end-0 grid w-10 place-content-center bg-primary rounded-r-md hover:bg-primary/90">
          <button
            type="button"
            // onClick={handleSearchClick}
            className="text-text-light hover:text-text-semiLight cursor-pointer"
          >
            <FiSearch className="text-lg text-gray-500" />
          </button>
        </span>
      </div>
    </div>
  );
};

export default TopNavBar;
