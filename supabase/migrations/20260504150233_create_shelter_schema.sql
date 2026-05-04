/*
  # Shelter Platform Schema

  1. New Tables
    - `pets` - Animals available for adoption
      - id, name, breed, species, age_years, city, gender, description, photo_url, status, created_at
    - `stories` - Success adoption stories
      - id, pet_name, photo_url, text, adopted_at, created_at
    - `adoption_requests` - Adoption applications from users
      - id, user_id, pet_id, message, status, created_at
    - `favorites` - User saved pets
      - id, user_id, pet_id, created_at
    - `messages` - Contact form submissions
      - id, name, email, phone, text, created_at

  2. Security
    - RLS enabled on all tables
    - Pets and stories are publicly readable
    - Authenticated users can edit pets (as per requirements)
    - Users can only see/manage their own adoption requests and favorites
    - Messages are write-only for anonymous users
*/

-- PETS TABLE
CREATE TABLE IF NOT EXISTS pets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  breed text NOT NULL DEFAULT '',
  species text NOT NULL DEFAULT 'dog',
  age_years numeric(4,1) NOT NULL DEFAULT 0,
  city text NOT NULL DEFAULT '',
  gender text NOT NULL DEFAULT 'unknown',
  description text NOT NULL DEFAULT '',
  photo_url text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'available',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE pets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view pets"
  ON pets FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert pets"
  ON pets FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update pets"
  ON pets FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- STORIES TABLE
CREATE TABLE IF NOT EXISTS stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_name text NOT NULL,
  photo_url text NOT NULL DEFAULT '',
  story_text text NOT NULL DEFAULT '',
  adopted_at date,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view stories"
  ON stories FOR SELECT
  TO anon, authenticated
  USING (true);

-- ADOPTION REQUESTS TABLE
CREATE TABLE IF NOT EXISTS adoption_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  pet_id uuid NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  message text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE adoption_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own requests"
  ON adoption_requests FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own requests"
  ON adoption_requests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- FAVORITES TABLE
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  pet_id uuid NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, pet_id)
);

ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own favorites"
  ON favorites FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites"
  ON favorites FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites"
  ON favorites FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- MESSAGES TABLE
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL DEFAULT '',
  message_text text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert messages"
  ON messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- SEED PETS DATA
