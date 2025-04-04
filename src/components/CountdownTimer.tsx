'use client';

import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
  targetDate: string;
  onComplete?: () => void;
}

type TimeRemaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
};

export default function CountdownTimer({ targetDate, onComplete }: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0,
  });
  
  const [isCompleted, setIsCompleted] = useState(false);
  
  const calculateTimeRemaining = (): TimeRemaining => {
    const now = new Date();
    const target = new Date(targetDate);
    const difference = target.getTime() - now.getTime();
    
    // Si la date cible est dépassée
    if (difference <= 0) {
      if (!isCompleted) {
        setIsCompleted(true);
        onComplete && onComplete();
      }
      
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        total: 0,
      };
    }
    
    // Calculer les jours, heures, minutes et secondes restants
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    return {
      days,
      hours,
      minutes,
      seconds,
      total: difference,
    };
  };
  
  useEffect(() => {
    // Première mise à jour immédiate
    setTimeRemaining(calculateTimeRemaining());
    
    // Mettre à jour le compte à rebours chaque seconde
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);
    
    // Nettoyer l'intervalle lorsque le composant est démonté
    return () => clearInterval(interval);
  }, [targetDate]);
  
  // Si le compte à rebours est terminé et que l'offre n'est plus valide
  if (isCompleted) {
    return (
      <div className="text-red-500 font-bold">
        Cette offre a expiré !
      </div>
    );
  }
  
  // Si la date est à plus de 7 jours, n'afficher que les jours
  if (timeRemaining.days > 7) {
    return (
      <div className="text-gray-600 font-semibold">
        Valable encore {timeRemaining.days} jours
      </div>
    );
  }
  
  return (
    <div className="text-red-500 font-bold space-y-1">
      <div className="text-sm">Cette offre expire dans :</div>
      <div className="grid grid-cols-4 gap-1 text-center">
        <div className="bg-gray-800 text-white rounded p-1">
          <div className="text-lg">{String(timeRemaining.days).padStart(2, '0')}</div>
          <div className="text-xs">jours</div>
        </div>
        <div className="bg-gray-800 text-white rounded p-1">
          <div className="text-lg">{String(timeRemaining.hours).padStart(2, '0')}</div>
          <div className="text-xs">heures</div>
        </div>
        <div className="bg-gray-800 text-white rounded p-1">
          <div className="text-lg">{String(timeRemaining.minutes).padStart(2, '0')}</div>
          <div className="text-xs">min</div>
        </div>
        <div className="bg-gray-800 text-white rounded p-1">
          <div className="text-lg">{String(timeRemaining.seconds).padStart(2, '0')}</div>
          <div className="text-xs">sec</div>
        </div>
      </div>
    </div>
  );
}
