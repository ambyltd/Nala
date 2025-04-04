import Link from 'next/link';
import { FaHome, FaCompass, FaSearch } from 'react-icons/fa';

export default function DestinationNotFound() {
  return (
    <div className="py-16 md:py-24">
      <div className="container-custom max-w-2xl text-center">
        <h1 className="text-6xl font-bold text-primary mb-6">Oups !</h1>
        <h2 className="heading text-3xl mb-6">Destination introuvable</h2>
        <p className="text-gray-600 mb-8">
          Cette destination semble avoir disparu de notre carte. Peut-être s'est-elle envolée vers une autre galaxie ?
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <Link href="/" className="btn-primary">
            <FaHome className="mr-2" />
            Retour à l'accueil
          </Link>
          <Link href="/destinations" className="bg-white dark:bg-slate-700 border border-primary text-primary dark:text-light hover:bg-primary/5 dark:hover:bg-slate-600 font-medium px-6 py-3 rounded-md transition duration-300 inline-flex items-center justify-center">
            <FaCompass className="mr-2" />
            Toutes les destinations
          </Link>
        </div>
        
        <div className="mt-8 p-6 bg-gray-50 dark:bg-slate-800 rounded-lg">
          <h3 className="font-heading font-bold text-xl mb-4">Vous cherchiez quelque chose de spécifique ?</h3>
          <form action="/destinations" className="flex max-w-md mx-auto">
            <input 
              type="text" 
              name="q" 
              className="flex-grow py-2 px-4 rounded-l-md border-y border-l border-gray-300 dark:border-slate-600 focus:ring focus:ring-primary/20 focus:outline-none dark:bg-slate-700 dark:text-white"
              placeholder="Rechercher une destination..."
            />
            <button type="submit" className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-r-md">
              <FaSearch />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
