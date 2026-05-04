import { useState } from 'react';
import { Heart, Quote, ArrowRight, Star, MapPin, Calendar } from 'lucide-react';
import type { Page } from '../types/database';

interface StoriesPageProps {
  onNavigate: (page: Page) => void;
}

interface Story {
  id: number;
  ownerName: string;
  ownerCity: string;
  ownerAvatar: string;
  petName: string;
  petType: 'dog' | 'cat';
  petBreed: string;
  adoptedDate: string;
  petBefore: string;
  petAfter: string;
  quote: string;
  fullStory: string;
  rating: number;
  tag: string;
}

const STORIES: Story[] = [
  {
    id: 1,
    ownerName: 'Мария и Алексей Смирновы',
    ownerCity: 'Москва',
    ownerAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    petName: 'Барни',
    petType: 'dog',
    petBreed: 'Лабрадор',
    adoptedDate: 'Март 2024',
    petBefore: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=600',
    petAfter: 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=600',
    quote: 'Барни изменил всю нашу жизнь. Теперь каждое утро начинается с его радостного лая.',
    fullStory: 'Мы долго думали, стоит ли брать собаку. Дочь мечтала о питомце несколько лет, и мы наконец решились. На ПриютПоиск нашли Барни за 20 минут — фильтр по городу и возрасту сразу показал то, что нужно. Уже три месяца он с нами, и мы не представляем жизни без него. Он невероятно добрый и хорошо ладит с детьми.',
    rating: 5,
    tag: 'Семья с детьми',
  },
  {
    id: 2,
    ownerName: 'Ольга Петрова',
    ownerCity: 'Санкт-Петербург',
    ownerAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    petName: 'Луция',
    petType: 'cat',
    petBreed: 'Сибирская',
    adoptedDate: 'Январь 2024',
    petBefore: 'https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&w=600',
    petAfter: 'https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=600',
    quote: 'Жила одна, теперь — с лучшей компанией на свете. Луция превратила мою квартиру в настоящий дом.',
    fullStory: 'Переехала в Петербург по работе, квартира казалась пустой. Подруга посоветовала ПриютПоиск. Нашла Луцию через несколько минут — прочитала описание и сразу поняла, что это моя кошка. Она была немного пугливой поначалу, но уже через неделю спала у меня на коленях. Теперь не понимаю, как жила без неё.',
    rating: 5,
    tag: 'Живу один(а)',
  },
  {
    id: 3,
    ownerName: 'Дмитрий Козлов',
    ownerCity: 'Казань',
    ownerAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
    petName: 'Граф',
    petType: 'dog',
    petBreed: 'Немецкая овчарка',
    adoptedDate: 'Ноябрь 2023',
    petBefore: 'https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?auto=compress&cs=tinysrgb&w=600',
    petAfter: 'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?auto=compress&cs=tinysrgb&w=600',
    quote: 'Граф — мой лучший напарник в беге. 10 км каждое утро, и он всегда готов к большему.',
    fullStory: 'Занимаюсь бегом и давно хотел собаку-партнёра для тренировок. Нашёл Графа в поиске по фильтру "собака, 2 года". Связался с приютом в тот же день, на следующий — уже познакомились. Парень оказался именно таким, как описывали: умный, активный, послушный. Прошли вместе базовый курс дрессировки, теперь тренируемся ежедневно.',
    rating: 5,
    tag: 'Активный образ жизни',
  },
  {
    id: 4,
    ownerName: 'Наталья Фёдорова',
    ownerCity: 'Екатеринбург',
    ownerAvatar: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=200',
    petName: 'Снежок',
    petType: 'cat',
    petBreed: 'Персидская',
    adoptedDate: 'Февраль 2024',
    petBefore: 'https://images.pexels.com/photos/2558605/pexels-photo-2558605.jpeg?auto=compress&cs=tinysrgb&w=600',
    petAfter: 'https://images.pexels.com/photos/2071873/pexels-photo-2071873.jpeg?auto=compress&cs=tinysrgb&w=600',
    quote: 'Мама обожает Снежка. Он буквально оживил её — теперь у неё есть причина вставать с утра пораньше.',
    fullStory: 'Искала кошку для мамы, которая живёт одна. Хотела спокойное и ласковое животное. Фильтр по типу "кошка" и возрасту "от 4 лет" дал несколько отличных вариантов. Снежок сразу понравился маме по фото. Приехали в приют — и он сам пошёл к ней на руки. Будто знал. Теперь звонит мне каждый день и рассказывает, что он натворил.',
    rating: 5,
    tag: 'Подарок родителям',
  },
  {
    id: 5,
    ownerName: 'Игорь и Светлана Волковы',
    ownerCity: 'Новосибирск',
    ownerAvatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=200',
    petName: 'Буся',
    petType: 'dog',
    petBreed: 'Дворняга',
    adoptedDate: 'Октябрь 2023',
    petBefore: 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=600',
    petAfter: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600',
    quote: 'Говорят, беспородные собаки самые преданные. Теперь я в это верю на сто процентов.',
    fullStory: 'Купили дом с участком и поняли — нужна собака. Сначала думали о породистой, но после разговора с волонтёрами передумали. Буся — двора смешанной породы, ей было 3 года. Очень игривая и добрая. Дети от неё без ума. Охраняет двор, играет с ребятами, ночует в будке и каждое утро встречает нас у порога.',
    rating: 5,
    tag: 'Частный дом',
  },
  {
    id: 6,
    ownerName: 'Екатерина Миронова',
    ownerCity: 'Москва',
    ownerAvatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=200',
    petName: 'Рыжик',
    petType: 'cat',
    petBreed: 'Беспородный',
    adoptedDate: 'Декабрь 2023',
    petBefore: 'https://images.pexels.com/photos/320014/pexels-photo-320014.jpeg?auto=compress&cs=tinysrgb&w=600',
    petAfter: 'https://images.pexels.com/photos/127028/pexels-photo-127028.jpeg?auto=compress&cs=tinysrgb&w=600',
    quote: 'Рыжик — настоящий терапевт. После тяжёлого дня просто нужно взять его на руки.',
    fullStory: 'Читала статью о пользе кошек для психологического здоровья и решилась. Долго выбирала на разных платформах, но ПриютПоиск понравился простотой и тем, что можно сразу отфильтровать по городу. Рыжик жил в московском приюте, 2 года. Сейчас ему явно лучше, чем было — лоснящаяся шерсть, игривый характер. Мне тоже лучше.',
    rating: 5,
    tag: 'Первый питомец',
  },
];

