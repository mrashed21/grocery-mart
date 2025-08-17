"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductCard from "../../Home/AllProducts/ProductCard";
import productData from "./../../../../../public/productData.json";

const SimilarProducts = () => {
  const INITIAL_DISPLAY_COUNT = 5;

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState({});

  useEffect(() => {
    setFilteredProducts(productData);
  }, []);

  const addToCart = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1,
    }));
  };

  const incrementQuantity = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: prevCart[productId] + 1,
    }));
  };

  const decrementQuantity = (productId) => {
    setCart((prevCart) => {
      const newQuantity = (prevCart[productId] || 0) - 1;
      if (newQuantity <= 0) {
        const { [productId]: _, ...rest } = prevCart;
        return rest;
      }
      return {
        ...prevCart,
        [productId]: newQuantity,
      };
    });
  };

  return (
    <div>
      <h2 className="text-xl lg:text-[38px] text-[#3A3A3AFA] font-bold font-nunito mb-3">
        Similar Products
      </h2>
      {/* product card */}

      <div className=" grid grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-5 ">
        {filteredProducts.slice(0, displayCount).map((product) => (
          <Link href={`/product/${product?.slug}`} key={product.id}>
            <ProductCard
              product={product}
              cartQuantity={cart[product.id] || 0}
              onAddToCart={addToCart}
              onIncrement={incrementQuantity}
              onDecrement={decrementQuantity}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
