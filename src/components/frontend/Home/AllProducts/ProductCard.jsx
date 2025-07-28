"use client";
import { IoAdd, IoRemove } from "react-icons/io5";
import { TbCurrencyTaka } from "react-icons/tb";

const ProductCard = ({
  product,
  cartQuantity,
  onAddToCart,
  onIncrement,
  onDecrement,
}) => {
  return (
    <div className="border border-gray-200 rounded-[10px] shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="lg:p-4 pt-2 p-2">
        {/* Product Image */}
        <div className="relative">
          <img
            src={product.image }
            alt={product.name}
            width={200}
            height={200}
            className="w-full h-24 lg:h-52 object-cover rounded-md mb-3"
          />

          {/* Offer Badge (if applicable) */}
          {product.is_offer && (
            <span className="absolute top-0 left-0 bg-[#FF6B4F] text-white px-2 py-1 rounded-l-md rounded-r-[15px] text-[10px] lg:text-sm font-bold">
              {product.offer}
            </span>
          )}
        </div>

        {/* Product Details */}
        <div className="mb-3">
          <p className="text-[12px] text-[#6E9F8C]">{product.category}</p>
          <h3 className="font-bold text-[16px] text-[#084C4E] truncate">
            {product.name}
          </h3>

          <div className="flex mt-2 justify-between">
            {product.is_offer ? (
              <div className="flex items-center gap-1 lg:gap-3">
                <span className="font-semibold text-[#414141] text-sm lg:text-[18px] flex">
                  <TbCurrencyTaka className="text-sm lg:text-xl" />{" "}
                  {product.discountedPrice}
                </span>
                <span className="line-through text-[#41414199] flex text-xs ">
                  <TbCurrencyTaka className="text-sm lg:text-xl" />{" "}
                  {product.price}
                </span>
              </div>
            ) : (
              <span className="font-semibold text-[#414141] text-sm lg:text-[18px] flex gap-1">
                <TbCurrencyTaka className="text-sm lg:text-xl" />{" "}
                {product.price}
              </span>
            )}

            <p className="text-sm text-[#9C9C9C]">{product.unit}</p>
          </div>
        </div>
      </div>

      {/* Add to Cart / Quantity Controls */}
      <div className="">
        {cartQuantity === 0 ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onAddToCart(product.id);
            }}
            className="w-full flex items-center justify-center gap-2 bg-[#5E8B8C] hover:bg-[#4f7a7b] text-white font-semibold py-2 rounded-b-[10px] transition-colors duration-200 cursor-pointer"
          >
            Add to Bag
          </button>
        ) : (
          <div
            className={`w-full flex items-center cursor-pointer rounded-b-[10px] text-base font-medium  bg-[#084C4E] text-white`}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onDecrement(product.id);
              }}
              className="flex-shrink-0 cursor-pointer text-white p-2 rounded-full transition-colors duration-200"
              aria-label="Decrease quantity "
            >
              <IoRemove className="text-xl lg:text-2xl" />
            </button>
            <span className="flex-grow text-center text-white border-l-2 border-r-2 lg:mx-5 font-bold lg:text-lg">
              {cartQuantity} in Bag
            </span>
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
        )}
      </div>
    </div>
  );
};

export default ProductCard;
