import { Metadata } from 'next'
import DestinationsGrid from '../../components/DestinationsGrid'
import SearchFilters from '../../components/SearchFilters'
import { fetchAllDestinations } from '../../lib/googleSheets'

export const metadata: Metadata = {
  title: 'Toutes nos destinations | Voyage Dream',
  description: 'Explorez notre sélection complète de destinations de voyages et trouvez celle qui vous correspond.',
}

export default async function Destinations() {
  const allDestinations = await fetchAllDestinations();
  
  return (
    <div className="py-8 md:py-12">
      <div className="container-custom">
        <h1 className="heading text-3xl md:text-5xl mb-6 text-center">Nos Destinations</h1>
        <p className="text-center mb-8 max-w-2xl mx-auto">Découvrez notre sélection de destinations pour tous les goûts et tous les budgets. Réservez facilement via WhatsApp.</p>
        
        <SearchFilters />
        
        <DestinationsGrid destinations={allDestinations} />
      </div>
    </div>
  )
}
