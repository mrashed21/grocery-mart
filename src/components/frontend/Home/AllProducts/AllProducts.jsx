"use client";
import Contain from "@/components/common/Contain";
import { useEffect, useState } from "react";
import productData from "./../../../../../public/productData.json";
import ProductCard from "./ProductCard";

const AllProducts = ({ selectedCategory }) => {
  const INITIAL_DISPLAY_COUNT = 20;
  const INCREMENT = 20;

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const shuffled = [...productData].sort(() => Math.random() - 0.5);

    const filtered =
      selectedCategory === "All Products"
        ? shuffled
        : shuffled.filter((product) => product.category === selectedCategory);

    setFilteredProducts(filtered);
    setDisplayCount(INITIAL_DISPLAY_COUNT);
  }, [selectedCategory]);

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newCount = Math.min(
        displayCount + INCREMENT,
        filteredProducts.length
      );
      setDisplayCount(newCount);
      setIsLoading(false);
    }, 300);
  };

  const handleShowLess = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newCount = Math.max(
        displayCount - INCREMENT,
        INITIAL_DISPLAY_COUNT
      );
      setDisplayCount(newCount);
      setIsLoading(false);
    }, 300);
  };

  const allShown = displayCount >= filteredProducts.length;

  return (
    <div>
      <div className="bg-[#084C4E0F] py-8 lg:py-14">
        <Contain>
          <div className="lg:my-14">
            <h1 className="text-xl lg:text-4xl mb-3 text-[#084C4E] font-nunito font-bold">
              {selectedCategory}
            </h1>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-6">
            {filteredProducts.slice(0, displayCount).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Contain>
      </div>

      <div className="flex justify-center gap-4 mt-10">
        {!allShown && (
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="bg-[#FF6B4F] hover:bg-[#ff5e4f] text-white text-[18px] font-bold px-8 py-3 rounded-3xl transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? "Loading..." : "View More"}
          </button>
        )}

        {displayCount > INITIAL_DISPLAY_COUNT && (
          <button
            onClick={handleShowLess}
            disabled={isLoading}
            className="bg-[#084C4E] hover:bg-[#063b3c] text-white text-[18px] font-bold px-8 py-3 rounded-3xl transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? "Loading..." : "Show Less"}
          </button>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
