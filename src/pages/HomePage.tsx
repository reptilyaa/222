import { useState } from 'react';
import { PawPrint, Search } from 'lucide-react';
import { FilterForm } from '../components/FilterForm';
import { AnimalCard } from '../components/AnimalCard';
import { AnimalModal } from '../components/AnimalModal';
import { useAnimals } from '../hooks/useAnimals';
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../contexts/AuthContext';
import type { Animal, Filters } from '../types/database';

const DEFAULT_FILTERS: Filters = { type: '', minAge: '', maxAge: '', city: '' };

export function HomePage() {
  const { user } = useAuth();
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [selected, setSelected] = useState<Animal | null>(null);
  const { animals, loading, error } = useAnimals(filters);
  const { favoriteIds, toggleFavorite } = useFavorites();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Найди своего питомца</h1>
        <p className="text-gray-500 mt-1">Животные из приютов, которые ищут дом</p>
      </div>

      <div className="mb-6">
        <FilterForm filters={filters} onChange={setFilters} />
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 rounded-xl px-4 py-3 mb-6 text-sm">{error}</div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100">
              <div className="aspect-[4/3] bg-gray-100 animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-5 bg-gray-100 rounded animate-pulse w-2/3" />
                <div className="h-4 bg-gray-100 rounded animate-pulse w-1/2" />
                <div className="h-3 bg-gray-100 rounded animate-pulse w-3/4 mt-3" />
              </div>
            </div>
          ))}
        </div>
      ) : animals.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-gray-100 rounded-full p-6 mb-4">
            <Search size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700">Ничего не найдено</h3>
          <p className="text-gray-400 mt-1 text-sm">Попробуйте изменить фильтры поиска</p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-4">
            <PawPrint size={16} className="text-orange-500" />
            <span className="text-sm text-gray-500">
              Найдено: <span className="font-semibold text-gray-700">{animals.length}</span> животных
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {animals.map((animal) => (
              <AnimalCard
                key={animal.id}
                animal={animal}
                isFavorite={favoriteIds.has(animal.id)}
                onToggleFavorite={toggleFavorite}
                onSelect={setSelected}
                isLoggedIn={!!user}
              />
            ))}
          </div>
        </>
      )}

      {selected && (
        <AnimalModal
          animal={selected}
          isFavorite={favoriteIds.has(selected.id)}
          onToggleFavorite={toggleFavorite}
          onClose={() => setSelected(null)}
          isLoggedIn={!!user}
        />
      )}
    </div>
  );
}
