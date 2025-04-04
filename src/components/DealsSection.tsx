import React from 'react';
import { Deal } from '../types';
import Image from 'next/image';
import { formatDate, getTimeRemainingMessage } from '../utils/dateUtils';
import WhatsAppButton from './WhatsAppButton';


interface DealsSectionProps {
  deals: Deal[];
}

export default function DealsSection({ deals }: DealsSectionProps) {
  if (!deals || deals.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl font-bold text-center mb-4">Offres Spéciales</h2>
          <p className="text-gray-600 text-center max-w-2xl">
            Profitez de nos promotions exclusives pour des voyages inoubliables à prix réduits
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((deal) => {
            const deadlineDate = deal.deadline || deal.validUntil;
            const remainingTimeMessage = deadlineDate ? getTimeRemainingMessage(deadlineDate) : null;
            
            return (
              <div key={deal.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
                <div className="relative">
                  <Image 
                    src={deal.imageUrl} 
                    alt={deal.title}
                    width={400}
                    height={225}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-red-600 text-white py-1 px-3 rounded-bl-lg font-bold">
                    -{deal.discountPercentage}%
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{deal.title}</h3>
                  <p className="text-gray-600 mb-4">{deal.description}</p>
                  <p className="text-gray-500 mb-1">Destination: {deal.destination}</p>
                  
                  {deadlineDate && (
                    <div className="mb-4">
                      <p className="text-gray-500">
                        Valable jusqu'au: {formatDate(deadlineDate)}
                      </p>
                      {remainingTimeMessage && (
                        <p className="text-red-500 font-semibold mt-1">
                          {remainingTimeMessage}
                        </p>
                      )}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="line-through text-gray-500">{deal.originalPrice} FCFA</div>
                      <div className="text-2xl font-bold text-blue-600 ml-2">{deal.discountedPrice} FCFA</div>
                    </div>
                    <WhatsAppButton destination={deal.description} price={deal.discountedPrice} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
