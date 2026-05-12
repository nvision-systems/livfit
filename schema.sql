-- LivFit Standardized Schema
-- RLS Enforced for Clinical Compliance

-- 1. Patients / Profiles
CREATE TABLE patients (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'PATIENT',
  diagnosis TEXT,
  meld_score INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own profile" ON patients 
  FOR ALL USING (auth.uid() = id);

-- 2. Workout Plans
CREATE TABLE workout_plans (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  intensity TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE workout_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own plans" ON workout_plans 
  FOR ALL USING (auth.uid() = user_id);

-- 3. Workout Exercises (Child of Plans)
CREATE TABLE workout_exercises (
  id BIGSERIAL PRIMARY KEY,
  plan_id BIGINT REFERENCES workout_plans(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  sets INTEGER,
  reps INTEGER,
  duration_secs INTEGER
);

ALTER TABLE workout_exercises ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own exercises" ON workout_exercises 
  FOR ALL USING (EXISTS (SELECT 1 FROM workout_plans WHERE id = plan_id AND user_id = auth.uid()));

-- 4. Workout Logs
CREATE TABLE workout_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  exercise_name TEXT NOT NULL,
  status TEXT NOT NULL, -- 'DONE', 'SKIPPED'
  duration_mins INTEGER,
  logged_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE workout_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own logs" ON workout_logs 
  FOR ALL USING (auth.uid() = user_id);

-- 5. Diet Plans
CREATE TABLE diet_plans (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  calories_goal INTEGER,
  protein_goal INTEGER,
  carbs_goal INTEGER,
  fats_goal INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE diet_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own diet plans" ON diet_plans 
  FOR ALL USING (auth.uid() = user_id);

-- 6. Diet Meals (Child of Diet Plans)
CREATE TABLE diet_meals (
  id BIGSERIAL PRIMARY KEY,
  plan_id BIGINT REFERENCES diet_plans(id) ON DELETE CASCADE NOT NULL,
  meal_type TEXT NOT NULL, -- 'BREAKFAST', 'LUNCH', etc.
  items TEXT[] -- Array of food items
);

ALTER TABLE diet_meals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own diet meals" ON diet_meals 
  FOR ALL USING (EXISTS (SELECT 1 FROM diet_plans WHERE id = plan_id AND user_id = auth.uid()));

-- 7. Diet Logs (Food Entries)
CREATE TABLE diet_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  food_name TEXT NOT NULL,
  calories INTEGER,
  protein INTEGER,
  logged_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE diet_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own diet logs" ON diet_logs 
  FOR ALL USING (auth.uid() = user_id);

-- 8. Blog Posts
CREATE TABLE blog_posts (
  id BIGSERIAL PRIMARY KEY,
  author_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published posts are visible to all" ON blog_posts 
  FOR SELECT USING (is_published = true OR auth.uid() = author_id);
CREATE POLICY "Authors can manage their own posts" ON blog_posts 
  FOR ALL USING (auth.uid() = author_id);

-- 9. Notifications
CREATE TABLE notifications (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  type TEXT DEFAULT 'GENERAL', -- 'WORKOUT', 'DIET', 'SYSTEM'
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own notifications" ON notifications 
  FOR ALL USING (auth.uid() = user_id);

-- 10. User Preferences
CREATE TABLE user_preferences (
  user_id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  dietary_restrictions TEXT[], -- ['VEGAN', 'GLUTEN_FREE']
  workout_goals TEXT[], -- ['STRENGTH', 'WEIGHT_LOSS']
  notification_enabled BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own preferences" ON user_preferences 
  FOR ALL USING (auth.uid() = user_id);

-- 11. Staff Access Policies (Cross-table access for CLINICAL roles)
-- Note: These policies allow ADMIN and DIETICIAN to view data for clinical management.

CREATE POLICY "Staff can view all patients" ON patients 
  FOR SELECT USING (EXISTS (SELECT 1 FROM patients WHERE id = auth.uid() AND role IN ('ADMIN', 'DIETICIAN')));

CREATE POLICY "Staff can view all workout plans" ON workout_plans 
  FOR SELECT USING (EXISTS (SELECT 1 FROM patients WHERE id = auth.uid() AND role IN ('ADMIN', 'DIETICIAN')));

CREATE POLICY "Staff can view all diet plans" ON diet_plans 
  FOR SELECT USING (EXISTS (SELECT 1 FROM patients WHERE id = auth.uid() AND role IN ('ADMIN', 'DIETICIAN')));

-- 12. Performance Indexes
CREATE INDEX idx_workout_logs_user_date ON workout_logs(user_id, logged_at DESC);
CREATE INDEX idx_diet_logs_user_date ON diet_logs(user_id, logged_at DESC);
CREATE INDEX idx_notifications_user_read ON notifications(user_id, is_read);