const STATS = [
  { value: '1 500+', label: 'счастливых историй' },
  { value: '98%', label: 'владельцев рекомендуют усыновление' },
  { value: '4.9', label: 'средняя оценка сервиса' },
];

const TYPE_LABELS = { dog: 'Собака', cat: 'Кошка' };
const TYPE_COLORS = {
  dog: 'bg-amber-100 text-amber-700',
  cat: 'bg-sky-100 text-sky-700',
};

function StoryCard({ story, onOpen }: { story: Story; onOpen: (s: Story) => void }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-shadow duration-200">
      <div className="grid grid-cols-2 gap-0.5 bg-gray-100">
        <div className="relative overflow-hidden aspect-square">
          <img src={story.petBefore} alt="до" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          <span className="absolute bottom-2 left-2 text-xs font-semibold bg-black/50 text-white px-2 py-0.5 rounded-full">До</span>
        </div>
        <div className="relative overflow-hidden aspect-square">
          <img src={story.petAfter} alt="после" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          <span className="absolute bottom-2 right-2 text-xs font-semibold bg-orange-500 text-white px-2 py-0.5 rounded-full">После</span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-1.5 flex-wrap">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${TYPE_COLORS[story.petType]}`}>
              {TYPE_LABELS[story.petType]}
            </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
              {story.tag}
            </span>
          </div>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: story.rating }).map((_, i) => (
              <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
            ))}
          </div>
        </div>

        <div className="flex items-start gap-2 mb-3">
          <Quote size={16} className="text-orange-200 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700 italic leading-relaxed line-clamp-2">{story.quote}</p>
        </div>

        <div className="flex items-center gap-3 pt-3 border-t border-gray-50">
          <img
            src={story.ownerAvatar}
            alt={story.ownerName}
            className="w-9 h-9 rounded-full object-cover border-2 border-orange-50 flex-shrink-0"
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">{story.ownerName}</p>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="flex items-center gap-1"><MapPin size={10} />{story.ownerCity}</span>
              <span className="flex items-center gap-1"><Calendar size={10} />{story.adoptedDate}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => onOpen(story)}
          className="mt-4 w-full text-sm font-medium text-orange-500 hover:text-orange-600 flex items-center justify-center gap-1.5 py-2 rounded-xl hover:bg-orange-50 transition-colors"
        >
          Читать историю
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

