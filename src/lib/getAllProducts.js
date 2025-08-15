"use client";

import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";

export const useAllProducts = ({ page, limit }) => {
  return useQuery({
    queryKey: [`${BASE_URL}/product?limit=${limit}&page=${page}`],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/product?limit=${limit}&page=${page}`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          const errorData = await res.text();
          throw new Error(
            `Error: ${res.status} ${res.statusText} - ${errorData}`
          );
        }

        return res.json();
      } catch (error) {
        console.error("Fetch error:", error);
        throw error;
      }
    },
  });
};
