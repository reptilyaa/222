import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contacts() {
  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Свяжитесь с нами</h1>
        <p className="text-gray-600 text-lg">Мы всегда рады услышать от вас и ответить на ваши вопросы</p>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Контактная информация</h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <MapPin className="w-6 h-6 text-rose-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Адрес</h3>
                <p className="text-gray-600">
                  ул. Животноводов, 15<br />
                  Москва, 105043<br />
                  Россия
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Phone className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Телефон</h3>
                <p className="text-gray-600">
                  <a href="tel:+79991234567" className="hover:text-blue-600">
                    +7 (999) 123-45-67
                  </a>
                  <br />
                  <a href="tel:+79991234568" className="hover:text-blue-600">
                    +7 (999) 123-45-68
                  </a>
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Mail className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                <p className="text-gray-600">
                  <a href="mailto:info@shelter.ru" className="hover:text-green-600">
                    info@shelter.ru
                  </a>
                  <br />
                  <a href="mailto:adoption@shelter.ru" className="hover:text-green-600">
                    adoption@shelter.ru
                  </a>
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Clock className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Режим работы</h3>
                <p className="text-gray-600">
                  Пн-Пт: 09:00 - 18:00<br />
                  Сб-Вс: 10:00 - 16:00<br />
                  Выходные: официальные праздники
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Отправить сообщение</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ваше имя *
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="Иван Иванов"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="ivan@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Телефон
              </label>
              <input
                type="tel"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="+7 (999) 123-45-67"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Сообщение *
              </label>
              <textarea
                required
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="Напишите ваше сообщение..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-rose-500 text-white py-2 px-4 rounded-lg hover:bg-rose-600 transition-colors font-semibold"
            >
              Отправить
            </button>
          </form>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Как до нас добраться</h2>
        <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
          <p className="text-gray-600 text-lg">Здесь будет карта Google Maps</p>
        </div>
      </section>

      <section className="bg-blue-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Часто задаваемые вопросы</h2>
        <div className="space-y-4">
          <details className="bg-white rounded-lg p-4 cursor-pointer group">
            <summary className="font-semibold text-gray-900 group-open:text-rose-600">
              Какие документы нужны для усыновления?
            </summary>
            <p className="text-gray-600 mt-2">
              Вам потребится паспорт, договор об усыновлении и справка о вакцинации, если животное требует.
            </p>
          </details>

          <details className="bg-white rounded-lg p-4 cursor-pointer group">
            <summary className="font-semibold text-gray-900 group-open:text-rose-600">
              Нужно ли платить за усыновление?
            </summary>
            <p className="text-gray-600 mt-2">
              Нет, усыновление бесплатно. Однако мы благодарны за добровольные пожертвования.
            </p>
          </details>

          <details className="bg-white rounded-lg p-4 cursor-pointer group">
            <summary className="font-semibold text-gray-900 group-open:text-rose-600">
              Могу ли я вернуть животное, если не приживается?
            </summary>
            <p className="text-gray-600 mt-2">
              Да, мы всегда готовы помочь. Если возникают проблемы, свяжитесь с нами, и мы найдем решение.
            </p>
          </details>
        </div>
      </section>
    </div>
  );
}
