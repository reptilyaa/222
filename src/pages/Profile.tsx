import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ClipboardList, LogOut, Loader2, MapPin, Calendar } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Pet, AdoptionRequest } from '../lib/types';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';

interface RequestWithPet extends AdoptionRequest {
  pet?: Pet;
}

const statusLabel: Record<string, { text: string; color: string }> = {
  pending: { text: 'На рассмотрении', color: 'bg-yellow-100 text-yellow-700' },
  approved: { text: 'Одобрена', color: 'bg-green-100 text-green-700' },
  rejected: { text: 'Отклонена', color: 'bg-red-100 text-red-700' },
};

export default function Profile() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'favorites' | 'requests'>('favorites');
  const [favorites, setFavorites] = useState<Pet[]>([]);
  const [requests, setRequests] = useState<RequestWithPet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate('/'); return; }
    Promise.all([
      supabase
        .from('favorites')
        .select('pet_id, pets(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false }),
      supabase
        .from('adoption_requests')
        .select('*, pets(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false }),
    ]).then(([favRes, reqRes]) => {
      if (favRes.data) {
        setFavorites(
          favRes.data
            .map(f => (f as { pet_id: string; pets: Pet | null }).pets)
            .filter(Boolean) as Pet[]
        );
      }
      if (reqRes.data) {
        setRequests(
          reqRes.data.map(r => ({
            ...r,
            pet: (r as { pets: Pet | null }).pets ?? undefined,
          }))
        );
      }
      setLoading(false);
    });
  }, [user, navigate]);

  const removeFav = async (petId: string) => {
    if (!user) return;
    await supabase.from('favorites').delete().eq('user_id', user.id).eq('pet_id', petId);
    setFavorites(prev => prev.filter(p => p.id !== petId));
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="pt-20 lg:pt-24 min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Profile header */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-orange-500">
                  {user.email?.[0]?.toUpperCase() ?? 'U'}
                </span>
              </div>
              <div>
                <h1 className="font-bold text-gray-900 text-lg">Личный кабинет</h1>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
            </div>
            <button
              onClick={async () => { await signOut(); navigate('/'); }}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors font-medium"
            >
              <LogOut className="w-4 h-4" />
              Выйти
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-8 w-fit">
            <button
              onClick={() => setTab('favorites')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                tab === 'favorites' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Heart className="w-4 h-4" />
              Избранное
              {favorites.length > 0 && (
                <span className="bg-orange-100 text-orange-600 text-xs px-1.5 py-0.5 rounded-full font-semibold">{favorites.length}</span>
              )}
            </button>
            <button
              onClick={() => setTab('requests')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                tab === 'requests' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <ClipboardList className="w-4 h-4" />
              Заявки
              {requests.length > 0 && (
                <span className="bg-orange-100 text-orange-600 text-xs px-1.5 py-0.5 rounded-full font-semibold">{requests.length}</span>
              )}
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
            </div>
          ) : tab === 'favorites' ? (
            favorites.length === 0 ? (
              <div className="text-center py-20">
                <Heart className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">Нет избранных питомцев</p>
                <Link to="/pets" className="mt-4 inline-block text-orange-500 font-medium hover:underline text-sm">
                  Смотреть питомцев →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {favorites.map(pet => (
                  <div key={pet.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img src={pet.photo_url} alt={pet.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900">{pet.name}</h3>
                      <p className="text-sm text-gray-500 mb-1">{pet.breed}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{pet.city}</span>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          to={`/pets/${pet.id}`}
                          className="flex-1 text-center text-sm py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
                        >
                          Открыть
                        </Link>
                        <button
                          onClick={() => removeFav(pet.id)}
                          className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg hover:border-red-300 hover:text-red-500 transition-colors text-gray-400"
                        >
                          <Heart className="w-4 h-4 fill-current" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            requests.length === 0 ? (
              <div className="text-center py-20">
                <ClipboardList className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">Нет отправленных заявок</p>
                <Link to="/pets" className="mt-4 inline-block text-orange-500 font-medium hover:underline text-sm">
                  Найти питомца →
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {requests.map(req => (
                  <div key={req.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex gap-5 items-start">
                    {req.pet && (
                      <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                        <img src={req.pet.photo_url} alt={req.pet.name} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-1.5">
                        <h3 className="font-bold text-gray-900">{req.pet?.name ?? 'Питомец удалён'}</h3>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${statusLabel[req.status]?.color ?? 'bg-gray-100 text-gray-600'}`}>
                          {statusLabel[req.status]?.text ?? req.status}
                        </span>
                      </div>
                      {req.pet && (
                        <p className="text-sm text-gray-500 mb-2">{req.pet.breed} · {req.pet.city}</p>
                      )}
                      {req.message && (
                        <p className="text-sm text-gray-600 italic line-clamp-2">«{req.message}»</p>
                      )}
                      <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-400">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(req.created_at).toLocaleDateString('ru-RU')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </Layout>
  );
}
