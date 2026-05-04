import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Shield, Search, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Pet } from '../lib/types';
import PetCard from '../components/PetCard';
import Layout from '../components/Layout';

export default function Home() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('pets')
      .select('*')
      .eq('status', 'available')
      .order('created_at', { ascending: false })
      .limit(6)
      .then(({ data }) => {
        if (data) setPets(data);
        setLoading(false);
      });
  }, []);

  const stats = [
    { number: '2 400+', label: 'Пристроенных животных' },
    { number: '180+', label: 'Активных питомцев' },
    { number: '50+', label: 'Городов России' },
    { number: '12 000+', label: 'Счастливых семей' },
  ];

  const steps = [
    { icon: Search, title: 'Найдите питомца', text: 'Используйте фильтры для поиска подходящего друга по породе, возрасту и городу.' },
    { icon: Heart, title: 'Отправьте заявку', text: 'Заполните заявку на знакомство. Наши волонтёры свяжутся с вами в течение суток.' },
    { icon: Users, title: 'Встреча', text: 'Познакомьтесь с питомцем лично. Убедитесь, что вы подходите друг другу.' },
    { icon: Shield, title: 'Забирайте домой', text: 'После подписания договора о передаче ваш новый друг едет домой!' },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=1600)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Более 180 питомцев ждут своих хозяев
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight">
            Найди друга —<br />
            <span className="text-orange-400">подари дом</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Тысячи животных из приютов ждут любящую семью. Помогите им обрести тепло и заботу.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/pets"
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30 flex items-center justify-center gap-2 text-base"
            >
              Смотреть питомцев
              <ArrowRight className="w-4.5 h-4.5" />
            </Link>
            <Link
              to="/stories"
              className="px-8 py-4 bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white font-semibold rounded-full transition-all border border-white/30 text-base"
            >
              Истории счастья
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/60">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-orange-500 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(s => (
              <div key={s.label} className="text-center text-white">
                <div className="text-3xl md:text-4xl font-bold mb-1">{s.number}</div>
                <div className="text-sm text-orange-100">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured pets */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Познакомьтесь с нами</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Каждый из этих питомцев мечтает о доме и любящей семье.
            </p>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
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
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pets.map(pet => <PetCard key={pet.id} pet={pet} />)}
            </div>
          )}
          <div className="text-center mt-10">
            <Link
              to="/pets"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-full transition-colors"
            >
              Все питомцы
              <ArrowRight className="w-4.5 h-4.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Как это работает</h2>
            <p className="text-gray-500 text-lg">Просто, прозрачно и безопасно для вас и питомца</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={step.title} className="relative group">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(100%-24px)] w-12 h-0.5 bg-gray-200 z-10" />
                )}
                <div className="text-center">
                  <div className="w-20 h-20 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-orange-500 transition-colors duration-300">
                    <step.icon className="w-9 h-9 text-orange-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="text-xs font-bold text-orange-500 mb-2">ШАГ {i + 1}</div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1200)' }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
            Готовы найти своего<br />
            <span className="text-orange-400">нового лучшего друга?</span>
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Более 180 питомцев ждут именно вас прямо сейчас.
          </p>
          <Link
            to="/pets"
            className="inline-flex items-center gap-2 px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-orange-500/30 text-base"
          >
            Начать поиск
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
