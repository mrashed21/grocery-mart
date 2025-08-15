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

import { toast } from "react-toastify";
import ProductCard from "./ProductCard";

const AllProducts = ({
  selectedCategory,
  searchResults,
  searchTerm,
  productData,
  setLimit,
  limit,
  productLoading,
}) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.grocery_mart.products);

  useEffect(() => {
    if (!productData || productData.length === 0) return;

    if (searchTerm.trim().length > 0) {
      setFilteredProducts(searchResults);
    } else {
      const filtered =
        selectedCategory === "All Products" || !selectedCategory
          ? productData
          : productData.filter(
              (product) =>
                product?.category?.category_name?.toLowerCase() ===
                selectedCategory.toLowerCase()
            );

      setFilteredProducts(filtered);
    }
  }, [selectedCategory, searchResults, searchTerm, productData, setLimit]);

  const getCartQuantity = (productId) => {
    const item = cart.find((p) => p.productId === productId);
    return item?.quantity || 0;
  };

  const handleAddToCart = (product) => {
    toast.success(` ${product?.product_name} added to your bag`, {
      autoClose: 2000,
    });

    dispatch(addToCart({ productId: product?._id, quantity: 1 }));
  };

  const handleIncrement = (productId, product_quantity) => {
    const currentQty = getCartQuantity(productId);
    if (currentQty >= product_quantity) {
      toast.error("Maximum stock limit reached", {
        autoClose: 2000,
      });
      return;
    }

    dispatch(incrementQuantity({ productId, product_quantity }));
  };

  const handleDecrement = (productId) => {
    dispatch(decrementQuantity({ productId }));
  };

  const handleViewMore = () => {
    setLimit((prev) => prev + 20);
  };

  const handleViewLess = () => {
    setLimit((prev) => Math.max(20, prev - 20));
  };

  return (
    <main>
      <section className="bg-[#084C4E0F] py-2 lg:py-8">
        <Contain>
          <section className="">
            <h1 className="text-xl lg:text-4xl mb-3 text-[#084C4E] font-nunito font-bold">
              {selectedCategory}
            </h1>
          </section>

          <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-6">
            {productLoading ? (
              <>
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <ProductSkeleton key={i} />
                  ))}
              </>
            ) : (
              <>
                {filteredProducts.map((product) => (
                  <Link
                    href={`/product/${product?.product_slug}`}
                    key={product._id}
                  >
                    <ProductCard
                      product={product}
                      cartQuantity={getCartQuantity(product._id)}
                      onAddToCart={handleAddToCart}
                      onIncrement={() =>
                        handleIncrement(product._id, product?.product_quantity)
                      }
                      onDecrement={() => handleDecrement(product._id)}
                    />
                  </Link>
                ))}
              </>
            )}
          </section>

          {!productLoading && filteredProducts.length > 0 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              {filteredProducts.length === limit && (
                <button
                  onClick={handleViewMore}
                  className="bg-[#084C4E] hover:bg-[#063b3c] text-white text-[18px] font-bold px-8 py-3 rounded-3xl transition-colors disabled:opacity-50 cursor-pointer"
                >
                  View More
                </button>
              )}

              {limit > 20 && (
                <button
                  onClick={handleViewLess}
                  className="bg-[#FF6B4F] hover:bg-[#ff5e4f] text-white text-[18px] font-bold px-8 py-3 rounded-3xl transition-colors disabled:opacity-50 cursor-pointer"
                >
                  View Less
                </button>
              )}
            </div>
          )}

          {/* Product Count Info */}
          {/* {!productLoading && filteredProducts.length > 0 && (
            <div className="text-center mt-4 text-gray-600">
              Showing {filteredProducts.length} products (Limit: {limit})
            </div>
          )} */}
        </Contain>
      </section>
    </main>
  );
};

export default AllProducts;
