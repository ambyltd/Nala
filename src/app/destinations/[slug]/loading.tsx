import React from 'react';

export default function LoadingDestinationPage() {
  return (
    <div className="py-8">
      <div className="container-custom">
        <div className="animate-pulse">
          {/* Image de couverture */}
          <div className="relative h-[40vh] md:h-[60vh] rounded-lg overflow-hidden mb-8 bg-gray-200"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contenu principal */}
            <div className="md:col-span-2">
              <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
              
              <div className="h-8 bg-gray-200 rounded w-56 mb-4 mt-8"></div>
              <div className="space-y-3 mb-8">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
              
              <div className="h-8 bg-gray-200 rounded w-32 mb-4 mt-8"></div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="aspect-[3/2] bg-gray-200 rounded-md"></div>
                ))}
              </div>
            </div>
            
            {/* Barre latérale */}
            <div className="md:col-span-1">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
                <div className="h-10 bg-green-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
