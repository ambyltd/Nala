'use client';

import React from 'react';
import { useDeadline } from '../hooks/useDeadline';
import { formatDate } from '../utils/dateUtils';

interface LiveDealBadgeProps {
  deadline: string;
  className?: string;
}

/**
 * Badge qui affiche une date limite et se met à jour automatiquement
 * avec un style différent lorsque la date approche ou est dépassée
 */
export default function LiveDealBadge({ deadline, className = '' }: LiveDealBadgeProps) {
  const { isExpired, daysRemaining } = useDeadline(deadline);
  
  // Déterminer la couleur du badge en fonction du temps restant
  let bgColor = 'bg-yellow-500'; // Couleur par défaut
  
  if (isExpired) {
    bgColor = 'bg-gray-500'; // Expiré
  } else if (daysRemaining <= 3) {
    bgColor = 'bg-red-600'; // Très proche de la fin
  } else if (daysRemaining <= 7) {
    bgColor = 'bg-orange-500'; // Proche de la fin
  }
  
  // Générer le message approprié
  let message = `Jusqu'au ${formatDate(deadline)}`;
  
  if (isExpired) {
    message = 'Offre expirée';
  } else if (daysRemaining === 0) {
    message = 'Dernier jour !';
  } else if (daysRemaining === 1) {
    message = 'Dernier jour demain !';
  } else if (daysRemaining <= 7) {
    message = `Plus que ${daysRemaining} jours !`;
  }
  
  return (
    <div className={`${bgColor} text-white px-3 py-1 rounded-lg ${className}`}>
      {message}
    </div>
  );
}
