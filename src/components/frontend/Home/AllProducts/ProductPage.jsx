"use client";
import { useSearch } from "@/context/SearchProvider";
import { useAllProducts } from "@/lib/getAllProducts";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Categories from "../Categories/Categories";
import ProductSearch from "../ProductSearch/ProductSearch";
import AllProducts from "./AllProducts";

const ProductPage = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    searchResults,
    setSearchResults,
  } = useSearch();

  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);

  const { data: categoryTypes = [], isLoading } = useQuery({
    queryKey: [`/api/v1/category`],
    queryFn: async () => {
      try {
        const res = await fetch(`${BASE_URL}/category`, {
          credentials: "include",
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

  const { data: productData = [], isloading: productLoading } = useAllProducts({
    limit,
    page,
  });
  return (
    <main>
      <section className="mt-5 mx-5 lg:hidden">
        <ProductSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setDisplayedProducts={setSearchResults}
          productData={productData?.data}
        />
      </section>
      <Categories
        selectedCategory={selectedCategory}
        onCategorySelect={(cat) => {
          setSelectedCategory(cat);
          setSearchTerm("");
          setSearchResults([]);
        }}
        categoryTypes={categoryTypes}
        isLoading={isLoading}
      />
      <AllProducts
        selectedCategory={selectedCategory}
        searchResults={searchResults}
        searchTerm={searchTerm}
        productData={productData?.data}
        setLimit={setLimit}
        limit={limit}
        productLoading={productLoading}
        setPage={setPage}
        page={page}
      />
    </main>
  );
};

export default ProductPage;
