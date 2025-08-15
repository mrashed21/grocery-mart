"use client";
import { BASE_URL } from "@/utils/baseURL";
import { createContext, useEffect, useState } from "react";

export const AdminAuthContext = createContext();

const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [adminLoading, setAdminLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin_reg_log`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();

      if (data?.statusCode === 200 && data?.success === true) {
        setAdmin(data?.data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAdminLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const info = {
    admin,
    adminLoading,
  };

  return (
    <AdminAuthContext.Provider value={info}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export default AdminProvider;
