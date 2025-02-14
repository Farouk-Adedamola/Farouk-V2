import React from 'react';

import { Clock, Activity, Calendar, Code } from 'lucide-react';

const ShimmerLoadingState = () => {
  return (
    <div className="relative rounded-lg border border-gray-800/50 bg-gray-900/30 p-8 backdrop-blur-sm">
      <div className="mb-8 flex items-center justify-between">
        <div className="h-4 w-24 animate-pulse rounded-full bg-gray-800" />
        <div className="h-3 w-16 animate-pulse rounded-full bg-gray-800" />
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {[Clock, Activity, Calendar].map((Icon, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 rounded-lg border border-gray-800/50 bg-gray-900/50 p-4"
          >
            <div className="flex items-center gap-2 text-gray-700">
              <Icon size={16} />
              <div className="h-3 w-20 animate-pulse rounded-full bg-gray-800" />
            </div>
            <div className="h-6 w-24 animate-pulse rounded-full bg-gray-800" />
            {index === 2 && (
              <div className="h-3 w-16 animate-pulse rounded-full bg-gray-800" />
            )}
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-gray-700">
          <Code size={16} />
          <div className="h-3 w-16 animate-pulse rounded-full bg-gray-800" />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-md border border-gray-800/50 bg-gray-900/50 p-3"
            >
              <div className="flex flex-col gap-1">
                <div className="h-4 w-20 animate-pulse rounded-full bg-gray-800" />
                <div className="h-3 w-12 animate-pulse rounded-full bg-gray-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShimmerLoadingState;
