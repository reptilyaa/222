import { Search, SlidersHorizontal, X } from 'lucide-react';
import type { Filters } from '../types/database';

interface FilterFormProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const CITIES = ['Москва', 'Санкт-Петербург', 'Казань', 'Екатеринбург', 'Новосибирск'];

export function FilterForm({ filters, onChange }: FilterFormProps) {
  const set = (key: keyof Filters, value: string) =>
    onChange({ ...filters, [key]: value });

  const reset = () =>
    onChange({ type: '', minAge: '', maxAge: '', city: '' });

  const hasFilters = Object.values(filters).some(Boolean);

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-gray-700 font-semibold">
          <SlidersHorizontal size={18} />
          <span>Фильтры</span>
        </div>
        {hasFilters && (
          <button
            onClick={reset}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={14} />
            Сбросить
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">Вид животного</label>
          <select
            value={filters.type}
            onChange={(e) => set('type', e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition"
          >
            <option value="">Все</option>
            <option value="dog">Собаки</option>
            <option value="cat">Кошки</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">Возраст от (лет)</label>
          <input
            type="number"
            min="0"
            max="20"
            placeholder="0"
            value={filters.minAge}
            onChange={(e) => set('minAge', e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">Возраст до (лет)</label>
          <input
            type="number"
            min="0"
            max="20"
            placeholder="20"
            value={filters.maxAge}
            onChange={(e) => set('maxAge', e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">Город</label>
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={filters.city}
              onChange={(e) => set('city', e.target.value)}
              className="w-full border border-gray-200 rounded-lg pl-8 pr-3 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition appearance-none"
            >
              <option value="">Все города</option>
              {CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
