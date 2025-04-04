import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = 'Chargement...' }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-10 h-10 border-4 border-blue-400 rounded-full border-t-transparent animate-spin mb-4"></div>
      <p className="text-gray-600">{message}</p>
    </div>
  );
}
