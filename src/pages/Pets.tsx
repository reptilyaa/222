import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import type { Pet, PetFilters as FiltersType } from '../lib/types';
import { useAuth } from '../context/AuthContext';
import PetCard from '../components/PetCard';
import PetFilters from '../components/PetFilters';
import Layout from '../components/Layout';
import AuthModal from '../components/AuthModal';

export default function Pets() {
  const { user } = useAuth();
  const [pets, setPets] = useState<Pet[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [authModal, setAuthModal] = useState<'login' | 'register' | null>(null);
  const [filters, setFilters] = useState<FiltersType>({
    search: '', species: '', breed: '', city: '', gender: '', minAge: '', maxAge: '',
  });

  useEffect(() => {
    supabase
      .from('pets')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setPets(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!user) { setFavorites(new Set()); return; }
    supabase
      .from('favorites')
      .select('pet_id')
      .eq('user_id', user.id)
      .then(({ data }) => {
        if (data) setFavorites(new Set(data.map(f => f.pet_id)));
      });
  }, [user]);

  const cities = useMemo(() => [...new Set(pets.map(p => p.city))].sort(), [pets]);
  const breeds = useMemo(() => [...new Set(pets.map(p => p.breed))].sort(), [pets]);

  const filtered = useMemo(() => {
    return pets.filter(p => {
      const q = filters.search.toLowerCase();
      if (q && !p.name.toLowerCase().includes(q) && !p.breed.toLowerCase().includes(q)) return false;
      if (filters.species && p.species !== filters.species) return false;
      if (filters.breed && p.breed !== filters.breed) return false;
      if (filters.city && p.city !== filters.city) return false;
      if (filters.gender && p.gender !== filters.gender) return false;
      if (filters.minAge && p.age_years < parseFloat(filters.minAge)) return false;
      if (filters.maxAge && p.age_years > parseFloat(filters.maxAge)) return false;
      return true;
    });
  }, [pets, filters]);

  const toggleFavorite = async (petId: string) => {
    if (!user) { setAuthModal('login'); return; }
    const isFav = favorites.has(petId);
    if (isFav) {
      await supabase.from('favorites').delete().eq('user_id', user.id).eq('pet_id', petId);
      setFavorites(prev => { const s = new Set(prev); s.delete(petId); return s; });
    } else {
      await supabase.from('favorites').insert({ user_id: user.id, pet_id: petId });
      setFavorites(prev => new Set([...prev, petId]));
    }
  };

  return (
    <Layout>
      <div className="pt-20 lg:pt-24 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Питомцы</h1>
            <p className="text-gray-500">Найдено {filtered.length} питомцев</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-72 shrink-0">
              <div className="lg:sticky lg:top-28">
                <PetFilters
                  filters={filters}
                  onChange={setFilters}
                  cities={cities}
                  breeds={breeds}
                />
              </div>
            </aside>

            {/* Grid */}
            <div className="flex-1">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                      <div className="aspect-[4/3] bg-gray-200" />
                      <div className="p-5 space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                        <div className="h-3 bg-gray-200 rounded w-2/3" />
                        <div className="h-3 bg-gray-200 rounded w-1/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-24">
                  <div className="text-6xl mb-4">🐾</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Питомцы не найдены</h3>
                  <p className="text-gray-500">Попробуйте изменить параметры фильтрации</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filtered.map(pet => (
                    <PetCard
                      key={pet.id}
                      pet={pet}
                      isFavorite={favorites.has(pet.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {authModal && (
        <AuthModal mode={authModal} onClose={() => setAuthModal(null)} onSwitchMode={m => setAuthModal(m)} />
      )}
    </Layout>
  );
}
