"use client";

import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";

export const useSimilarProduct = ({ slug }) => {
  return useQuery({
    queryKey: [`${BASE_URL}/product/related_product?product_slug=${slug}`],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/product/related_product?product_slug=${slug}`,
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

        const data = await res.json();

        return data?.data;
      } catch (error) {
        console.error("Fetch error:", error);
        throw error;
      }
    },
  });
};
