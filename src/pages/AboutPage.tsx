import { Heart, Shield, Users, Award, Clock, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import type { Page } from '../types/database';

interface AboutPageProps {
  onNavigate: (page: Page) => void;
}

const STATS = [
  { value: '1 500+', label: 'Животных нашли дом', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50' },
  { value: '50+', label: 'Приютов-партнёров', icon: Shield, color: 'text-sky-500', bg: 'bg-sky-50' },
  { value: '12 000+', label: 'Зарегистрированных пользователей', icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { value: '5 лет', label: 'Мы помогаем животным', icon: Award, color: 'text-amber-500', bg: 'bg-amber-50' },
];

const STEPS = [
  {
    number: '01',
    title: 'Найдите питомца',
    desc: 'Используйте фильтры для поиска по виду, возрасту и городу. Просмотрите карточки и выберите того, кто вам понравился.',
  },
  {
    number: '02',
    title: 'Свяжитесь с приютом',
    desc: 'На странице животного вы найдёте контакты приюта. Позвоните или напишите, чтобы договориться о визите.',
  },
  {
    number: '03',
    title: 'Заберите домой',
    desc: 'Посетите приют, познакомьтесь с животным и завершите все формальности. Ваш новый друг готов к жизни в вашем доме.',
  },
];

const TEAM = [
  {
    name: 'Анна Соколова',
    role: 'Основатель и директор',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
    bio: 'Зоозащитник с 10-летним стажем. Основала платформу после того, как лично помогла устроить более 200 животных.',
  },
  {
    name: 'Михаил Петров',
    role: 'Технический директор',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
    bio: 'Разработчик и владелец трёх спасённых котов. Создаёт технологии, которые помогают животным находить дом.',
  },
  {
    name: 'Елена Иванова',
    role: 'Координатор приютов',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
    bio: 'Ветеринар по образованию. Выстраивает партнёрские отношения с приютами по всей России.',
  },
];

const PARTNERS = [
  'Москва', 'Санкт-Петербург', 'Казань', 'Екатеринбург',
  'Новосибирск', 'Краснодар', 'Нижний Новгород', 'Самара',
];

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">

      <section className="text-center mb-16">
        <span className="inline-block text-xs font-semibold tracking-widest text-orange-500 uppercase bg-orange-50 px-3 py-1.5 rounded-full mb-4">
          О нас
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
          Мы помогаем животным <br className="hidden sm:block" />
          <span className="text-orange-500">найти дом</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
          ПриютПоиск — это платформа, которая объединяет людей, готовых дать питомца в хорошие руки,
          с теми, кто мечтает о верном друге.
        </p>
        <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
          <button
            onClick={() => onNavigate('home')}
            className="bg-orange-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors flex items-center gap-2"
          >
            Найти питомца
            <ArrowRight size={18} />
          </button>
          <button
            onClick={() => onNavigate('contacts')}
            className="bg-white text-gray-700 font-semibold px-6 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Связаться с нами
          </button>
        </div>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        {STATS.map(({ value, label, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
            <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${bg} mb-3`}>
              <Icon size={22} className={color} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{value}</div>
            <div className="text-xs text-gray-500 mt-0.5 leading-snug">{label}</div>
          </div>
        ))}
      </section>

      <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 mb-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block text-xs font-semibold tracking-widest text-orange-500 uppercase mb-3">
              Наша миссия
            </span>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Каждое животное заслуживает любящего дома
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              Тысячи кошек и собак ежегодно оказываются в приютах. Мы верим, что у каждого из них
              есть шанс найти семью. Наша платформа делает этот процесс простым, прозрачным и доступным
              для всех жителей России.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Мы работаем напрямую с приютами, проверяем информацию о животных и помогаем людям
              сделать осознанный выбор при усыновлении питомца.
            </p>
            <ul className="mt-5 space-y-2">
              {[
                'Только проверенные приюты-партнёры',
                'Актуальная информация о животных',
                'Поддержка на всех этапах усыновления',
                'Бесплатный сервис для всех пользователей',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <CheckCircle size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <img
              src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Собака в приюте"
              className="rounded-2xl object-cover w-full aspect-[4/5]"
            />
            <div className="flex flex-col gap-3">
              <img
                src="https://images.pexels.com/photos/2071873/pexels-photo-2071873.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Кошка в приюте"
                className="rounded-2xl object-cover w-full flex-1"
              />
              <img
                src="https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Животные"
                className="rounded-2xl object-cover w-full flex-1"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold tracking-widest text-orange-500 uppercase mb-3">
            Как это работает
          </span>
          <h2 className="text-2xl font-bold text-gray-900">Три простых шага к новому другу</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((step) => (
            <div key={step.number} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 relative overflow-hidden">
              <div className="text-6xl font-black text-gray-50 absolute -top-2 -right-1 select-none">
                {step.number}
              </div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-orange-100 rounded-xl mb-4">
                  <span className="text-sm font-bold text-orange-600">{step.number}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold tracking-widest text-orange-500 uppercase mb-3">
            Команда
          </span>
          <h2 className="text-2xl font-bold text-gray-900">Люди, которые за этим стоят</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {TEAM.map((member) => (
            <div key={member.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 border-orange-50"
              />
              <h3 className="font-bold text-gray-900">{member.name}</h3>
              <p className="text-xs text-orange-500 font-medium mt-0.5 mb-3">{member.role}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 mb-16">
        <div className="text-center mb-8">
          <span className="inline-block text-xs font-semibold tracking-widest text-orange-500 uppercase mb-3">
            География
          </span>
          <h2 className="text-2xl font-bold text-gray-900">Мы работаем по всей России</h2>
          <p className="text-gray-500 mt-2 text-sm">
            Приюты-партнёры уже есть в {PARTNERS.length} городах
          </p>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          {PARTNERS.map((city) => (
            <div key={city} className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-full px-4 py-2 text-sm text-gray-700">
              <MapPin size={13} className="text-orange-400" />
              {city}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-orange-500 rounded-3xl p-10 text-center text-white">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 rounded-2xl mb-4">
          <Clock size={28} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Хотите помочь?</h2>
        <p className="text-orange-100 mb-6 max-w-md mx-auto text-sm leading-relaxed">
          Если вы представляете приют и хотите разместить своих питомцев на платформе —
          свяжитесь с нами. Регистрация для приютов бесплатна.
        </p>
        <button
          onClick={() => onNavigate('contacts')}
          className="bg-white text-orange-600 font-semibold px-6 py-3 rounded-xl hover:bg-orange-50 transition-colors"
        >
          Написать нам
        </button>
      </section>

    </div>
  );
}
