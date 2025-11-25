import { useEffect, useState } from 'react';
import { FileText } from 'lucide-react';
import { supabase, Application, Animal } from '../lib/supabase';

interface ApplicationWithAnimal extends Application {
  animal: Animal;
}

export default function ApplicationsList() {
  const [applications, setApplications] = useState<ApplicationWithAnimal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    const { data, error } = await supabase
      .from('applications')
      .select(`
        *,
        animal:animals(*)
      `)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setApplications(data as ApplicationWithAnimal[]);
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-600">Загрузка заявок...</div>;
  }

  if (applications.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-600">Заявок пока нет</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Заявки на усыновление</h2>
      {applications.map((app) => (
        <div key={app.id} className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-bold text-lg text-gray-900">{app.name}</h3>
              <p className="text-sm text-gray-600">{app.phone}</p>
            </div>
            <span className="text-xs text-gray-500">
              {new Date(app.created_at).toLocaleString('ru-RU')}
            </span>
          </div>
          <div className="bg-gray-50 rounded p-3 mb-3">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Животное:</span> {app.animal?.name || 'Неизвестно'} ({app.animal?.breed || 'N/A'})
            </p>
          </div>
          {app.comment && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 italic">"{app.comment}"</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
