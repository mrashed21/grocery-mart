"use client";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 p-3 flex flex-col animate-pulse">
      {/* Discount Tag Skeleton (if applicable) */}
      <div className="flex justify-end mb-2">
        <Skeleton width={50} height={20} className="rounded-md" />
      </div>

      {/* Image Area Skeleton */}
      <div className="w-full h-36 flex items-center justify-center mb-3">
        <Skeleton width="80%" height="100%" />
      </div>

      {/* Product Details Skeletons */}
      <div className="flex flex-col flex-grow">
        <Skeleton width="50%" height={16} className="mb-1" /> {/* Category */}
        <Skeleton width="80%" height={24} className="mb-2" />{" "}
        {/* Product Name */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <Skeleton width={60} height={20} /> {/* Price */}
            <Skeleton width={40} height={16} />{" "}
            {/* Strikethrough Price (if offer) */}
          </div>
          <Skeleton width={30} height={16} /> {/* Weight/Unit */}
        </div>
      </div>

      {/* Add to Bag Button Skeleton */}
      <div className="mt-auto">
        {" "}
        {/* Use mt-auto to push button to bottom */}
        <Skeleton height={40} className="rounded-lg" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
