import { TbCurrencyTaka } from "react-icons/tb";

const ProductCard = ({ product }) => {
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="lg:p-4 pt-2 p-2">
        {/* Product Image */}
        <div className="relative">
          <img
            src={product.image || "https://via.placeholder.com/200"}
            alt={product.name}
            className="w-full h-28 lg:h-56 object-cover rounded-md mb-3"
            onError={(e) => {
              e.target.src = "https://i.ibb.co/Gv2QLxnQ/image-2963.png";
            }}
          />

          {/* Offer Badge (if applicable) */}
          {product.is_offer && (
            <span className="absolute top-0 left-0 bg-[#FF6B4F] text-white px-2 py-1 rounded-l-md rounded-r-[15px] text-sm font-bold">
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

          <div className="flex mt-2 justify-between in-checked:">
            {product.is_offer ? (
              <div className="flex items-center gap-1 lg:gap-3">
                <span className="font-semibold text-[#414141] text-sm lg:text-[18px] flex">
                  {" "}
                  <TbCurrencyTaka className="text-sm lg:text-xl" />{" "}
                  {product.discountedPrice}
                </span>
                <span className="line-through text-[#41414199] flex text-xs ">
                  {" "}
                  <TbCurrencyTaka className="text-sm lg:text-xl" />{" "}
                  {product.price}
                </span>
              </div>
            ) : (
              <span className="font-semibold text-[#414141] text-sm lg:text-[18px] flex gap-1">
                {" "}
                <TbCurrencyTaka className="text-sm lg:text-xl" />{" "}
                {product.price}
              </span>
            )}

            <p className="text-sm text-[#9C9C9C]">{product.quantity}</p>
          </div>
        </div>
      </div>

      {/* Add to Bag Button */}
      <button
        className={`w-full py-2 cursor-pointer rounded-b-lg text-base font-medium  bg-[#084C4EA6] text-white`}
      >
        Add to Bag
      </button>
    </div>
  );
};

export default ProductCard;
