'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { sendContactForm } from '@/services/emailService';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    
    if (!formData.subject) {
      newErrors.subject = 'Le sujet est requis';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Effacer l'erreur lorsque l'utilisateur commence à saisir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setFormStatus('submitting');
    
    try {
      // Utiliser le service d'envoi d'email
      const result = await sendContactForm({
        from: formData.email,
        name: formData.name,
        subject: formData.subject,
        message: formData.message,
        phone: formData.phone,
      });
      
      if (result.success) {
        setFormStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        
        // Réinitialiser après 5 secondes
        setTimeout(() => {
          setFormStatus('idle');
        }, 5000);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
      setFormStatus('error');
      
      // Réinitialiser après 5 secondes
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {formStatus === 'success' ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-10"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-2">Message envoyé !</h3>
          <p className="text-gray-600">
            Merci de nous avoir contactés. Notre équipe vous répondra dans les plus brefs délais.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">
              Nom complet <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary/20 focus:outline-none ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Votre nom"
            />
            {errors.name && (
              <p className="mt-1 text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block mb-1 font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary/20 focus:outline-none ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="votre@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block mb-1 font-medium">
                Téléphone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-primary/20 focus:outline-none"
                placeholder="+33 6 12 34 56 78"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block mb-1 font-medium">
              Sujet <span className="text-red-500">*</span>
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary/20 focus:outline-none ${
                errors.subject ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Sélectionnez un sujet</option>
              <option value="reservation">Réservation</option>
              <option value="information">Demande d'information</option>
              <option value="partenariat">Partenariat</option>
              <option value="reclamation">Réclamation</option>
              <option value="autre">Autre</option>
            </select>
            {errors.subject && (
              <p className="mt-1 text-red-500 text-sm">{errors.subject}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block mb-1 font-medium">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary/20 focus:outline-none ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Votre message..."
            />
            {errors.message && (
              <p className="mt-1 text-red-500 text-sm">{errors.message}</p>
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="privacy"
              name="privacy"
              required
              className="mr-2 focus:ring focus:ring-primary/20"
            />
            <label htmlFor="privacy" className="text-sm text-gray-600">
              J'accepte que mes données soient utilisées pour être contacté(e). Voir notre{' '}
              <Link href="/confidentialite" className="text-primary hover:underline">
                politique de confidentialité
              </Link>
              .
            </label>
          </div>

          <button
            type="submit"
            className="btn-primary w-full relative"
            disabled={formStatus === 'submitting'}
          >
            {formStatus === 'submitting' ? (
              <>
                <span className="opacity-0">Envoyer</span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              </>
            ) : formStatus === 'error' ? (
              "Une erreur est survenue, veuillez réessayer"
            ) : (
              "Envoyer le message"
            )}
          </button>
        </form>
      )}
    </div>
  );
}
