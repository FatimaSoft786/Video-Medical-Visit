import React from "react";

const ProfileCardSkeleton = () => {
  return (
    <div className="container pt-7 mx-auto animate-pulse">
      <div className="flex items-center max-md:items-start max-md:flex-col">
        <div className="relative">
          <div className="size-36 max-md:size-20 bg-gray-300 rounded-full mr-6"></div>
        </div>
        <div className="max-md:w-full">
          <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
          <div className="flex gap-4 mt-2 max-md:items-center max-md:justify-center">
            <div className="h-10 bg-gray-300 rounded-lg w-24"></div>
            <div className="h-10 bg-gray-300 rounded-lg w-24"></div>
          </div>
        </div>
        <div className="ml-auto max-md:mt-6 max-md:w-full h-10 bg-gray-300 rounded-lg w-36"></div>
      </div>
      <hr className="my-9" />
      <div className=" p-4 rounded-xl">
        <div className=" mb-6 w-full">
          <nav className="flex space-x-4 w-full">
            <div className="pb-4 flex-1 h-4 bg-gray-300 rounded"></div>
            <div className="pb-4 flex-1 h-4 bg-gray-300 rounded"></div>
          </nav>
        </div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCardSkeleton;
