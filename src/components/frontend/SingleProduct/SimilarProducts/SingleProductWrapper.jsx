"use client";
import Contain from "@/components/common/Contain";
import SingleProductDetails from "@/components/frontend/SingleProduct/SingleProductDetails";
import Link from "next/link";
import { useParams } from "next/navigation";
import { SlArrowRight } from "react-icons/sl";
import productData from "./../../../../../public/productData.json";

const SingleProductWrapper = ({product}) => {
 
  return (
    <Contain>
      <div className="py-5">
        <div className="lg:my-5">
          <h2 className="flex mb-2">
            <Link href={"/"} className="flex items-center">
              {/* {`Home <span><SlArrowRight /></span> Products >  ${"Category"}`}{" "} */}
              Home
              <span>
                <SlArrowRight className="text-sm mx-1" />
              </span>
              Products
              <span>
                <SlArrowRight className="text-sm mx-1" />
              </span>
            </Link>
            <Link href={"/"}>{`${"Category"}`}</Link>
          </h2>
        </div>

        <SingleProductDetails product={product} />
      </div>
    </Contain>
  );
};

export default SingleProductWrapper;

