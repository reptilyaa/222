import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Animal, Filters } from '../types/database';

export function useAnimals(filters: Filters) {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);

      let query = supabase.from('animals').select('*');

      if (filters.type) {
        query = query.eq('type', filters.type);
      }
      if (filters.minAge) {
        query = query.gte('age', Number(filters.minAge));
      }
      if (filters.maxAge) {
        query = query.lte('age', Number(filters.maxAge));
      }
      if (filters.city) {
        query = query.ilike('city', `%${filters.city}%`);
      }

      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;
      if (error) setError(error.message);
      else setAnimals(data ?? []);
      setLoading(false);
    };

    fetch();
  }, [filters.type, filters.minAge, filters.maxAge, filters.city]);

  return { animals, loading, error };
}

export async function fetchAnimalById(id: string): Promise<Animal | null> {
  const { data } = await supabase.from('animals').select('*').eq('id', id).maybeSingle();
  return data;
}
