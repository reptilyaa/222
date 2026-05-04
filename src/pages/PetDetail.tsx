import { useState, useEffect, FormEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Heart, CreditCard as Edit3, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Pet } from '../lib/types';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import PetForm from '../components/PetForm';
import AuthModal from '../components/AuthModal';

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

const genderLabel: Record<string, string> = { male: 'Мальчик', female: 'Девочка', unknown: 'Не указан' };
const speciesLabel: Record<string, string> = { dog: 'Собака', cat: 'Кошка', other: 'Другое' };

export default function PetDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [authModal, setAuthModal] = useState<'login' | 'register' | null>(null);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestMsg, setRequestMsg] = useState('');
  const [requestSent, setRequestSent] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    supabase
      .from('pets')
      .select('*')
      .eq('id', id)
      .maybeSingle()
      .then(({ data }) => {
        if (data) setPet(data);
        else setNotFound(true);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!user || !id) return;
    supabase
      .from('favorites')
      .select('id')
      .eq('user_id', user.id)
      .eq('pet_id', id)
      .maybeSingle()
      .then(({ data }) => setIsFav(!!data));
  }, [user, id]);

  const toggleFav = async () => {
    if (!user) { setAuthModal('login'); return; }
    if (isFav) {
      await supabase.from('favorites').delete().eq('user_id', user.id).eq('pet_id', id!);
      setIsFav(false);
    } else {
      await supabase.from('favorites').insert({ user_id: user.id, pet_id: id! });
      setIsFav(true);
    }
  };

  const handleRequest = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) { setAuthModal('login'); return; }
    setRequestLoading(true);
    await supabase.from('adoption_requests').insert({
      user_id: user.id,
      pet_id: id!,
      message: requestMsg,
      status: 'pending',
    });
    setRequestSent(true);
    setRequestLoading(false);
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center pt-20">
          <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
        </div>
      </Layout>
    );
  }

  if (notFound || !pet) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center pt-20 text-center px-4">
          <div>
            <div className="text-8xl mb-6">🐾</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Питомец не найден</h1>
            <p className="text-gray-500 mb-6">Этот питомец, возможно, уже нашёл свою семью.</p>
            <Link to="/pets" className="px-6 py-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-colors">
              Смотреть других питомцев
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-20 lg:pt-24 min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Back link */}
          <Link to="/pets" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors text-sm mb-8">
            <ArrowLeft className="w-4 h-4" />
            Назад к питомцам
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Photo */}
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg">
                <img
                  src={pet.photo_url || 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800'}
                  alt={pet.name}
                  className="w-full h-full object-cover"
                />
                {pet.status !== 'available' && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="bg-white text-gray-800 font-semibold px-6 py-2 rounded-full">
                      {pet.status === 'adopted' ? 'Пристроен' : 'Зарезервирован'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{pet.name}</h1>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={toggleFav}
                    className={`w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all hover:scale-110 ${
                      isFav ? 'bg-red-500 border-red-500 text-white' : 'border-gray-200 text-gray-400 hover:border-red-300'
                    }`}
                    aria-label="Добавить в избранное"
                  >
                    <Heart className={`w-5 h-5 ${isFav ? 'fill-white' : ''}`} />
                  </button>
                  {user && (
                    <button
                      onClick={() => setEditOpen(true)}
                      className="w-11 h-11 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-400 hover:border-orange-400 hover:text-orange-500 transition-all hover:scale-110"
                      aria-label="Редактировать"
                    >
                      <Edit3 className="w-4.5 h-4.5" />
                    </button>
                  )}
                </div>
              </div>

              <p className="text-gray-500 text-lg mb-6">{pet.breed}</p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-xs text-gray-400 font-medium mb-1">Вид</div>
                  <div className="font-semibold text-gray-900">{speciesLabel[pet.species] || pet.species}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-xs text-gray-400 font-medium mb-1">Пол</div>
                  <div className="font-semibold text-gray-900">{genderLabel[pet.gender] || 'Не указан'}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-orange-400" />
                  <div>
                    <div className="text-xs text-gray-400 font-medium mb-0.5">Возраст</div>
                    <div className="font-semibold text-gray-900">{formatAge(pet.age_years)}</div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orange-400" />
                  <div>
                    <div className="text-xs text-gray-400 font-medium mb-0.5">Город</div>
                    <div className="font-semibold text-gray-900">{pet.city}</div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="font-bold text-gray-900 mb-2">О питомце</h2>
                <p className="text-gray-600 leading-relaxed">{pet.description}</p>
              </div>

              {/* Action buttons */}
              {pet.status === 'available' && (
                <div className="mt-auto">
                  {!showRequestForm ? (
                    <button
                      onClick={() => user ? setShowRequestForm(true) : setAuthModal('login')}
                      className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors text-base"
                    >
                      Отправить заявку на знакомство
                    </button>
                  ) : requestSent ? (
                    <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4 text-green-700">
                      <CheckCircle className="w-5 h-5 shrink-0" />
                      <div>
                        <p className="font-semibold">Заявка отправлена!</p>
                        <p className="text-sm text-green-600">Мы свяжемся с вами в течение суток.</p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleRequest} className="space-y-3">
                      <textarea
                        rows={3}
                        required
                        value={requestMsg}
                        onChange={e => setRequestMsg(e.target.value)}
                        placeholder="Расскажите немного о себе и почему хотите взять этого питомца..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                      />
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setShowRequestForm(false)}
                          className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50"
                        >
                          Отмена
                        </button>
                        <button
                          type="submit"
                          disabled={requestLoading}
                          className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                        >
                          {requestLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                          Отправить
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {editOpen && (
        <PetForm
          pet={pet}
          onClose={() => setEditOpen(false)}
          onSaved={(updated) => { setPet(updated); setEditOpen(false); }}
        />
      )}

      {authModal && (
        <AuthModal mode={authModal} onClose={() => setAuthModal(null)} onSwitchMode={m => setAuthModal(m)} />
      )}
    </Layout>
  );
}
