import { Link } from 'react-router-dom';
import { PawPrint, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <PawPrint className="w-7 h-7 text-orange-400" />
              <span className="text-white font-bold text-xl">Лапки<span className="text-orange-400">Домой</span></span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Помогаем животным из приютов найти любящий дом. Каждый питомец заслуживает семью.
            </p>
            <div className="flex gap-3 mt-5">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2.5">
              {[
                { to: '/pets', label: 'Питомцы' },
                { to: '/stories', label: 'Истории' },
                { to: '/about', label: 'О нас' },
                { to: '/contacts', label: 'Контакты' },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm hover:text-orange-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-white font-semibold mb-4">Помощь</h3>
            <ul className="space-y-2.5">
              {['Как взять питомца', 'Требования к хозяевам', 'Волонтёрство', 'Пожертвования', 'Партнёрам'].map(t => (
                <li key={t}>
                  <a href="#" className="text-sm hover:text-orange-400 transition-colors">{t}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-white font-semibold mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm">
                <MapPin className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                <span>Москва, ул. Дружбы, 12</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <span>+7 (495) 123-45-67</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <span>info@lapkidomoi.ru</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">© 2026 ЛапкиДомой. Все права защищены.</p>
          <p className="text-xs text-gray-500">Сделано с <span className="text-orange-400">❤</span> для животных</p>
        </div>
      </div>
    </footer>
  );
}
