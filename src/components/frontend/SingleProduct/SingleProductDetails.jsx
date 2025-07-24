"use client";

import CheckoutSkeleton from "@/components/Skeleton/CheckoutSkeleton";
import { addToCart, removeFromCart } from "@/redux/feature/cart/cartSlice";
import { useEffect, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { IoAdd, IoRemove } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { SlCheck } from "react-icons/sl";
import { TbCurrencyTaka } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import ProductCheckout from "../Home/ProductCheckOut/ProductCheckout";
import SimilarProducts from "./SimilarProducts/SimilarProducts";

const SingleProductDetails = ({ product }) => {
  const [isDescriptioOpen, setIsDescriptioOpen] = useState(true);
  const [selectedImage, setSelectedImage] = useState(product?.image);
  const [quantity, setQuantity] = useState(1);

  const handleDescriptionToggle = () => {
    setIsDescriptioOpen((prev) => !prev);
  };
  const cartItems = useSelector((state) => state.grocery_mart.products);
  const dispatch = useDispatch();

  const isProductInCart = cartItems.some(
    (item) => item.productId === product?.id
  );
  useEffect(() => {
    if (product?.image) {
      setSelectedImage(product.image);
    }
    setQuantity(1);
  }, [product]);

  const handleAddToCart = (productId) => {
    dispatch(addToCart({ productId, quantity: 1 }));
  };

  const handleRemove = (productId, quantity) => {
    dispatch(removeFromCart({ productId, product_quantity: quantity }));
  };

  const handleMainImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-10">
      {!product ? (
        <div className=" col-span-8 ">
          <CheckoutSkeleton />
        </div>
      ) : (
        <>
          <div className=" lg:col-span-8">
            <div className="flex flex-col lg:flex-row gap-2 font-nunito">
              <div className="">
                {/* Image or Video preview */}
                <div className="relative overflow-hidden group w-full">
                  <div className="relative w-full h-full overflow-hidden">
                    <img
                      src={selectedImage}
                      alt="Main Preview"
                      className={`w-[420px] h-[280px]  transition-transform duration-300`}
                    />
                  </div>
                </div>

                {/* Thumbnail list */}
                <div className="flex flex-row gap-3 overflow-y-auto scrollbar-thin h-[95px] w-full lg:w-[420px] mt-5 p-2">
                  {/* Main image thumbnail */}
                  <img
                    src={product?.image}
                    alt="Main Image"
                    onClick={() => handleMainImageClick(product?.image)}
                    className={`h-16 w-16  cursor-pointer rounded ${
                      selectedImage === product?.image
                        ? "ring-2 ring-[#977b63]"
                        : ""
                    }`}
                  />

                  {/* Other thumbnails */}
                  {product?.other_image?.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      onClick={() => handleMainImageClick(img)}
                      className={`h-16 w-16 cursor-pointer rounded ${
                        selectedImage === img ? "ring-2 ring-[#977b63]" : ""
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* details */}
              <div className="p-4 flex flex-col  ">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl lg:text-2xl font-bold text-[#3A3A3AFA]">
                    {product.name}
                  </h2>
                  {/* stock */}
                  <div className="lg:hidden">
                    {product.stock && product.stock_quantity > 0 ? (
                      <p className="flex items-center gap-1 ">
                        {" "}
                        <span className="p-0.5 rounded-full  text-[#25AE6C] font-bold">
                          <SlCheck />
                        </span>{" "}
                        In-stock{" "}
                      </p>
                    ) : (
                      <p className="flex items-center gap-1">
                        <span className=" rounded-full border text-sm text-red-500 font-bold">
                          {" "}
                          <RxCross2 />
                        </span>{" "}
                        Out of stock
                      </p>
                    )}
                  </div>
                </div>

                <p className="text-[#3A3A3AFA]  mt-4 mb-2">
                  Product Tags:
                  <span className=""> {product.category}</span>
                </p>

                <div className="flex justify-between my-2 lg:my-3">
                  {product.is_offer ? (
                    <div className="flex items-center lg:gap-3">
                      <span className="font-semibold text-[#FF6B4F] lg:text-[18px] flex">
                        <TbCurrencyTaka className=" lg:text-xl" />{" "}
                        {product.discountedPrice}
                      </span>
                      <span className="line-through text-[#16161680] flex ">
                        <TbCurrencyTaka className=" lg:text-xl" />{" "}
                        {product.price}
                      </span>
                    </div>
                  ) : (
                    <span className="font-semibold text-[#FF6B4F] lg:text-[22px] flex">
                      <TbCurrencyTaka className=" lg:text-xl" /> {product.price}
                    </span>
                  )}
                </div>
                {/* quantity */}
                <p className=" text-[#3A3A3AFA] font-nunito">
                  {" "}
                  Quantity: {product.quantity}
                </p>

                {/* stock */}
                <div className="mt-2 hidden lg:flex">
                  {product.stock && product.stock_quantity > 0 ? (
                    <p className="flex items-center gap-1 ">
                      {" "}
                      <span className="p-0.5 rounded-full  text-[#25AE6C] font-bold">
                        <SlCheck />
                      </span>{" "}
                      In-stock{" "}
                    </p>
                  ) : (
                    <p className="flex items-center gap-1">
                      <span className=" rounded-full border text-sm text-red-500 font-bold">
                        {" "}
                        <RxCross2 />
                      </span>{" "}
                      Out of stock
                    </p>
                  )}
                </div>

                <div className="flex flex-col lg:flex-row items-center w-full mt-4">
                  <div className="flex items-center">
                    <button
                      onClick={(e) => {
                        handleDecrement(product.id);
                        e.stopPropagation();
                        e.preventDefault();
                      }}
                      disabled={quantity == 1}
                      className={`px-2 py-1 bg-[#084C4EA6] text-white rounded
    ${quantity === 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
  `}
                      aria-label="Decrease quantity"
                    >
                      <IoRemove className="text-xl" />
                    </button>

                    <span className="px-4 py-[1px] font-bold bg-[#084C4E14]">
                      {quantity}
                    </span>

                    <button
                      onClick={(e) => {
                        handleIncrement(product.id);
                        e.stopPropagation();
                        e.preventDefault();
                      }}
                      className="px-2 py-1 bg-[#084C4EA6] text-white rounded cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <IoAdd className="text-xl" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onIncrement(product.id);
                      }}
                      className="flex-shrink-0 cursor-pointer text-white p-2 rounded-full transition-colors duration-200"
                      aria-label="Increase quantity"
                    >
                      <IoAdd className="text-xl lg:text-2xl" />
                    </button>
                  </div>
                  <div className="mt-2 lg:mt-0">
                    {isProductInCart ? (
                      <button
                        onClick={() => {
                          handleRemove(product.id, product.quantity);
                        }}
                        className=" flex items-center justify-center gap-2 bg-[#FF6B4F]  text-white font-semibold py-1 px-5 rounded-sm transition-colors duration-200 cursor-pointer text-sm"
                      >
                        Remove from Bag
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          handleAddToCart(product.id);
                        }}
                        className=" flex items-center justify-center gap-2 bg-[#5E8B8C]  text-white font-semibold py-1 px-5 rounded-sm transition-colors duration-200 cursor-pointer  text-sm"
                      >
                        Add to Bag
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* description  */}

            {product.description && (
              <div className=" mt-5">
                <div
                  onClick={handleDescriptionToggle}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <h2 className="text-[20px] font-nunito text-black">
                    Description
                  </h2>
                  <p className=" cursor-pointer text-base ">
                    {isDescriptioOpen ? <BsChevronUp /> : <BsChevronDown />}
                  </p>
                </div>
                <hr className="border-t border-gray-200 my-3" />
                {isDescriptioOpen && (
                  <p className="text-[#00000099] font-nunito text-justify">
                    {product.description}
                  </p>
                )}
              </div>
            )}
          </div>
        </>
      )}
      <div className="grid-cols-12 lg:col-span-4 mt-8 lg:mt-0">
        <ProductCheckout />
      </div>
      {/* similar Products */}
      <div className="lg:col-span-12">
        <div className="">
          <SimilarProducts />
        </div>
      </div>
    </div>
  );
};

export default SingleProductDetails;
