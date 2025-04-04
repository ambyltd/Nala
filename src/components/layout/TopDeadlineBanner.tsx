'use client';

import { useState, useEffect } from 'react';
import { Deal, Destination } from '../../types';
import { getDaysRemaining } from '../../utils/dateUtils';
import DeadlineBanner from '../DeadlineBanner';

interface TopDeadlineBannerProps {
  destinations: Destination[];
  deals: Deal[];
}

export default function TopDeadlineBanner({ destinations, deals }: TopDeadlineBannerProps) {
  const [topUrgentItem, setTopUrgentItem] = useState<{
    title: string;
    deadline: string;
    link: string;
  } | null>(null);
  
  useEffect(() => {
    // Cherche les délais dans les destinations
    const destWithDeadlines = destinations
      .filter(d => d.deadline)
      .map(d => ({
        title: `Offre spéciale ${d.name}`,
        deadline: d.deadline!,
        link: `/destinations/${d.slug}`,
        daysRemaining: getDaysRemaining(d.deadline!)
      }));
    
    // Cherche les délais dans les deals
    const dealsWithDeadlines = deals
      .filter(d => d.deadline || d.validUntil)
      .map(d => ({
        title: `Promotion sur ${d.title}`,
        deadline: d.deadline || d.validUntil,
        link: '#', // Adapter selon votre structure de liens
        daysRemaining: getDaysRemaining(d.deadline || d.validUntil)
      }));
    
    // Combine et trie par urgence (délai restant)
    const allDeadlines = [...destWithDeadlines, ...dealsWithDeadlines]
      .filter(item => item.daysRemaining >= 0 && item.daysRemaining <= 7) // Délai de moins de 7 jours
      .sort((a, b) => a.daysRemaining - b.daysRemaining);
    
    // Prend l'élément le plus urgent s'il existe
    if (allDeadlines.length > 0) {
      setTopUrgentItem({
        title: allDeadlines[0].title,
        deadline: allDeadlines[0].deadline,
        link: allDeadlines[0].link
      });
    }
  }, [destinations, deals]);
  
  if (!topUrgentItem) return null;
  
  return (
    <DeadlineBanner 
      title={topUrgentItem.title}
      expiryDate={topUrgentItem.deadline}
      link={topUrgentItem.link}
    />
  );
}
