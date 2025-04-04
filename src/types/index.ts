export interface Destination {
  id: string;
  slug: string;
  name: string;
  description: string;
  content: string;
  price: number;
  duration: number;
  coverImage: string;
  gallery: string[];
  bestSeason: string;
  featured: boolean;
  rating: number;
  included: string[]; // Ajout pour ce qui est inclus
  excluded: string[]; // Ajout pour ce qui n'est pas inclus
  deadline?: string; // Date limite pour l'offre (format ISO)
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  destination: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  validUntil: string;
  imageUrl: string;
  deadline?: string; // Date limite supplémentaire si nécessaire, en plus de validUntil
}
