"use client";

import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";

export const useSingleProduct = ({ slug }) => {
  return useQuery({
    queryKey: [`${BASE_URL}/product/${slug}`],
    queryFn: async () => {
      try {
        const res = await fetch(`${BASE_URL}/product/${slug}`, {
          credentials: "include",
        });

        if (!res.ok) {
          const errorData = await res.text();
          throw new Error(
            `Error: ${res.status} ${res.statusText} - ${errorData}`
          );
        }

        const data = await res.json();

        return data?.data;
      } catch (error) {
        console.error("Fetch error:", error);
        throw error;
      }
    },
  });
};
