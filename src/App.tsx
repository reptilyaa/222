import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ApplicationsList from './components/ApplicationsList';
import AnimalManager from './components/AnimalManager';
import Home from './pages/Home';
import About from './pages/About';
import Contacts from './pages/Contacts';
import Catalog from './pages/Catalog';

type Page = 'home' | 'catalog' | 'about' | 'contacts' | 'applications' | 'admin';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo(0, 0);
  };

  const handleFormSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 overflow-x-auto">
            <button
              onClick={() => handleNavigate('home')}
              className={`py-4 border-b-2 font-medium transition-colors whitespace-nowrap ${
                currentPage === 'home'
                  ? 'border-rose-500 text-rose-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Главная
            </button>
            <button
              onClick={() => handleNavigate('catalog')}
              className={`py-4 border-b-2 font-medium transition-colors whitespace-nowrap ${
                currentPage === 'catalog'
                  ? 'border-rose-500 text-rose-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Каталог животных
            </button>
            <button
              onClick={() => handleNavigate('about')}
              className={`py-4 border-b-2 font-medium transition-colors whitespace-nowrap ${
                currentPage === 'about'
                  ? 'border-rose-500 text-rose-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              О нас
            </button>
            <button
              onClick={() => handleNavigate('contacts')}
              className={`py-4 border-b-2 font-medium transition-colors whitespace-nowrap ${
                currentPage === 'contacts'
                  ? 'border-rose-500 text-rose-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Контакты
            </button>
            <button
              onClick={() => handleNavigate('applications')}
              className={`py-4 border-b-2 font-medium transition-colors whitespace-nowrap ${
                currentPage === 'applications'
                  ? 'border-rose-500 text-rose-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Заявки
            </button>
            <button
              onClick={() => handleNavigate('admin')}
              className={`py-4 border-b-2 font-medium transition-colors whitespace-nowrap ${
                currentPage === 'admin'
                  ? 'border-rose-500 text-rose-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Управление
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 w-full">
        {showSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
            Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.
          </div>
        )}

        {currentPage === 'home' && <Home onNavigate={handleNavigate} />}
        {currentPage === 'catalog' && <Catalog onSuccess={handleFormSuccess} />}
        {currentPage === 'about' && <About />}
        {currentPage === 'contacts' && <Contacts />}
        {currentPage === 'applications' && <ApplicationsList />}
        {currentPage === 'admin' && <AnimalManager />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
