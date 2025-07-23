// components/skeletons/CheckoutSkeleton.jsx
"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Ensure CSS is imported

const CheckoutSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
      {/* Delivery Information Section Skeleton */}
      <div className="mb-6">
        <Skeleton width="60%" height={24} className="mb-4" />{" "}
        {/* Title: Delivery Information */}
        <div className="space-y-3">
          <Skeleton height={40} className="rounded-md" /> {/* Name input */}
          <div className="flex gap-2">
            <Skeleton width="30%" height={40} className="rounded-md" />{" "}
            {/* Country code dropdown */}
            <Skeleton width="70%" height={40} className="rounded-md" />{" "}
            {/* Phone number input */}
          </div>
          <Skeleton height={40} className="rounded-md" /> {/* Zone dropdown */}
          <Skeleton height={80} className="rounded-md" />{" "}
          {/* Address textarea */}
        </div>
      </div>

      {/* Order Summary Section Skeleton */}
      <div>
        <Skeleton width="50%" height={24} className="mb-4" />{" "}
        {/* Title: Order Summary */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <Skeleton width="40%" height={16} /> {/* Product Price label */}
            <Skeleton width="30%" height={16} /> {/* Product Price value */}
          </div>
          <div className="flex justify-between items-center">
            <Skeleton width="40%" height={16} /> {/* Discount label */}
            <Skeleton width="30%" height={16} /> {/* Discount value */}
          </div>
          <div className="flex justify-between items-center">
            <Skeleton width="40%" height={16} /> {/* Delivery Charge label */}
            <Skeleton width="30%" height={16} /> {/* Delivery Charge value */}
          </div>
          <hr className="my-3 border-gray-200" />
          <div className="flex justify-between items-center font-bold">
            <Skeleton width="40%" height={20} /> {/* Total label */}
            <Skeleton width="30%" height={20} /> {/* Total value */}
          </div>
        </div>
        <Skeleton height={48} className="mt-6 rounded-lg" />{" "}
        {/* Place Order Button */}
      </div>
    </div>
  );
};

export default CheckoutSkeleton;
