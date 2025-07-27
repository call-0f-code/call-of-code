import React from "react";

const shimmerClasses =
  "bg-[linear-gradient(90deg,_#d1d5db_0%,_#e5e7eb_50%,_#d1d5db_100%)] dark:bg-[linear-gradient(90deg,_#4b5563_0%,_#6b7280_50%,_#4b5563_100%)] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]";

export const SkeletonLoader = () => (
  <>
    <style jsx>{`
      @keyframes shimmer {
        0% {
          background-position: -200% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }
    `}</style>

    <div className="p-4 border rounded-lg shadow bg-white dark:bg-gray-900">
      <div className={`h-48 rounded mb-8 ${shimmerClasses}`} />
      <div className={`h-6 rounded mb-2 max-w-44 ${shimmerClasses}`} />
      <div className="flex">
        <div className={`h-14 w-14 rounded-full ${shimmerClasses}`} />
        <div className={`h-14 w-14 rounded-full ${shimmerClasses}`} />
      </div>
    </div>
  </>
);

export const MemberSkeleton = () => (
     <>
    <style jsx>{`
      @keyframes shimmer {
        0% {
          background-position: -200% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }
    `}</style>

    <div className="flex">
        <div className={`h-14 w-14 rounded-full ${shimmerClasses}`} />
        <div className={`h-14 w-14 rounded-full ${shimmerClasses}`} />
    </div>
  </>
);
    

