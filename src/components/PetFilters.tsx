import { Search, SlidersHorizontal, X } from 'lucide-react';
import type { PetFilters } from '../lib/types';

interface Props {
  filters: PetFilters;
  onChange: (f: PetFilters) => void;
  cities: string[];
  breeds: string[];
}

export default function PetFilters({ filters, onChange, cities, breeds }: Props) {
  const set = (key: keyof PetFilters, value: string) => onChange({ ...filters, [key]: value });
  const hasActive = Object.values(filters).some(v => v !== '');
  const reset = () => onChange({ search: '', species: '', breed: '', city: '', gender: '', minAge: '', maxAge: '' });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2 font-semibold text-gray-800">
          <SlidersHorizontal className="w-4.5 h-4.5 text-orange-500" />
          Фильтры
        </div>
        {hasActive && (
          <button onClick={reset} className="flex items-center gap-1 text-xs text-gray-400 hover:text-orange-500 transition-colors">
            <X className="w-3.5 h-3.5" /> Сбросить
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Поиск по имени или породе..."
          value={filters.search}
          onChange={e => set('search', e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
        />
      </div>

      <div className="space-y-4">
        {/* Species */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Вид</label>
          <div className="flex gap-2 flex-wrap">
            {[['', 'Все'], ['dog', 'Собаки'], ['cat', 'Кошки'], ['other', 'Другие']].map(([v, l]) => (
              <button
                key={v}
                onClick={() => set('species', v)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all border ${
                  filters.species === v
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'border-gray-200 text-gray-600 hover:border-orange-300'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Пол</label>
          <div className="flex gap-2 flex-wrap">
            {[['', 'Любой'], ['male', 'Мальчик'], ['female', 'Девочка']].map(([v, l]) => (
              <button
                key={v}
                onClick={() => set('gender', v)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all border ${
                  filters.gender === v
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'border-gray-200 text-gray-600 hover:border-orange-300'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* City */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Город</label>
          <select
            value={filters.city}
            onChange={e => set('city', e.target.value)}
            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white"
          >
            <option value="">Все города</option>
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Breed */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Порода</label>
          <select
            value={filters.breed}
            onChange={e => set('breed', e.target.value)}
            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white"
          >
            <option value="">Все породы</option>
            {breeds.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>

        {/* Age range */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Возраст (лет)</label>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              min="0"
              placeholder="От"
              value={filters.minAge}
              onChange={e => set('minAge', e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            />
            <span className="text-gray-400 text-sm">—</span>
            <input
              type="number"
              min="0"
              placeholder="До"
              value={filters.maxAge}
              onChange={e => set('maxAge', e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
