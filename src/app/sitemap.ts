import { MetadataRoute } from 'next';
import { fetchAllDestinations } from '../lib/googleSheets';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://nala-africa.web.app';
  
  // Routes statiques
  const staticRoutes = [
    '',
    '/destinations',
    '/a-propos',
    '/contact',
    '/faq',
    '/mentions-legales',
    '/confidentialite',
    '/cookies',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));
  
  // Routes dynamiques pour les destinations
  const destinations = await fetchAllDestinations();
  const destinationRoutes = destinations.map(destination => ({
    url: `${baseUrl}/destinations/${destination.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
  
  return [...staticRoutes, ...destinationRoutes];
}
