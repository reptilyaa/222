import { Link } from 'react-router-dom';
import { MapPin, Heart } from 'lucide-react';
import type { Pet } from '../lib/types';

interface Props {
  pet: Pet;
  isFavorite?: boolean;
  onToggleFavorite?: (petId: string) => void;
}

function formatAge(years: number): string {
  if (years < 1) {
    const months = Math.round(years * 12);
    if (months === 0) return 'до 1 месяца';
    const rem = months % 10;
    if (rem === 1 && months !== 11) return `${months} месяц`;
    if (rem >= 2 && rem <= 4 && (months < 10 || months > 20)) return `${months} месяца`;
    return `${months} месяцев`;
  }
  const y = Math.floor(years);
  const rem = y % 10;
  if (rem === 1 && y !== 11) return `${y} год`;
  if (rem >= 2 && rem <= 4 && (y < 10 || y > 20)) return `${y} года`;
  return `${y} лет`;
}

const genderLabel: Record<string, string> = {
  male: 'Мальчик',
  female: 'Девочка',
  unknown: '',
};

const speciesLabel: Record<string, string> = {
  dog: '🐶',
  cat: '🐱',
  other: '🐾',
};

export default function PetCard({ pet, isFavorite, onToggleFavorite }: Props) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={pet.photo_url || 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800'}
          alt={pet.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-full text-gray-700">
            {speciesLabel[pet.species] || '🐾'} {pet.species === 'dog' ? 'Собака' : pet.species === 'cat' ? 'Кошка' : 'Другое'}
          </span>
        </div>
        {onToggleFavorite && (
          <button
            onClick={e => { e.preventDefault(); onToggleFavorite(pet.id); }}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-all shadow-sm"
            aria-label="Добавить в избранное"
          >
            <Heart className={`w-4.5 h-4.5 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
          </button>
        )}
        {pet.status !== 'available' && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-gray-800 font-semibold px-4 py-1.5 rounded-full text-sm">
              {pet.status === 'adopted' ? 'Пристроен' : 'Зарезервирован'}
            </span>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-1.5">
          <h3 className="font-bold text-lg text-gray-900 leading-tight">{pet.name}</h3>
          {pet.gender !== 'unknown' && (
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${pet.gender === 'male' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'}`}>
              {genderLabel[pet.gender]}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 mb-1">{pet.breed}</p>
        <p className="text-sm text-gray-500 mb-4">{formatAge(pet.age_years)}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <MapPin className="w-3.5 h-3.5" />
            <span>{pet.city}</span>
          </div>
          <Link
            to={`/pets/${pet.id}`}
            className="text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors"
          >
            Подробнее →
          </Link>
        </div>
      </div>
    </div>
  );
}
