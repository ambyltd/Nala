'use client';

import { useState, useEffect } from 'react';
import { isExpired, getDaysRemaining } from '../utils/dateUtils';

/**
 * Hook pour gérer l'état d'un délai avec mise à jour automatique
 * @param deadlineStr Date limite au format string (ISO)
 * @returns Objet avec les informations sur le délai
 */
export function useDeadline(deadlineStr?: string) {
  const [isDeadlineExpired, setIsDeadlineExpired] = useState<boolean>(false);
  const [daysRemaining, setDaysRemaining] = useState<number>(0);
  
  useEffect(() => {
    if (!deadlineStr) {
      setIsDeadlineExpired(false);
      setDaysRemaining(0);
      return;
    }
    
    // Vérifie immédiatement l'expiration
    const checkExpiration = () => {
      setIsDeadlineExpired(isExpired(deadlineStr));
      setDaysRemaining(getDaysRemaining(deadlineStr));
    };
    
    // Première vérification
    checkExpiration();
    
    // Configure un intervalle pour vérifier chaque heure
    const interval = setInterval(checkExpiration, 3600000); // 1 heure
    
    return () => clearInterval(interval);
  }, [deadlineStr]);
  
  return {
    isExpired: isDeadlineExpired,
    daysRemaining,
    isUrgent: daysRemaining > 0 && daysRemaining <= 7,
    deadline: deadlineStr
  };
}
