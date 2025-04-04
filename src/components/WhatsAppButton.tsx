'use client';

import { FaWhatsapp } from 'react-icons/fa';

interface WhatsAppButtonProps {
  destination: string;
  price?: number;
}

export default function WhatsAppButton({ destination, price }: WhatsAppButtonProps) {
  const phoneNumber = '+33600000000'; // Remplacer par le vrai numéro
  
  const handleWhatsAppClick = () => {
    const message = `Bonjour, je souhaite réserver la destination ${destination}${price ? ` à ${price} FCFA` : ''}. Pourriez-vous me donner plus d'informations ?`;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };
  
  return (
    <button 
      onClick={handleWhatsAppClick}
      className="btn-whatsapp w-full"
      aria-label="Réserver via WhatsApp"
    >
      <FaWhatsapp className="mr-2 text-xl" />
      Réserver via WhatsApp
    </button>
  );
}
