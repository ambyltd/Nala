'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const [query, setQuery] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirection vers la page de recherche avec le paramètre query
    window.location.href = `/destinations?q=${encodeURIComponent(query)}`;
  };
  
  return (
    <section className="relative h-screen flex items-center">
      {/* Fond avec image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg" 
          alt="Plage paradisiaque"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-dark bg-opacity-30" />
      </div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl">
          <motion.h1 
            className="text-4xl md:text-6xl font-heading font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Découvrez les destinations <br className="hidden md:inline" /> 
            de vos rêves
          </motion.h1>
          
          <motion.p 
            className="text-xl text-white mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explorez nos destinations paradisiaques et réservez votre prochain voyage en toute simplicité via WhatsApp.
          </motion.p>
          
          <motion.form 
            className="flex w-full max-w-md mb-8"
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <input
              type="text"
              placeholder="Où voulez-vous aller ?"
              className="flex-grow py-3 px-4 rounded-l-md border-0 focus:ring-2 focus:ring-primary outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button 
              type="submit"
              className="bg-primary hover:bg-secondary text-white font-medium px-6 py-3 rounded-r-md transition duration-300"
              aria-label="Rechercher"
            >
              Rechercher
            </button>
          </motion.form>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link 
              href="/destinations" 
              className="text-white font-medium underline hover:text-accent transition-colors"
            >
              Voir toutes nos destinations →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
