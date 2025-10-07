import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer({ companyName = 'Koromo' }: { companyName?: string }) {
  return (
    <footer role="contentinfo" className="bg-white border-t border-gray-200 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center text-black font-bold text-lg">
                {companyName[0]}
              </div>
            </div>

            <div>
              <p className="text-lg font-semibold text-black">{companyName}</p>
              <p className="text-sm text-gray-600 mt-1">Качественные инструменты для строительной отрасли</p>
            </div>
          </div>

          <nav aria-label="Основные ссылки" className="flex gap-8">
            <ul className="space-y-2">
              <li>
                <a href="/privacy" className="text-sm text-gray-700 hover:text-black transition-colors duration-150">Политика конфиденциальности</a>
              </li>
              <li>
                <a href="/offer" className="text-sm text-gray-700 hover:text-black transition-colors duration-150">Публичная оферта</a>
              </li>
            </ul>

            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <Phone className="w-4 h-4 text-green-600" aria-hidden />
                <a href="tel:+71234567890" className="hover:text-black transition">+7 (123) 456-7890</a>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <MapPin className="w-4 h-4 text-gray-500 mt-0.5" aria-hidden />
                <address className="not-italic">г. Москва, ул. Производственная, 12</address>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <Mail className="w-4 h-4 text-gray-500" aria-hidden />
                <a href="mailto:info@koromo.example" className="hover:text-black transition">info@koromo.example</a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-sm text-gray-600">© {new Date().getFullYear()} {companyName}. Все права защищены.</div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">Created by <a href="#" className="text-black hover:underline">Drain friends</a></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
