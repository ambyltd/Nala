'use client';

import { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  // Détecter la préférence système et le thème stocké lors du chargement
  useEffect(() => {
    // Vérifier si l'utilisateur a déjà une préférence enregistrée
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      // Si pas de préférence stockée, utiliser la préférence système
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, []);

  // Changer le thème lorsque le bouton est cliqué
  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    // Appliquer le thème
    document.documentElement.classList.toggle('dark', newDarkMode);
    
    // Stocker la préférence
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-100 dark:bg-dark/30 text-dark dark:text-white hover:bg-gray-200 dark:hover:bg-dark/50 transition-colors"
      aria-label={darkMode ? "Passer au mode clair" : "Passer au mode sombre"}
    >
      {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
    </button>
  );
}
