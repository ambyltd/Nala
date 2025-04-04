'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface GalleryProps {
  images: string[];
}

export default function Gallery({ images }: GalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);
  
  const openLightbox = (index: number) => {
    document.body.style.overflow = 'hidden'; // Empêcher le défilement du body
    setCurrentImageIndex(index);
  };
  
  const closeLightbox = () => {
    document.body.style.overflow = ''; // Restaurer le défilement
    setCurrentImageIndex(null);
  };
  
  const goToNext = () => {
    if (currentImageIndex === null) return;
    setCurrentImageIndex((prevIndex) => prevIndex !== null ? (prevIndex + 1) % images.length : 0);
  };
  
  const goToPrev = () => {
    if (currentImageIndex === null) return;
    setCurrentImageIndex((prevIndex) => prevIndex !== null ? (prevIndex - 1 + images.length) % images.length : 0);
  };
  
  // Gestionnaire de touche pour les flèches du clavier
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === 'ArrowLeft') goToPrev();
  };
  
  if (!images || images.length === 0) return null;
  
  return (
    <>
      <h3 className="heading text-2xl mb-4 mt-8">Galerie</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div 
            key={index}
            className="relative aspect-[3/2] cursor-pointer overflow-hidden rounded-md"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image}
              alt={`Image de galerie ${index + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
      
      {/* Lightbox */}
      <AnimatePresence>
        {currentImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <button
              className="absolute top-4 right-4 text-white p-2 z-10"
              onClick={closeLightbox}
              aria-label="Fermer la galerie"
            >
              <FaTimes size={24} />
            </button>
            
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 z-10"
              onClick={(e) => { e.stopPropagation(); goToPrev(); }}
              aria-label="Image précédente"
            >
              <FaArrowLeft size={24} />
            </button>
            
            <div 
              className="relative w-full max-w-4xl h-full max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[currentImageIndex]}
                alt={`Image en plein écran ${currentImageIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
            
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 z-10"
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              aria-label="Image suivante"
            >
              <FaArrowRight size={24} />
            </button>
            
            <div className="absolute bottom-4 text-white text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
