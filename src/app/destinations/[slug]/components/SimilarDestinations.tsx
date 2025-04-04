'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Destination } from '../../../../types';

interface SimilarDestinationsProps {
  currentSlug: string;
}

export default function SimilarDestinations({ currentSlug }: SimilarDestinationsProps) {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fonction pour charger les destinations similaires
    const loadSimilarDestinations = async () => {
      try {
        // En production, vous remplaceriez ceci par un vrai appel API
        // pour obtenir des destinations similaires basées sur celle actuelle
        const res = await fetch('/api/destinations/similar?slug=' + currentSlug);
        
        if (!res.ok) {
          // Utiliser des données de remplacement si l'API échoue
          setDestinations(getFallbackDestinations());
          return;
        }
        
        const data = await res.json();
        setDestinations(data.slice(0, 3));
      } catch (error) {
        console.error('Erreur lors du chargement des destinations similaires:', error);
        setDestinations(getFallbackDestinations());
      } finally {
        setIsLoading(false);
      }
    };

    loadSimilarDestinations();
  }, [currentSlug]);

  // Destinations de remplacement en cas d'échec de l'API
  const getFallbackDestinations = (): Destination[] => {
    return [
      {
        id: '2',
        slug: 'bali',
        name: 'Bali',
        description: 'L\'île des dieux vous accueille pour un séjour mêlant spiritualité et plages.',
        content: '',
        price: 1299,
        duration: 12,
        coverImage: 'https://images.unsplash.com/photo-1557093793-e196ae071479',
        gallery: [],
        bestSeason: 'Mai-Septembre',
        featured: true,
        rating: 4.9,
        included: [],
        excluded: []
      },
      {
        id: '3',
        slug: 'santorini',
        name: 'Santorin',
        description: 'Maisons blanches et couchers de soleil spectaculaires.',
        content: '',
        price: 1099,
        duration: 8,
        coverImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
        gallery: [],
        bestSeason: 'Mai-Octobre',
        featured: true,
        rating: 4.7,
        included: [],
        excluded:[]
      },
      {
        id: '4',
        slug: 'maldives',
        name: 'Maldives',
        description: 'Paradis sur terre avec ses plages de sable blanc et eau cristalline.',
        content: '',
        price: 1899,
        duration: 10,
        coverImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8',
        gallery: [],
        bestSeason: 'Novembre-Avril',
        featured: true,
        rating: 4.9,
        included: [],
        excluded: []
      }
        
    ];
  };

  if (isLoading) {
    return (
      <div className="mt-12">
        <h3 className="heading text-2xl mb-6">Destinations similaires</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-48 rounded-md mb-2"></div>
              <div className="h-5 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (destinations.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h3 className="heading text-2xl mb-6">Destinations similaires</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {destinations.map((destination, index) => (
          <motion.div
            key={destination.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link href={`/destinations/${destination.slug}`} className="card group block">
              <div className="relative h-48 w-full">
                <Image
                  src={destination.coverImage}
                  alt={destination.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h4 className="font-heading font-bold text-lg mb-1">{destination.name}</h4>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{destination.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-bold">{destination.price} FCFA / pers.</span>
                  <span className="text-sm text-gray-500">{destination.duration} jours</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
