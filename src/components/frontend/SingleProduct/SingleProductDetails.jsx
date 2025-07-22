"use client";
import { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { IoAdd, IoRemove } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { SlCheck } from "react-icons/sl";
import { TbCurrencyTaka } from "react-icons/tb";
import ProductCheckout from "../Home/ProductCheckOut/ProductCheckout";
import SimilarProducts from "./SimilarProducts/SimilarProducts";

const SingleProductDetails = ({ product }) => {
  const [isDescriptioOpen, setIsDescriptioOpen] = useState(true);
  const [selectedImage, setSelectedImage] = useState(product?.image);
  const [cart, setCart] = useState({});

  const handleDescriptionToggle = () => {
    setIsDescriptioOpen((prev) => !prev);
  };

  const handleMainImageClick = (image) => {
    setSelectedImage(image);
  };

  const incrementQuantity = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1,
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
    <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-10">
      <div className="grid-cols-12 lg:col-span-8">
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
            <div className="flex flex-row gap-3 overflow-y-auto scrollbar-thin h-[90px] w-full lg:w-[420px] mt-5">
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
                    <TbCurrencyTaka className=" lg:text-xl" /> {product.price}
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

            <div className="flex gap-4 mt-4">
              <div className="flex items-center">
                <button
                  onClick={(e) => {
                    decrementQuantity(product.id);
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  className="px-2 py-1 bg-[#084C4EA6] text-white rounded"
                  aria-label="Decrease quantity"
                >
                  <IoRemove className="text-xl" />
                </button>

                <span className="px-4 py-[1px]  font-bold bg-[#084C4E14]">
                  {cart[product.id] || 1}
                </span>

                <button
                  onClick={(e) => {
                    incrementQuantity(product.id);
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  className="px-2 py-1 bg-[#084C4EA6] text-white rounded"
                  aria-label="Increase quantity"
                >
                  <IoAdd className="text-xl" />
                </button>
              </div>

              <button
                onClick={(e) => {
                  onAddToCart(product.id);
                  e.stopPropagation();
                  e.preventDefault();
                }}
                className=" flex items-center justify-center gap-2 bg-[#5E8B8C] hover:bg-[#4f7a7b] text-white font-semibold px-3 py-1 rounded-lg transition-colors duration-200"
              >
                Add to Bag
              </button>
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
