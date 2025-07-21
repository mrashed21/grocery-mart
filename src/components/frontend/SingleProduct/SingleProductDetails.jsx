"use client";
import { useState } from "react";
import { IoAdd, IoRemove } from "react-icons/io5";
import { TbCurrencyTaka } from "react-icons/tb";
const SingleProductDetails = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(product?.image);
  const [cart, setCart] = useState({});

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
    <div className="flex gap-2 font-nunito">
      {" "}
      <div className="flex flex-col-reverse   gap-2 sm:h-[600px] ">
        {/* Thumbnail list */}
        <div className="flex flex-row gap-3 overflow-y-auto scrollbar-thin h-[120px] w-full lg:w-[500px] mt-5">
          {/* Main image thumbnail */}
          <img
            src={product?.image}
            alt="Main Image"
            onClick={() => handleMainImageClick(product?.image)}
            className={`h-16 w-16  object-cover cursor-pointer rounded ${
              selectedImage === product?.image ? "ring-2 ring-[#977b63]" : ""
            }`}
          />

          {/* Other thumbnails */}
          {product?.other_image?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => handleMainImageClick(img)}
              className={`h-16 w-16 object-cover cursor-pointer rounded ${
                selectedImage === img ? "ring-2 ring-[#977b63]" : ""
              }`}
            />
          ))}
        </div>

        {/* Image or Video preview */}

        <div className="relative aspect-[3/4] overflow-hidden group w-full">
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={selectedImage}
              alt="Main Preview"
              className={`w-[500px] h-[550px] object-cover transition-transform duration-300`}
            />
          </div>
        </div>
      </div>
      {/* price */}
      <div className="lg:w-1/2 p-4 flex flex-col  ">
        <h2 className="text-3xl lg:text-2xl font-bold text-[#3A3A3AFA] mb-4">
          {product.name}
        </h2>
        <p className="text-sm text-[#3A3A3AFA] mb-2">
          Product Tags:
          <span className=""> {product.category}</span>
        </p>

        <div className="flex justify-between my-5">
          {product.is_offer ? (
            <div className="flex items-center lg:gap-3">
              <span className="font-semibold text-[#FF6B4F] text-sm lg:text-[18px] flex">
                <TbCurrencyTaka className="text-sm lg:text-xl" />{" "}
                {product.discountedPrice}
              </span>
              <span className="line-through text-[#16161680] flex ">
                <TbCurrencyTaka className="text-sm lg:text-xl" />{" "}
                {product.price}
              </span>
            </div>
          ) : (
            <span className="font-semibold text-[#FF6B4F] text-sm lg:text-[22px] flex">
              <TbCurrencyTaka className="text-sm  lg:text-xl" /> {product.price}
            </span>
          )}
        </div>
        <p className=" text-[#3A3A3AFA] font-nunito">
          {" "}
          Quantity: {product.quantity}
        </p>

        <div className="flex gap-4 mt-4">
          <div
            className="flex items-center bg-[#084C4E4D] text-white rounded-lg overflow-hidden"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <button
              onClick={(e) => {
                decrementQuantity(product.id);
                e.stopPropagation();
                e.preventDefault();
              }}
              className="px-3 py-2"
              aria-label="Decrease quantity"
            >
              <IoRemove className="text-xl" />
            </button>

            <span className="px-4 font-bold">
              {cart[product.id] || 0} in Bag
            </span>

            <button
              onClick={(e) => {
                incrementQuantity(product.id);
                e.stopPropagation();
                e.preventDefault();
              }}
              className="px-3 py-2"
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
            className=" flex items-center justify-center gap-2 bg-[#5E8B8C] hover:bg-[#4f7a7b] text-white font-semibold px-3 py-2 rounded-lg transition-colors duration-200"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProductDetails;
