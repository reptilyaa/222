export interface Database {
  public: {
    Tables: {
      pets: { Row: Pet; Insert: PetInsert; Update: PetUpdate };
      stories: { Row: Story; Insert: StoryInsert; Update: StoryInsert };
      adoption_requests: { Row: AdoptionRequest; Insert: AdoptionRequestInsert; Update: AdoptionRequestInsert };
      favorites: { Row: Favorite; Insert: FavoriteInsert; Update: FavoriteInsert };
      messages: { Row: Message; Insert: MessageInsert; Update: MessageInsert };
    };
  };
}

export interface Pet {
  id: string;
  name: string;
  breed: string;
  species: string;
  age_years: number;
  city: string;
  gender: string;
  description: string;
  photo_url: string;
  status: string;
  created_at: string;
}

export type PetInsert = Omit<Pet, 'id' | 'created_at'>;
export type PetUpdate = Partial<PetInsert>;

export interface Story {
  id: string;
  pet_name: string;
  photo_url: string;
  story_text: string;
  adopted_at: string | null;
  created_at: string;
}

export type StoryInsert = Omit<Story, 'id' | 'created_at'>;

export interface AdoptionRequest {
  id: string;
  user_id: string;
  pet_id: string;
  message: string;
  status: string;
  created_at: string;
}

export type AdoptionRequestInsert = Omit<AdoptionRequest, 'id' | 'created_at'>;

export interface Favorite {
  id: string;
  user_id: string;
  pet_id: string;
  created_at: string;
}

export type FavoriteInsert = Omit<Favorite, 'id' | 'created_at'>;

export interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  message_text: string;
  created_at: string;
}

export type MessageInsert = Omit<Message, 'id' | 'created_at'>;

export interface PetFilters {
  search: string;
  species: string;
  breed: string;
  city: string;
  gender: string;
  minAge: string;
  maxAge: string;
}
