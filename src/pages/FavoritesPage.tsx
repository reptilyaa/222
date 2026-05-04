import { useState } from 'react';
import { Heart } from 'lucide-react';
import { AnimalCard } from '../components/AnimalCard';
import { AnimalModal } from '../components/AnimalModal';
import { useFavorites } from '../hooks/useFavorites';
import type { Animal } from '../types/database';

export function FavoritesPage() {
  const { favoriteIds, favoriteAnimals, loading, toggleFavorite } = useFavorites();
  const [selected, setSelected] = useState<Animal | null>(null);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100">
              <div className="aspect-[4/3] bg-gray-100 animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-5 bg-gray-100 rounded animate-pulse w-2/3" />
                <div className="h-4 bg-gray-100 rounded animate-pulse w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Избранное</h1>
        <p className="text-gray-500 mt-1">Животные, которых вы сохранили</p>
      </div>

      {favoriteAnimals.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-rose-50 rounded-full p-6 mb-4">
            <Heart size={32} className="text-rose-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700">Нет избранных животных</h3>
          <p className="text-gray-400 mt-1 text-sm">
            Нажмите на сердечко на карточке животного, чтобы сохранить его
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-4">
            <Heart size={16} className="text-rose-500" fill="currentColor" />
            <span className="text-sm text-gray-500">
              Сохранено: <span className="font-semibold text-gray-700">{favoriteAnimals.length}</span>
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {favoriteAnimals.map((animal) => (
              <AnimalCard
                key={animal.id}
                animal={animal}
                isFavorite={favoriteIds.has(animal.id)}
                onToggleFavorite={toggleFavorite}
                onSelect={setSelected}
                isLoggedIn
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
          isLoggedIn
        />
      )}
    </div>
  );
}
