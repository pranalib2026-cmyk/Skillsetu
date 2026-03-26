-- ========================================================================
-- Daksh-Bharat Schema Definition
-- Run this in the SQL Editor within your Supabase Dashboard
-- ========================================================================

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table (Extends Supabase Auth users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  phone TEXT UNIQUE NOT NULL,
  role TEXT CHECK (role IN ('worker', 'employer', 'admin')) NOT NULL,
  full_name TEXT NOT NULL,
  location_address TEXT NOT NULL,
  profile_pic_url TEXT,
  
  -- Employer Specific
  gstin TEXT,
  
  -- Verification Flags
  is_phone_verified BOOLEAN DEFAULT false,
  aadhaar_number TEXT UNIQUE,
  is_aadhaar_verified BOOLEAN DEFAULT false,
  is_banned BOOLEAN DEFAULT false
);

-- Row Level Security for Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Worker Skills Table
CREATE TABLE worker_skills (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  worker_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  skill_name TEXT NOT NULL,
  experience_years INTEGER NOT NULL DEFAULT 0,
  daily_rate NUMERIC NOT NULL DEFAULT 0,
  UNIQUE(worker_id, skill_name)
);
ALTER TABLE worker_skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public skills viewable by everyone" ON worker_skills FOR SELECT USING (true);
CREATE POLICY "Workers can manage own skills" ON worker_skills FOR ALL USING (auth.uid() = worker_id);

-- 3. Skill Videos Table
CREATE TABLE skill_videos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  worker_skill_id UUID REFERENCES worker_skills(id) ON DELETE CASCADE,
  video_url TEXT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  ai_status TEXT CHECK (ai_status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  ai_confidence NUMERIC,
  admin_approved BOOLEAN DEFAULT false
);
ALTER TABLE skill_videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public videos viewable by everyone" ON skill_videos FOR SELECT USING (ai_status = 'approved');
-- Workers can insert, Admins can update

-- 4. Work Posts (Portfolio)
CREATE TABLE work_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  worker_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  employer_name TEXT,
  work_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  is_verified BOOLEAN DEFAULT false
);
-- Plus a junction table for work post photos if needed
ALTER TABLE work_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public work posts viewable by everyone" ON work_posts FOR SELECT USING (true);
CREATE POLICY "Workers manage own work posts" ON work_posts FOR ALL USING (auth.uid() = worker_id);

-- 5. Job Posts
CREATE TABLE job_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  employer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  skill_required TEXT NOT NULL,
  description TEXT,
  daily_wage NUMERIC NOT NULL,
  location_address TEXT NOT NULL,
  latitude NUMERIC,
  longitude NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  status TEXT CHECK (status IN ('open', 'filled', 'closed')) DEFAULT 'open'
);
ALTER TABLE job_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public jobs viewable by everyone" ON job_posts FOR SELECT USING (true);
CREATE POLICY "Employers manage own jobs" ON job_posts FOR ALL USING (auth.uid() = employer_id);

-- 6. Bookings
CREATE TABLE bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  employer_id UUID REFERENCES profiles(id),
  worker_id UUID REFERENCES profiles(id),
  job_post_id UUID REFERENCES job_posts(id), -- Optional, can book directly without job post
  work_date DATE NOT NULL,
  amount_agreed NUMERIC NOT NULL,
  platform_fee NUMERIC NOT NULL,
  status TEXT CHECK (status IN ('pending_payment', 'confirmed', 'completed', 'cancelled')) DEFAULT 'pending_payment',
  razorpay_order_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Involved parties can view bookings" ON bookings FOR SELECT USING (auth.uid() = employer_id OR auth.uid() = worker_id);

-- 7. Ratings & Reviews
CREATE TABLE ratings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  booking_id UUID REFERENCES bookings(id) UNIQUE,
  employer_id UUID REFERENCES profiles(id),
  worker_id UUID REFERENCES profiles(id),
  score_quality SMALLINT CHECK (score_quality BETWEEN 1 AND 5),
  score_speed SMALLINT CHECK (score_speed BETWEEN 1 AND 5),
  score_reliability SMALLINT CHECK (score_reliability BETWEEN 1 AND 5),
  score_communication SMALLINT CHECK (score_communication BETWEEN 1 AND 5),
  score_behavior SMALLINT CHECK (score_behavior BETWEEN 1 AND 5),
  review_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Ratings viewable by everyone" ON ratings FOR SELECT USING (true);

-- 8. Complaints
CREATE TABLE complaints (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  reported_by UUID REFERENCES profiles(id),
  reported_user UUID REFERENCES profiles(id),
  booking_id UUID REFERENCES bookings(id),
  description TEXT NOT NULL,
  proof_url TEXT,
  status TEXT CHECK (status IN ('open', 'investigating', 'resolved')) DEFAULT 'open',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;

-- 9. Exit Certificates
CREATE TABLE certificates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  worker_id UUID REFERENCES profiles(id),
  pdf_url TEXT NOT NULL,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- ========================================================================
-- View to calculate worker aggregated ratings easily
-- ========================================================================
CREATE OR REPLACE VIEW worker_aggregated_ratings AS
SELECT 
  worker_id,
  COUNT(id) as total_reviews,
  AVG((score_quality + score_speed + score_reliability + score_communication + score_behavior) / 5.0)::numeric(2,1) as overall_rating
FROM ratings
GROUP BY worker_id;
