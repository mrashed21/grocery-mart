import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CategorySkeleton = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="relative h-[120px] sm:h-[230px] rounded-md overflow-hidden"
        >
          <Skeleton height="100%" width="100%" className="rounded-md" />

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] sm:w-[180px]">
            <Skeleton
              height={35}
              className="rounded-md"
              style={{
                borderRadius: "0.375rem",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategorySkeleton;
