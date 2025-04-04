import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CookieConsent from '../components/CookieConsent'
import { Metadata } from 'next'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Voyage Dream | Destinations Touristiques de Rêve',
  description: 'Découvrez nos destinations de voyage exceptionnelles et réservez votre prochain séjour de rêve directement via WhatsApp.',
  keywords: 'voyage, tourisme, destinations, réservation, voyage de rêve, séjour',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://nalafrica-61708131c23d.herokuapp.com/'),
  authors: [{ name: 'Nala Africa' }],
  creator: 'Nala Africa',
  openGraph: {
    title: 'Voyage Dream | Destinations Touristiques de Rêve',
    description: 'Découvrez nos destinations de voyage exceptionnelles et réservez votre prochain séjour de rêve directement via WhatsApp.',
    url: 'https://nalafrica-61708131c23d.herokuapp.com/',
    siteName: 'Voyage Dream',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Voyage Dream',
      }
    ],
    locale: 'fr_FR',
    type: 'website',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col bg-light">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  )
}
