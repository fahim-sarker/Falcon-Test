import React from 'react'

const SkeletonCard = () => {
    return (
        <div>
            <div className="animate-pulse rounded-lg border border-gray-200 p-4 space-y-4 bg-white">
                <div className="h-48 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
    )
}

export default SkeletonCard
