import React from 'react';
import { Star } from 'lucide-react';

export type Review = {
  id: string;
  name: string;
  role?: string;
  avatarUrl?: string;
  avatarAlt?: string;
  text: string;
};

export default function Reviews({ reviews }: { reviews: Review[] }) {
  return (
    <section aria-labelledby="reviews-heading" className="px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <h2 id="reviews-heading" className="text-2xl sm:text-3xl font-semibold text-black">Отзывы</h2>

        <p className="mt-2 text-sm text-gray-600 max-w-2xl">
          Что говорят наши клиенты — реальные отзывы о продукте.
        </p>

        <ul role="list" className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <li key={r.id}>
              <article
                className="group h-full flex flex-col justify-between bg-white border border-gray-200 rounded-lg p-4 shadow-sm
                  transition-transform duration-300 motion-safe:group-hover:scale-105 hover:shadow-lg focus-within:ring-2 focus-within:ring-green-500"
              >
                <header className="flex items-center gap-4">
                  <img
                    src={r.avatarUrl}
                    alt={r.avatarAlt ?? `${r.name} photo`}
                    className="w-12 h-12 rounded-full object-cover bg-gray-100 flex-shrink-0"
                  />

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-black truncate">{r.name}</p>
                    {r.role && <p className="text-xs text-gray-600 truncate">{r.role}</p>}
                  </div>
                </header>

                <div className="mt-3 text-sm text-gray-700 leading-relaxed">{r.text}</div>

                <footer className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center text-yellow-400" aria-hidden>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4" />
                      ))}
                    </div>
                    <span className="sr-only">5 из 5 звезд</span>
                  </div>

                  <div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-700">
                      Рекомендует
                    </span>
                  </div>
                </footer>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
