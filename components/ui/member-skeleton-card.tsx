"use client";
import React from "react";

const shimmer =
  "bg-[linear-gradient(90deg,_#d1d5db_0%,_#e5e7eb_50%,_#d1d5db_100%)] dark:bg-[linear-gradient(90deg,_#4b5563_0%,_#6b7280_50%,_#4b5563_100%)] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]";

const ShimmerStyles = () => (
  <style jsx>{`
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
  `}</style>
);

export default function MemberSkeletonCard() {
  return (
    <>
      <ShimmerStyles />

      {/* DESKTOP SKELETON */}
      <div className="hidden sm:block w-full max-w-[200px] sm:max-w-[320px] mx-auto">
        <div className="rounded-2xl bg-white dark:bg-black shadow-md border border-gray-300 dark:border-gray-700 overflow-hidden">
          {/* Image */}
          <div className={`aspect-square ${shimmer}`} />

          {/* Name + socials */}
          <div className="p-4 space-y-4">
            <div className={`h-5 w-3/4 mx-auto rounded ${shimmer}`} />
            <div className="flex justify-center gap-4">
              <div className={`h-9 w-9 rounded-full ${shimmer}`} />
              <div className={`h-9 w-9 rounded-full ${shimmer}`} />
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE SKELETON */}
      <div className="block sm:hidden flex flex-col items-center gap-3 py-4">
        <div className={`w-28 h-28 rounded-full ${shimmer}`} />
        <div className={`h-4 w-32 rounded ${shimmer}`} />
        <div className="flex gap-4">
          <div className={`h-8 w-8 rounded-full ${shimmer}`} />
          <div className={`h-8 w-8 rounded-full ${shimmer}`} />
        </div>
      </div>
    </>
  );
}
