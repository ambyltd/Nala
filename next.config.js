/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Suppression de la configuration pour export statique
  // output: 'export', // Cette option cause des problèmes avec les routes dynamiques
  
  images: {
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
    unoptimized: true, 
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
