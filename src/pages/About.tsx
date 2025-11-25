import { Award, Users, Heart, Briefcase } from 'lucide-react';

export default function About() {
  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-4xl font-bold text-gray-900 mb-6">О нашем приюте</h1>
        <div className="bg-white rounded-lg shadow-md p-8">
          <p className="text-lg text-gray-700 mb-4">
            Наш приют был основан в 2015 году с целью спасать и защищать животных, оставшихся без дома.
            За эти годы мы помогли найти новые дома для тысяч питомцев и продолжаем эту важную работу.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Мы верим, что каждое животное заслуживает любви, заботы и уютного дома. Наша команда работает
            ежедневно, чтобы обеспечить животным качественный уход, медицинское обслуживание и внимание.
          </p>
          <p className="text-lg text-gray-700">
            Мы не просто спасаем животных - мы создаем переходный дом, где каждый питомец может восстановиться
            и подготовиться к новой жизни с заботливой семьей.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Наши ценности</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-4">
              <Heart className="w-8 h-8 text-rose-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Забота</h3>
                <p className="text-gray-600">
                  Мы относимся к каждому животному с бесконечной любовью и уважением. Благополучие питомца
                  всегда на первом месте.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-4">
              <Award className="w-8 h-8 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Качество</h3>
                <p className="text-gray-600">
                  Мы обеспечиваем высокий стандарт обслуживания, включая ветеринарный уход и правильное питание.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-4">
              <Users className="w-8 h-8 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Сообщество</h3>
                <p className="text-gray-600">
                  Мы строим дружное сообщество волонтеров, спонсоров и людей, которые заботятся о животных.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-4">
              <Briefcase className="w-8 h-8 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ответственность</h3>
                <p className="text-gray-600">
                  Мы ответственно подходим к процессу усыновления и тщательно подбираем семьи для питомцев.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Статистика приюта</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">5000+</div>
            <p className="text-gray-700">Животных спасено</p>
          </div>
          <div className="bg-green-50 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">4800+</div>
            <p className="text-gray-700">Успешных усыновлений</p>
          </div>
          <div className="bg-rose-50 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-rose-600 mb-2">25</div>
            <p className="text-gray-700">Волонтеров команде</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">10</div>
            <p className="text-gray-700">Лет деятельности</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Наша команда</h2>
        <p className="text-gray-600 mb-6">
          Наш приют работает благодаря дружной команде профессиональных сотрудников и преданных волонтеров,
          которые каждый день дарят животным внимание, любовь и заботу.
        </p>
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <p className="text-gray-700 text-lg">
            Если вы хотите присоединиться к нашей команде волонтеров или узнать больше о нашей работе,
            пожалуйста, свяжитесь с нами!
          </p>
        </div>
      </section>
    </div>
  );
}
