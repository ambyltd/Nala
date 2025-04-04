import { Metadata } from 'next';
import ContactForm from '../../components/ContactForm';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp, FaClock, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Contactez-nous | Voyage Dream',
  description: 'Besoin d\'informations supplémentaires ? Contactez notre équipe pour planifier votre prochain voyage de rêve.',
};

export default function ContactPage() {
  return (
    <>
      <section className="pt-28 pb-12 bg-primary/10">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading text-4xl md:text-5xl mb-6">Contactez-nous</h1>
            <p className="text-lg text-gray-700">
              Des questions sur nos destinations ou besoin d'assistance pour votre réservation ?
              Notre équipe est à votre disposition.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Informations de contact */}
            <div>
              <h2 className="heading text-3xl mb-6">Nos coordonnées</h2>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <FaMapMarkerAlt className="text-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Adresse</h3>
                    <p className="text-gray-600">
                      123 Avenue des Voyages<br />
                      75001 Paris, France
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <FaPhone className="text-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Téléphone</h3>
                    <p className="text-gray-600">
                      <a href="tel:+33612345678" className="hover:text-primary transition-colors">
                        +33 6 12 34 56 78
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <FaEnvelope className="text-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <p className="text-gray-600">
                      <a href="mailto:contact@voyage-dream.com" className="hover:text-primary transition-colors">
                        contact@voyage-dream.com
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <FaWhatsapp className="text-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">WhatsApp</h3>
                    <p className="text-gray-600">
                      <a href="https://wa.me/33600000000" className="hover:text-primary transition-colors">
                        +33 6 00 00 00 00
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <FaClock className="text-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Horaires d'ouverture</h3>
                    <p className="text-gray-600">
                      Lundi - Vendredi: 9h - 18h<br />
                      Samedi: 10h - 16h<br />
                      Dimanche: Fermé
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="heading text-xl mb-4">Suivez-nous</h3>
                <div className="flex space-x-4">
                  <a href="#" aria-label="Facebook" className="bg-gray-100 hover:bg-primary hover:text-white p-3 rounded-full transition-colors">
                    <FaFacebook size={20} />
                  </a>
                  <a href="#" aria-label="Twitter" className="bg-gray-100 hover:bg-primary hover:text-white p-3 rounded-full transition-colors">
                    <FaTwitter size={20} />
                  </a>
                  <a href="#" aria-label="Instagram" className="bg-gray-100 hover:bg-primary hover:text-white p-3 rounded-full transition-colors">
                    <FaInstagram size={20} />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Formulaire de contact */}
            <div>
              <h2 className="heading text-3xl mb-6">Envoyez-nous un message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      
      {/* Carte Google Maps */}
      <section className="py-8">
        <div className="container-custom">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.142047744348!2d2.3354330157430925!3d48.87456857928921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e38f817b573%3A0x48d69c30470e7aeb!2sOp%C3%A9ra%20Garnier!5e0!3m2!1sfr!2sfr!4v1597305898177!5m2!1sfr!2sfr"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localisation de Voyage Dream"
            />
          </div>
        </div>
      </section>
    </>
  );
}
