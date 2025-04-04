import Image from 'next/image';
import { Metadata } from 'next';
import Link from 'next/link';
import { FaCheck } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'À propos de nous | Voyage Dream',
  description: 'Découvrez qui nous sommes et notre passion pour les voyages exceptionnels. Apprenez-en plus sur notre équipe et notre histoire.',
};

export default function AboutPage() {
  return (
    <>
      <section className="pt-28 pb-12 bg-primary/10">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading text-4xl md:text-5xl mb-6">À propos de Voyage Dream</h1>
            <p className="text-lg text-gray-700">
              Votre partenaire de voyage depuis 2010, spécialisé dans les destinations paradisiaques et les expériences inoubliables.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading text-3xl mb-6">Notre histoire</h2>
              <p className="mb-4">
                Voyage Dream est né d'une passion commune pour les voyages et d'un désir de simplifier l'accès à des destinations de rêve pour tous les types de voyageurs.
              </p>
              <p className="mb-4">
                Fondé en 2010 par deux amis passionnés de voyages, notre agence a commencé comme une petite entreprise locale avant de se développer pour devenir un acteur reconnu du tourisme en ligne.
              </p>
              <p>
                Notre mission a toujours été claire : offrir des expériences de voyage exceptionnelles à des prix accessibles, avec un service client personnalisé et une attention particulière portée aux détails.
              </p>
            </div>
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/about-team.jpg"
                alt="L'équipe de Voyage Dream"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading text-3xl mb-4">Nos valeurs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ces principes guident chaque aspect de notre travail et façonnent l'expérience que nous offrons à nos clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="heading text-xl mb-4">Excellence</h3>
              <p className="text-gray-600 mb-4">
                Nous nous efforçons de fournir un service exceptionnel et de dépasser les attentes de nos clients à chaque interaction.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <FaCheck className="text-primary mt-1 mr-2" />
                  <span>Sélection minutieuse de nos partenaires</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-primary mt-1 mr-2" />
                  <span>Formation continue de notre équipe</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-primary mt-1 mr-2" />
                  <span>Contrôle qualité rigoureux</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="heading text-xl mb-4">Authenticité</h3>
              <p className="text-gray-600 mb-4">
                Nous valorisons les expériences de voyage authentiques qui permettent de découvrir les cultures locales et de créer des liens significatifs.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <FaCheck className="text-primary mt-1 mr-2" />
                  <span>Immersion culturelle</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-primary mt-1 mr-2" />
                  <span>Soutien aux communautés locales</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-primary mt-1 mr-2" />
                  <span>Découverte des traditions authentiques</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="heading text-xl mb-4">Durabilité</h3>
              <p className="text-gray-600 mb-4">
                Nous sommes engagés dans une démarche de tourisme responsable et durable, respectueuse des écosystèmes et des communautés locales.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <FaCheck className="text-primary mt-1 mr-2" />
                  <span>Réduction de notre empreinte carbone</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-primary mt-1 mr-2" />
                  <span>Partenariats avec des hébergements éco-responsables</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-primary mt-1 mr-2" />
                  <span>Soutien à des projets environnementaux</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading text-3xl mb-4">Notre équipe</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Des passionnés de voyage dédiés à vous offrir la meilleure expérience possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Sophie Martin",
                role: "Directrice",
                image: "/images/team-1.jpg"
              },
              {
                name: "Thomas Dubois",
                role: "Expert destinations",
                image: "/images/team-2.jpg"
              },
              {
                name: "Emma Laurent",
                role: "Relations clients",
                image: "/images/team-3.jpg"
              },
              {
                name: "Nicolas Bernard",
                role: "Partenariats",
                image: "/images/team-4.jpg"
              },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4 overflow-hidden rounded-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 30vw, 192px"
                    className="object-cover"
                  />
                </div>
                <h3 className="heading text-xl mb-1">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link href="/contact" className="btn-primary">
              Contactez notre équipe
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
