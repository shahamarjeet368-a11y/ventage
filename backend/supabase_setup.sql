-- ==========================================
-- SUPABASE DATABASE SETUP SCRIPT FOR VINTAGE SALON
-- ==========================================
-- Instructions:
-- 1. Log in to your Supabase Dashboard (https://app.supabase.com)
-- 2. Select your project -> Go to SQL Editor in the left sidebar
-- 3. Click "New Query", paste the entire contents of this file, and click "Run"
-- ==========================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------
-- 1. SERVICES TABLE
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY DEFAULT ('srv-' || substring(md5(random()::text) from 1 for 8)),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    price TEXT NOT NULL,
    duration TEXT NOT NULL,
    image_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------
-- 2. APPOINTMENTS TABLE
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS public.appointments (
    id TEXT PRIMARY KEY DEFAULT ('apt-' || substring(md5(random()::text) from 1 for 8)),
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    service_id TEXT REFERENCES public.services(id) ON DELETE SET NULL,
    service_name TEXT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------
-- 3. GALLERY TABLE
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS public.gallery (
    id TEXT PRIMARY KEY DEFAULT ('gal-' || substring(md5(random()::text) from 1 for 8)),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT NOT NULL,
    is_featured BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------
-- 4. REVIEWS TABLE
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS public.reviews (
    id TEXT PRIMARY KEY DEFAULT ('rev-' || substring(md5(random()::text) from 1 for 8)),
    customer_name TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review TEXT NOT NULL,
    source TEXT DEFAULT 'Google Review',
    is_featured BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------
-- 5. OFFERS TABLE
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS public.offers (
    id TEXT PRIMARY KEY DEFAULT ('off-' || substring(md5(random()::text) from 1 for 8)),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    discount TEXT NOT NULL,
    valid_until DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running
DROP POLICY IF EXISTS "Allow public read access to services" ON public.services;
DROP POLICY IF EXISTS "Allow public read access to gallery" ON public.gallery;
DROP POLICY IF EXISTS "Allow public read access to reviews" ON public.reviews;
DROP POLICY IF EXISTS "Allow public read access to offers" ON public.offers;
DROP POLICY IF EXISTS "Allow public insert to appointments" ON public.appointments;
DROP POLICY IF EXISTS "Allow public insert to reviews" ON public.reviews;
DROP POLICY IF EXISTS "Service role full access to services" ON public.services;
DROP POLICY IF EXISTS "Service role full access to appointments" ON public.appointments;
DROP POLICY IF EXISTS "Service role full access to gallery" ON public.gallery;
DROP POLICY IF EXISTS "Service role full access to reviews" ON public.reviews;
DROP POLICY IF EXISTS "Service role full access to offers" ON public.offers;

-- Public Select Policies
CREATE POLICY "Allow public read access to services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Allow public read access to gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Allow public read access to reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Allow public read access to offers" ON public.offers FOR SELECT USING (true);

-- Public Insert Policies (Bookings & Customer Reviews)
CREATE POLICY "Allow public insert to appointments" ON public.appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert to reviews" ON public.reviews FOR INSERT WITH CHECK (true);

-- Service Role Full Access Policies (Backend API operations)
CREATE POLICY "Service role full access to services" ON public.services FOR ALL USING (true);
CREATE POLICY "Service role full access to appointments" ON public.appointments FOR ALL USING (true);
CREATE POLICY "Service role full access to gallery" ON public.gallery FOR ALL USING (true);
CREATE POLICY "Service role full access to reviews" ON public.reviews FOR ALL USING (true);
CREATE POLICY "Service role full access to offers" ON public.offers FOR ALL USING (true);

-- ==========================================
-- SEED DATA (INITIAL RECORDS)
-- ==========================================

INSERT INTO public.services (id, name, category, description, price, duration, image_url, is_active)
VALUES 
    ('srv-1', 'Luxury Signature Haircut & Styling', 'Hair', 'Bespoke hair cutting tailored to your face shape with luxury wash, deep conditioning, and signature editorial blowout.', '₹1,800 - ₹2,500', '60 mins', 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800', true),
    ('srv-2', 'Global Balayage & Olaplex Treatment', 'Hair', 'Hand-painted seamless highlights blended with deep bond building treatment for radiant, dimensional color.', '₹5,500 - ₹8,500', '180 mins', 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800', true),
    ('srv-3', 'Keratin Smoothening & Gloss Spa', 'Hair', 'Deep restorative smoothening therapy providing frizz-free glass hair sheen for up to 5 months.', '₹4,500 - ₹7,000', '150 mins', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800', true),
    ('srv-4', 'Airbrush HD Bridal & Party Makeup', 'Makeup', 'High-definition flawless skin coverage with premium waterproof products, custom lash accents, and lip styling.', '₹6,000 - ₹18,000', '120 mins', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800', true),
    ('srv-5', 'Gel Extension & Architectural Nail Art', 'Nails', 'Custom sculpted builder gel extensions with hand-painted editorial line work or chrome accent finishes.', '₹2,200 - ₹3,500', '90 mins', 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=800', true),
    ('srv-6', 'Radiant Hydra-Facial & Dermaplaning', 'Treatments', 'Clinical grade deep pore cleansing, exfoliation, antioxidant serum infusion, and LED phototherapy.', '₹3,200 - ₹5,000', '75 mins', 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.appointments (id, customer_name, customer_phone, customer_email, service_id, service_name, appointment_date, appointment_time, status, notes)
VALUES 
    ('apt-101', 'Priya Sharma', '9876543210', 'priya.s@example.com', 'srv-1', 'Luxury Signature Haircut & Styling', '2026-09-20', '11:30 AM', 'confirmed', 'Prefers subtle layers.'),
    ('apt-102', 'Ananya Gupta', '9811223344', 'ananya.g@example.com', 'srv-4', 'Airbrush HD Bridal & Party Makeup', '2026-09-22', '03:00 PM', 'pending', 'Engagement ceremony makeup test.')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.gallery (id, title, category, image_url, is_featured)
VALUES 
    ('gal-1', 'Editorial Soft Wave Balayage', 'Hair', 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800', true),
    ('gal-2', 'Minimalist Glass Skin Makeup', 'Makeup', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800', true),
    ('gal-3', 'Bespoke Almond Chrome Gel Nails', 'Nails', 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=800', true),
    ('gal-4', 'Vintage Salon Interior Sanctum', 'Salon', 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&q=80&w=800', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.reviews (id, customer_name, rating, review, source, is_featured)
VALUES 
    ('rev-1', 'Ruchika Malhotra', 5, 'Excellent Service excellent interior! Vintage is definitely the finest salon in Rani Bagh / Pitampura. The hair spa and coloring experience was super relaxing and professional.', 'Google Review', true),
    ('rev-2', 'Meenakshi Verma', 5, 'Got my bridal HD makeup done at Vintage and I was blown away! The aesthetic, attention to skin prep, and calm environment made my day stress-free. 4.9 stars well deserved!', 'Google Review', true),
    ('rev-3', 'Simran Kaur', 5, 'The team takes time to consult with you before touching your hair. Highly hygienic, courteous staff and serene warm atmosphere. My go-to beauty parlour in Pitampura!', 'Google Review', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.offers (id, title, description, discount, valid_until, is_active)
VALUES 
    ('off-1', 'Vintage Autumn Glow Package', 'Combines Hydra-Facial, Signature Hair Spa & Classic Manicure.', '20% OFF', '2026-10-31', true)
ON CONFLICT (id) DO NOTHING;
