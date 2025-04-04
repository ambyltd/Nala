'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaEuroSign, FaSortAmountDown } from 'react-icons/fa';

export default function SearchFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Utiliser l'opérateur de chaînage optionnel (?.) pour éviter les erreurs si searchParams est null
  const [query, setQuery] = useState(searchParams?.get('q') || '');
  const [minPrice, setMinPrice] = useState(searchParams?.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams?.get('maxPrice') || '');
  const [duration, setDuration] = useState(searchParams?.get('duration') || '');
  const [rating, setRating] = useState(searchParams?.get('rating') || '');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    // Si searchParams est null, ne rien faire
    if (!searchParams) return;
    
    // Mettre à jour l'état lorsque les paramètres de recherche changent
    setQuery(searchParams.get('q') || '');
    setMinPrice(searchParams.get('minPrice') || '');
    setMaxPrice(searchParams.get('maxPrice') || '');
    setDuration(searchParams.get('duration') || '');
    setRating(searchParams.get('rating') || '');
  }, [searchParams]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    // Construire les nouveaux paramètres de recherche
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (duration) params.set('duration', duration);
    if (rating) params.set('rating', rating);
    
    // Naviguer avec les nouveaux paramètres
    router.push(`${pathname}?${params.toString()}`);
  }, [query, minPrice, maxPrice, duration, rating, router, pathname]);

  // Réinitialiser les filtres
  const handleReset = () => {
    setQuery('');
    setMinPrice('');
    setMaxPrice('');
    setDuration('');
    setRating('');
    router.push('/destinations');
  };
  
  return (
    <div className="mb-12">
      <form onSubmit={handleSearch}>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une destination..."
              className="w-full py-3 pl-10 pr-4 rounded-md border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          
          <button
            type="button"
            className="md:w-auto flex items-center justify-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            aria-expanded={isFilterOpen}
            aria-controls="filter-panel"
          >
            <FaFilter className="mr-2" />
            Filtres
          </button>
          
          <button
            type="submit"
            className="btn-primary md:w-auto"
          >
            Rechercher
          </button>
        </div>
        
        <motion.div
          id="filter-panel"
          className={`bg-gray-50 rounded-md p-6 mb-6 ${!isFilterOpen ? 'hidden' : 'block'}`}
          initial={false}
          animate={isFilterOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block mb-2 font-medium">Prix minimum</label>
              <div className="relative">
                <FaEuroSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  min="0"
                  placeholder="Prix min"
                  className="w-full py-2 pl-10 pr-4 rounded-md border border-gray-200"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="block mb-2 font-medium">Prix maximum</label>
              <div className="relative">
                <FaEuroSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  min="0"
                  placeholder="Prix max"
                  className="w-full py-2 pl-10 pr-4 rounded-md border border-gray-200"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="block mb-2 font-medium">Durée (jours)</label>
              <div className="relative">
                <FaSortAmountDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  className="w-full py-2 pl-10 pr-4 rounded-md border border-gray-200 bg-white"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                >
                  <option value="">Toutes les durées</option>
                  <option value="1-3">1-3 jours</option>
                  <option value="4-7">4-7 jours</option>
                  <option value="8-14">8-14 jours</option>
                  <option value="15+">15+ jours</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="text-gray-600 hover:text-primary transition-colors"
              onClick={handleReset}
            >
              Réinitialiser les filtres
            </button>
          </div>
        </motion.div>
      </form>
    </div>
  );
}
