'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Destination } from '../types';
import { formatDate, getTimeRemainingMessage, getDaysRemaining } from '../utils/dateUtils';

interface DestinationsGridProps {
  destinations: Destination[];
}

export default function DestinationsGrid({ destinations }: DestinationsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {destinations.map((destination, index) => (
        <motion.div
          key={destination.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Link href={`/destinations/${destination.slug}`} className="card group block">
            <div className="relative h-64 w-full">
              <Image
                src={destination.coverImage}
                alt={destination.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {destination.deadline && (
                <div className="absolute top-0 right-0 bg-yellow-500 text-white px-3 py-1 m-3 rounded-bl-lg text-sm">
                  Jusqu'au {formatDate(destination.deadline)}
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-heading font-bold text-xl mb-2">{destination.name}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{destination.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-primary font-bold">{destination.price} F CFA</span>
                <span className="text-yellow-500">{destination.rating} ★</span>
                <span className="text-sm text-gray-500">{destination.duration} jours</span>
              </div>
              
              {destination.deadline && getDaysRemaining(destination.deadline) <= 7 && (
                <div className="mt-2 text-sm font-medium text-red-600">
                  {getTimeRemainingMessage(destination.deadline)}
                </div>
              )}
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
