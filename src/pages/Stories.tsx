import { useState, useEffect } from 'react';
import { Calendar, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Story } from '../lib/types';
import Layout from '../components/Layout';

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function Stories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [featured, setFeatured] = useState<Story | null>(null);

  useEffect(() => {
    supabase
      .from('stories')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) {
          setFeatured(data[0]);
          setStories(data.slice(1));
        }
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      <div className="pt-20 lg:pt-24 min-h-screen bg-gray-50">
        {/* Hero */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-orange-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Истории <span className="text-orange-500">счастья</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Каждое пристройство — это история любви. Читайте, как животные нашли своих людей.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
            </div>
          ) : (
            <>
              {/* Featured */}
              {featured && (
                <div className="mb-12">
                  <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2">
                    <div className="relative overflow-hidden aspect-[4/3] md:aspect-auto">
                      <img
                        src={featured.photo_url}
                        alt={featured.pet_name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                          История месяца
                        </span>
                      </div>
                    </div>
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{featured.pet_name}</h2>
                      {featured.adopted_at && (
                        <div className="flex items-center gap-2 text-sm text-orange-500 font-medium mb-4">
                          <Calendar className="w-4 h-4" />
                          Пристроен {formatDate(featured.adopted_at)}
                        </div>
                      )}
                      <p className="text-gray-600 leading-relaxed text-base">{featured.story_text}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stories.map(story => (
                  <article key={story.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group">
                    <div className="overflow-hidden aspect-[4/3]">
                      <img
                        src={story.photo_url}
                        alt={story.pet_name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{story.pet_name}</h3>
                      {story.adopted_at && (
                        <div className="flex items-center gap-1.5 text-xs text-orange-500 font-medium mb-3">
                          <Calendar className="w-3.5 h-3.5" />
                          Пристроен {formatDate(story.adopted_at)}
                        </div>
                      )}
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
                        {story.story_text}
                      </p>
                    </div>
                  </article>
                ))}
              </div>

              {stories.length === 0 && !featured && (
                <div className="text-center py-24">
                  <div className="text-6xl mb-4">❤️</div>
                  <p className="text-gray-500">Истории скоро появятся</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
