import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, PawPrint } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

export default function Header() {
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState<'login' | 'register' | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isHome = location.pathname === '/';

  const navLinks = [
    { to: '/pets', label: 'Питомцы' },
    { to: '/stories', label: 'Истории' },
    { to: '/about', label: 'О нас' },
    { to: '/contacts', label: 'Контакты' },
  ];

  const headerClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    scrolled || !isHome
      ? 'bg-white/95 backdrop-blur-md shadow-sm'
      : 'bg-transparent'
  }`;

  const linkColor = scrolled || !isHome ? 'text-gray-700 hover:text-orange-500' : 'text-white hover:text-orange-200';
  const logoColor = scrolled || !isHome ? 'text-orange-500' : 'text-white';
  const logoSubColor = scrolled || !isHome ? 'text-gray-700' : 'text-white';

  return (
    <>
      <header className={headerClass}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <PawPrint className={`w-7 h-7 transition-colors ${logoColor}`} />
              <span className={`font-bold text-xl tracking-tight transition-colors ${logoSubColor}`}>
                Лапки<span className={`transition-colors ${logoColor}`}>Домой</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`text-sm font-medium transition-colors duration-200 ${linkColor} ${
                    location.pathname.startsWith(l.to) ? 'border-b-2 border-orange-500 pb-0.5' : ''
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Auth area */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className={`text-sm font-medium transition-colors ${linkColor}`}
                  >
                    <Heart className="w-5 h-5 inline mr-1 -mt-0.5" />
                    Кабинет
                  </Link>
                  <button
                    onClick={signOut}
                    className="text-sm font-medium px-4 py-2 rounded-full border border-current transition-all hover:bg-orange-500 hover:border-orange-500 hover:text-white text-gray-600"
                  >
                    Выйти
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setAuthModal('login')}
                    className={`text-sm font-medium transition-colors ${linkColor}`}
                  >
                    Войти
                  </button>
                  <button
                    onClick={() => setAuthModal('register')}
                    className="text-sm font-semibold px-5 py-2.5 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors shadow-sm"
                  >
                    Регистрация
                  </button>
                </>
              )}
            </div>

            {/* Mobile burger */}
            <button
              className={`md:hidden p-2 transition-colors ${linkColor}`}
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden bg-white border-t transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 py-4 space-y-1">
            {navLinks.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className="block py-2.5 text-gray-700 font-medium hover:text-orange-500 transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-3 border-t space-y-2">
              {user ? (
                <>
                  <Link to="/profile" className="block py-2.5 text-gray-700 font-medium hover:text-orange-500">
                    Личный кабинет
                  </Link>
                  <button onClick={signOut} className="block w-full text-left py-2.5 text-gray-700 font-medium hover:text-orange-500">
                    Выйти
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => setAuthModal('login')} className="block w-full text-left py-2.5 text-gray-700 font-medium hover:text-orange-500">
                    Войти
                  </button>
                  <button onClick={() => setAuthModal('register')} className="block w-full text-center py-2.5 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-colors">
                    Регистрация
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {authModal && (
        <AuthModal
          mode={authModal}
          onClose={() => setAuthModal(null)}
          onSwitchMode={(m) => setAuthModal(m)}
        />
      )}
    </>
  );
}
