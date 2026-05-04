export type Database = {
  public: {
    Tables: {
      animals: {
        Row: {
          id: string;
          name: string;
          type: 'dog' | 'cat';
          age: number;
          breed: string;
          city: string;
          description: string;
          image_url: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['animals']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['animals']['Insert']>;
      };
      favorites: {
        Row: {
          user_id: string;
          animal_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          animal_id: string;
        };
        Update: never;
      };
    };
  };
};

export type Animal = Database['public']['Tables']['animals']['Row'];
export type AnimalType = 'dog' | 'cat';

export interface Filters {
  type: string;
  minAge: string;
  maxAge: string;
  city: string;
}

export type Page = 'home' | 'favorites' | 'login' | 'register';
