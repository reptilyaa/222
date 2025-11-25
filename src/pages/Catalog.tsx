import { useState, useEffect } from 'react';
import { PawPrint } from 'lucide-react';
import AnimalCard from '../components/AnimalCard';
import AdoptionForm from '../components/AdoptionForm';
import { supabase, Animal } from '../lib/supabase';

interface CatalogProps {
  onSuccess: () => void;
}

export default function Catalog({ onSuccess }: CatalogProps) {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnimals();
  }, []);

  const loadAnimals = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('animals')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setAnimals(data);
    setLoading(false);
  };

  const handleAdoptClick = (animal: Animal) => {
    setSelectedAnimal(animal);
  };

  const handleFormClose = () => {
    setSelectedAnimal(null);
  };

  const handleFormSuccess = () => {
    setSelectedAnimal(null);
    onSuccess();
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Каталог животных</h1>
        <p className="text-gray-600 text-lg">
          Выберите своего питомца из нашего каталога. Каждое животное ждет вашей любви и заботы.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-600">Загрузка...</div>
      ) : animals.length === 0 ? (
        <div className="text-center py-12">
          <PawPrint className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">Животных пока нет</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {animals.map((animal) => (
            <AnimalCard
              key={animal.id}
              animal={animal}
              onAdopt={handleAdoptClick}
            />
          ))}
        </div>
      )}

      {selectedAnimal && (
        <AdoptionForm
          animal={selectedAnimal}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}
