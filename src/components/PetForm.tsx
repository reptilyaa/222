import { useState, FormEvent } from 'react';
import { X, Loader2, Save } from 'lucide-react';
import type { Pet, PetUpdate } from '../lib/types';
import { supabase } from '../lib/supabase';

interface Props {
  pet: Pet;
  onClose: () => void;
  onSaved: (updated: Pet) => void;
}

export default function PetForm({ pet, onClose, onSaved }: Props) {
  const [form, setForm] = useState<PetUpdate>({
    name: pet.name,
    breed: pet.breed,
    species: pet.species,
    age_years: pet.age_years,
    city: pet.city,
    gender: pet.gender,
    description: pet.description,
    photo_url: pet.photo_url,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (key: keyof PetUpdate, value: string | number) =>
    setForm(f => ({ ...f, [key]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data, error } = await supabase
      .from('pets')
      .update(form)
      .eq('id', pet.id)
      .select()
      .single();

    if (error) {
      setError('Не удалось сохранить изменения');
    } else if (data) {
      onSaved(data);
    }
    setLoading(false);
  };

  const inputClass = 'w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
          <h2 className="text-lg font-bold text-gray-900">Редактировать питомца</h2>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Имя</label>
              <input
                type="text"
                required
                value={form.name ?? ''}
                onChange={e => set('name', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Порода</label>
              <input
                type="text"
                required
                value={form.breed ?? ''}
                onChange={e => set('breed', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Вид</label>
              <select value={form.species ?? 'dog'} onChange={e => set('species', e.target.value)} className={inputClass}>
                <option value="dog">Собака</option>
                <option value="cat">Кошка</option>
                <option value="other">Другое</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Пол</label>
              <select value={form.gender ?? 'unknown'} onChange={e => set('gender', e.target.value)} className={inputClass}>
                <option value="male">Мальчик</option>
                <option value="female">Девочка</option>
                <option value="unknown">Не указан</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Возраст (лет)</label>
              <input
                type="number"
                min="0"
                step="0.1"
                required
                value={form.age_years ?? 0}
                onChange={e => set('age_years', parseFloat(e.target.value))}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Город</label>
              <input
                type="text"
                required
                value={form.city ?? ''}
                onChange={e => set('city', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">URL фото</label>
            <input
              type="url"
              value={form.photo_url ?? ''}
              onChange={e => set('photo_url', e.target.value)}
              placeholder="https://..."
              className={inputClass}
            />
            {form.photo_url && (
              <img src={form.photo_url} alt="preview" className="mt-2 rounded-xl h-28 w-full object-cover" />
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Описание</label>
            <textarea
              rows={4}
              required
              value={form.description ?? ''}
              onChange={e => set('description', e.target.value)}
              className={`${inputClass} resize-none`}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
