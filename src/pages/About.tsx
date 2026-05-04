import { Heart, Shield, Users, Target, Award, Globe } from 'lucide-react';
import Layout from '../components/Layout';

const partners = [
  { name: 'ВетКлиника Дружба', logo: '🏥', desc: 'Ветеринарная помощь питомцам' },
  { name: 'Корм & Уход', logo: '🛒', desc: 'Поставщик кормов и товаров' },
  { name: 'Авто-транспорт+', logo: '🚗', desc: 'Транспортировка животных' },
  { name: 'ФотоПитомец', logo: '📸', desc: 'Профессиональные фотосессии' },
  { name: 'ZooДом', logo: '🏠', desc: 'Строительство вольеров' },
  { name: 'РусЗоо Фонд', logo: '🐾', desc: 'Благотворительный фонд' },
];

const team = [
  { name: 'Анна Смирнова', role: 'Основатель и директор', photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Михаил Петров', role: 'Руководитель приюта', photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Елена Козлова', role: 'Главный ветеринар', photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Дмитрий Новиков', role: 'Куратор волонтёров', photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

const values = [
  { icon: Heart, title: 'Любовь и забота', text: 'Каждое животное для нас — личность, заслуживающая уважения и заботы.' },
  { icon: Shield, title: 'Ответственность', text: 'Мы проверяем каждую семью, чтобы питомец попал в безопасный дом.' },
  { icon: Users, title: 'Сообщество', text: 'Мы объединяем волонтёров, спонсоров и неравнодушных людей по всей России.' },
  { icon: Target, title: 'Прозрачность', text: 'Все операции открыты. Мы публикуем отчёты о деятельности каждый квартал.' },
  { icon: Award, title: 'Качество', text: 'Все питомцы проходят ветеринарный осмотр, вакцинацию и подготовку к новому дому.' },
  { icon: Globe, title: 'Масштаб', text: 'Работаем в 50+ городах России. Наша сеть волонтёров насчитывает более 1 200 человек.' },
];

export default function About() {
  return (
    <Layout>
      <div className="pt-20 lg:pt-24">
        {/* Hero */}
        <section className="relative py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-white overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                  <Heart className="w-4 h-4" /> Основана в 2018 году
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Мы верим, что каждый<br />
                  <span className="text-orange-500">питомец заслуживает дома</span>
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  ЛапкиДомой — это платформа, которая связывает животных из приютов с любящими семьями. Мы работаем с более чем 120 приютами по всей России.
                </p>
                <p className="text-gray-500 leading-relaxed">
                  За 6 лет работы мы помогли найти дом более чем 2 400 животным. Наша команда состоит из волонтёров, ветеринаров и просто неравнодушных людей, которые каждый день делают мир чуточку лучше.
                </p>
              </div>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                  <img
                    src="https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="О нас"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-5 -left-5 bg-orange-500 text-white rounded-2xl p-5 shadow-xl">
                  <div className="text-3xl font-bold">2 400+</div>
                  <div className="text-sm text-orange-100">пристроенных питомцев</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Наша миссия</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Мы создаём экосистему, в которой пристройство животных становится простым, безопасным и радостным событием. Наша платформа соединяет приюты, волонтёров, ветеринаров и семьи в единую сеть заботы.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Наши ценности</h2>
              <p className="text-gray-500 text-lg">То, что движет нами каждый день</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map(v => (
                <div key={v.title} className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-orange-500 transition-colors">
                    <v.icon className="w-6 h-6 text-orange-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Наша команда</h2>
              <p className="text-gray-500 text-lg">Люди, которые делают это возможным</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {team.map(member => (
                <div key={member.name} className="text-center group">
                  <div className="w-28 h-28 mx-auto rounded-2xl overflow-hidden mb-4 shadow-sm group-hover:shadow-lg transition-shadow">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-bold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Наши партнёры</h2>
              <p className="text-gray-500 text-lg">Компании, разделяющие наши ценности</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {partners.map(p => (
                <div key={p.name} className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div className="text-3xl mb-3">{p.logo}</div>
                  <div className="text-xs font-bold text-gray-800 mb-1">{p.name}</div>
                  <div className="text-xs text-gray-400">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
