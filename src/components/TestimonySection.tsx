"use client";

import Image from 'next/image';

type Testimony = {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
};

const testimonials: Testimony[] = [
  {
    id: 1,
    name: "Sophie Martin",
    role: "Voyageuse passionnée",
    content: "Voyage Dream a transformé ma façon de voyager. Leur service est impeccable et les destinations qu'ils proposent sont vraiment hors des sentiers battus.",
    avatar: "/avatars/avatar-1.jpg"
  },
  {
    id: 2,
    name: "Thomas Dubois",
    role: "Photographe de voyage",
    content: "En tant que photographe, je recherche toujours des lieux uniques. Grâce à Voyage Dream, j'ai découvert des endroits incroyables que je n'aurais jamais trouvés autrement.",
    avatar: "/avatars/avatar-2.jpg"
  },
  {
    id: 3,
    name: "Marie Leclerc",
    role: "Blogueuse voyage",
    content: "Je recommande Voyage Dream à tous mes lecteurs. Leur équipe est réactive et propose des voyages sur mesure qui correspondent exactement à ce que je recherche.",
    avatar: "/avatars/avatar-3.jpg"
  }
];
export default function TestimonySection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Ce que nos clients disent</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimony) => (
            <div key={testimony.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 mr-4 rounded-full overflow-hidden">
                  <Image 
                    src={testimony.avatar}
                    alt={testimony.name}
                    fill
                    className="object-cover"
                    unoptimized
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/avatars/default-avatar.jpg';
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{testimony.name}</h3>
                  <p className="text-gray-600 text-sm">{testimony.role}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">&ldquo;{testimony.content}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
