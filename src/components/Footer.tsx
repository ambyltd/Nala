'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo et description */}
          <div>
            <Link href="/" className="block mb-4">
              <Image src="/images/logo-white.svg" alt="Voyage Dream" width={160} height={40} className="h-10 w-auto" />
            </Link>
            <p className="text-light/80 mb-6">
              Spécialiste des voyages de rêve adaptés à tous les budgets. Nous vous proposons des expériences inoubliables dans les plus belles destinations du monde.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-light/80 hover:text-accent transition-colors">
                <FaFacebook size={22} />
              </a>
              <a href="#" aria-label="Twitter" className="text-light/80 hover:text-accent transition-colors">
                <FaTwitter size={22} />
              </a>
              <a href="#" aria-label="Instagram" className="text-light/80 hover:text-accent transition-colors">
                <FaInstagram size={22} />
              </a>
              <a href="https://wa.me/33600000000" aria-label="WhatsApp" className="text-light/80 hover:text-accent transition-colors">
                <FaWhatsapp size={22} />
              </a>
            </div>
          </div>

          {/* Liens utiles */}
          <div>
            <h3 className="text-lg font-bold mb-4">Liens utiles</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/destinations" className="text-light/80 hover:text-accent transition-colors">
                  Nos destinations
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-light/80 hover:text-accent transition-colors">
                  À propos de nous
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-light/80 hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-light/80 hover:text-accent transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-light/80 hover:text-accent transition-colors">
                  Blog voyage
                </Link>
              </li>
            </ul>
          </div>

          {/* Destinations populaires */}
          <div>
            <h3 className="text-lg font-bold mb-4">Destinations populaires</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/destinations/marrakech" className="text-light/80 hover:text-accent transition-colors">
                  Marrakech
                </Link>
              </li>
              <li>
                <Link href="/destinations/bali" className="text-light/80 hover:text-accent transition-colors">
                  Bali
                </Link>
              </li>
              <li>
                <Link href="/destinations/maldives" className="text-light/80 hover:text-accent transition-colors">
                  Maldives
                </Link>
              </li>
              <li>
                <Link href="/destinations/santorini" className="text-light/80 hover:text-accent transition-colors">
                  Santorin
                </Link>
              </li>
              <li>
                <Link href="/destinations/thailand" className="text-light/80 hover:text-accent transition-colors">
                  Thaïlande
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mr-3 mt-1 text-accent" />
                <span className="text-light/80">123 Avenue des Voyages, 75001 Paris, France</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 text-accent" />
                <a href="tel:+33612345678" className="text-light/80 hover:text-accent transition-colors">
                  +33 6 12 34 56 78
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-accent" />
                <a href="mailto:contact@voyage-dream.com" className="text-light/80 hover:text-accent transition-colors">
                  contact@voyage-dream.com
                </a>
              </li>
              <li className="flex items-center">
                <FaWhatsapp className="mr-3 text-accent" />
                <a href="https://wa.me/33600000000" className="text-light/80 hover:text-accent transition-colors">
                  +33 6 00 00 00 00
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Pied de page */}
        <div className="border-t border-light/20 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-light/60 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Voyage Dream. Tous droits réservés.
          </p>
          <div className="flex space-x-4 text-sm">
            <Link href="/mentions-legales" className="text-light/60 hover:text-accent transition-colors">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="text-light/60 hover:text-accent transition-colors">
              Politique de confidentialité
            </Link>
            <Link href="/cookies" className="text-light/60 hover:text-accent transition-colors">
              Gestion des cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
