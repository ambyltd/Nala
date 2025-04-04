import Link from 'next/link';
import { Metadata } from 'next';
import { FaHome, FaCompass, FaPhone } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Page non trouvée | Voyage Dream',
  description: 'La page que vous recherchez n\'existe pas ou a été déplacée.',
};

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12">
      <div className="container-custom max-w-2xl text-center">
        <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="heading text-3xl mb-6">Page non trouvée</h2>
        <p className="text-gray-600 mb-8">
          Oups ! La page que vous recherchez semble avoir pris un vol pour une destination inconnue.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Link href="/" className="btn-primary">
            <FaHome className="mr-2" />
            Retour à l'accueil
          </Link>
          <Link href="/destinations" className="bg-white border border-primary text-primary hover:bg-primary/5 font-medium px-6 py-3 rounded-md transition duration-300 inline-flex items-center justify-center">
            <FaCompass className="mr-2" />
            Voir les destinations
          </Link>
        </div>
        
        <p className="text-gray-500">
          Besoin d'aide ? <Link href="/contact" className="text-primary hover:underline inline-flex items-center"><FaPhone className="mr-1" /> Contactez-nous</Link>
        </p>
      </div>
    </div>
  );
}
