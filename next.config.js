/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Configuration pour GitHub Pages
  // Décommentez et ajustez ces lignes selon votre cas d'utilisation
  // basePath: process.env.NODE_ENV === 'production' ? '/nom-du-repo' : '',
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/nom-du-repo/' : '',
  // output: 'export', // Pour générer des fichiers statiques si nécessaire
  
  images: {
    // Suppression de la configuration dépréciée
    // domains: ['lh3.googleusercontent.com', 'drive.google.com', 'images.unsplash.com'],
    
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
  },
  i18n: {
    locales: ['fr'],
    defaultLocale: 'fr',
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
