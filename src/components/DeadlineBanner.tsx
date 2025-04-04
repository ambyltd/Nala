'use client';

import React, { useState, useEffect } from 'react';
import CountdownTimer from './CountdownTimer';
import Link from 'next/link';

interface DeadlineBannerProps {
  title: string;
  expiryDate: string;
  link?: string;
  linkText?: string;
}

export default function DeadlineBanner({ 
  title, 
  expiryDate, 
  link, 
  linkText = "Voir l'offre" 
}: DeadlineBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpired, setIsExpired] = useState(false);

  // Vérifier si la date est dépassée
  useEffect(() => {
    const checkExpiry = () => {
      const now = new Date();
      const expiry = new Date(expiryDate);
      setIsExpired(now > expiry);
    };

    checkExpiry();
    const intervalId = setInterval(checkExpiry, 60000); // Vérifier toutes les minutes

    return () => clearInterval(intervalId);
  }, [expiryDate]);

  // Cacher la bannière si la date est dépassée
  if (isExpired || !isVisible) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-3">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-3 md:mb-0">
            <span className="inline-block animate-pulse mr-3">⚡</span>
            <span className="font-medium">{title}</span>
          </div>
          
          <div className="flex items-center">
            <CountdownTimer 
              targetDate={expiryDate} 
              onComplete={() => setIsVisible(false)} 
            />
            
            {link && (
              <Link 
                href={link} 
                className="ml-4 bg-white text-red-600 hover:bg-gray-100 px-4 py-1 rounded-full text-sm font-medium"
              >
                {linkText}
              </Link>
            )}
            
            <button 
              onClick={() => setIsVisible(false)}
              className="ml-4 text-white hover:text-red-200 focus:outline-none"
              aria-label="Fermer"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
