import React from 'react';

export default function LoadingDestinations() {
  return (
    <div className="py-8 md:py-12">
      <div className="container-custom">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded max-w-lg mx-auto mb-6"></div>
          <div className="h-6 bg-gray-200 rounded max-w-xl mx-auto mb-8"></div>
          
          <div className="h-12 bg-gray-200 rounded mb-12"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-5 bg-gray-200 rounded w-20"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
