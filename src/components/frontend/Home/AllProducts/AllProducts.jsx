"use client";
import Contain from "@/components/common/Contain";
import ProductSkeleton from "@/components/Skeleton/ProductSkeleton";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "@/redux/feature/cart/cartSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import productData from "./../../../../../public/productData.json";
import ProductCard from "./ProductCard";

const AllProducts = ({ selectedCategory, searchResults, searchTerm }) => {
  const INITIAL_DISPLAY_COUNT = 20;
  const INCREMENT = 20;

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);
  const [isLoading, setIsLoading] = useState(false);
  const cart = useSelector((state) => state.grocery_mart.products);

  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      setFilteredProducts(searchResults);
    } else {
      const shuffled = productData;
      // const shuffled = [...productData].sort(() => Math.random() - 0.5);
      const filtered =
        selectedCategory === "All Products"
          ? shuffled
          : shuffled.filter((product) => product.category === selectedCategory);

      setFilteredProducts(filtered);
    }

    setDisplayCount(INITIAL_DISPLAY_COUNT);
  }, [selectedCategory, searchResults, searchTerm]);
  useEffect(() => {
    const shuffled = productData;
    // const shuffled = [...productData].sort(() => Math.random() - 0.5);

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

  const dispatch = useDispatch();

  const getCartQuantity = (productId) => {
    const item = cart.find((p) => p.productId === productId);
    return item?.quantity || 0;
  };

  const handleAddToCart = (productId) => {
    dispatch(addToCart({ productId, quantity: 1 }));
  };

  const handleIncrement = (productId) => {
    dispatch(incrementQuantity({ productId, product_quantity: 50 })); // assuming 50 is max stock
  };

  const handleDecrement = (productId) => {
    dispatch(decrementQuantity({ productId }));
  };
  return (
    <div>
      <div className="bg-[#084C4E0F] py-2 lg:py-8">
        <Contain>
          <div className="">
            <h1 className="text-xl lg:text-4xl mb-3 text-[#084C4E] font-nunito font-bold">
              {selectedCategory}
            </h1>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-6">
            {filteredProducts.length === 0 ? (
              <>
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <ProductSkeleton />
                  ))}
              </>
            ) : (
              <>
                {filteredProducts.slice(0, displayCount).map((product) => (
                  <Link href={`/product/${product?.slug}`} key={product.id}>
                    <ProductCard
                      product={product}
                      cartQuantity={getCartQuantity(product.id)}
                      onAddToCart={handleAddToCart}
                      onIncrement={handleIncrement}
                      onDecrement={handleDecrement}
                    />
                  </Link>
                ))}
              </>
            )}
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
