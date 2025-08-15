"use client";
import Contain from "@/components/common/Contain";
import SingleProductDetails from "@/components/frontend/SingleProduct/SingleProductDetails";
import { useSingleProduct } from "@/lib/getSingleProduct";
import Link from "next/link";
import { SlArrowRight } from "react-icons/sl";

const SingleProductWrapper = ({ slug }) => {
  const { data: singleProduct = [], isLoading: singleProductLoading } =
    useSingleProduct({
      slug,
    });
  return (
    <Contain>
      <section className="py-5">
        <section className="lg:my-5">
          <h2 className="flex mb-2">
            <Link href={"/"} className="flex items-center">
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
        </section>

        <SingleProductDetails
          singleProduct={singleProduct}
          singleProductLoading={singleProductLoading}
          slug={slug}
        />
      </section>
    </Contain>
  );
};

export default SingleProductWrapper;
