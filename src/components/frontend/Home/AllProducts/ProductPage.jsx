"use client";
import { useSearch } from "@/context/SearchProvider";
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
  return (
    <>
      <div className="mt-5 mx-5 lg:hidden">
        <ProductSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setDisplayedProducts={setSearchResults}
        />
      </div>
      <Categories
        selectedCategory={selectedCategory}
        onCategorySelect={(cat) => {
          setSelectedCategory(cat);
          setSearchTerm("");
          setSearchResults([]);
        }}
      />
      <AllProducts
        selectedCategory={selectedCategory}
        searchResults={searchResults}
        searchTerm={searchTerm}
      />
    </>
  );
};

export default ProductPage;
