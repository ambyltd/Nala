/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Configuration pour le déploiement statique
  output: 'export', // Remplacement de next export
  
  // Résout le problème de conflit entre i18n et output: 'export'
  i18n: process.env.NODE_ENV === 'development'
    ? {
        locales: ['fr'],
        defaultLocale: 'fr',
      } 
    : undefined,
    
  images: {
    // Utilisation de la nouvelle configuration remotePatterns
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    unoptimized: true, // Nécessaire pour les exports statiques
  },
  webpack: (config) => {
    // Vérifier si les modules sont disponibles avant de les utiliser
    try {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
      };
    } catch (error) {
      console.warn('Pour résoudre les problèmes de dépendances, exécutez : npm install crypto-browserify stream-browserify --save-dev');
    }
    return config;
  },
}

module.exports = nextConfig
