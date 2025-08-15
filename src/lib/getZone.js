"use client";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";

const useGetZone = () => {
  return useQuery({
    queryKey: [`/api/v1/zone`],
    queryFn: async () => {
      try {
        const res = await fetch(`${BASE_URL}/zone`, {
          // credentials: "include",
        });

        if (!res.ok) {
          const errorData = await res.text();
          throw new Error(
            `Error: ${res.status} ${res.statusText} - ${errorData}`
          );
        }

        const data = await res.json();
        return data;
      } catch (error) {
        console.error("Fetch error:", error);
        throw error;
      }
    },
  });
};

export default useGetZone;
