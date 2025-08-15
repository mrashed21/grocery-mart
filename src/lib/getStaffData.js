"use client";

import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";

export const useAllStaff = ({ page, limit, searchTerm }) => {
  return useQuery({
    queryKey: [
      `/api/v1/admin_reg_log/dashboard?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/admin_reg_log/dashboard?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      return data;
    },
  });
};
