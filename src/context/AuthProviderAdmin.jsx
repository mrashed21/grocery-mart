"use client";

import { BASE_URL } from "@/utils/baseURL";
import { createContext, useEffect, useState } from "react";

export const AuthContextAdmin = createContext();

const AuthProviderAdmin = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin`, {
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
        setUser(data?.data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      // console.error("Error fetching user data:", error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  //console.log(user);

  const info = {
    user,
    loading,
  };

  return (
    <AuthContextAdmin.Provider value={info}>
      {children}
    </AuthContextAdmin.Provider>
  );
};

export default AuthProviderAdmin;
