"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineUser } from "react-icons/ai";
import { BsListCheck } from "react-icons/bs";
import { HiArrowUturnRight } from "react-icons/hi2";
import { toast } from "react-toastify";

const UserSideBar = () => {
  const pathname = usePathname();
  // const { data: userInfo, isLoading } = useUserInfoQuery();
  const userInfo = false;
  const handleLogOut = async () => {
    const response = await fetch(`${BASE_URL}/get_me`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (result?.statusCode === 200 && result?.success === true) {
      // setDropdownOpen(!isDropdownOpen);
    } else {
      toast.error(result?.message || "Something went wrong", {
        autoClose: 1000,
      });
    }

    window.location.href = "/";
  };

  const links = [
    {
      label: "My Profile",
      href: "/user-profile",
      icon: <AiOutlineUser size={18} />,
    },
    {
      label: "My Order",
      href: "/user-profile/order",
      icon: <BsListCheck size={18} />,
    },
  ];

  const isActive = (path) => pathname === path;

  return (
    <div className="col-span-3 ">
      <h2 className="text-xl hidden md:flex font-medium lg:mt-2">
        Home / My Account
      </h2>
      <ul className="mt-4 md:border border-gray-200  space-y-1">
        {/* Mobile View Header */}
        <div className="bg-[#F0F8FF] p-0 h-[340px] lg:hidden w-full">
          <div className="relative flex flex-col w-full h-[250px] items-center justify-center py-6 rounded-b-4xl bg-gradient-to-b from-[#084C4F] to-[#5E8B8C]">
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
                    className={`flex flex-col text-xs items-center gap-2 px-1 py-3 rounded shadow text-center 
              ${
                isActive(link.href)
                  ? "bg-white text-black border border-[#084C4F]"
                  : "bg-white hover:bg-[#f1f1f1]"
              }
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
              onClick={handleLogOut}
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
                className={`flex items-center gap-3 px-3 py-2  transition-colors duration-200 group
              ${
                isActive(link.href)
                  ? "bg-gray-100 font-semibold"
                  : "hover:bg-gray-100"
              }
            `}
              >
                <span
                  className={`p-2 rounded-full flex items-center justify-center
                ${
                  isActive(link.href)
                    ? "bg-[#084C4F] text-white"
                    : " group-hover:bg-[#084C4F] text-white"
                }
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
            onClick={handleLogOut}
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

export default UserSideBar;
