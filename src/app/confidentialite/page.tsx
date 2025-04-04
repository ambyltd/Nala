import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de confidentialité | Voyage Dream',
  description: 'Informations sur la façon dont nous collectons, utilisons et protégeons vos données personnelles.',
  robots: {
    index: false,
    follow: true,
  }
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="pt-28 pb-12 bg-primary/10">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading text-4xl mb-6">Politique de confidentialité</h1>
            <p className="text-gray-700">
              Comment nous collectons, utilisons et protégeons vos données personnelles.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom max-w-4xl">
          <div className="prose max-w-none">
            <h2>1. Introduction</h2>
            <p>
              Chez Voyage Dream, nous nous engageons à protéger votre vie privée. Cette politique de confidentialité explique 
              comment nous collectons, utilisons et protégeons vos informations personnelles lorsque vous utilisez notre site web 
              et nos services.
            </p>
            <p>
              En utilisant notre site web ou nos services, vous acceptez les pratiques décrites dans cette politique de confidentialité.
            </p>

            <h2>2. Informations que nous collectons</h2>
            <p>Nous pouvons collecter les types d'informations suivants :</p>
            <ul>
              <li><strong>Informations personnelles</strong> : nom, adresse e-mail, numéro de téléphone, adresse postale, date de naissance.</li>
              <li><strong>Informations de paiement</strong> : coordonnées bancaires, historique des transactions.</li>
              <li><strong>Informations de voyage</strong> : préférences de voyage, numéros de passeport ou autres documents d'identité, informations sur les personnes accompagnantes.</li>
              <li><strong>Informations techniques</strong> : adresse IP, type de navigateur, appareil utilisé, pages visitées, temps passé sur le site.</li>
              <li><strong>Communications</strong> : messages échangés avec notre service client, commentaires et avis.</li>
            </ul>

            <h2>3. Comment nous collectons vos informations</h2>
            <p>Nous collectons vos informations par différents moyens :</p>
            <ul>
              <li>Lorsque vous remplissez des formulaires sur notre site</li>
              <li>Lorsque vous effectuez une réservation</li>
              <li>Lorsque vous créez un compte</li>
              <li>Lorsque vous nous contactez via WhatsApp, e-mail ou téléphone</li>
              <li>Lorsque vous participez à nos enquêtes ou promotions</li>
              <li>Par le biais de cookies et technologies similaires</li>
            </ul>

            <h2>4. Comment nous utilisons vos informations</h2>
            <p>Nous utilisons vos informations pour :</p>
            <ul>
              <li>Traiter vos réservations et paiements</li>
              <li>Personnaliser votre expérience utilisateur</li>
              <li>Améliorer notre site web et nos services</li>
              <li>Communiquer avec vous au sujet de vos réservations</li>
              <li>Vous envoyer des informations marketing (avec votre consentement)</li>
              <li>Respecter nos obligations légales</li>
            </ul>

            <h2>5. Base légale du traitement</h2>
            <p>Nous traitons vos informations sur les bases légales suivantes :</p>
            <ul>
              <li><strong>Exécution du contrat</strong> : pour vous fournir les services que vous avez demandés.</li>
              <li><strong>Consentement</strong> : lorsque vous avez expressément accepté le traitement de vos données (par exemple pour les communications marketing).</li>
              <li><strong>Intérêts légitimes</strong> : pour améliorer nos services, prévenir la fraude et assurer la sécurité.</li>
              <li><strong>Obligations légales</strong> : pour respecter les lois et réglementations applicables.</li>
            </ul>

            <h2>6. Partage de vos informations</h2>
            <p>Nous pouvons partager vos informations avec :</p>
            <ul>
              <li>Nos fournisseurs de services (hôtels, compagnies aériennes, etc.) pour traiter vos réservations</li>
              <li>Nos prestataires de services (traitement des paiements, hébergement web, service client, etc.)</li>
              <li>Les autorités publiques lorsque la loi l'exige</li>
            </ul>
            <p>Nous ne vendons jamais vos données personnelles à des tiers.</p>

            <h2>7. Conservation des données</h2>
            <p>
              Nous conservons vos informations aussi longtemps que nécessaire pour fournir nos services, respecter nos obligations légales, 
              résoudre les litiges et faire appliquer nos accords. Une fois ces objectifs atteints, nous supprimons ou anonymisons vos données.
            </p>

            <h2>8. Sécurité des données</h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre 
              la perte, l'accès non autorisé, l'altération et la divulgation.
            </p>

            <h2>9. Vos droits</h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul>
              <li>Droit d'accès à vos données personnelles</li>
              <li>Droit de rectification des données inexactes</li>
              <li>Droit à l'effacement (droit à l'oubli)</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit à la portabilité des données</li>
              <li>Droit d'opposition au traitement</li>
            </ul>
            <p>
              Pour exercer ces droits, veuillez nous contacter à privacy@voyage-dream.com. Nous répondrons à votre demande dans un délai d'un mois.
            </p>

            <h2>10. Cookies et technologies similaires</h2>
            <p>
              Notre site utilise des cookies et technologies similaires pour améliorer votre expérience de navigation, analyser l'utilisation du site 
              et personnaliser le contenu. Pour plus d'informations, veuillez consulter notre <a href="/cookies" className="text-primary hover:underline">Politique de gestion des cookies</a>.
            </p>

            <h2>11. Transferts internationaux de données</h2>
            <p>
              Vos données peuvent être transférées et traitées dans des pays extérieurs à l'Espace économique européen (EEE). 
              Dans ce cas, nous prenons des mesures appropriées pour garantir que vos données bénéficient d'un niveau de protection adéquat.
            </p>

            <h2>12. Modifications de cette politique</h2>
            <p>
              Nous pouvons mettre à jour cette politique de confidentialité périodiquement pour refléter les changements dans nos pratiques de gestion des données.
              Nous vous encourageons à consulter régulièrement cette page pour vous tenir informé des dernières mises à jour.
            </p>

            <h2>13. Contact</h2>
            <p>
              Si vous avez des questions concernant cette politique de confidentialité ou la façon dont nous traitons vos données personnelles, 
              veuillez nous contacter à :
            </p>
            <p>
              <strong>Email :</strong> privacy@voyage-dream.com<br />
              <strong>Adresse :</strong> Voyage Dream SAS, 123 Avenue des Voyages, 75001 Paris, France
            </p>
            <p>
              Si vous n'êtes pas satisfait de notre réponse, vous avez le droit de déposer une plainte auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL).
            </p>

            <p className="text-sm text-gray-500 mt-12">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