INSERT INTO pets (name, breed, species, age_years, city, gender, description, photo_url, status) VALUES
('Барон', 'Немецкая овчарка', 'dog', 3.0, 'Москва', 'male', 'Барон — верный и умный пёс. Любит прогулки и активные игры. Хорошо ладит с детьми старшего возраста. Знает основные команды. Ищет семью с опытом содержания крупных собак.', 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800', 'available'),
('Луна', 'Метис', 'dog', 1.5, 'Санкт-Петербург', 'female', 'Луна — молодая, игривая и ласковая собака. Любит людей и других животных. Отлично подходит для семьи с детьми. Быстро обучается и легко адаптируется.', 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=800', 'available'),
('Мурзик', 'Британская короткошёрстная', 'cat', 2.0, 'Москва', 'male', 'Мурзик — спокойный и независимый кот. Любит комфорт и уютные места. Хорошо живёт в квартире. Привит и стерилизован. Идеален для спокойной семьи.', 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=800', 'available'),
('Рыжик', 'Золотистый ретривер', 'dog', 4.0, 'Казань', 'male', 'Рыжик — добродушный, ласковый пёс. Обожает детей и всегда рад новым знакомствам. Отлично подходит для семьи с активным образом жизни. Знает множество команд.', 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=800', 'available'),
('Снежок', 'Персидская', 'cat', 5.0, 'Екатеринбург', 'female', 'Снежок — нежная и ласковая кошка. Любит сидеть на коленях и мурлыкать. Хорошо ладит с другими кошками. Привита и стерилизована.', 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=800', 'available'),
('Граф', 'Хаски', 'dog', 2.5, 'Новосибирск', 'male', 'Граф — энергичный и красивый хаски. Требует активных прогулок и физических нагрузок. Умный и своенравный. Ищет опытных хозяев с большим двором.', 'https://images.pexels.com/photos/3726314/pexels-photo-3726314.jpeg?auto=compress&cs=tinysrgb&w=800', 'available'),
('Персик', 'Мейн-кун', 'cat', 1.0, 'Москва', 'female', 'Персик — очаровательный котёнок породы мейн-кун. Игривая, общительная и очень ласковая. Быстро привязывается к людям. Привита.', 'https://images.pexels.com/photos/2071873/pexels-photo-2071873.jpeg?auto=compress&cs=tinysrgb&w=800', 'available'),
('Бублик', 'Такса', 'dog', 3.5, 'Краснодар', 'male', 'Бублик — весёлый и забавный пёс. Любит играть и всегда в хорошем настроении. Хорошо ладит с детьми. Небольшой размер делает его удобным для квартиры.', 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=800', 'available'),
('Василиса', 'Сиамская', 'cat', 4.0, 'Санкт-Петербург', 'female', 'Василиса — элегантная сиамская кошка. Умная и общительная, любит внимание. Хорошо уживается с другими кошками. Привита и стерилизована.', 'https://images.pexels.com/photos/3777622/pexels-photo-3777622.jpeg?auto=compress&cs=tinysrgb&w=800', 'available'),
('Тузик', 'Лабрадор', 'dog', 1.0, 'Ростов-на-Дону', 'male', 'Тузик — молодой и очень энергичный лабрадор. Обожает людей и всегда рад играть. Идеален для активной семьи с детьми. Проходит базовый курс дрессировки.', 'https://images.pexels.com/photos/2253276/pexels-photo-2253276.jpeg?auto=compress&cs=tinysrgb&w=800', 'available')
ON CONFLICT DO NOTHING;

-- SEED STORIES DATA
INSERT INTO stories (pet_name, photo_url, story_text, adopted_at) VALUES
('Белка', 'https://images.pexels.com/photos/1587300/pexels-photo-1587300.jpeg?auto=compress&cs=tinysrgb&w=800', 'Белка попала к нам совсем маленьким котёнком — испуганным и одиноким. Спустя месяц нашлись замечательные хозяева — молодая семья с маленькой дочкой. Теперь Белка — любимица всей семьи, спит в детской кровати и мурлычет с утра до вечера.', '2025-11-15'),
('Дружок', 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=800', 'Дружок провёл в приюте почти год. Пожилой пёс с грустными глазами казался никому не нужным. Но однажды пришёл дедушка, потерявший своего питомца. Они нашли друг друга — теперь неразлучны. Гуляют каждое утро и вечер.', '2025-10-03'),
('Маруся', 'https://images.pexels.com/photos/2061057/pexels-photo-2061057.jpeg?auto=compress&cs=tinysrgb&w=800', 'Маруся была подобрана на улице зимой, истощённой и напуганной. После лечения и ухода она расцвела — оказалась невероятно ласковой и игривой кошкой. Сейчас живёт в большой семье, где её обожают все — от мала до велика.', '2025-09-20'),
('Буян', 'https://images.pexels.com/photos/2023384/pexels-photo-2023384.jpeg?auto=compress&cs=tinysrgb&w=800', 'Буян поступил к нам агрессивным и недоверчивым. Волонтёры занимались с ним каждый день. Терпение принесло плоды — пёс полностью изменился. Сейчас живёт в загородном доме, охраняет территорию и обожает своих хозяев.', '2025-08-12'),
('Соня', 'https://images.pexels.com/photos/5682847/pexels-photo-5682847.jpeg?auto=compress&cs=tinysrgb&w=800', 'Сонечку нашли в коробке у мусорного бака — совсем крошечную. Выходили, откормили. Когда пришло время искать семью, очередь желающих выстроилась в несколько человек. Теперь Соня — принцесса в уютной квартире молодой пары.', '2025-07-05')
ON CONFLICT DO NOTHING;
