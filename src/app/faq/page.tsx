import { Metadata } from 'next';
import FaqAccordion from '../../components/FaqAccordion';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Questions fréquentes | Voyage Dream',
  description: 'Trouvez des réponses à toutes vos questions concernant nos voyages, réservations et services.',
  alternates: {
    canonical: 'https://nala-africa.web.app/faq',
  },
};

export default function FaqPage() {
  // Les catégories de FAQ avec leurs questions et réponses
  const faqCategories = [
    {
      title: "Réservations",
      items: [
        {
          question: "Comment puis-je réserver un voyage ?",
          answer: "Réserver un voyage avec nous est simple. Choisissez votre destination, cliquez sur le bouton WhatsApp de réservation et envoyez-nous un message. Notre équipe vous contactera rapidement pour finaliser votre réservation."
        },
        {
          question: "Quels modes de paiement acceptez-vous ?",
          answer: "Nous acceptons les paiements par carte bancaire, virement bancaire et PayPal. Pour certaines destinations, des facilités de paiement peuvent être proposées."
        },
        {
          question: "Puis-je annuler ma réservation ?",
          answer: "Oui, vous pouvez annuler votre réservation selon nos conditions d'annulation. Les remboursements dépendent du délai entre l'annulation et la date de départ prévue. Consultez notre politique d'annulation pour plus de détails."
        },
        {
          question: "Comment obtenir une confirmation de réservation ?",
          answer: "Une fois votre paiement effectué, vous recevrez automatiquement un e-mail de confirmation contenant tous les détails de votre réservation. Si vous ne le recevez pas, vérifiez vos spams ou contactez-nous directement."
        }
      ]
    },
    {
      title: "Voyages et destinations",
      items: [
        {
          question: "Les vols sont-ils inclus dans vos forfaits ?",
          answer: "Cela dépend du forfait choisi. Certaines offres incluent les vols aller-retour, tandis que d'autres ne comprennent que l'hébergement. Tous les détails sont clairement indiqués dans la description de chaque destination."
        },
        {
          question: "Proposez-vous des assurances voyage ?",
          answer: "Oui, nous proposons différentes formules d'assurance voyage pour vous protéger contre les imprévus (annulation, bagages, rapatriement). Nous vous recommandons vivement de souscrire à une assurance pour voyager l'esprit tranquille."
        },
        {
          question: "Que se passe-t-il si ma destination est touchée par une crise sanitaire ?",
          answer: "Nous suivons de près les recommandations des autorités sanitaires et des affaires étrangères. Si une crise survient, nous vous proposerons soit un report sans frais, soit un remboursement selon les circonstances, soit une destination alternative."
        },
        {
          question: "Les transferts depuis l'aéroport sont-ils inclus ?",
          answer: "Pour la plupart de nos destinations, les transferts aéroport-hôtel sont inclus. Dans le cas contraire, cela sera clairement mentionné dans la description de l'offre. Nous pouvons également organiser des transferts privés sur demande."
        }
      ]
    },
    {
      title: "Informations pratiques",
      items: [
        {
          question: "Ai-je besoin d'un visa pour ma destination ?",
          answer: "Les exigences en matière de visa varient selon votre nationalité et la destination. Nous vous fournirons les informations nécessaires lors de la réservation, mais il est de votre responsabilité de vérifier et d'obtenir tous les documents de voyage requis."
        },
        {
          question: "Quelle est la meilleure période pour visiter une destination spécifique ?",
          answer: "Chaque destination a sa saison idéale. Sur nos fiches de destination, vous trouverez la section 'Meilleure saison' qui vous indique les périodes optimales pour profiter pleinement de votre voyage en fonction du climat et des attractions locales."
        },
        {
          question: "Comment puis-je connaître les restrictions sanitaires pour ma destination ?",
          answer: "Nous mettons régulièrement à jour les informations concernant les exigences sanitaires pour chaque destination. Avant votre départ, nous vous enverrons un récapitulatif des mesures en vigueur. Vous pouvez également nous contacter directement pour les informations les plus récentes."
        },
        {
          question: "Proposez-vous des activités sur place ?",
          answer: "Oui, pour la plupart de nos destinations, nous proposons une sélection d'excursions et d'activités que vous pouvez réserver à l'avance ou sur place. Notre équipe locale peut également vous conseiller sur les meilleures choses à faire selon vos intérêts."
        }
      ]
    },
  ];

  return (
    <>
      <section className="pt-28 pb-12 bg-primary/10">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading text-4xl md:text-5xl mb-6">Questions fréquentes</h1>
            <p className="text-lg text-gray-700">
              Trouvez des réponses aux questions les plus courantes concernant nos voyages et services.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom max-w-4xl">
          {faqCategories.map((category, index) => (
            <div key={index} className="mb-12 last:mb-0">
              <h2 className="heading text-2xl md:text-3xl mb-6">{category.title}</h2>
              <FaqAccordion items={category.items} defaultOpen={index === 0 ? 0 : -1} />
            </div>
          ))}

          <div className="mt-16 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="heading text-xl mb-4">Vous n'avez pas trouvé la réponse à votre question ?</h3>
            <p className="text-gray-600 mb-6">
              Notre équipe est à votre disposition pour répondre à toutes vos questions et vous aider à planifier votre voyage de rêve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn-primary flex-1 justify-center">
                Nous contacter
              </Link>
              <a 
                href="https://wa.me/33600000000" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-whatsapp flex-1 justify-center"
              >
                <FaWhatsapp className="mr-2" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
