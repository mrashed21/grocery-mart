"use client";
import { useSimilarProduct } from "@/lib/getSimilarProducts";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "@/redux/feature/cart/cartSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProductCard from "../../Home/AllProducts/ProductCard";

const SimilarProducts = ({ slug }) => {
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { data: similarProduct = [], isLoading } = useSimilarProduct({
    slug,
  });

  const cart = useSelector((state) => state.grocery_mart.products);

  useEffect(() => {
    if (similarProduct?.length) {
      setFilteredProducts(similarProduct);
    }
  }, [similarProduct]);

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

  return (
    <section>
      <h2 className="text-xl lg:text-[38px] text-[#3A3A3AFA] font-bold font-nunito mb-3">
        Similar Products
      </h2>
      {/* product card */}

      <section className=" grid grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-5 ">
        {filteredProducts.slice(0, 5).map((product) => (
          <Link href={`/product/${product?.product_slug}`} key={product._id}>
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
      </section>
    </section>
  );
};

export default SimilarProducts;
