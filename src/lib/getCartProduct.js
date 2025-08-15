import { useQuery } from "@tanstack/react-query";

export const useCartProducts = () => {
  return useQuery({
    queryKey: ["cartProducts"], // Better to use a simple key
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/product/cart_product`, {
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch cart products");
      }

      // Ensure the response is in expected format
      if (!Array.isArray(data.data)) {
        // Adjust based on your API response structure
        throw new Error("Invalid cart products data format");
      }

      return data;
    },
    onError: (error) => {
      console.error("Cart fetch error:", error.message);
      // You might want to show a user-friendly message here
    },
  });
};
