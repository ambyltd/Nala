'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Sécuriser l'utilisation de pathname en définissant une valeur par défaut
  const path = pathname || '';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white dark:bg-dark shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <Link href="/" className="relative z-10">
            <Image src="/images/logo.svg" alt="Voyage Dream" width={160} height={40} className="h-10 w-auto" />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/"
              className={`font-medium transition-colors ${path === '/' ? 'text-primary' : 'text-dark dark:text-light hover:text-primary'}`}
            >
              Accueil
            </Link>
            <Link 
              href="/destinations"
              className={`font-medium transition-colors ${path.startsWith('/destinations') ? 'text-primary' : 'text-dark dark:text-light hover:text-primary'}`}
            >
              Destinations
            </Link>
            <Link 
              href="/a-propos"
              className={`font-medium transition-colors ${path === '/a-propos' ? 'text-primary' : 'text-dark dark:text-light hover:text-primary'}`}
            >
              À propos
            </Link>
            <Link 
              href="/contact"
              className={`font-medium transition-colors ${path === '/contact' ? 'text-primary' : 'text-dark dark:text-light hover:text-primary'}`}
            >
              Contact
            </Link>
            
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle />
            
            <button 
              className="relative z-10 p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="flex flex-col items-end">
                <span className={`block h-0.5 bg-dark dark:bg-light transition-all duration-300 ${isMenuOpen ? 'w-6 rotate-45 translate-y-1.5' : 'w-6'}`}></span>
                <span className={`block h-0.5 bg-dark dark:bg-light transition-all duration-300 my-1.5 ${isMenuOpen ? 'opacity-0' : 'w-5'}`}></span>
                <span className={`block h-0.5 bg-dark dark:bg-light transition-all duration-300 ${isMenuOpen ? 'w-6 -rotate-45 -translate-y-1.5' : 'w-4'}`}></span>
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="absolute top-0 left-0 w-full bg-white dark:bg-dark shadow-lg pt-20 pb-6 px-6 md:hidden"
              >
                <nav className="flex flex-col space-y-4">
                  <Link 
                    href="/"
                    className={`font-medium text-lg py-2 ${path === '/' ? 'text-primary' : 'text-dark dark:text-light'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Accueil
                  </Link>
                  <Link 
                    href="/destinations"
                    className={`font-medium text-lg py-2 ${path.startsWith('/destinations') ? 'text-primary' : 'text-dark dark:text-light'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Destinations
                  </Link>
                  <Link 
                    href="/a-propos"
                    className={`font-medium text-lg py-2 ${path === '/a-propos' ? 'text-primary' : 'text-dark dark:text-light'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    À propos
                  </Link>
                  <Link 
                    href="/contact"
                    className={`font-medium text-lg py-2 ${path === '/contact' ? 'text-primary' : 'text-dark dark:text-light'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
