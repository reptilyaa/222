import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import type { Animal } from '../types/database';

export function useFavorites() {
  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [favoriteAnimals, setFavoriteAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(false);

  const loadFavorites = useCallback(async () => {
    if (!user) {
      setFavoriteIds(new Set());
      setFavoriteAnimals([]);
      return;
    }
    setLoading(true);
    const { data } = await supabase
      .from('favorites')
      .select('animal_id, animals(*)')
      .eq('user_id', user.id);

    if (data) {
      setFavoriteIds(new Set(data.map((f) => f.animal_id)));
      setFavoriteAnimals(
        data
          .map((f) => (f.animals as unknown as Animal))
          .filter(Boolean)
      );
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const addFavorite = async (animalId: string) => {
    if (!user) return;
    await supabase.from('favorites').insert({ user_id: user.id, animal_id: animalId });
    setFavoriteIds((prev) => new Set([...prev, animalId]));
    await loadFavorites();
  };

  const removeFavorite = async (animalId: string) => {
    if (!user) return;
    await supabase.from('favorites').delete().eq('user_id', user.id).eq('animal_id', animalId);
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      next.delete(animalId);
      return next;
    });
    await loadFavorites();
  };

  const toggleFavorite = async (animalId: string) => {
    if (favoriteIds.has(animalId)) {
      await removeFavorite(animalId);
    } else {
      await addFavorite(animalId);
    }
  };

  return { favoriteIds, favoriteAnimals, loading, toggleFavorite };
}
