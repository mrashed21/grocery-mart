"use client";
import CheckoutSkeleton from "@/components/Skeleton/CheckoutSkeleton";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "@/redux/feature/cart/cartSlice";
import { useEffect, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { IoAdd, IoRemove } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { SlCheck } from "react-icons/sl";
import { TbCurrencyTaka } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProductCheckout from "../Home/ProductCheckOut/ProductCheckout";
import SimilarProducts from "./SimilarProducts/SimilarProducts";

const SingleProductDetails = ({
  singleProduct,
  singleProductLoading,
  slug,
}) => {
  const [isDescriptioOpen, setIsDescriptioOpen] = useState(true);
  const [selectedImage, setSelectedImage] = useState(singleProduct?.main_image);
  const [quantity, setQuantity] = useState(1);
  const price =
    singleProduct?.product_discount_price || singleProduct?.product_price;
  const totalPrice = quantity * price;
  const handleDescriptionToggle = () => {
    setIsDescriptioOpen((prev) => !prev);
  };
  const cartItems = useSelector((state) => state.grocery_mart.products);
  const dispatch = useDispatch();

  const foundCartItem = cartItems.find(
    (item) => item.productId === singleProduct?._id
  );
  const isProductInCart = !!foundCartItem;

  useEffect(() => {
    if (singleProduct?.main_image) {
      setSelectedImage(singleProduct?.main_image);
    }

    const foundCartItem = cartItems.find(
      (item) => item.productId === singleProduct?._id
    );

    if (foundCartItem) {
      setQuantity(foundCartItem.quantity);
    } else {
      setQuantity(1);
    }
  }, [singleProduct, cartItems]);

  const handleAddToCart = (product) => {
    dispatch(addToCart({ productId: product?._id, quantity: 1 }));
    toast.success(`${product?.product_name} added to your bag`, {
      autoClose: 2000,
    });
  };

  const handleRemove = (product) => {
    dispatch(
      removeFromCart({
        productId: product?._id,
        product_quantity: product?.quantity,
      })
    );
    toast.error(`${product?.product_name} removed from your bag`, {
      autoClose: 2000,
    });
  };

  const handleMainImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleIncrement = (productId, product_quantity) => {
    if (isProductInCart) {
      const currentQty = foundCartItem?.quantity || 0;

      if (currentQty >= product_quantity) {
        toast.error("Maximum stock limit reached", {
          autoClose: 2000,
        });
        return;
      }

      dispatch(incrementQuantity({ productId, product_quantity }));
    } else {
      const currentQty = quantity || 0;
      if (currentQty >= product_quantity) {
        toast.error("Maximum stock limit reached", {
          autoClose: 2000,
        });
        return;
      }
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = (productId) => {
    if (isProductInCart) {
      dispatch(decrementQuantity({ productId }));
    } else {
      setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    }
  };

  return (
    <main className="grid grid-cols-1 lg:grid-cols-12 lg:gap-10">
      {singleProductLoading ? (
        <div className=" col-span-8 ">
          <CheckoutSkeleton />
        </div>
      ) : (
        <>
          <section className=" lg:col-span-8">
            <div className="flex flex-col lg:flex-row gap-2 font-nunito">
              <div className="">
                {/* Image or Video preview */}
                <section className="relative overflow-hidden group w-full">
                  <div className="relative w-full h-full overflow-hidden">
                    <img
                      src={selectedImage}
                      alt="Main Preview"
                      className={`w-[420px] h-[280px]  transition-transform duration-300`}
                    />
                  </div>
                </section>

                {/* Thumbnail list */}
                <div className="flex flex-row gap-3 overflow-y-auto scrollbar-thin h-[95px] w-full lg:w-[420px] mt-5 p-2">
                  {/* Main image thumbnail */}
                  <img
                    src={singleProduct?.main_image}
                    alt="Main Image"
                    onClick={() =>
                      handleMainImageClick(singleProduct?.main_image)
                    }
                    className={`h-16 w-16  cursor-pointer rounded ${
                      selectedImage === singleProduct?.main_image
                        ? "ring-2 ring-[#FF6B4F]"
                        : ""
                    }`}
                  />

                  {/* Other thumbnails */}
                  {singleProduct?.other_images?.map((img, index) => (
                    <img
                      key={index}
                      src={img?.other_image}
                      alt={`Thumbnail ${index + 1}`}
                      onClick={() => handleMainImageClick(img?.other_image)}
                      className={`h-16 w-16 cursor-pointer rounded ${
                        selectedImage === img?.other_image
                          ? "ring-2 ring-[#FF6B4F]"
                          : ""
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* details */}
              <section className="p-4 flex flex-col  ">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl lg:text-2xl font-bold text-[#3A3A3AFA]">
                    {singleProduct.product_name}
                  </h2>
                  {/* stock */}
                  <div className="lg:hidden">
                    {Number(singleProduct?.product_quantity ?? 0) > 0 ? (
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
                  <span className="">
                    {" "}
                    {singleProduct.category_id?.category_name}
                  </span>
                </p>

                <section className="flex justify-between my-2 lg:my-3">
                  {singleProduct?.product_discount_price ? (
                    <div className="flex items-center lg:gap-3">
                      <span className="font-semibold text-[#FF6B4F] lg:text-[18px] flex">
                        <TbCurrencyTaka className=" lg:text-xl" />{" "}
                        {singleProduct?.product_discount_price}
                      </span>
                      <span className="line-through text-[#16161680] flex ">
                        <TbCurrencyTaka className=" lg:text-xl" />{" "}
                        {singleProduct?.product_price}
                      </span>
                    </div>
                  ) : (
                    <span className="font-semibold text-[#FF6B4F] lg:text-[22px] flex">
                      <TbCurrencyTaka className=" lg:text-xl" />{" "}
                      {singleProduct?.product_price}
                    </span>
                  )}
                </section>
                {/* quantity */}
                <p className=" text-[#3A3A3AFA] font-nunito">
                  {" "}
                  Quantity: {singleProduct?.product_quantity}
                </p>

                {/* stock */}
                <div className="mt-2 hidden lg:flex">
                  {Number(singleProduct?.product_quantity ?? 0) > 0 ? (
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

                <section className="flex  flex-row items-center w-full gap-2 mt-4">
                  <div className="flex items-center">
                    <button
                      onClick={(e) => {
                        handleDecrement(singleProduct._id);
                        e.stopPropagation();
                        e.preventDefault();
                      }}
                      disabled={quantity == 1}
                      className={`px-2 py-1 bg-[#084C4EA6] text-white rounded ${
                        quantity === 1
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer"
                      }
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
                        handleIncrement(
                          singleProduct._id,
                          singleProduct.product_quantity
                        );
                        e.stopPropagation();
                        e.preventDefault();
                      }}
                      disabled={singleProduct?.product_quantity < 0}
                      className={`px-2 py-1 text-white rounded ${
                        singleProduct?.product_quantity <= 0 ||
                        quantity >= singleProduct?.product_quantity
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#084C4EA6] cursor-pointer"
                      }`}
                      aria-label="Increase quantity"
                    >
                      <IoAdd className="text-xl" />
                    </button>
                  </div>

                  <section className="">
                    {singleProduct?.product_quantity > 0 && (
                      <>
                        {isProductInCart ? (
                          <button
                            onClick={() => {
                              handleRemove(singleProduct);
                            }}
                            className=" flex items-center justify-center gap-2 bg-[#FF6B4F]  text-white font-semibold py-1 px-3 shrink-0 rounded-sm transition-colors duration-200 cursor-pointer text-sm"
                          >
                            Remove from Bag
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              handleAddToCart(singleProduct);
                            }}
                            className=" flex items-center justify-center gap-2 bg-[#5E8B8C]  text-white font-semibold py-1 px-5 rounded-sm transition-colors duration-200 cursor-pointer  text-sm"
                          >
                            Add to Bag
                          </button>
                        )}
                      </>
                    )}
                  </section>
                </section>
              </section>
            </div>

            {/* description  */}

            {singleProduct.description && (
              <section className=" mt-5">
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
                  <div
                    className="text-[#00000099] font-nunito text-justify"
                    dangerouslySetInnerHTML={{
                      __html: singleProduct?.description,
                    }}
                  />
                )}
              </section>
            )}
          </section>
        </>
      )}
      <div className="grid-cols-12 lg:col-span-4 mt-8 lg:mt-0">
        <ProductCheckout
          totalPrice={totalPrice}
          singleProduct={singleProduct}
          quantity={quantity}
        />
      </div>
      {/* similar Products */}
      <section className="lg:col-span-12">
        <SimilarProducts slug={slug} />
      </section>
    </main>
  );
};

export default SingleProductDetails;
