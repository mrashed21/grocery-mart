"use client";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 p-3 flex flex-col animate-pulse">
      <div className="flex justify-end mb-2">
        <Skeleton width={50} height={20} className="rounded-md" />
      </div>

      <div className="w-full h-36 flex items-center justify-center mb-3">
        <Skeleton width="80%" height="100%" />
      </div>

      <div className="flex flex-col flex-grow">
        <Skeleton width="50%" height={16} className="mb-1" />
        <Skeleton width="80%" height={24} className="mb-2" />

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <Skeleton width={60} height={20} />
            <Skeleton width={40} height={16} />
          </div>
          <Skeleton width={30} height={16} />
        </div>
      </div>

      <div className="mt-auto">
        <Skeleton height={40} className="rounded-lg" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
