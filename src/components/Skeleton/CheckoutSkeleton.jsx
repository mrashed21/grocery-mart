"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CheckoutSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
      <div className="mb-6">
        <Skeleton width="60%" height={24} className="mb-4" />

        <div className="space-y-3">
          <Skeleton height={40} className="rounded-md" />
          <div className="flex gap-2">
            <Skeleton width="30%" height={40} className="rounded-md" />

            <Skeleton width="70%" height={40} className="rounded-md" />
          </div>
          <Skeleton height={40} className="rounded-md" />
          <Skeleton height={80} className="rounded-md" />
        </div>
      </div>

      <div>
        <Skeleton width="50%" height={24} className="mb-4" />

        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <Skeleton width="40%" height={16} />
            <Skeleton width="30%" height={16} />
          </div>
          <div className="flex justify-between items-center">
            <Skeleton width="40%" height={16} />
            <Skeleton width="30%" height={16} />
          </div>
          <div className="flex justify-between items-center">
            <Skeleton width="40%" height={16} />
            <Skeleton width="30%" height={16} />
          </div>
          <hr className="my-3 border-gray-200" />
          <div className="flex justify-between items-center font-bold">
            <Skeleton width="40%" height={20} />
            <Skeleton width="30%" height={20} />
          </div>
        </div>
        <Skeleton height={48} className="mt-6 rounded-lg" />
      </div>
    </div>
  );
};

export default CheckoutSkeleton;
