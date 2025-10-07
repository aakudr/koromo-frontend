import React from 'react';
import { Phone, MapPin, Menu } from 'lucide-react';

export default function Header({ companyName = 'Koromo' }: { companyName?: string }) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Logo / Brand */}
          <div className="flex items-center gap-4">
            <div className="text-xl sm:text-2xl font-bold text-black tracking-tight">{companyName}</div>

            {/* Contact info (hidden on very small screens) */}
            <div className="hidden sm:flex items-center gap-6 ml-4">
              <a
                href="tel:+71234567890"
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-black transition-colors duration-200"
              >
                <Phone className="w-4 h-4 text-green-600" aria-hidden />
                <span className="underline decoration-dotted">+7 (123) 456-7890</span>
              </a>

              <address className="not-italic flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-gray-500" aria-hidden />
                <span>г. Москва, ул. Производственная, 12</span>
              </address>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Оставить заявку"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm
                hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500
                transition transform duration-200 motion-safe:hover:-translate-y-0.5"
            >
              Оставить заявку
            </button>

            {/* Mobile menu / contact toggle (visual only) */}
            <button
              type="button"
              aria-label="Открыть меню"
              className="sm:hidden inline-flex items-center justify-center p-2 rounded-md bg-gray-50 text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 transition"
            >
              <Menu className="w-5 h-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
