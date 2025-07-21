
"use client";
import { useState } from "react";
import Categories from "../Categories/Categories";
import AllProducts from "./AllProducts";


const ProductPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Products");

  return (
    <>
      <Categories onCategorySelect={setSelectedCategory} selectedCategory={selectedCategory} />
      <AllProducts selectedCategory={selectedCategory} />
    </>
  );
};

export default ProductPage;
