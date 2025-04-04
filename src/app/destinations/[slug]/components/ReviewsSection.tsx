'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaUserCircle } from 'react-icons/fa';

interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
}

interface ReviewsSectionProps {
  destinationName: string;
  averageRating: number;
}

export default function ReviewsSection({ destinationName, averageRating }: ReviewsSectionProps) {
  // Dans un cas réel, vous chargeriez ces avis depuis votre API
  const [reviews] = useState<Review[]>([
    {
      id: '1',
      name: 'Marie Dupont',
      rating: 5,
      date: '15/03/2023',
      comment: 'Une expérience inoubliable ! L\'organisation était parfaite, l\'hébergement confortable et les activités proposées très intéressantes. Je recommande vivement.'
    },
    {
      id: '2',
      name: 'Thomas Leroy',
      rating: 4,
      date: '02/02/2023',
      comment: 'Très bon séjour dans l\'ensemble. Seul petit bémol : le transfert depuis l\'aéroport qui a été un peu long. Mais la qualité du service et la beauté du lieu compensent largement.'
    },
    {
      id: '3',
      name: 'Sophie Martin',
      rating: 5,
      date: '20/01/2023',
      comment: 'Tout était parfait du début à la fin ! Le personnel était attentionné, les repas délicieux et les excursions très bien organisées. Nous reviendrons sans hésiter !'
    },
  ]);

  // Générer des étoiles pour une note donnée
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <FaStar 
        key={i} 
        className={i < rating ? "text-yellow-500" : "text-gray-300"} 
      />
    ));
  };

  return (
    <section className="mt-12">
      <h3 className="heading text-2xl mb-6">Avis clients</h3>
      
      <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-lg">Note moyenne</h4>
          <div className="flex items-center">
            <div className="flex mr-2">
              {renderStars(Math.round(averageRating))}
            </div>
            <span className="text-lg font-bold">{averageRating.toFixed(1)}/5</span>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Basé sur les avis de nos clients ayant visité {destinationName}.
        </p>
      </div>
      
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <motion.div 
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-sm"
          >
            <div className="flex justify-between mb-2">
              <div className="flex items-center">
                <FaUserCircle className="text-gray-400 mr-2 text-xl" />
                <span className="font-medium">{review.name}</span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
            </div>
            
            <div className="flex mb-3">
              {renderStars(review.rating)}
            </div>
            
            <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <button className="text-primary hover:text-secondary dark:hover:text-primary/80 font-medium transition-colors">
          Voir tous les avis
        </button>
      </div>
    </section>
  );
}
