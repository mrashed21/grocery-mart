"use client";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CartCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 flex items-center space-x-4 border border-gray-200 animate-pulse">
      <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden">
        <Skeleton height={96} width={96} />
      </div>

      <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
        <div className="flex flex-col space-y-2 col-span-1 md:col-span-1">
          <Skeleton width="80%" height={20} />
          <Skeleton width="60%" height={16} />
          <Skeleton width="40%" height={16} />
        </div>

        <div className="flex flex-col items-start md:items-center col-span-1 md:col-span-1">
          <Skeleton width="60px" height={20} />
        </div>

        <div className="flex items-center justify-between md:justify-end space-x-4 col-span-1 md:col-span-1">
          <div className="flex items-center space-x-1">
            <Skeleton width={32} height={32} circle />
            <Skeleton width={30} height={20} />
            <Skeleton width={32} height={32} circle />
          </div>

          <Skeleton width={24} height={24} circle />
        </div>
      </div>
    </div>
  );
};

const CartDetailsSkeleton = ({ count = 3 }) => {
  return (
    <div className="container mx-auto p-4">
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <CartCardSkeleton key={i} />
        ))}
    </div>
  );
};

export default CartDetailsSkeleton;
