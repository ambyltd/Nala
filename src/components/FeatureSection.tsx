'use client';

import { motion } from 'framer-motion';
import { FaWhatsapp, FaShieldAlt, FaStar, FaPercentage } from 'react-icons/fa';

const features = [
  {
    icon: <FaWhatsapp className="text-4xl mb-4 text-green-500" />,
    title: 'Réservation simplifiée',
    description: 'Réservez votre voyage en quelques clics via WhatsApp, sans processus compliqué ni longue attente.',
  },
  {
    icon: <FaShieldAlt className="text-4xl mb-4 text-primary" />,
    title: 'Voyages sécurisés',
    description: 'Tous nos voyages sont assurés et sécurisés pour que vous puissiez profiter de vos vacances en toute tranquillité.',
  },
  {
    icon: <FaStar className="text-4xl mb-4 text-yellow-500" />,
    title: 'Destinations de qualité',
    description: 'Nous sélectionnons minutieusement chaque destination pour garantir une expérience exceptionnelle.',
  },
  {
    icon: <FaPercentage className="text-4xl mb-4 text-accent" />,
    title: 'Prix compétitifs',
    description: 'Bénéficiez des meilleurs tarifs pour des expériences de voyage inoubliables et accessibles à tous.',
  },
];

export default function FeatureSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="heading text-3xl md:text-4xl mb-4">Pourquoi choisir Voyage Dream ?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nous nous engageons à vous offrir une expérience de réservation simple et des voyages de qualité pour des souvenirs inoubliables.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="font-heading font-bold text-xl mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
