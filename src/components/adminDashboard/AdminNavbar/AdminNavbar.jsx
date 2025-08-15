"use client";
import { AdminAuthContext } from "@/context/AdminProvider";
import { BASE_URL } from "@/utils/baseURL";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { FaBars, FaUserTie } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { toast } from "react-toastify";

const AdminNavbar = ({ isCollapsed, setIsCollapsed }) => {
  const admin = useContext(AdminAuthContext);
  const user = admin?.admin;
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogOut = async () => {
    try {
      const response = await fetch(`${BASE_URL}/get_me`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result?.statusCode !== 200 || result?.success !== true) {
        toast.error(result?.message || "Something went wrong", {
          autoClose: 1000,
        });
      }
    } catch (err) {
      toast.error("Logout failed");
    }
    window.location.href = "/";
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md flex items-center justify-between px-4 py-3 h-16 relative">
      {/* Collapse Button */}

      <div className="flex items-center justify-center">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-12 w-12 text-gray-700 cursor-pointer text-3xl"
        >
          {isCollapsed ? <FaBars /> : <FaXmark />}
        </button>
      </div>
      {/* Right side: username + icon */}
      {user?.admin_name && (
        <div
          className="flex items-center justify-center gap-2 relative"
          ref={menuRef}
        >
          <div>{user?.admin_name}</div>

          {/* User icon */}
          <div
            className="p-1.5 flex items-center justify-center border-gray-400 rounded-full border w-10 h-10 cursor-pointer relative"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <FaUserTie className="text-2xl" />

            {/* Bottom menu */}
            {isMenuOpen && (
              <div className="absolute top-full mt-2 right-0 bg-white rounded-md shadow-lg w-40 z-50">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setIsMenuOpen(false);
                    router.push("/admin/profile");
                  }}
                >
                  Profile
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-md text-red-600 cursor-pointer"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogOut();
                  }}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
