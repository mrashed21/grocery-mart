import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const GroceryMartSkeleton = () => {
  return (
    <div className="flex items-center gap-2">
      {/* Logo placeholder */}
      <Skeleton circle width={40} height={40} />

      {/* Text placeholder */}
      <Skeleton width={120} height={20} />
    </div>
  );
};

export default GroceryMartSkeleton;
