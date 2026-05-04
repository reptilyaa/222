
/*
  # Animal Shelter Search App - Initial Schema

  ## New Tables

  ### animals
  - `id` (uuid, primary key)
  - `name` (text) - Animal's name
  - `type` (text) - 'dog' or 'cat'
  - `age` (integer) - Age in years
  - `breed` (text) - Breed description
  - `city` (text) - City where the shelter is located
  - `description` (text) - Detailed description
  - `image_url` (text) - Photo URL

  ### favorites
  - `user_id` (uuid, references auth.users)
  - `animal_id` (uuid, references animals)
  - Composite primary key

  ## Security
  - RLS enabled on both tables
  - Animals are publicly readable
  - Favorites are only accessible by the owner
*/

CREATE TABLE IF NOT EXISTS animals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('dog', 'cat')),
  age integer NOT NULL DEFAULT 0,
  breed text NOT NULL DEFAULT '',
  city text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE animals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Animals are publicly readable"
  ON animals FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE TABLE IF NOT EXISTS favorites (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  animal_id uuid NOT NULL REFERENCES animals(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, animal_id)
);

ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own favorites"
  ON favorites FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add own favorites"
  ON favorites FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites"
  ON favorites FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
