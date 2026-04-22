-- Supabase Database Schema for ChefBook

-- 1. Create Tables
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.chefs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  image_url TEXT,
  rating NUMERIC(3,2),
  reviews_count INTEGER DEFAULT 0,
  hourly_price NUMERIC(10,2),
  tagline TEXT,
  specialties TEXT[],
  cuisines TEXT[],
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.pricing_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  description TEXT,
  features TEXT[],
  cuisines TEXT[],
  is_popular BOOLEAN DEFAULT false,
  icon_name TEXT,
  gradient TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  image_url TEXT,
  cuisine TEXT,
  difficulty TEXT CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  cook_time TEXT,
  serves INTEGER,
  rating NUMERIC(3,2),
  description TEXT,
  spice_level TEXT CHECK (spice_level IN ('Mild', 'Medium', 'Spicy')),
  ingredients TEXT[],
  instructions TEXT[],
  chef_id UUID REFERENCES public.chefs(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  chef_id UUID REFERENCES public.chefs(id) ON DELETE RESTRICT,
  plan_id UUID REFERENCES public.pricing_plans(id) ON DELETE RESTRICT,
  booking_date TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  total_price NUMERIC(10,2),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Row Level Security (RLS) Policies
-- Enables RLS securely so only authorized clients can access/modify data

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chefs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow read access to all for public tables
CREATE POLICY "Allow public read access on chefs" ON public.chefs FOR SELECT USING (true);
CREATE POLICY "Allow public read access on pricing_plans" ON public.pricing_plans FOR SELECT USING (true);
CREATE POLICY "Allow public read access on recipes" ON public.recipes FOR SELECT USING (true);

-- Users can manage their own profile
CREATE POLICY "Users can insert their own profile" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Users can only view/manage their own bookings
CREATE POLICY "Users can view own bookings" ON public.bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own bookings" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 3. Seed Data
-- Providing hardcoded IDs to link relationships cleanly

-- Insert Chefs
INSERT INTO public.chefs (id, name, image_url, rating, reviews_count, hourly_price, tagline, specialties, cuisines) VALUES
('b2ae8f2a-e1ee-4d32-ada5-6c71cde2f211', 'Chef Arjun', '/placeholder.svg', 4.8, 127, 1599, 'Authentic Punjabi flavors with royal Mughlai touch', ARRAY['Butter Chicken', 'Biryani', 'Naan'], ARRAY['North Indian', 'Punjabi', 'Mughlai']),
('b2ae8f2a-e1ee-4d32-ada5-6c71cde2f212', 'Chef Priya', '/placeholder.svg', 4.9, 203, 999, 'Traditional South Indian recipes passed down generations', ARRAY['Dosa', 'Sambar', 'Coconut Curry'], ARRAY['South Indian', 'Tamil', 'Kerala']),
('b2ae8f2a-e1ee-4d32-ada5-6c71cde2f213', 'Chef Ravi', '/placeholder.svg', 4.7, 89, 1299, 'Street food specialist with authentic regional flavors', ARRAY['Thali', 'Chaat', 'Dhokla'], ARRAY['Gujarati', 'Rajasthani', 'Street Food']),
('b2ae8f2a-e1ee-4d32-ada5-6c71cde2f214', 'Chef Li Wei', '/placeholder.svg', 4.8, 112, 1199, 'Master of Pan-Asian & Chinese Wok Cuisine', ARRAY['Dim Sum', 'Hakka Noodles', 'Manchurian'], ARRAY['Chinese', 'Pan-Asian']),
('b2ae8f2a-e1ee-4d32-ada5-6c71cde2f215', 'Chef Meera', '/placeholder.svg', 4.6, 95, 1099, 'Specialist in Gujarati and Rajasthani sweets and snacks', ARRAY['Dhokla', 'Khandvi', 'Fafda'], ARRAY['Gujarati']);

-- Insert Pricing Plans
INSERT INTO public.pricing_plans (name, price, description, features, cuisines, is_popular, icon_name, gradient) VALUES
('Basic Chef', 999, 'Perfect for small gatherings', ARRAY['2-3 Authentic Indian dishes', 'Serves up to 4 people', 'Fresh ingredients included', '2 hours cooking service', 'Basic cleanup included', 'One cuisine specialty'], ARRAY['North Indian', 'South Indian', 'Gujarati'], false, 'Star', 'from-primary/10 to-secondary/10'),
('Premium Chef', 1599, 'Multi-cuisine experience', ARRAY['4-5 Diverse dishes', 'Serves up to 8 people', '2 Different cuisines (Chinese + Indian)', '3 hours cooking service', 'Premium ingredients', 'Full cleanup & presentation', 'Appetizer included'], ARRAY['Chinese', 'Indian', 'Continental'], true, 'Crown', 'from-accent/10 to-primary/10'),
('Luxury Chef', 2100, 'Complete culinary experience', ARRAY['6-8 Gourmet dishes', 'Serves up to 12 people', '3 Different cuisines', '4 hours premium service', 'Exotic ingredients & spices', 'Professional presentation', 'Appetizer + Dessert included', 'Live cooking demonstration'], ARRAY['Indian', 'Chinese', 'Continental', 'Thai'], false, 'Sparkles', 'from-secondary/10 to-accent/10');

-- Insert Recipes
INSERT INTO public.recipes (name, image_url, cuisine, difficulty, cook_time, serves, rating, description, spice_level, ingredients, instructions, chef_id) VALUES
('Butter Chicken', '/BUTTER_CHICKEN.jpg', 'North Indian', 'Medium', '45 min', 4, 4.8, 'Creamy tomato-based curry with tender chicken pieces', 'Medium', 
ARRAY['500g Boneless Chicken', '2 cups Tomato Purée', '1/2 cup Heavy Cream', '3 tbsp Butter', '1 tbsp Garam Masala', '1 tbsp Ginger Garlic Paste', '1 tsp Kasuri Methi', 'Salt to taste'], 
ARRAY['In a bowl, mix yogurt, ginger-garlic paste, red chili powder, and salt. Marinate the chicken pieces and leave them for 30 minutes.', 'Heat 1 tbsp butter in a pan and shallow fry the marinated chicken until perfectly cooked and slightly charred. Set aside.', 'In the same pan, add the remaining butter. Sauté onions until golden brown, then add tomato purée, cashews, and spices. Cook for 15 minutes.', 'Blend the tomato mixture into a smooth puree and strain it back into the pan for a silky texture.', 'Add the cooked chicken pieces into the gravy. Let it simmer for 10 minutes on low heat.', 'Stir in the heavy cream and crush roasted kasuri methi over the curry. Garnish with a dollop of butter and serve hot with naan.'], 
'b2ae8f2a-e1ee-4d32-ada5-6c71cde2f211'),

('Hyderabadi Chicken Biryani', '/HYDERABADI_CHICKEN.jpg', 'Hyderabadi', 'Medium', '2h 30min', 6, 4.9, 'Aromatic basmati rice layered with tender chicken, cooked in traditional dum style with authentic spices.', 'Medium', 
ARRAY['750g Basmati Rice', '1kg Chicken', '1 cup Yogurt', '1/2 cup Fried Onions', 'Saffron strands soaked in milk', 'Whole Biryani Spices (Cardamom, Cloves, Cinnamon)', 'Fresh Mint & Coriander'], 
ARRAY['Wash and soak basmati rice for 30 minutes to get the perfect long grains.', 'Prepare the marinade by mixing yogurt, ginger-garlic paste, biryani masala, turmeric, red chili powder, chopped mint, and coriander. Coat the chicken thoroughly and let it rest for at least 2 hours.', 'In a large pot, bring water to a rolling boil. Add whole spices and the soaked rice. Cook until the rice is 70% done, then drain immediately.', 'In a heavy-bottomed vessel, spread the marinated chicken evenly at the base. Top it with the par-boiled rice.', 'Sprinkle fried onions (birista), chopped mint, coriander, and drizzle the saffron-infused milk and melted ghee over the rice.', 'Seal the pot with dough or tight foil to trap the steam (Dum). Cook on medium-low heat for 30-40 minutes and let it rest before opening.'], 
'b2ae8f2a-e1ee-4d32-ada5-6c71cde2f211'),

('Masala Dosa', '/DOSA.jpg', 'South Indian', 'Hard', '2h 30min', 6, 4.9, 'Crispy fermented crepe with spiced potato filling', 'Mild', 
ARRAY['3 cups Idli Rice', '1 cup Urad Dal', '4 large Potatoes, boiled', '1/2 tsp Mustard Seeds', 'Curry Leaves', '1/2 tsp Turmeric', '2 Green Chilies', 'Oil/Ghee for roasting'], 
ARRAY['Wash and soak rice and urad dal separately for 4-6 hours. Grind them into a smooth batter, mix together, and let the batter ferment overnight in a warm place.', 'For the potato masala: heat oil in a pan, add mustard seeds, and let them splutter. Add curry leaves, chopped green chilies, and thinly sliced onions. Sauté until translucent.', 'Add turmeric powder and salt, then mix in the roughly mashed boiled potatoes. Stir well and cook for 2 minutes. Garnish with fresh coriander.', 'Heat a non-stick tawa or cast-iron skillet. Pour a ladle of fermented batter in the center and spread it outward in a circular motion to make a thin crepe.', 'Drizzle ghee or oil around the edges and cook until the bottom turns golden brown and crispy.', 'Place a generous spoonful of the potato masala in the center of the dosa, fold the edges over, and serve hot with coconut chutney and sambar.'], 
'b2ae8f2a-e1ee-4d32-ada5-6c71cde2f212'),

('Fish Curry', '/FISH.jpg', 'South Indian', 'Medium', '40 min', 4, 4.8, 'Kerala-style fish curry with coconut milk', 'Spicy', 
ARRAY['500g Fish Steaks (Kingfish or Seer fish)', '1 cup Thick Coconut Milk', '2 sprigs Curry Leaves', 'Piece of Kokum/Tamarind', '1 tbsp Coconut Oil', '1 tsp Fenugreek Seeds', 'Spices (Turmeric, Red Chili, Coriander)'], 
ARRAY['Clean the fish pieces and marinate with a pinch of turmeric and salt. Soak the kokum (or tamarind) in warm water.', 'Heat coconut oil in a clay pot or pan. Add fenugreek seeds and let them crackle, followed by curry leaves and finely chopped shallots.', 'Sauté until the shallots turn golden, then lower the heat and add red chili powder, turmeric, and coriander powder. Stir for a minute to release the aroma.', 'Add the kokum water and bring the gravy to a gentle simmer.', 'Gently slide the marinated fish pieces into the boiling curry. Cover and cook on medium heat for about 10-12 minutes until the fish is cooked through.', 'Lower the heat, gently pour in the thick coconut milk, and stir very slowly to avoid breaking the fish. Heat through but do not let it boil vigorously. Serve with steamed rice.'], 
'b2ae8f2a-e1ee-4d32-ada5-6c71cde2f212'),

('Rajma Chawal', '/RAJMA.jpg', 'North Indian', 'Easy', '1h 15min', 5, 4.7, 'Kidney beans curry served with steamed basmati rice', 'Medium', 
ARRAY['2 cups Kidney Beans (Rajma)', '2 large Onions, finely chopped', '3 Tomatoes, pureed', '1 tbsp Ginger Garlic Paste', '1 tsp Cumin Seeds', 'Garam Masala', 'Fresh Coriander', '2 cups Basmati Rice'], 
ARRAY['Soak the kidney beans overnight. Boil them in a pressure cooker with water, a pinch of salt, and a black cardamom until soft and tender (about 4-5 whistles).', 'In a separate pan, heat oil or ghee. Add cumin seeds and let them splutter, then add chopped onions and sauté until deep golden brown.', 'Add ginger-garlic paste and cook for a minute, then stir in the tomato puree, turmeric, red chili powder, and coriander powder. Cook until the oil separates from the masala.', 'Add the boiled kidney beans along with their water to the prepared masala. Stir well and mash a few beans with the back of the spoon to thicken the gravy.', 'Simmer the curry on low heat for 15-20 minutes, allowing the flavors to meld. Finish with a sprinkle of garam masala and fresh coriander.', 'While the curry simmers, cook the basmati rice until fluffy. Serve the hot rajma over steamed rice, accompanied by some sliced onions and green chili.'], 
'b2ae8f2a-e1ee-4d32-ada5-6c71cde2f213'),

('Rajasthani Dal Baati Churma', '/RAJMA.jpg', 'Rajasthani', 'Hard', '3h 15min', 8, 4.7, 'Traditional Rajasthani delicacy with lentil curry, baked wheat balls, and sweet crumble.', 'Medium', 
ARRAY['2 cups Whole Wheat Flour', '1/2 cup Mixed Lentils (Moong, Masoor, Chana, Urad, Tuvar)', '1 cup Ghee', '1/2 cup Jaggery or Powdered Sugar', '1 tsp Carom Seeds (Ajwain)', 'Spices (Cumin, Asafoetida, Turmeric)'], 
ARRAY['For the Dal: Pressure cook the mixed lentils with turmeric and salt until mushy. Prepare a tempering with ghee, cumin seeds, asafoetida, garlic, and red chilies, then pour over the cooked dal.', 'For the Baati: Mix whole wheat flour with melted ghee, salt, and ajwain. Knead it into a stiff dough using warm water. Rest for 20 minutes.', 'Divide the dough into equal portions and shape them into slightly flattened round balls. Bake them in a tandoor, preheated oven, or bati cooker until golden brown and cooked from inside.', 'Once baked, lightly crush the hot baatis and submerge them generously in a bowl of melted ghee to soften.', 'For the Churma: Take a few unsalted, crumbled baked baatis and grind them into a coarse powder. Heat ghee in a pan, roast this mixture until fragrant, let it cool slightly, and mix with jaggery or powdered sugar.', 'Serve the hot dal, crushed ghee-soaked baatis, and sweet churma together on a platter to experience the complete Rajasthani meal.'], 
'b2ae8f2a-e1ee-4d32-ada5-6c71cde2f213'),

('Hakka Noodles', '/NOODLES.jpg', 'Chinese', 'Easy', '25 min', 3, 4.6, 'Stir-fried noodles with fresh vegetables and sauces', 'Mild', 
ARRAY['1 pack Hakka Noodles', '1 cup shredded Cabbage', '1/2 cup thin Carrot juliennes', '1/2 cup thinly sliced Bell Peppers', '2 tbsp Soy Sauce', '1 tbsp Vinegar', '1 tbsp Chili Sauce', 'Minced Garlic & Ginger'], 
ARRAY['Boil the noodles according to the package instructions until al dente (just cooked, not mushy). Drain, rinse with cold water, and toss with a few drops of oil to prevent sticking.', 'Heat oil in a large wok or skillet over high heat. Add minced garlic, ginger, and slit green chilies. Sauté quickly for 30 seconds.', 'Add sliced onions, shredded cabbage, carrots, and bell peppers. Stir-fry constantly on high heat for 2-3 minutes so the vegetables retain their crunch.', 'Add the boiled noodles to the wok. Pour soy sauce, vinegar, chili sauce, and a pinch of black pepper directly over the noodles.', 'Using two forks or tongs, toss everything together vigorously. Continue to stir-fry for another 2-3 minutes until the sauces are evenly distributed.', 'Garnish with freshly chopped spring onions and serve immediately hot and steaming.'], 
'b2ae8f2a-e1ee-4d32-ada5-6c71cde2f214'),

('Dhokla', '/DHOKLA.jpg', 'Gujarati', 'Medium', '35 min', 6, 4.5, 'Steamed spongy cake made from gram flour', 'Mild', 
ARRAY['1.5 cups Gram Flour (Besan)', '1/2 cup Yogurt', '1 tbsp Eno Fruit Salt', '1 tsp Ginger Green Chili paste', '1 tsp Mustard Seeds', 'Curry Leaves', '1 tbsp Sugar', '2 tbsp Lemon Juice'], 
ARRAY['In a large mixing bowl, combine gram flour, yogurt, water, ginger-green chili paste, turmeric, and a little salt. Whisk to make a smooth, lump-free batter of pouring consistency. Let it rest for 10 minutes.', 'Prepare the steamer by boiling water. Grease a steaming pan or thali with a little oil.', 'Just before steaming, add Eno (fruit salt) to the batter and whisk briskly in one direction. The batter will turn very frothy and double in volume.', 'Immediately pour the aerated batter into the greased pan and place it in the steamer. Steam on medium-high heat for 12-15 minutes without opening the lid.', 'Insert a toothpick to check for doneness; if it comes out clean, remove the pan and let it cool slightly before cutting into square pieces.', 'For the tempering: Heat oil in a small pan, add mustard seeds, curry leaves, and green chilies. Add a half cup of water, sugar, and lemon juice. Boil for a minute, then pour this sweet and sour tempering evenly over the dhokla pieces. Serve with green chutney.'], 
'b2ae8f2a-e1ee-4d32-ada5-6c71cde2f215');
