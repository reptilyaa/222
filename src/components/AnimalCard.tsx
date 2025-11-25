import { Animal } from '../lib/supabase';

interface AnimalCardProps {
  animal: Animal;
  onAdopt: (animal: Animal) => void;
}

export default function AnimalCard({ animal, onAdopt }: AnimalCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <img
        src={animal.image_url}
        alt={animal.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900">{animal.name}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            animal.status === 'available'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {animal.status === 'available' ? 'Доступен' : 'Усыновлён'}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-semibold">Порода:</span> {animal.breed}
        </p>
        <p className="text-sm text-gray-600 mb-3">
          <span className="font-semibold">Возраст:</span> {animal.age} {animal.age === 1 ? 'год' : animal.age < 5 ? 'года' : 'лет'}
        </p>
        <p className="text-gray-700 text-sm mb-4">{animal.description}</p>
        {animal.status === 'available' && (
          <button
            onClick={() => onAdopt(animal)}
            className="w-full bg-rose-500 text-white py-2 px-4 rounded-md hover:bg-rose-600 transition-colors font-medium"
          >
            Подать заявку на усыновление
          </button>
        )}
      </div>
    </div>
  );
}
