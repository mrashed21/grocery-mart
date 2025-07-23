"use client";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import { BsListCheck } from "react-icons/bs";
import { GiFlame } from "react-icons/gi";
import { GoStar } from "react-icons/go";
import { HiArrowUturnRight } from "react-icons/hi2";

const AdminSidebar = () => {
  const userInfo = false;
  const links = [
    {
      label: "Category",
      href: "/category",
      icon: <AiOutlineUser size={18} />,
    },
    {
      label: "Product",
      href: "/user-profile/order",
      icon: <BsListCheck size={18} />,
    },
    {
      label: "Customer List",
      href: "/user-profile/offer-order",
      icon: <GiFlame size={18} />,
    },
    {
      label: "Order List",
      href: "/user-profile/reviews",
      icon: <GoStar size={18} />,
    },
    {
      label: "Product List",
      href: "/user-profile/reviews",
      icon: <GoStar size={18} />,
    },
    {
      label: "Staff",
      href: "/user-profile/reviews",
      icon: <GoStar size={18} />,
    },
  ];

  //   const isActive = (path) => pathname === path;

  return (
    <div className="col-span-3 ">
      <ul className="mt-4 md:border border-gray-200  space-y-1">
        {/* Mobile View Header */}
        <div className="bg-[#F0F8FF] p-0 h-[340px] md:hidden">
          <div className="relative flex flex-col w-full h-[250px] items-center justify-center py-6 rounded-b-4xl bg-gradient-to-b from-[#B78C5F] to-[#9A7E66]">
            <AiOutlineUser size={40} className="text-white" />
            <h2 className="text-2xl font-medium text-white">
              {`Hello ${userInfo?.data?.user_name}` || "user"}
            </h2>
          </div>

          {/* Mobile View Buttons */}
          <div className="flex items-center justify-center">
            <div className=" absolute flex top-72 md:hidden items-center justify-center gap-3 mx-5">
              <div className="flex items-center justify-center  gap-2">
                {links.map((link) => (
                  <Link
                    href={link.href}
                    key={link.href}
                    className={`flex flex-col text-xs items-center gap-2 px-1 py-3 rounded 
            `}
                  >
                    <span className="text-lg">{link.icon}</span>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {/* logout */}
          <div className="flex justify-end mt-5">
            <button
              //   onClick={handleLogOut}
              className="mt-4   flex items-center gap-1 cursor-pointer font-semibold  px-3 py-3 hover:shadow-md  text-center text-sm  hover:bg-gray-100"
            >
              <span className="md:hidden">
                <HiArrowUturnRight />
              </span>{" "}
              Logout
            </button>
          </div>
        </div>

        {/* Desktop Sidebar List */}
        <div className="hidden md:block">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2  transition-colors duration-200 group bg-gray-100 font-semibold
             
            `}
              >
                <span
                  className={`p-2 rounded-full flex items-center justify-center bg-[#B78C5F] text-white
               
              `}
                >
                  {link.icon}
                </span>
                {link.label}
              </Link>
            </li>
          ))}
        </div>

        {/* Logout Button */}
        <div className=" hidden md:flex justify-center md:justify-start">
          <button
            // onClick={handleLogOut}
            className="mt-4 w-full  flex items-center gap-1 cursor-pointer font-semibold  px-3 py-3 hover:shadow-md  text-center text-sm  hover:bg-gray-100"
          >
            <span className="md:hidden">
              <HiArrowUturnRight />
            </span>{" "}
            Logout
          </button>
        </div>
      </ul>
    </div>
  );
};

export default AdminSidebar;
