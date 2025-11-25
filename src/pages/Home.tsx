import { Heart, Users, Phone } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="space-y-16">
      <section className="text-center py-16 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Добро пожаловать в наш приют
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Каждое животное заслуживает любви и заботы. Помогите нам найти для них новый дом.
        </p>
        <button
          onClick={() => onNavigate('catalog')}
          className="inline-block bg-rose-500 text-white px-8 py-3 rounded-lg hover:bg-rose-600 transition-colors font-semibold text-lg"
        >
          Посмотреть животных
        </button>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Большая семья</h3>
          <p className="text-gray-600">
            Более 50 животных ждут своего нового дома. Каждое имеет свой характер и историю.
          </p>
        </div>

        <div className="text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">С любовью и заботой</h3>
          <p className="text-gray-600">
            Все животные получают ветеринарный уход, питание и внимание от наших сотрудников.
          </p>
        </div>

        <div className="text-center">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Поддержка 24/7</h3>
          <p className="text-gray-600">
            Мы всегда готовы помочь и ответить на все ваши вопросы об усыновлении.
          </p>
        </div>
      </section>

      <section className="bg-gray-100 rounded-xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Как это работает?</h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="bg-rose-500 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
              1
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Выберите животное</h3>
              <p className="text-gray-600">Посмотрите каталог и найдите своего будущего питомца</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-rose-500 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
              2
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Заполните заявку</h3>
              <p className="text-gray-600">Расскажите нам о себе и почему вы хотите усыновить питомца</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-rose-500 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
              3
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Мы свяжемся с вами</h3>
              <p className="text-gray-600">Обсудим детали и найдем идеальное решение для вас и питомца</p>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Готовы помочь?</h2>
        <p className="text-gray-600 mb-6">Каждая помощь имеет значение для наших питомцев</p>
        <button
          onClick={() => onNavigate('contacts')}
          className="inline-block bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
        >
          Свяжитесь с нами
        </button>
      </section>
    </div>
  );
}
