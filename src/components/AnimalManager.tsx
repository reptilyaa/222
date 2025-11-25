import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { supabase, Animal } from '../lib/supabase';

export default function AnimalManager() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    breed: '',
    description: '',
    image_url: '',
    status: 'available' as 'available' | 'adopted'
  });

  useEffect(() => {
    loadAnimals();
  }, []);

  const loadAnimals = async () => {
    const { data } = await supabase
      .from('animals')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setAnimals(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingAnimal) {
      await supabase
        .from('animals')
        .update({
          name: formData.name,
          age: parseInt(formData.age),
          breed: formData.breed,
          description: formData.description,
          image_url: formData.image_url,
          status: formData.status
        })
        .eq('id', editingAnimal.id);
    } else {
      await supabase
        .from('animals')
        .insert({
          name: formData.name,
          age: parseInt(formData.age),
          breed: formData.breed,
          description: formData.description,
          image_url: formData.image_url,
          status: formData.status
        });
    }

    resetForm();
    loadAnimals();
  };

  const handleEdit = (animal: Animal) => {
    setEditingAnimal(animal);
    setFormData({
      name: animal.name,
      age: animal.age.toString(),
      breed: animal.breed,
      description: animal.description,
      image_url: animal.image_url,
      status: animal.status
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Удалить это животное?')) {
      await supabase.from('animals').delete().eq('id', id);
      loadAnimals();
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      age: '',
      breed: '',
      description: '',
      image_url: '',
      status: 'available'
    });
    setEditingAnimal(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Управление животными</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Добавить животное
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingAnimal ? 'Редактировать животное' : 'Новое животное'}
          </h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Имя *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Возраст *</label>
              <input
                type="number"
                required
                min="0"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Порода *</label>
              <input
                type="text"
                required
                value={formData.breed}
                onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Статус *</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'available' | 'adopted' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="available">Доступен</option>
                <option value="adopted">Усыновлён</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">URL изображения *</label>
            <input
              type="url"
              required
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Описание *</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {editingAnimal ? 'Сохранить' : 'Добавить'}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {animals.map((animal) => (
          <div key={animal.id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-4">
            <img
              src={animal.image_url}
              alt={animal.name}
              className="w-20 h-20 object-cover rounded-md"
            />
            <div className="flex-1">
              <h3 className="font-bold text-gray-900">{animal.name}</h3>
              <p className="text-sm text-gray-600">{animal.breed}, {animal.age} лет</p>
              <span className={`inline-block px-2 py-0.5 rounded text-xs mt-1 ${
                animal.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {animal.status === 'available' ? 'Доступен' : 'Усыновлён'}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(animal)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDelete(animal.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
