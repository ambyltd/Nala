import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gestion des cookies | Voyage Dream',
  description: 'Informations sur notre utilisation des cookies et comment les gérer.',
  robots: {
    index: false,
    follow: true,
  }
};

export default function CookiesPage() {
  return (
    <>
      <section className="pt-28 pb-12 bg-primary/10">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading text-4xl mb-6">Politique de gestion des cookies</h1>
            <p className="text-gray-700">
              Comprendre comment nous utilisons les cookies et comment les gérer.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom max-w-4xl">
          <div className="prose max-w-none">
            <h2>1. Qu'est-ce qu'un cookie ?</h2>
            <p>
              Un cookie est un petit fichier texte déposé sur votre appareil (ordinateur, tablette, smartphone) lorsque vous visitez un site web.
              Les cookies permettent au site de reconnaître votre appareil et de mémoriser vos actions et préférences sur une période déterminée.
            </p>

            <h2>2. Pourquoi utilisons-nous des cookies ?</h2>
            <p>Nous utilisons différents types de cookies pour les raisons suivantes :</p>
            
            <h3>Cookies strictement nécessaires</h3>
            <p>
              Ces cookies sont essentiels au fonctionnement de notre site web et vous permettent d'utiliser ses fonctionnalités de base.
              Sans ces cookies, notre site ne pourrait pas fonctionner correctement.
            </p>
            
            <h3>Cookies de préférences</h3>
            <p>
              Ces cookies nous permettent de mémoriser vos choix et préférences afin de vous offrir une expérience personnalisée
              (par exemple, la langue que vous préférez, vos dernières recherches de destinations).
            </p>
            
            <h3>Cookies statistiques/analytiques</h3>
            <p>
              Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site web en recueillant et signalant des informations de manière anonyme.
              Ils nous permettent d'améliorer constamment l'expérience utilisateur de notre site.
            </p>
            
            <h3>Cookies marketing</h3>
            <p>
              Ces cookies sont utilisés pour suivre les visiteurs sur les sites web. L'intention est d'afficher des publicités qui sont pertinentes et attrayantes
              pour l'utilisateur individuel et donc plus précieuses pour les éditeurs et les annonceurs tiers.
            </p>

            <h2>3. Quels cookies utilisons-nous ?</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2 text-left">Nom du cookie</th>
                  <th className="border border-gray-300 p-2 text-left">Type</th>
                  <th className="border border-gray-300 p-2 text-left">Finalité</th>
                  <th className="border border-gray-300 p-2 text-left">Durée</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">_session</td>
                  <td className="border border-gray-300 p-2">Nécessaire</td>
                  <td className="border border-gray-300 p-2">Gérer votre session de navigation</td>
                  <td className="border border-gray-300 p-2">Session</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">_language</td>
                  <td className="border border-gray-300 p-2">Préférence</td>
                  <td className="border border-gray-300 p-2">Mémoriser la langue choisie</td>
                  <td className="border border-gray-300 p-2">1 an</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">_ga</td>
                  <td className="border border-gray-300 p-2">Analytique</td>
                  <td className="border border-gray-300 p-2">Google Analytics - Mesurer l'utilisation du site</td>
                  <td className="border border-gray-300 p-2">2 ans</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">_fbp</td>
                  <td className="border border-gray-300 p-2">Marketing</td>
                  <td className="border border-gray-300 p-2">Facebook - Suivi des conversions</td>
                  <td className="border border-gray-300 p-2">3 mois</td>
                </tr>
              </tbody>
            </table>

            <h2>4. Comment gérer les cookies ?</h2>
            <p>
              Vous pouvez contrôler et/ou supprimer des cookies comme vous le souhaitez. Vous pouvez supprimer tous les cookies déjà présents
              sur votre appareil et vous pouvez configurer la plupart des navigateurs pour qu'ils bloquent leur installation.
            </p>
            <p>
              Vous pouvez configurer votre navigateur pour qu'il vous avertisse de la présence de cookies et vous permette de les accepter ou non.
              Vous pouvez également supprimer manuellement les cookies. Vous pouvez trouver des informations sur comment procéder sur les sites des différents navigateurs :
            </p>
            <ul>
              <li><a href="https://support.google.com/chrome/answer/95647?hl=fr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/fr/kb/effacer-les-cookies-pour-supprimer-les-information" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Safari</a></li>
              <li><a href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Microsoft Edge</a></li>
            </ul>
            <p>
              Toutefois, si vous choisissez de bloquer certains cookies, notamment les cookies essentiels, vous risquez de ne pas pouvoir accéder
              à certaines parties du site ou certaines fonctionnalités pourraient ne pas fonctionner correctement.
            </p>

            <h2>5. Consentement aux cookies</h2>
            <p>
              Lorsque vous visitez notre site pour la première fois, une bannière de cookies apparaît pour vous informer
              de notre utilisation de cookies. Cette bannière vous permet de choisir les types de cookies que vous acceptez.
              Seuls les cookies strictement nécessaires seront déposés sans votre consentement explicite.
            </p>
            <p>
              Vous pouvez à tout moment modifier vos préférences en matière de cookies en cliquant sur le lien "Gérer les cookies"
              présent en bas de chaque page de notre site.
            </p>

            <h2>6. Cookies tiers</h2>
            <p>
              Certains cookies sont placés par des tiers sur notre site web. Ces cookies nous aident à analyser le trafic de notre site
              et à mesurer l'efficacité de nos campagnes publicitaires. Nous n'avons pas de contrôle direct sur les informations collectées
              par ces cookies.
            </p>
            <p>
              Voici les principaux services tiers que nous utilisons et qui peuvent déposer des cookies sur votre appareil :
            </p>
            <ul>
              <li>Google Analytics</li>
              <li>Facebook Pixel</li>
              <li>Google Maps</li>
              <li>YouTube</li>
            </ul>
            <p>
              Nous vous recommandons de consulter les politiques de confidentialité de ces services pour comprendre comment ils utilisent les cookies.
            </p>

            <h2>7. Mise à jour de notre politique de cookies</h2>
            <p>
              Nous pouvons mettre à jour cette politique de cookies pour refléter les changements dans notre utilisation des cookies ou
              pour d'autres raisons opérationnelles, légales ou réglementaires. Nous vous encourageons donc à consulter régulièrement cette page.
            </p>
            <p>
              Si vous avez des questions concernant notre utilisation des cookies, veuillez nous contacter à l'adresse email suivante :
              privacy@voyage-dream.com.
            </p>

            <p className="text-sm text-gray-500 mt-12">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
            <h2 className="heading text-2xl mb-4">Gérer vos préférences</h2>
            <p className="text-gray-600 mb-6">
              Vous pouvez ajuster vos préférences de cookies à tout moment en utilisant notre outil de gestion des cookies.
            </p>
            <button 
              className="bg-primary hover:bg-secondary text-white font-medium px-6 py-3 rounded-md transition duration-300"
            >
              Gérer mes préférences de cookies
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
