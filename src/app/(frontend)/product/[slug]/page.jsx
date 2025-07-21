"use client";

import Contain from "@/components/common/Contain";
import SingleProductDetails from "@/components/frontend/SingleProduct/SingleProductDetails";
import { useParams } from "next/navigation";
import productData from "./../../../../../public/productData.json";

const ProductDetails = () => {
  const params = useParams();
  const { slug } = params;
  const product = productData.find((p) => p.slug === slug);

  if (!product) {
    return (
      <Contain>
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-2xl text-red-600 font-bold">
            Product not found!
          </h1>
        </div>
      </Contain>
    );
  }

  return (
    <Contain>
      <div className="py-8 lg:py-14">
        <div className="lg:my-14">
          <h1 className="text-xl lg:text-4xl mb-3 text-[#084C4E] font-nunito font-bold">
            Product Details
          </h1>
        </div>

        <SingleProductDetails product={product} />
      </div>
    </Contain>
  );
};

export default ProductDetails;
