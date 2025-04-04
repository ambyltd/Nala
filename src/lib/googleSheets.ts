process.env.NODE_OPTIONS = '--openssl-legacy-provider';

import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { Destination, Deal } from '../types';
import { cache } from 'react';

// Connexion à Google Sheets avec les identifiants
const SHEET_ID = process.env.GOOGLE_SHEET_ID || '';
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL || '';
// Correction du formatage de la clé privée pour résoudre l'erreur de décodage
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY 
  ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/gm, '\n')
  : '';

// Fonction de journalisation pour le service Google Sheets
const logGoogleSheetsService = (message: string) => {
  const timestamp = new Date().toISOString();
  console.log(`[GoogleSheets ${timestamp}] ${message}`);
};

// Fonction pour vérifier les informations d'identification
const checkCredentials = () => {
  logGoogleSheetsService('Vérification des informations d\'identification Google Sheets...');
  
  if (!SHEET_ID) {
    logGoogleSheetsService('⚠️ ERREUR: ID de feuille Google manquant (GOOGLE_SHEET_ID)');
    return false;
  }
  
  if (!GOOGLE_CLIENT_EMAIL) {
    logGoogleSheetsService('⚠️ ERREUR: Email client Google manquant (GOOGLE_CLIENT_EMAIL)');
    return false;
  }
  
  if (!GOOGLE_PRIVATE_KEY) {
    logGoogleSheetsService('⚠️ ERREUR: Clé privée Google manquante (GOOGLE_PRIVATE_KEY)');
    return false;
  }
  
  logGoogleSheetsService('✅ Informations d\'identification vérifiées');
  return true;
};

