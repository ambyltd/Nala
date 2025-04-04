'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';
import { subscribeToNewsletter } from '@/services/emailService';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation simple de l'email
    if (!email || !email.includes('@')) {
      setIsError(true);
      setMessage('Veuillez entrer une adresse email valide.');
      return;
    }
    
    try {
      // Utiliser le service d'inscription newsletter
      const result = await subscribeToNewsletter({
        subscriberEmail: email
      });
      
      if (result.success) {
        setIsError(false);
        setIsSubmitted(true);
        setMessage('Merci pour votre inscription à notre newsletter !');
        setEmail('');
        
        // Réinitialiser après 5 secondes
        setTimeout(() => {
          setIsSubmitted(false);
          setMessage('');
        }, 5000);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setIsError(true);
      setMessage(error instanceof Error ? error.message : 'Une erreur s\'est produite');
    }
  };

  return (
    <section className="py-16 bg-primary">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Inspirations & Offres Exclusives
          </h2>
          <p className="text-white/90 mb-8">
            Inscrivez-vous à notre newsletter pour recevoir nos meilleures offres de voyage et des inspirations pour vos prochaines aventures.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-4">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-grow py-3 px-4 rounded-md border-0 focus:ring-2 focus:ring-accent outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Votre adresse email"
              disabled={isSubmitted}
            />
            <button 
              type="submit"
              className="bg-accent hover:bg-accent/90 text-white font-medium px-6 py-3 rounded-md transition duration-300 inline-flex items-center justify-center"
              disabled={isSubmitted}
            >
              {isSubmitted ? 'Inscrit !' : (
                <>
                  <FaPaperPlane className="mr-2" />
                  S'inscrire
                </>
              )}
            </button>
          </form>
          
          {message && (
            <p className={`text-sm ${isError ? 'text-red-300' : 'text-white'}`}>
              {message}
            </p>
          )}
          
          <p className="text-xs text-white/70 mt-4">
            En vous inscrivant, vous acceptez notre politique de confidentialité. Vous pourrez vous désinscrire à tout moment.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
