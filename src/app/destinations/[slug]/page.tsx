import Image from 'next/image'
import { Metadata } from 'next'
import WhatsAppButton from '../../../components/WhatsAppButton'
import Gallery from '../../../components/Gallery'
import SimilarDestinations from './components/SimilarDestinations'
import { getDestination } from '../../../lib/googleSheets'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: { slug: string }}): Promise<Metadata> {
  const destination = await getDestination(params.slug);
  
  if (!destination) {
    return {
      title: 'Destination non trouvée | Voyage Dream'
    };
  }
  
  return {
    title: `${destination.name} | Voyage Dream`,
    description: destination.description.substring(0, 160),
    openGraph: {
      images: [{
        url: destination.coverImage,
        width: 1200,
        height: 630,
        alt: destination.name
      }]
    }
  }
}

// Ajouter cette fonction pour permettre l'export statique
export async function generateStaticParams() {
  // Récupérer les données depuis votre source (API, fichier, etc.)
  const destinations = await fetchDestinationsData();
  
  // Retourner un tableau d'objets avec les paramètres de route
  return destinations.map((destination) => ({
    slug: destination.slug,
  }));
}

// Fonction auxiliaire pour récupérer les données
async function fetchDestinationsData() {
  try {
    // Si vous avez déjà une fonction pour récupérer les données, utilisez-la
    // Sinon, utilisez cette implémentation de secours basique
    return [
      { slug: 'maroc' },
      { slug: 'senegal' },
      { slug: 'madagascar' },
      // Ajoutez d'autres destinations selon vos besoins
    ];
  } catch (error) {
    console.error('Erreur lors de la récupération des destinations', error);
    return [];
  }
}

export default async function DestinationPage({ params }: { params: { slug: string }}) {
  const destination = await getDestination(params.slug);
  
  if (!destination) {
    notFound();
  }
  
  return (
    <div className="py-8">
      <div className="container-custom">
        <div className="relative h-[40vh] md:h-[60vh] rounded-lg overflow-hidden mb-8">
          <Image 
            src={destination.coverImage}
            alt={destination.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="heading text-3xl md:text-5xl mb-4">{destination.name}</h1>
            <p className="text-lg text-gray-700 mb-6">{destination.description}</p>
            
            <h2 className="heading text-2xl mb-4">À propos de cette destination</h2>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: destination.content }} />
            
            {/* Section Ce qui est inclus */}
            {destination.included && destination.included.length > 0 && (
              <div className="mt-8">
                <h2 className="heading text-2xl mb-4">Ce qui est inclus</h2>
                <ul className="list-disc pl-6 space-y-2">
                  {destination.included.map((item, index) => (
                    <li key={index} className="text-gray-700">
                      <span className="inline-block mr-2 text-green-500">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Section Ce qui n'est pas inclus */}
            {destination.excluded && destination.excluded.length > 0 && (
              <div className="mt-8">
                <h2 className="heading text-2xl mb-4">Ce qui n'est pas inclus</h2>
                <ul className="list-disc pl-6 space-y-2">
                  {destination.excluded.map((item, index) => (
                    <li key={index} className="text-gray-700">
                      <span className="inline-block mr-2 text-red-500">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <Gallery images={destination.gallery} />
          </div>
          
          <div className="md:col-span-1">
            <div className="card p-6 sticky top-24">
              <h3 className="heading text-xl mb-4">Détails du voyage</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-medium">Prix :</span>
                  <span className="text-primary font-bold">{destination.price} F CFA / pers.</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Durée :</span>
                  <span>{destination.duration} jours</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Meilleure saison :</span>
                  <span>{destination.bestSeason}</span>
                </div>
              </div>
              
              <WhatsAppButton destination={destination.name} price={destination.price} />
            </div>
          </div>
        </div>
        
        <SimilarDestinations currentSlug={params.slug} />
      </div>
    </div>
  )
}
