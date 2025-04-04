'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Toujours true car nécessaire
    preferences: false,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà fait son choix
    const consentStored = localStorage.getItem('cookie-consent');
    if (!consentStored) {
      // Attendre un peu avant d'afficher la bannière
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Récupérer les préférences stockées
      try {
        setPreferences(JSON.parse(consentStored));
      } catch (e) {
        // En cas d'erreur, réinitialiser les préférences
        setIsVisible(true);
      }
      return () => {}; // Empty cleanup function for this path
    }
  }, []);

  // Accepter tous les cookies
  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      preferences: true,
      analytics: true,
      marketing: true
    };
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted));
    setPreferences(allAccepted);
    setIsVisible(false);
  };

  // Accepter uniquement les cookies nécessaires
  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      preferences: false,
      analytics: false,
      marketing: false
    };
    localStorage.setItem('cookie-consent', JSON.stringify(necessaryOnly));
    setPreferences(necessaryOnly);
    setIsVisible(false);
  };

  // Sauvegarder les préférences personnalisées
  const savePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    setShowPreferences(false);
    setIsVisible(false);
  };

  // Mettre à jour une préférence spécifique
  const handlePreferenceChange = (key: keyof typeof preferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white shadow-lg"
      >
        <div className="container-custom">
          {!showPreferences ? (
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold mb-2">Nous utilisons des cookies</h3>
                <p className="text-gray-600 text-sm mb-2">
                  Ce site utilise des cookies pour améliorer votre expérience, analyser le trafic et personnaliser les publicités.
                  Vous pouvez choisir ceux que vous souhaitez autoriser.
                </p>
                <Link href="/cookies" className="text-primary hover:underline text-sm">
                  En savoir plus sur notre politique de cookies
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setShowPreferences(true)}
                  className="text-primary border border-primary hover:bg-primary/5 px-4 py-2 rounded-md text-sm whitespace-nowrap"
                >
                  Personnaliser
                </button>
                <button
                  onClick={acceptNecessary}
                  className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm whitespace-nowrap"
                >
                  Refuser
                </button>
                <button
                  onClick={acceptAll}
                  className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-md text-sm whitespace-nowrap"
                >
                  Tout accepter
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Paramètres des cookies</h3>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Fermer les paramètres"
                >
                  &times;
                </button>
              </div>

              <div className="space-y-4 mb-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <div>
                    <h4 className="font-medium">Cookies essentiels</h4>
                    <p className="text-sm text-gray-600">
                      Nécessaires au bon fonctionnement du site.
                    </p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={preferences.necessary}
                      disabled
                      className="opacity-50 cursor-not-allowed"
                    />
                    <span className="text-xs text-gray-500 block mt-1">Obligatoire</span>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <div>
                    <h4 className="font-medium">Cookies de préférences</h4>
                    <p className="text-sm text-gray-600">
                      Permettent de mémoriser vos préférences de navigation.
                    </p>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      checked={preferences.preferences}
                      onChange={() => handlePreferenceChange('preferences')}
                      className="rounded text-primary focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <div>
                    <h4 className="font-medium">Cookies analytiques</h4>
                    <p className="text-sm text-gray-600">
                      Nous aident à comprendre comment vous utilisez notre site.
                    </p>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={() => handlePreferenceChange('analytics')}
                      className="rounded text-primary focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <div>
                    <h4 className="font-medium">Cookies marketing</h4>
                    <p className="text-sm text-gray-600">
                      Utilisés pour le ciblage publicitaire et le marketing.
                    </p>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={() => handlePreferenceChange('marketing')}
                      className="rounded text-primary focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowPreferences(false)}
                  className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-md text-sm"
                >
                  Annuler
                </button>
                <button
                  onClick={savePreferences}
                  className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-md text-sm"
                >
                  Sauvegarder mes préférences
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
