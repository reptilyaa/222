import { useEffect } from 'react';
import { X, Heart, MapPin, Calendar, Tag } from 'lucide-react';
import type { Animal } from '../types/database';

interface AnimalModalProps {
  animal: Animal;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClose: () => void;
  isLoggedIn: boolean;
}

const TYPE_LABELS: Record<string, string> = { dog: 'Собака', cat: 'Кошка' };
const TYPE_COLORS: Record<string, string> = {
  dog: 'bg-amber-100 text-amber-700',
  cat: 'bg-sky-100 text-sky-700',
};

function getAgeLabel(age: number): string {
  if (age === 1) return 'год';
  if (age >= 2 && age <= 4) return 'года';
  return 'лет';
}

export function AnimalModal({ animal, isFavorite, onToggleFavorite, onClose, isLoggedIn }: AnimalModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 text-gray-600 hover:bg-white hover:text-gray-900 transition-colors shadow-sm"
        >
          <X size={18} />
        </button>

        <div className="relative aspect-[16/9] flex-shrink-0">
          <img
            src={animal.image_url}
            alt={animal.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=600';
            }}
          />
          <div className="absolute bottom-4 left-4">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${TYPE_COLORS[animal.type]}`}>
              {TYPE_LABELS[animal.type]}
            </span>
          </div>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{animal.name}</h2>
              <p className="text-gray-500 mt-0.5">{animal.breed}</p>
            </div>
            {isLoggedIn && (
              <button
                onClick={() => onToggleFavorite(animal.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  isFavorite
                    ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
                {isFavorite ? 'В избранном' : 'В избранное'}
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            <div className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
              <Calendar size={15} className="text-gray-400" />
              <span>{animal.age} {getAgeLabel(animal.age)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
              <MapPin size={15} className="text-gray-400" />
              <span>{animal.city}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
              <Tag size={15} className="text-gray-400" />
              <span>{animal.breed}</span>
            </div>
          </div>

          <div className="mt-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">О животном</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{animal.description}</p>
          </div>

          {!isLoggedIn && (
            <p className="mt-4 text-xs text-gray-400 text-center bg-gray-50 rounded-lg py-3 px-4">
              Войдите, чтобы добавить в избранное
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
