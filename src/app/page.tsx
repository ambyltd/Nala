import { Metadata } from 'next'
import { Suspense } from 'react';
import HeroSection from '../components/HeroSection'
import FeatureSection from '../components/FeatureSection'
import Newsletter from '../components/Newsletter'
import TestimonySection from '../components/TestimonySection'
import { fetchTopDestinations, diagnoseGoogleSheets, fetchDeals } from '../lib/googleSheets'
import DestinationList from '../components/DestinationList';
import LoadingSpinner from '../components/LoadingSpinner';
import DealsSection from '../components/DealsSection';
import DeadlineAlert from '../components/DeadlineAlert';

export const metadata: Metadata = {
  title: 'Voyage Dream | Découvrez nos destinations de rêve',
  description: 'Trouvez votre prochaine destination de rêve et réservez facilement via WhatsApp.',
}

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidation toutes les heures

export default async function Home() {
  console.log('Rendu de la page d\'accueil...');
  
  // Tenter de charger les destinations
  const topDestinations = await fetchTopDestinations();
  
  // Charger les offres spéciales
  const deals = await fetchDeals();
  
  // Exécuter le diagnostic en cas d'erreur ou en mode développement
  let diagnosticInfo = null;
  if (process.env.NODE_ENV === 'development' || topDestinations.length === 0) {
    diagnosticInfo = await diagnoseGoogleSheets();
  }
  
  console.log(`Page d'accueil: ${topDestinations.length} destinations populaires chargées`);
  console.log(`Page d'accueil: ${deals.length} offres spéciales chargées`);

  // Combiner les destinations et les offres pour l'alerte
  const allItems = [...topDestinations, ...deals];
  
  return (
    <main>
      <HeroSection />
      
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2">Destinations populaires</h2>
          <p className="text-center text-gray-600 mb-10">
            Découvrez nos destinations les plus appréciées, certaines disponibles pour un temps limité
          </p>
          
          <Suspense fallback={<LoadingSpinner message="Chargement des destinations populaires..." />}>
            <div className="mt-4">
              <DestinationList destinations={topDestinations} />
            </div>
          </Suspense>
        </div>
      </section>
      
      {/* Ajout de la section des offres spéciales */}
      <DealsSection deals={deals} />
      
      {/* Bloc de log visible uniquement en développement */}
      {process.env.NODE_ENV === 'development' && (
        <div className="p-4 mt-8 bg-gray-100 rounded-lg max-w-4xl mx-auto">
          <h3 className="font-bold text-xl mb-2">Informations de chargement:</h3>
          <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto">
            {`[GoogleSheet Service] ${topDestinations.length} destinations populaires chargées\n`}
            {`[GoogleSheet Service] ${deals.length} offres spéciales chargées\n`}
            {`[GoogleSheet Service] Cache statut: ${topDestinations.length > 0 ? 'Données disponibles' : 'Aucune donnée'}`}
            {diagnosticInfo && `\n\n--- DIAGNOSTIC ---\nStatut: ${diagnosticInfo.success ? '✅ OK' : '❌ ERREUR'}\nMessage: ${diagnosticInfo.message}\n${diagnosticInfo.details ? 'Détails: ' + JSON.stringify(diagnosticInfo.details, null, 2) : ''}`}
          </pre>
        </div>
      )}
      
      <FeatureSection />
      
      <TestimonySection />

      {/* Alerte pour les offres qui expirent bientôt */}
      <DeadlineAlert items={allItems} />
     
      <Newsletter />
      
    </main>
  );
}

