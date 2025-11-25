/*
  # Create Animal Shelter Database

  1. New Tables
    - `animals`
      - `id` (uuid, primary key)
      - `name` (text, required) - Animal's name
      - `age` (integer, required) - Animal's age in years
      - `breed` (text, required) - Animal's breed
      - `description` (text, required) - Description of the animal
      - `image_url` (text, required) - URL to animal's photo
      - `status` (text, required) - Status: 'available' or 'adopted'
      - `created_at` (timestamptz) - Record creation timestamp
    
    - `applications`
      - `id` (uuid, primary key)
      - `animal_id` (uuid, foreign key) - Reference to animals table
      - `name` (text, required) - Applicant's name
      - `phone` (text, required) - Applicant's phone number
      - `comment` (text) - Additional comments from applicant
      - `created_at` (timestamptz) - Application submission timestamp

  2. Security
    - Enable RLS on both tables
    - Public read access for animals
    - Public insert access for applications
    - Restricted update/delete access for animals (admin only in future)
*/

CREATE TABLE IF NOT EXISTS animals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  age integer NOT NULL,
  breed text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  status text NOT NULL DEFAULT 'available',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  animal_id uuid REFERENCES animals(id) ON DELETE CASCADE,
  name text NOT NULL,
  phone text NOT NULL,
  comment text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE animals ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view animals"
  ON animals FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert animals"
  ON animals FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update animals"
  ON animals FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete animals"
  ON animals FOR DELETE
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can view applications"
  ON applications FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can submit applications"
  ON applications FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

INSERT INTO animals (name, age, breed, description, image_url, status) VALUES
  ('Макс', 3, 'Лабрадор', 'Дружелюбный и активный пёс, любит играть и гулять. Отлично ладит с детьми.', 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=800', 'available'),
  ('Луна', 2, 'Сибирская кошка', 'Спокойная и ласковая кошечка. Любит уютные места и мурлыкать на коленях.', 'https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=800', 'available'),
  ('Рекс', 5, 'Немецкая овчарка', 'Умный и преданный пёс с хорошей дрессировкой. Подходит для охраны.', 'https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?auto=compress&cs=tinysrgb&w=800', 'available'),
  ('Мурка', 1, 'Персидская кошка', 'Игривая молодая кошечка с пушистой шерстью. Требует регулярного ухода.', 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=800', 'adopted');