function StoryModal({ story, onClose }: { story: Story; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-2 gap-0.5 rounded-t-3xl overflow-hidden bg-gray-100">
          <div className="relative aspect-[4/3]">
            <img src={story.petBefore} alt="до" className="w-full h-full object-cover" />
            <span className="absolute bottom-3 left-3 text-xs font-semibold bg-black/50 text-white px-2.5 py-1 rounded-full">До</span>
          </div>
          <div className="relative aspect-[4/3]">
            <img src={story.petAfter} alt="после" className="w-full h-full object-cover" />
            <span className="absolute bottom-3 right-3 text-xs font-semibold bg-orange-500 text-white px-2.5 py-1 rounded-full">После</span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{story.petName}</h2>
              <p className="text-sm text-gray-500">{story.petBreed} · {story.adoptedDate}</p>
            </div>
            <div className="flex gap-0.5">
              {Array.from({ length: story.rating }).map((_, i) => (
                <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
              ))}
            </div>
          </div>

          <blockquote className="bg-orange-50 rounded-xl p-4 mb-5 relative">
            <Quote size={20} className="text-orange-200 mb-2" />
            <p className="text-gray-700 italic leading-relaxed text-sm">{story.quote}</p>
          </blockquote>

          <p className="text-sm text-gray-600 leading-relaxed mb-5">{story.fullStory}</p>

          <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
            <img
              src={story.ownerAvatar}
              alt={story.ownerName}
              className="w-11 h-11 rounded-full object-cover border-2 border-orange-100"
            />
            <div>
              <p className="font-semibold text-gray-800 text-sm">{story.ownerName}</p>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <MapPin size={11} />{story.ownerCity}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="mt-5 w-full py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}

export function StoriesPage({ onNavigate }: StoriesPageProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'dog' | 'cat'>('all');
  const [selected, setSelected] = useState<Story | null>(null);

  const filtered = activeFilter === 'all'
    ? STORIES
    : STORIES.filter((s) => s.petType === activeFilter);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">

      <div className="text-center mb-12">
        <span className="inline-block text-xs font-semibold tracking-widest text-orange-500 uppercase bg-orange-50 px-3 py-1.5 rounded-full mb-4">
          Истории усыновления
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
          Они нашли свой дом.
          <br />
          <span className="text-orange-500">А вы поможете следующему?</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
          Реальные истории людей, которые изменили жизнь животного — и своя жизнь изменилась тоже.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-12">
        {STATS.map(({ value, label }) => (
          <div key={label} className="text-center">
            <div className="text-2xl font-black text-gray-900">{value}</div>
            <div className="text-xs text-gray-500 mt-0.5 leading-snug">{label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-12">
        <div className="grid lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-0.5 bg-gray-100 aspect-[4/3] lg:aspect-auto">
            <img
              src={STORIES[0].petBefore}
              alt="до"
              className="w-full h-full object-cover"
            />
            <img
              src={STORIES[0].petAfter}
              alt="после"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8 flex flex-col justify-center">
            <span className="inline-block text-xs font-semibold tracking-widest text-orange-500 uppercase mb-3">
              История месяца
            </span>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{STORIES[0].petName}</h2>
            <p className="text-gray-400 text-sm mb-4">{STORIES[0].petBreed} · {STORIES[0].adoptedDate}</p>
            <blockquote className="relative mb-5">
              <Quote size={24} className="text-orange-100 mb-1" />
              <p className="text-gray-700 leading-relaxed italic">{STORIES[0].quote}</p>
            </blockquote>
            <p className="text-sm text-gray-500 leading-relaxed mb-6 line-clamp-3">
              {STORIES[0].fullStory}
            </p>
            <div className="flex items-center gap-3">
              <img
                src={STORIES[0].ownerAvatar}
                alt={STORIES[0].ownerName}
                className="w-10 h-10 rounded-full object-cover border-2 border-orange-50"
              />
              <div>
                <p className="font-semibold text-gray-800 text-sm">{STORIES[0].ownerName}</p>
                <p className="text-xs text-gray-400">{STORIES[0].ownerCity}</p>
              </div>
              <button
                onClick={() => setSelected(STORIES[0])}
                className="ml-auto text-sm font-medium text-orange-500 hover:text-orange-600 flex items-center gap-1.5 bg-orange-50 px-3 py-1.5 rounded-lg transition-colors"
              >
                Читать <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Все истории</h2>
        <div className="flex gap-1.5 bg-white border border-gray-200 rounded-xl p-1">
          {([['all', 'Все'], ['dog', 'Собаки'], ['cat', 'Кошки']] as const).map(([val, label]) => (
            <button
              key={val}
              onClick={() => setActiveFilter(val)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === val
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
        {filtered.map((story) => (
          <StoryCard key={story.id} story={story} onOpen={setSelected} />
        ))}
      </div>

      <div className="bg-gradient-to-br from-orange-500 to-amber-400 rounded-3xl p-10 text-center text-white">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 rounded-2xl mb-4">
          <Heart size={28} className="text-white fill-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Напишите свою историю</h2>
        <p className="text-orange-100 mb-6 max-w-md mx-auto text-sm leading-relaxed">
          Взяли питомца через ПриютПоиск? Поделитесь своей историей — она вдохновит других людей
          открыть сердце для животного из приюта.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={() => onNavigate('home')}
            className="bg-white text-orange-600 font-semibold px-6 py-3 rounded-xl hover:bg-orange-50 transition-colors"
          >
            Найти питомца
          </button>
          <button
            onClick={() => onNavigate('contacts')}
            className="bg-white/20 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/30 transition-colors border border-white/30"
          >
            Поделиться историей
          </button>
        </div>
      </div>

      {selected && (
        <StoryModal story={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
