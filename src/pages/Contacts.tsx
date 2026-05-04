import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Clock, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Layout from '../components/Layout';

export default function Contacts() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message_text: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const set = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.from('messages').insert({
      name: form.name,
      email: form.email,
      phone: form.phone,
      message_text: form.message_text,
    });
    if (error) {
      setError('Произошла ошибка. Попробуйте ещё раз.');
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  const inputClass = 'w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all bg-white';

  const contacts = [
    { icon: MapPin, label: 'Адрес', value: 'Москва, ул. Дружбы, д. 12, офис 301' },
    { icon: Phone, label: 'Телефон', value: '+7 (495) 123-45-67' },
    { icon: Mail, label: 'Email', value: 'info@lapkidomoi.ru' },
    { icon: Clock, label: 'График', value: 'Пн–Пт: 9:00–18:00, Сб: 10:00–15:00' },
  ];

  return (
    <Layout>
      <div className="pt-20 lg:pt-24 min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-orange-100 py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Свяжитесь <span className="text-orange-500">с нами</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Есть вопросы? Хотите стать волонтёром? Напишите нам — ответим в течение суток.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact info */}
            <div className="space-y-5">
              {contacts.map(c => (
                <div key={c.label} className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                    <c.icon className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">{c.label}</div>
                    <div className="text-gray-800 font-medium text-sm">{c.value}</div>
                  </div>
                </div>
              ))}

              {/* Map placeholder */}
              <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 aspect-video bg-gray-200 relative">
                <img
                  src="https://images.pexels.com/photos/2990650/pexels-photo-2990650.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Карта"
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-sm text-sm font-medium text-gray-700">
                    <MapPin className="w-4 h-4 text-orange-500 inline mr-1.5 -mt-0.5" />
                    ул. Дружбы, д. 12, Москва
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              {sent ? (
                <div className="h-full flex items-center justify-center text-center py-12">
                  <div>
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Сообщение отправлено!</h3>
                    <p className="text-gray-500">Мы ответим вам в ближайшее время.</p>
                    <button
                      onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', message_text: '' }); }}
                      className="mt-6 px-6 py-2.5 border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      Написать ещё
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Форма обратной связи</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Имя *</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={e => set('name', e.target.value)}
                          placeholder="Ваше имя"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Email *</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={e => set('email', e.target.value)}
                          placeholder="you@example.com"
                          className={inputClass}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Телефон</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={e => set('phone', e.target.value)}
                        placeholder="+7 (___) ___-__-__"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Сообщение *</label>
                      <textarea
                        required
                        rows={5}
                        value={form.message_text}
                        onChange={e => set('message_text', e.target.value)}
                        placeholder="Ваш вопрос или предложение..."
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                      Отправить сообщение
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
