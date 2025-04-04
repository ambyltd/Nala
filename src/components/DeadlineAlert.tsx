'use client';

import React, { useState, useEffect } from 'react';
import { Deal, Destination } from '../types';
import { getDaysRemaining, formatDate } from '../utils/dateUtils';
import Link from 'next/link';

interface DeadlineAlertProps {
  items: (Deal | Destination)[];
  maxItems?: number;
}

type ItemWithDeadline = {
  id: string;
  title: string;
  url: string;
  deadline: string;
  daysRemaining: number;
};

export default function DeadlineAlert({ items, maxItems = 3 }: DeadlineAlertProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [urgentItems, setUrgentItems] = useState<ItemWithDeadline[]>([]);
  
  useEffect(() => {
    // Trouver les éléments qui expirent bientôt (dans les 3 jours)
    const itemsWithDeadline = items
      .filter(item => {
        const deadline = 'deadline' in item ? item.deadline : ('validUntil' in item ? item.validUntil : undefined);
        if (!deadline) return false;
        
        const days = getDaysRemaining(deadline);
        return days >= 0 && days <= 3;
      })
      .map(item => {
        const isDestination = 'slug' in item;
        const deadline = isDestination 
          ? (item as Destination).deadline! 
          : ((item as Deal).deadline || (item as Deal).validUntil);
        
        return {
          id: item.id,
          title: isDestination ? (item as Destination).name : (item as Deal).title,
          url: isDestination ? `/destinations/${(item as Destination).slug}` : '#',
          deadline: deadline,
          daysRemaining: getDaysRemaining(deadline)
        };
      })
      .slice(0, maxItems);
      
    setUrgentItems(itemsWithDeadline);
    
    // Afficher l'alerte après un court délai pour ne pas perturber le chargement initial
    if (itemsWithDeadline.length > 0) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
    
    return undefined; // Explicit return for when there are no items
  }, [items, maxItems]);
  
  if (!isVisible || urgentItems.length === 0) {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-red-600 text-white p-4 rounded-lg shadow-lg max-w-sm">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-lg">Offres qui expirent bientôt !</h4>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-white hover:text-gray-200"
          aria-label="Fermer"
        >
          ✕
        </button>
      </div>
      
      <ul className="space-y-2">
        {urgentItems.map(item => (
          <li key={item.id} className="border-t border-red-500 pt-2 first:border-t-0 first:pt-0">
            <Link href={item.url} className="hover:underline">
              <div className="font-medium">{item.title}</div>
              <div className="text-sm text-red-200">
                {item.daysRemaining === 0 
                  ? "Expire aujourd'hui !" 
                  : item.daysRemaining === 1
                    ? "Expire demain !"
                    : `Expire dans ${item.daysRemaining} jours (${formatDate(item.deadline)})`
                }
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
