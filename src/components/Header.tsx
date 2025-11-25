import { Heart } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Heart className="w-8 h-8 text-rose-500" fill="currentColor" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Приют для животных</h1>
            <p className="text-sm text-gray-600 mt-1">Подарите любовь и заботу нашим питомцам</p>
          </div>
        </div>
      </div>
    </header>
  );
}
