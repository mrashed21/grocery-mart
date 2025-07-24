"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { FaBorderAll } from "react-icons/fa";
import { FaUserPlus, FaUsers } from "react-icons/fa6";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { MdOutlineChecklistRtl } from "react-icons/md";
import { RiFolderAddLine } from "react-icons/ri";

const AdminSidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const pathname = usePathname();

  const toggleDropdown = (label) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  const userInfo = false;
  const links = [
    {
      label: "Category",
      href: "/admin",
      icon: <BiCategory size={18} />,
    },
    {
      label: "Products",
      icon: <AiOutlineProduct size={18} />,
      children: [
        {
          label: "Add Product",
          href: "/admin/add-product",
          icon: <RiFolderAddLine size={16} />,
        },
        {
          label: "Product List",
          href: "/admin/product-list",
          icon: <MdOutlineChecklistRtl size={16} />,
        },
      ],
    },
    {
      label: "Customer List",
      href: "/admin/customer-list",
      icon: <FaUsers size={18} />,
    },
    {
      label: "Order List",
      href: "/admin/order-list",
      icon: <FaBorderAll size={18} />,
    },
    {
      label: "Staff",
      href: "/admin/staff",
      icon: <FaUserPlus size={18} />,
    },
  ];

  return (
    <div className="">
      <ul className="border-r border-gray-200 h-screen pt-10 space-y-1">
        {/* Desktop Sidebar List */}
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
