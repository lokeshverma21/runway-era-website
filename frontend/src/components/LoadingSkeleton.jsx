import React from 'react'

function LoadingSkeleton() {
  return (
    <div className="text-gray-700 cursor-pointer animate-pulse w-40">
        <div className="overflow-hidden">
            <div className="h-40 bg-gray-300 rounded-sm"></div> {/* Image placeholder */}
            </div>
        <div className="pt-3 pb-1 px-1">
            <div className="h-5 bg-gray-300 rounded-full w-3/4 mb-3"></div> {/* Title placeholder */}
            <div className="h-4 bg-gray-300 rounded-full w-1/4"></div> {/* Price placeholder */}
        </div>
    </div>
  )
}

export default LoadingSkeleton