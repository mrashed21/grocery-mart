"use client";
import GroceryMartSkeleton from "@/components/Skeleton/GroceryMartSkeleton";
import { AdminAuthContext } from "@/context/AdminProvider";
import useGetSettingData from "@/lib/getSettingData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaBorderAll } from "react-icons/fa";
import { FaListOl, FaUserPlus, FaUsers } from "react-icons/fa6";
import { FcShipped } from "react-icons/fc";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import {
  MdAssignmentAdd,
  MdCancelPresentation,
  MdOutlineChecklistRtl,
  MdOutlinePendingActions,
  MdOutlineSpaceDashboard,
} from "react-icons/md";
import { PiFlagBannerBold, PiMapPinArea } from "react-icons/pi";
import { RiFolderAddLine } from "react-icons/ri";
import { TbTruckReturn } from "react-icons/tb";

const AdminSidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const pathname = usePathname();

  const toggleDropdown = (label) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  const { data: settingsData, isLoading: settingDataLoading } =
    useGetSettingData();
  const settingData = settingsData?.data?.[0];
  const admin = useContext(AdminAuthContext);
  const user = admin?.admin;

  const showIf = (condition, item) => (condition ? [item] : []);

  const links = [
    // Dashboard
    ...showIf(user?.role_id?.dashboard_show, {
      label: "Dashboard",
      href: "/admin",
      icon: <MdOutlineSpaceDashboard size={18} />,
    }),

    // Category
    ...showIf(user?.role_id?.category_show, {
      label: "Category",
      href: "/admin/category",
      icon: <BiCategory size={18} />,
    }),

    // Banner (always visible in original code)
    ...showIf(user?.role_id?.banner_show, {
      label: "Banner",
      href: "/admin/banner",
      icon: <PiFlagBannerBold size={18} />,
    }),

    // Zone (always visible in original code)
    ...showIf(user?.role_id?.zone_show, {
      label: "Zone",
      href: "/admin/add-zone",
      icon: <PiMapPinArea size={18} />,
    }),

    // Products
    ...showIf(user?.role_id?.product_show, {
      label: "Products",
      icon: <AiOutlineProduct size={18} />,
      children: [
        ...showIf(user?.role_id?.product_create, {
          label: "Add Product",
          href: "/admin/add-product",
          icon: <RiFolderAddLine size={16} />,
        }),

        {
          label: "Product List",
          href: "/admin/product-list",
          icon: <MdOutlineChecklistRtl size={16} />,
        },
      ],
    }),

    // Customer List (always visible)
    ...showIf(user?.role_id?.user_show, {
      label: "Customer List",
      href: "/admin/customer-list",
      icon: <FaUsers size={18} />,
    }),

    // Orders
    ...showIf(user?.role_id?.admin_delete, {
      label: "Order",
      icon: <FaBorderAll size={18} />,
      children: [
        {
          label: "Pending Order",
          href: "/admin/pending-order",
          icon: <MdOutlinePendingActions size={16} />,
        },
        {
          label: "Assigned Order",
          href: "/admin/assign-order",
          icon: <MdAssignmentAdd size={16} />,
        },
        {
          label: "Shipped Order",
          href: "/admin/shipped-order",
          icon: <FcShipped size={16} />,
        },
        {
          label: "Delivered Order",
          href: "/admin/delivery-order",
          icon: <CiDeliveryTruck size={16} />,
        },
        {
          label: "Cancel Order",
          href: "/admin/cancel-order",
          icon: <MdCancelPresentation size={16} />,
        },
        {
          label: "Return Order",
          href: "/admin/return-order",
          icon: <TbTruckReturn size={16} />,
        },
      ],
    }),
    ...showIf(user?.role_id?.assign_staff_order_show, {
      label: "Staff Order",
      icon: <FaBorderAll size={18} />,
      children: [
        {
          label: "Assigned Order",
          href: "/admin/assign-order",
          icon: <MdAssignmentAdd size={16} />,
        },
        {
          label: "Shipped Order",
          href: "/admin/shipped-order",
          icon: <FcShipped size={16} />,
        },
        {
          label: "Delivered Order",
          href: "/admin/delivery-order",
          icon: <CiDeliveryTruck size={16} />,
        },
        {
          label: "Cancel Order",
          href: "/admin/cancel-order",
          icon: <MdCancelPresentation size={16} />,
        },
        {
          label: "Return Order",
          href: "/admin/return-order",
          icon: <TbTruckReturn size={16} />,
        },
      ],
    }),

    // Staff
    ...showIf(user?.role_id?.role_show, {
      label: "Staff",
      icon: <FaUserPlus size={18} />,
      children: [
        ...showIf(user?.role_id?.role_create, {
          label: "Add Staff Role",
          href: "/admin/add-staff-role",
          icon: <RiFolderAddLine size={16} />,
        }),
        ...showIf(user?.role_id?.role_show, {
          label: "Staff Role List",
          href: "/admin/staff-list-role",
          icon: <MdOutlineChecklistRtl size={16} />,
        }),
        ...showIf(user?.role_id?.admin_show, {
          label: "Staff List",
          href: "/admin/staff-list",
          icon: <FaListOl size={16} />,
        }),
      ],
    }),

    // Settings
    ...showIf(user?.role_id?.site_setting_update, {
      label: "Setting",
      href: "/admin/setting",
      icon: <IoSettingsOutline size={18} />,
    }),
  ];

  return (
    <div className="sticky top-0">
      <ul className="border-r border-gray-200 h-screen overflow-y-scroll pt-10 space-y-1">
        {/* Desktop Sidebar List */}
        <div className="mx-5 my-5">
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
        </div>
        <ul className="">
          {links.map((link, index) => (
            <li key={`main-${index}`}>
              {link.children ? (
                <>
                  <button
                    onClick={() => toggleDropdown(link.label)}
                    className={`flex items-center justify-between w-full px-6 py-2 text-sm font-bold uppercase text-black cursor-pointer
                      ${
                        link.children.some((child) =>
                          pathname.startsWith(child.href)
                        )
                          ? "bg-[#084C4EA6]"
                          : ""
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className="">{link.icon}</span>
                      {link.label}
                    </div>
                    <span className="">
                      {openDropdown === link.label ? (
                        <FiChevronDown size={18} />
                      ) : (
                        <FiChevronRight size={18} />
                      )}
                    </span>
                  </button>

                  {openDropdown === link.label && (
                    <ul className="py-2">
                      {link.children.map((child, childIndex) => (
                        <li key={`child-${childIndex}`}>
                          <Link
                            href={child.href}
                            className={`flex items-center gap-3 pl-10 py-2 text-sm font-bold uppercase text-black
                              ${
                                pathname === child.href
                                  ? "bg-[#084C4EA6] text-white"
                                  : ""
                              }
                            `}
                          >
                            <span className="text-black">{child.icon}</span>
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 px-6 py-2 text-sm font-bold uppercase text-black
                    ${pathname === link.href ? "bg-[#084C4EA6] text-white" : ""}
                  `}
                >
                  <span className="flex items-center justify-center">
                    {link.icon}
                  </span>
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};

export default AdminSidebar;
