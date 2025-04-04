import { initializeApp, getApps } from 'firebase/app';

// Configuration Firebase depuis les variables d'environnement
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialiser Firebase seulement si ce n'est pas déjà fait
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Variable pour stocker l'instance Analytics
let analyticsPromise: Promise<import('firebase/analytics').Analytics | null> | null = null;

// Fonction lazy-loading pour Analytics
export const getAnalytics = async () => {
  if (typeof window === 'undefined') return null;
  
  if (!analyticsPromise) {
    analyticsPromise = import('firebase/analytics').then(async ({ getAnalytics, isSupported }) => {
      const supported = await isSupported();
      if (supported) {
        return getAnalytics(app);
      }
      return null;
    }).catch(err => {
      console.error('Error initializing analytics:', err);
      return null;
    });
  }
  
  return analyticsPromise;
};

export { app };

// Fonction utilitaire améliorée pour envoyer des événements analytics
// Define interface for event parameters
interface EventParams {
  [key: string]: any;
}

export const trackEvent = async (eventName: string, eventParams: EventParams = {}) => {
  if (typeof window !== 'undefined') {
    try {
      const analytics = await getAnalytics();
      if (analytics) {
        const { logEvent } = await import('firebase/analytics');
        logEvent(analytics, eventName, eventParams);
      }
    } catch (error) {
      console.error('Error logging event:', error);
    }
  }
};

// Fonction pour enregistrer une vue de page
export const trackPageView = async (pageName: string): Promise<void> => {
  await trackEvent('page_view', { page_title: pageName });
};
