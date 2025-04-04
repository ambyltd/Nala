import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions légales | Voyage Dream',
  description: 'Informations légales concernant notre site web, notre entreprise et l\'utilisation de nos services.',
  robots: {
    index: false,
    follow: true,
  }
};

export default function LegalPage() {
  return (
    <>
      <section className="pt-28 pb-12 bg-primary/10">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading text-4xl mb-6">Mentions légales</h1>
            <p className="text-gray-700">
              Informations légales concernant notre site web et notre entreprise.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom max-w-4xl">
          <div className="prose max-w-none">
            <h2>1. Informations légales</h2>
            <p>
              Le site web "Voyage Dream" est édité par la société Voyage Dream SAS, au capital de 50 000 euros,
              immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro SIRET 123 456 789 00010.
            </p>
            <p>
              <strong>Siège social :</strong> 123 Avenue des Voyages, 75001 Paris, France<br />
              <strong>Numéro de TVA intracommunautaire :</strong> FR 12 345 678 901<br />
              <strong>Numéro de téléphone :</strong> +33 (0)6 12 34 56 78<br />
              <strong>Email :</strong> contact@voyage-dream.com
            </p>
            <p>
              Directeur de la publication : Sophie Martin, Directrice Générale
            </p>

            <h2>2. Hébergement</h2>
            <p>
              Le site web est hébergé par Google Firebase, dont le siège social est situé 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA.
              Téléphone : +1 650-253-0000
            </p>

            <h2>3. Propriété intellectuelle</h2>
            <p>
              L'ensemble du contenu de ce site (textes, images, vidéos, etc.) est la propriété exclusive de Voyage Dream SAS ou de ses partenaires,
              et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.
            </p>
            <p>
              Toute reproduction totale ou partielle de ce contenu est strictement interdite sans autorisation préalable écrite.
            </p>

            <h2>4. Licence d'utilisation</h2>
            <p>
              L'utilisation de ce site est soumise aux présentes conditions générales d'utilisation. En accédant à ce site,
              vous acceptez ces conditions sans réserve. Voyage Dream SAS se réserve le droit de modifier ces conditions à tout moment.
            </p>
            <p>
              L'utilisateur dispose d'un droit d'usage privé, non collectif et non exclusif sur le contenu du site. 
              Toute utilisation commerciale est soumise à autorisation préalable.
            </p>

            <h2>5. Données personnelles</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès,
              de rectification, de suppression et d'opposition concernant vos données personnelles.
              Pour exercer ces droits, vous pouvez nous contacter à l'adresse privacy@voyage-dream.com.
              Pour plus d'informations, veuillez consulter notre <a href="/confidentialite" className="text-primary hover:underline">Politique de confidentialité</a>.
            </p>

            <h2>6. Activité réglementée</h2>
            <p>
              Voyage Dream SAS est titulaire d'une licence d'agent de voyages IM075123456 délivrée par Atout France.
              Garantie financière : Groupama Assurance-Crédit, 8-10 rue d'Astorg, 75008 Paris.
              Assurance responsabilité civile professionnelle : MMA IARD, 14 boulevard Marie et Alexandre Oyon, 72030 Le Mans.
            </p>

            <h2>7. Médiation</h2>
            <p>
              Conformément aux articles L.616-1 et R.616-1 du code de la consommation, notre entreprise a mis en place un dispositif de médiation
              de la consommation. L'entité de médiation retenue est : MTV Médiation Tourisme Voyage.
              En cas de litige, vous pouvez déposer votre réclamation sur son site : <a href="http://www.mtv.travel" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">www.mtv.travel</a>
              ou par courrier à l'adresse suivante : MTV Médiation Tourisme Voyage - BP 80 303 - 75823 Paris Cedex 17.
            </p>

            <h2>8. Loi applicable</h2>
            <p>
              Les présentes mentions légales sont régies par la loi française. En cas de litige, les tribunaux français seront seuls compétents.
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
