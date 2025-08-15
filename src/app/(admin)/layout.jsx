"use client";

import AdminNavbar from "@/components/adminDashboard/AdminNavbar/AdminNavbar";
import AdminSidebar from "@/components/adminDashboard/AdminSidebar/AdminSidebar";
import { usePathname } from "next/navigation";
import { useState } from "react";

const MainLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <div className="min-h-screen font-nunito">{children}</div>;
  }
  return (
    <>
      <div className="min-h-screen font-nunito">
        <div className="grid grid-cols-6">
          {/* Sidebar */}
          <div
            className={`${
              isCollapsed ? "hidden" : "col-span-1"
            } transition-all duration-300 z-30`}
          >
            <AdminSidebar />
          </div>

          {/* Main content area */}
          <div
            className={`${
              isCollapsed ? "col-span-6" : "col-span-5"
            } transition-all duration-300 z-30`}
          >
            <div>
              <AdminNavbar
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
              />
            </div>

            <div className="w-[97%] mx-auto">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
