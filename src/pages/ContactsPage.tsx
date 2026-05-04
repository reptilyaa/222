import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, ChevronDown, ChevronUp, Send, CheckCircle } from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: 'Как я могу взять животное из приюта?',
    a: 'Найдите животное на нашей платформе, нажмите на карточку для подробностей и свяжитесь с приютом напрямую. Специалисты приюта расскажут вам о процедуре передачи и помогут оформить все документы.',
  },
  {
    q: 'Платная ли передача животного?',
    a: 'Это зависит от приюта. Большинство партнёрских приютов берут символический взнос на ветеринарные расходы (прививки, стерилизация). Наша платформа полностью бесплатна для пользователей.',
  },
  {
    q: 'Все ли животные привиты и здоровы?',
    a: 'Все животные, размещённые на нашей платформе, прошли ветеринарный осмотр в приюте. Информация о прививках и состоянии здоровья указана в описании каждого животного.',
  },
  {
    q: 'Могу ли я вернуть животное, если оно не подойдёт?',
    a: 'Да. Большинство приютов-партнёров принимают животных обратно в течение 30 дней, если по каким-то причинам не получилось адаптироваться. Мы рекомендуем обсудить это с приютом заранее.',
  },
  {
    q: 'Как добавить приют в базу ПриютПоиск?',
    a: 'Напишите нам на электронную почту или воспользуйтесь формой обратной связи ниже. Укажите название приюта, город и контакты. Мы свяжемся с вами в течение 3 рабочих дней.',
  },
  {
    q: 'Как сообщить о бездомном животном?',
    a: 'Вы можете написать нам напрямую или позвонить на нашу горячую линию. Мы передадим информацию ближайшему партнёрскому приюту.',
  },
];

const CONTACTS = [
  {
    icon: Mail,
    title: 'Email',
    lines: ['info@priutpoisk.ru', 'shelter@priutpoisk.ru'],
    color: 'text-sky-500',
    bg: 'bg-sky-50',
  },
  {
    icon: Phone,
    title: 'Телефон',
    lines: ['+7 (800) 555-01-20', 'Бесплатно по России'],
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
  },
  {
    icon: MapPin,
    title: 'Офис',
    lines: ['Москва, ул. Пушкина, 10', 'оф. 404'],
    color: 'text-orange-500',
    bg: 'bg-orange-50',
  },
  {
    icon: Clock,
    title: 'Часы работы',
    lines: ['Пн–Пт: 9:00 – 18:00', 'Сб: 10:00 – 15:00'],
    color: 'text-amber-500',
    bg: 'bg-amber-50',
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 hover:bg-gray-50 transition-colors"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="font-medium text-gray-800 text-sm">{q}</span>
        {open ? (
          <ChevronUp size={18} className="flex-shrink-0 text-gray-400" />
        ) : (
          <ChevronDown size={18} className="flex-shrink-0 text-gray-400" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed border-t border-gray-50">
          <p className="pt-3">{a}</p>
        </div>
      )}
    </div>
  );
}

export function ContactsPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">

      <div className="text-center mb-12">
        <span className="inline-block text-xs font-semibold tracking-widest text-orange-500 uppercase bg-orange-50 px-3 py-1.5 rounded-full mb-4">
          Контакты
        </span>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Свяжитесь с нами</h1>
        <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
          Есть вопросы или хотите добавить свой приют на платформу? Напишите нам — мы ответим в течение рабочего дня.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
        {CONTACTS.map(({ icon: Icon, title, lines, color, bg }) => (
          <div key={title} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
            <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${bg} mb-3`}>
              <Icon size={20} className={color} />
            </div>
            <h3 className="font-semibold text-gray-800 text-sm mb-1">{title}</h3>
            {lines.map((line) => (
              <p key={line} className="text-sm text-gray-500">{line}</p>
            ))}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-10 mb-14">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Написать нам</h2>

          {sent ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                <CheckCircle size={28} className="text-emerald-500" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Сообщение отправлено!</h3>
              <p className="text-sm text-gray-500">Мы ответим вам в течение одного рабочего дня.</p>
              <button
                onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                className="mt-5 text-sm text-orange-500 font-medium hover:underline"
              >
                Отправить ещё одно
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Ваше имя</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    placeholder="Иван Иванов"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                    placeholder="you@example.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Тема</label>
                <select
                  value={form.subject}
                  onChange={(e) => set('subject', e.target.value)}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition"
                >
                  <option value="">Выберите тему</option>
                  <option value="shelter">Добавить приют</option>
                  <option value="adoption">Вопрос об усыновлении</option>
                  <option value="stray">Сообщить о бездомном животном</option>
                  <option value="bug">Сообщить об ошибке</option>
                  <option value="other">Другое</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Сообщение</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => set('message', e.target.value)}
                  placeholder="Расскажите подробнее..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 text-white font-semibold py-3 rounded-xl hover:bg-orange-600 active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              >
                <Send size={16} />
                {loading ? 'Отправляем...' : 'Отправить сообщение'}
              </button>
            </form>
          )}
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Часто задаваемые вопросы</h2>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Наш офис</h2>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
            <MapPin size={14} />
            Москва, ул. Пушкина, 10, оф. 404
          </p>
        </div>
        <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <MapPin size={24} className="text-orange-500" />
            </div>
            <p className="text-sm text-gray-500 font-medium">Москва, ул. Пушкина, 10</p>
            <p className="text-xs text-gray-400 mt-1">м. Тверская, 5 минут пешком</p>
          </div>
        </div>
      </div>

    </div>
  );
}
