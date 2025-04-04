import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Destination } from '@/types';
import { formatDate, getDaysRemaining } from '@/utils/dateUtils';

interface DestinationListProps {
  destinations: Destination[];
}

export default function DestinationList({ destinations }: DestinationListProps) {
  if (!destinations || destinations.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Aucune destination n&apos;est disponible actuellement.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {destinations.map((destination) => (
        <Link
          href={`/destinations/${destination.slug}`}
          key={destination.id}
          className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <div className="relative h-60 w-full">
            <Image
              src={destination.coverImage}
              alt={destination.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 bg-primary text-white px-3 py-1 m-3 rounded">
              {destination.price} FCFA
            </div>
            
            {destination.deadline && (
              <div className="absolute top-0 right-0 bg-yellow-500 text-white px-3 py-1 m-3 rounded-bl-lg">
                Jusqu'au {formatDate(destination.deadline)}
              </div>
            )}
          </div>
          
          <div className="p-5">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                {destination.name}
              </h3>
              <div className="flex items-center text-sm text-yellow-500">
                <span className="mr-1">★</span>
                <span className="text-gray-700">{destination.rating}</span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4 line-clamp-2">{destination.description}</p>
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                <span className="inline-flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {destination.duration} jours
                </span>
              </div>
              
              {destination.deadline && getDaysRemaining(destination.deadline) <= 7 && (
                <span className="text-sm font-medium text-red-600 hover:text-red-500">
                  {getDaysRemaining(destination.deadline) <= 0 
                    ? "Dernière chance !" 
                    : `Plus que ${getDaysRemaining(destination.deadline)} jour${getDaysRemaining(destination.deadline) > 1 ? 's' : ''} !`}
                </span>
              )}
              
              <span className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                Voir plus
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
