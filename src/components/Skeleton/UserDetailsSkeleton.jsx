const UserDetailsSkeleton = () => {
  return (
    <div className=" mx-auto p-6 bg-white rounded-2xl shadow-md space-y-6 animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-300 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4" />
          <div className="h-4 bg-gray-300 rounded w-1/2" />
        </div>
      </div>
      <div className="space-y-4">
        {[1, 2, 3, 4].map((_, index) => (
          <div key={index}>
            <div className="h-4 bg-gray-300 rounded w-1/3 mb-2" />
            <div className="h-5 bg-gray-300 rounded w-full" />
          </div>
        ))}
      </div>
      <div className="h-10 bg-gray-300 rounded w-1/3 mt-4" />
    </div>
  );
};

export default UserDetailsSkeleton;
