import CartDetailsSkeleton from "@/components/Skeleton/CartDetailsSkeleton";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "@/redux/feature/cart/cartSlice";
import { IoAdd, IoRemove } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbCurrencyTaka } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

const CheckOutTable = ({ cartItems }) => {
  const cart = useSelector((state) => state.grocery_mart.products);

  const dispatch = useDispatch();

  const handleIncrement = (productId) => {
    dispatch(incrementQuantity({ productId, product_quantity: 50 }));
  };

  const handleDecrement = (productId) => {
    dispatch(decrementQuantity({ productId }));
  };

  const handleRemove = (productId, quantity) => {
    dispatch(removeFromCart({ productId, product_quantity: quantity }));
  };

  return (
    <div className=" bg-[#FAFAFA80] rounded-xl shadow lg:p-8 py-5 lg:py-8 ">
      <h2 className="text-[#084C4E] p-2 lg:p-0 font-bold font-nunito text-[20px]">
        Cart Details
      </h2>
      <hr className="border-t-2 border-gray-200 mx-3 my-2" />

      {cartItems.length === 0 ? (
        <CartDetailsSkeleton />
      ) : (
        <div className=" mx-3 mt-5 flex flex-col space-y-5 font-nunito">
          {cartItems.map((product) => (
            <div className="" key={product.id}>
              <div className="hidden lg:flex bg-[#F4F4F4A6] rounded-xl  lg:justify-between  p-3">
                <div className="w-24 h-24">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full"
                  />
                </div>

                <div className="">
                  <h2 className="text-[#084C4E] text-[20px] font-bold ">
                    {product.name}
                  </h2>
                  <p className="text-[#6D6D6D] text-xs font-medium">
                    Product Tags: {product.category}
                  </p>
                  <p className="text-[#3A3A3AFA] text-xs font-medium">
                    Weight: {product.unit}
                  </p>
                </div>

                <div className="flex flex-col items-center ">
                  <h2 className="text-[#084C4E] text-sm font-medium">Price</h2>
                  <p className="text-[#FF6B4F] flex items-center font-bold ">
                    {product.is_offer ? (
                      <span className="flex items-center">
                        <TbCurrencyTaka size={22} />
                        {product.discountedPrice}
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <TbCurrencyTaka size={22} /> {product.price}
                      </span>
                    )}
                  </p>
                </div>

                <div className="flex flex-col space-y-3 items-center">
                  <h2 className="text-[#084C4E] text-sm font-medium">
                    Quatity
                  </h2>
                  <div className="flex items-center">
                    <button
                      onClick={(e) => {
                        handleDecrement(product.id);
                        e.stopPropagation();
                        e.preventDefault();
                      }}
                      disabled={product?.quantity === 1}
                      // className="px-2 py-1 bg-[#084C4EA6] text-white rounded"
                      className={`px-2 py-1 bg-[#084C4EA6] text-white rounded
    ${
      product.quantity === 1
        ? "cursor-not-allowed opacity-50"
        : "cursor-pointer"
    }
  `}
                      aria-label="Decrease quantity"
                    >
                      <IoRemove className="text-xl" />
                    </button>

                    <span className="px-4 py-[1px] font-bold bg-[#084C4E14]">
                      {product.quantity}
                    </span>

                    <button
                      onClick={(e) => {
                        handleIncrement(product.id);
                        e.stopPropagation();
                        e.preventDefault();
                      }}
                      className="px-2 py-1 bg-[#084C4EA6] text-white rounded"
                      aria-label="Increase quantity"
                    >
                      <IoAdd className="text-xl" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <button
                    onClick={() => {
                      handleRemove(product.id, product.quantity);
                    }}
                    className="mr-5 cursor-pointer text-[#FF6B4F]"
                  >
                    <RiDeleteBin6Line size={25} />
                  </button>
                </div>
              </div>

              {/* mobile table */}
              <div className=" flex gap-1 lg:hidden  bg-[#F4F4F4A6] rounded-xl justify-between p-1 ">
                <div className="w-16 h-16">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full"
                  />
                </div>

                <div className="">
                  <h2 className="text-[#084C4E] text-sm font-bold ">
                    {product.name}
                  </h2>
                  <p className="text-[#6D6D6D] text-xs font-medium">
                    Product Tags: {product.category}
                  </p>
                  <p className="text-[#3A3A3AFA] text-xs font-medium">
                    Weight: {product.unit}
                  </p>
                  {/* button */}
                  <div className="flex items-center mt-1">
                    <button
                      onClick={(e) => {
                        handleDecrement(product.id);
                        e.stopPropagation();
                        e.preventDefault();
                      }}
                      disabled={product?.quantity === 1}
                      // className="px-2 py-1 bg-[#084C4EA6] text-white rounded"
                      className={`px-[5px] py-[2px] bg-[#084C4EA6] text-white rounded
    ${
      product.quantity === 1
        ? "cursor-not-allowed opacity-50"
        : "cursor-pointer"
    }
  `}
                      aria-label="Decrease quantity"
                    >
                      <IoRemove className="text-xs" />
                    </button>

                    <span className="px-[5px] py-0 font-medium ">
                      {product.quantity}
                    </span>

                    <button
                      onClick={(e) => {
                        handleIncrement(product.id);
                        e.stopPropagation();
                        e.preventDefault();
                      }}
                      className="px-[5px] py-[2px] bg-[#084C4EA6] text-white rounded"
                      aria-label="Increase quantity"
                    >
                      <IoAdd className="text-xs" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-center ">
                  <h2 className="text-[#084C4E] text-lg font-medium">Price</h2>
                  <p className="text-[#FF6B4F] text-sm flex items-center font-bold ">
                    {product.is_offer ? (
                      <span className="flex items-center">
                        <TbCurrencyTaka size={18} />
                        {product.discountedPrice}
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <TbCurrencyTaka size={18} /> {product.price}
                      </span>
                    )}
                  </p>
                </div>

                <div className=" top-0.5 -right-3 flex items-center justify-center">
                  <button
                    onClick={() => {
                      handleRemove(product.id, product.quantity);
                    }}
                    className=" ml-5 cursor-pointer text-[#FF6B4F]"
                  >
                    <RiDeleteBin6Line size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckOutTable;