// Fonction pour créer un client JWT avec gestion d'erreurs améliorée
const createJWTClient = () => {
  try {
    logGoogleSheetsService('Création du client JWT...');
    
    // Vérifier que les identifiants sont disponibles
    if (!checkCredentials()) {
      return null;
    }
    
    // Vérification préliminaire de la clé privée
    if (GOOGLE_PRIVATE_KEY.length < 50) {
      logGoogleSheetsService('⚠️ AVERTISSEMENT: La clé privée semble trop courte ou mal formatée');
    }
    
    logGoogleSheetsService(`Tentative d'authentification avec l'email: ${GOOGLE_CLIENT_EMAIL.substring(0, 5)}...`);
    const jwt = new JWT({
      email: GOOGLE_CLIENT_EMAIL,
      key: GOOGLE_PRIVATE_KEY,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    
    logGoogleSheetsService('✅ Client JWT créé avec succès');
    return jwt;
  } catch (error) {
    logGoogleSheetsService(`❌ Erreur lors de la création du client JWT: ${error}`);
    if (error instanceof Error) {
      logGoogleSheetsService(`Détails de l'erreur: ${error.stack}`);
    }
    return null;
  }
};

// Fonction utilitaire pour vérifier si une date limite est dépassée
const isExpired = (deadline?: string): boolean => {
  if (!deadline) return false;
  try {
    const deadlineDate = new Date(deadline);
    const currentDate = new Date();
    return currentDate > deadlineDate;
  } catch (e) {
    logGoogleSheetsService(`Erreur lors de la vérification de la date: ${e}`);
    return false;
  }
};

// Fonction utilitaire pour filtrer les éléments expirés
const filterExpiredItems = <T extends { deadline?: string }>(items: T[]): T[] => {
  return items.filter(item => !isExpired(item.deadline));
};

// Fonction de secours qui renvoie des données fictives en cas d'échec de connexion à l'API
const getFallbackDestinations = (): Destination[] => {
  console.log('Utilisation des données de secours...');
  return [
    {
      id: '1',
      slug: 'marrakech',
      name: 'Marrakech',
      description: 'Découvrez la magie de Marrakech, entre souks colorés et jardins luxuriants.',
      content: '<p>Marrakech, surnommée la ville rouge, est une destination fascinante qui mêle traditions berbères et influences arabes. Promenez-vous dans les souks animés, visitez le Jardin Majorelle ou détendez-vous dans un hammam traditionnel.</p>',
      price: 799000,
      duration: 7,
      coverImage: 'https://images.unsplash.com/photo-1597211684565-dca64d72bdfe',
      gallery: [
        'https://images.unsplash.com/photo-1598459590364-74282376cf98',
        'https://images.unsplash.com/photo-1655666017544-da95c54f3bd4',
        'https://images.unsplash.com/photo-1539020140153-e8910f507492'
      ],
      bestSeason: 'Printemps, Automne',
      featured: true,
      rating: 4.8,
      included: ['Vols A/R inclus', 'Hôtel 4 étoiles', 'Visites guidées'],
      excluded: ['Dépenses personnelles', 'Repas non inclus'],
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 jours dans le futur
    },
    {
      id: '2',
      slug: 'bali',
      name: 'Bali',
      description: 'L\'île des dieux vous accueille pour un séjour mêlant spiritualité, plages paradisiaques et rizières.',
      content: '<p>Bali est une destination idéale pour se ressourcer. Découvrez ses temples ancestraux, ses plages de sable fin et ses rizières en terrasses. Immergez-vous dans la culture balinaise lors d\'une cérémonie traditionnelle.</p>',
      price: 1299000,
      duration: 12,
      coverImage: 'https://images.unsplash.com/photo-1557093793-e196ae071479',
      gallery: [
        'https://images.unsplash.com/photo-1520222340026-5ebde820fea8',
        'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b',
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4'
      ],
      bestSeason: 'Mai-Septembre',
      featured: true,
      rating: 4.9,
      included: ['Vols A/R inclus', 'Hôtel 5 étoiles', 'Excursions guidées'],
      excluded: ['Dépenses personnelles', 'Repas non inclus']
    },
    {
      id: '3',
      slug: 'santorini',
      name: 'Santorin',
      description: 'Découvrez les maisons blanches, les coupoles bleues et les couchers de soleil spectaculaires.',
      content: '<p>Santorin est l\'une des îles les plus romantiques de Grèce. Ses villages perchés sur les falaises offrent une vue imprenable sur la mer Égée. Profitez de ses plages volcaniques et de sa gastronomie locale.</p>',
      price: 1099500,
      duration: 8,
      coverImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
      gallery: [
        'https://images.unsplash.com/photo-1515488764276-beab7607c1e6',
        'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e',
        'https://images.unsplash.com/photo-1555503679-9576d2feb5c2'
      ],
      bestSeason: 'Mai-Octobre',
      featured: true,
      rating: 4.7,
      included: ['Vols A/R inclus', 'Hôtel de charme', 'Croisière dans les îles'],
      excluded: ['Dépenses personnelles', 'Repas non inclus']
    },
  ];
};

// Fonction de secours qui renvoie des offres spéciales fictives en cas d'échec de connexion à l'API
const getFallbackDeals = () => {
  console.log('Utilisation des offres spéciales de secours...');
  return [
    {
      id: "deal1",
      title: "Week-end à Paris",
      description: "Escapade romantique de 3 jours dans la ville lumière",
      destination: "Paris, France",
      originalPrice: 4500000,
      discountedPrice: 3490000,
      discountPercentage: 22,
      validUntil: "2023-12-31",
      imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "deal2",
      title: "Aventure à Bali",
      description: "10 jours de détente et d'exploration",
      destination: "Bali, Indonésie",
      originalPrice: 1200500,
      discountedPrice: 899000,
      discountPercentage: 25,
      validUntil: "2023-11-30",
      imageUrl: "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "deal3",
      title: "Séjour à Santorin",
      description: "7 jours dans le joyau des Cyclades",
      destination: "Santorin, Grèce",
      originalPrice: 950000,
      discountedPrice: 799500,
      discountPercentage: 16,
      validUntil: "2024-01-15",
      imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1000&auto=format&fit=crop"
    }
  ];
};

// Ajout d'un TTL (Time To Live) pour le cache des données
const CACHE_TTL = 3600000; // 1 heure en millisecondes
let cachedDestinations: Destination[] | null = null;
let lastCacheTime = 0;

// Ajout d'un cache spécifique pour les offres spéciales
let cachedDeals: Deal[] | null = null;
let lastDealsCacheTime = 0;

// Utilise la fonction 'cache' de Next.js pour mettre en cache les résultats
export const fetchAllDestinations = cache(async (): Promise<Destination[]> => {
  try {
    // Utiliser le cache si disponible et pas expiré
    const now = Date.now();
    if (cachedDestinations && (now - lastCacheTime < CACHE_TTL)) {
      logGoogleSheetsService('Utilisation des données en cache...');
      return cachedDestinations;
    }

    logGoogleSheetsService('🔄 Démarrage de la récupération des données depuis Google Sheets...');
    logGoogleSheetsService(`Tentative de connexion à Google Sheets avec l'email: ${GOOGLE_CLIENT_EMAIL}`);
    logGoogleSheetsService(`ID de la feuille utilisée: ${SHEET_ID}`);
    
    const jwt = createJWTClient();
    if (!jwt) {
      logGoogleSheetsService('❌ Impossible de créer le client JWT - utilisation des données de secours');
      return getFallbackDestinations();
    }
    
    logGoogleSheetsService('📄 Initialisation du document Google Sheets...');
    const doc = new GoogleSpreadsheet(SHEET_ID, jwt);
    
    try {
      logGoogleSheetsService('⏳ Chargement des informations du document...');
      await doc.loadInfo();
      logGoogleSheetsService(`✅ Document chargé avec succès: "${doc.title}" (${doc.sheetCount} feuilles)`);
      
      // Afficher les noms de toutes les feuilles disponibles pour le diagnostic
      const sheetTitles = doc.sheetsByIndex.map(sheet => sheet.title).join(', ');
      logGoogleSheetsService(`📋 Feuilles disponibles: ${sheetTitles}`);
    } catch (loadError) {
      logGoogleSheetsService(`❌ Erreur lors du chargement du document: ${loadError}`);
      if (loadError instanceof Error && loadError.stack) {
        logGoogleSheetsService(`Trace d'erreur: ${loadError.stack}`);
      }
      logGoogleSheetsService('➡️ Utilisation des données de secours suite à l\'échec de chargement');
      return getFallbackDestinations();
    }
    
    const sheet = doc.sheetsByTitle['destinations'];
    if (!sheet) {
      logGoogleSheetsService('❌ Feuille "destinations" non trouvée dans le document');
      logGoogleSheetsService('➡️ Utilisation des données de secours suite à l\'absence de feuille appropriée');
      return getFallbackDestinations();
    }
    
    logGoogleSheetsService(`⏳ Récupération des lignes de la feuille "${sheet.title}" (${sheet.rowCount} lignes au total)...`);
    const rows = await sheet.getRows();
    logGoogleSheetsService(`✅ ${rows.length} lignes récupérées avec succès`);
    
    logGoogleSheetsService('🔄 Transformation des lignes en objets Destination...');
    const destinations = rows.map((row) => ({
      id: row.get('id') || String(Math.random()),
      slug: row.get('slug'),
      name: row.get('name'),
      description: row.get('description'),
      content: row.get('content'),
      price: parseFloat(row.get('price')) || 0,
      duration: parseInt(row.get('duration')) || 0,
      coverImage: row.get('coverImage'),
      gallery: JSON.parse(row.get('gallery') || '[]'),
      bestSeason: row.get('bestSeason') || 'Toute l\'année',
      featured: row.get('featured') === 'true',
      rating: parseFloat(row.get('rating') || '0'),
      included: JSON.parse(row.get('included') || '[]'),
      excluded: JSON.parse(row.get('excluded') || '[]'),
      deadline: row.get('deadline') || undefined, // Récupérer la date limite
    }));
    
    // Filtrer les destinations expirées
    const activeDestinations = filterExpiredItems(destinations);
    logGoogleSheetsService(`🕒 ${destinations.length - activeDestinations.length} destinations filtrées car expirées`);
    
    // Mettre en cache les résultats
    logGoogleSheetsService(`✅ ${activeDestinations.length} destinations actives mises en cache avec succès`);
    cachedDestinations = activeDestinations;
    lastCacheTime = now;
    return activeDestinations;
  } catch (error) {
    logGoogleSheetsService(`❌ Erreur lors de la récupération des destinations: ${error}`);
    if (error instanceof Error && error.stack) {
      logGoogleSheetsService(`Trace d'erreur: ${error.stack}`);
    }
    logGoogleSheetsService('➡️ Utilisation des données de secours suite à une erreur générale');
    // Retourner des données fictives en cas d'erreur
    return getFallbackDestinations();
  }
});

export const fetchTopDestinations = cache(async (): Promise<Destination[]> => {
  try {
    logGoogleSheetsService('📊 Récupération des destinations populaires...');
    const destinations = await fetchAllDestinations();
    const topDestinations = destinations.filter(d => d.featured).slice(0, 6);
    logGoogleSheetsService(`✅ ${topDestinations.length} destinations populaires récupérées`);
    return topDestinations;
  } catch (error) {
    logGoogleSheetsService(`❌ Erreur lors de la récupération des destinations populaires: ${error}`);
    return getFallbackDestinations().filter(d => d.featured);
  }
});

export const getDestination = cache(async (slug: string): Promise<Destination | null> => {
  try {
    logGoogleSheetsService(`🔍 Recherche de la destination avec le slug: ${slug}`);
    const destinations = await fetchAllDestinations();
    const destination = destinations.find(d => d.slug === slug) || null;
    logGoogleSheetsService(destination ? `✅ Destination "${destination.name}" trouvée` : `❌ Aucune destination trouvée avec le slug: ${slug}`);
    return destination;
  } catch (error) {
    logGoogleSheetsService(`❌ Erreur lors de la récupération de la destination ${slug}: ${error}`);
    return getFallbackDestinations().find(d => d.slug === slug) || null;
  }
});

// Fonction pour diagnostiquer les problèmes d'accès à Google Sheets
export const diagnoseGoogleSheets = cache(async (): Promise<{
  success: boolean;
  message: string;
  details?: any;
}> => {
  try {
    logGoogleSheetsService('🔍 Diagnostic de connexion Google Sheets démarré...');
    
    // Vérifier les variables d'environnement
    if (!SHEET_ID) {
      return { 
        success: false, 
        message: 'ID Google Sheets manquant',
        details: 'La variable d\'environnement GOOGLE_SHEET_ID n\'est pas définie'
      };
    }

    // Afficher une version tronquée de l'ID pour le debugging
    const displayId = SHEET_ID.length > 8 
      ? `${SHEET_ID.substring(0, 4)}...${SHEET_ID.substring(SHEET_ID.length-4)}`
      : SHEET_ID;
    logGoogleSheetsService(`🔑 Tentative d'accès au document ID: ${displayId}`);
    
    // Créer le client JWT
    const jwt = createJWTClient();
    if (!jwt) {
      return { 
        success: false, 
        message: 'Impossible de créer le client JWT',
        details: 'Vérifiez GOOGLE_CLIENT_EMAIL et GOOGLE_PRIVATE_KEY'
      };
    }
    
    // Tenter de charger le document
    const doc = new GoogleSpreadsheet(SHEET_ID, jwt);
    await doc.loadInfo();
    
    // Si on arrive ici, le document est accessible
    return {
      success: true,
      message: `Document "${doc.title}" accessible avec ${doc.sheetCount} feuilles`,
      details: {
        title: doc.title,
        sheetCount: doc.sheetCount,
        sheetTitles: doc.sheetsByIndex.map(s => s.title)
      }
    };
  } catch (error) {
    // Analyser l'erreur pour donner un message plus précis
    let errorDetails = 'Erreur inconnue';
    let suggestion = '';
    
    if (error instanceof Error) {
      errorDetails = error.message;
      
      // Analyse spécifique pour les codes d'erreur courants
      if (error.message.includes('404') || error.message.includes('not found')) {
        suggestion = 'Le document n\'existe pas ou l\'ID est incorrect. Vérifiez que l\'ID Google Sheet est correct et que le document existe.';
      } else if (error.message.includes('403') || error.message.includes('forbidden')) {
        suggestion = 'Problème de permissions. Vérifiez que le document est partagé avec l\'email du compte de service avec au moins l\'accès "Lecteur".';
      } else if (error.message.includes('401') || error.message.includes('unauthorized')) {
        suggestion = 'Problème d\'authentification. Vérifiez que les informations d\'identification du compte de service sont correctes.';
      }
    }
    
    return {
      success: false,
      message: 'Échec d\'accès au document Google Sheets',
      details: {
        error: errorDetails,
        suggestion: suggestion || 'Vérifiez l\'ID du document et les permissions du compte de service.',
        sheetId: SHEET_ID,
        serviceAccount: GOOGLE_CLIENT_EMAIL
      }
    };
  }
});

export const fetchDeals = cache(async (): Promise<Deal[]> => {
  try {
    // Utiliser le cache si disponible et pas expiré
    const now = Date.now();
    if (cachedDeals && (now - lastDealsCacheTime < CACHE_TTL)) {
      logGoogleSheetsService('Utilisation des offres spéciales en cache...');
      return cachedDeals;
    }

    logGoogleSheetsService('🔄 Démarrage de la récupération des offres spéciales depuis Google Sheets...');
    
    const jwt = createJWTClient();
    if (!jwt) {
      logGoogleSheetsService('❌ Impossible de créer le client JWT - utilisation des offres spéciales de secours');
      return getFallbackDeals();
    }
    
    logGoogleSheetsService('📄 Initialisation du document Google Sheets pour les offres spéciales...');
    const doc = new GoogleSpreadsheet(SHEET_ID, jwt);
    
    try {
      await doc.loadInfo();
      logGoogleSheetsService(`✅ Document chargé avec succès: "${doc.title}"`);
    } catch (loadError) {
      logGoogleSheetsService(`❌ Erreur lors du chargement du document: ${loadError}`);
      return getFallbackDeals();
    }
    
    // Recherche de la feuille "deals" ou "offres" pour les offres spéciales
    const sheet = doc.sheetsByTitle['deals'] || doc.sheetsByTitle['offres'];
    if (!sheet) {
      logGoogleSheetsService('❌ Feuille "deals" ou "offres" non trouvée dans le document');
      return getFallbackDeals();
    }
    
    logGoogleSheetsService(`⏳ Récupération des lignes de la feuille "${sheet.title}"...`);
    const rows = await sheet.getRows();
    logGoogleSheetsService(`✅ ${rows.length} offres spéciales récupérées avec succès`);
    
    logGoogleSheetsService('🔄 Transformation des lignes en objets d\'offres spéciales...');
    const deals = rows.map((row) => ({
      id: row.get('id') || String(Math.random()),
      title: row.get('title'),
      description: row.get('description'),
      destination: row.get('destination'),
      originalPrice: parseFloat(row.get('originalPrice')) || 0,
      discountedPrice: parseFloat(row.get('discountedPrice')) || 0,
      discountPercentage: parseFloat(row.get('discountPercentage')) || 
                         Math.round((1 - (parseFloat(row.get('discountedPrice')) / parseFloat(row.get('originalPrice')))) * 100),
      validUntil: row.get('validUntil'),
      imageUrl: row.get('imageUrl'),
      deadline: row.get('deadline') || row.get('validUntil') || undefined // Utiliser validUntil comme deadline si deadline n'est pas défini
    }));
    
    // Filtrer les offres invalides et expirées
    const validDeals = deals.filter(deal => deal.title && deal.description);
    const activeDeals = filterExpiredItems(validDeals);
    
    // Filtrer également par validUntil
    const currentDate = new Date();
    const finalDeals = activeDeals.filter(deal => {
      if (!deal.validUntil) return true;
      try {
        const validUntilDate = new Date(deal.validUntil);
        return currentDate <= validUntilDate;
      } catch (e) {
        return true;
      }
    });
    
    logGoogleSheetsService(`🕒 ${validDeals.length - finalDeals.length} offres filtrées car expirées`);
    
    // Mettre en cache les résultats
    logGoogleSheetsService(`✅ ${finalDeals.length} offres spéciales valides et actives mises en cache`);
    cachedDeals = finalDeals;
    lastDealsCacheTime = now;
    return finalDeals;
  } catch (error) {
    logGoogleSheetsService(`❌ Erreur lors de la récupération des offres spéciales: ${error}`);
    if (error instanceof Error && error.stack) {
      logGoogleSheetsService(`Trace d'erreur: ${error.stack}`);
    }
    logGoogleSheetsService('➡️ Utilisation des offres spéciales de secours suite à une erreur générale');
    return getFallbackDeals();
  }
});
