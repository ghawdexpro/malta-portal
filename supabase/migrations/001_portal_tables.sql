-- Malta Tourism AI Portal — Database Schema
-- Run against Supabase (white-box project)

-- 1. Raw posts synced from tourist-aggregator
CREATE TABLE IF NOT EXISTS raw_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fb_post_id TEXT UNIQUE NOT NULL,
  topic TEXT NOT NULL DEFAULT 'general',
  content TEXT NOT NULL,
  original_content TEXT NOT NULL,
  source TEXT NOT NULL,
  source_url TEXT,
  engagement INT DEFAULT 0,
  comment_count INT DEFAULT 0,
  comments JSONB DEFAULT '[]'::jsonb,
  posted_at TIMESTAMPTZ,
  scraped_at TIMESTAMPTZ,
  synced_at TIMESTAMPTZ DEFAULT now()
);

-- 2. AI analysis results
CREATE TABLE IF NOT EXISTS analyzed_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  raw_post_id UUID NOT NULL REFERENCES raw_posts(id) ON DELETE CASCADE,
  summary TEXT,
  sentiment TEXT,
  key_places TEXT[] DEFAULT '{}',
  key_prices JSONB DEFAULT '{}'::jsonb,
  recommendations TEXT[] DEFAULT '{}',
  warnings TEXT[] DEFAULT '{}',
  confidence FLOAT DEFAULT 0,
  analyzed_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_analyzed_posts_raw ON analyzed_posts(raw_post_id);

-- 3. Article clusters (grouped related posts)
CREATE TABLE IF NOT EXISTS article_clusters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic TEXT NOT NULL,
  title TEXT NOT NULL,
  post_ids UUID[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'generating', 'published')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. AI-generated articles
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cluster_id UUID REFERENCES article_clusters(id) ON DELETE SET NULL,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  body_html TEXT,
  body_md TEXT,
  cover_image TEXT,
  topic TEXT NOT NULL DEFAULT 'general',
  tags TEXT[] DEFAULT '{}',
  source_count INT DEFAULT 0,
  avg_confidence FLOAT DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'published')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_topic ON articles(topic);

-- 5. Makłowicz Malta journey stops
CREATE TABLE IF NOT EXISTS maklowicz_stops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  episode TEXT NOT NULL,
  youtube_url TEXT,
  youtube_id TEXT,
  timestamp_start TEXT,
  timestamp_end TEXT,
  location_name TEXT NOT NULL,
  lat FLOAT,
  lng FLOAT,
  description TEXT,
  food_mentioned TEXT[] DEFAULT '{}',
  quote TEXT,
  day_number INT NOT NULL DEFAULT 1,
  order_in_day INT NOT NULL DEFAULT 1,
  google_place_id TEXT,
  cover_image TEXT
);

CREATE INDEX IF NOT EXISTS idx_maklowicz_day ON maklowicz_stops(day_number, order_in_day);

-- 6. Generated guides
CREATE TABLE IF NOT EXISTS guides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'topic' CHECK (type IN ('maklowicz', 'topic', 'custom')),
  content_md TEXT,
  pdf_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Pipeline job tracking
CREATE TABLE IF NOT EXISTS pipeline_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stage TEXT NOT NULL CHECK (stage IN ('sync', 'analyze', 'cluster', 'generate', 'enrich')),
  status TEXT NOT NULL DEFAULT 'running' CHECK (status IN ('running', 'completed', 'failed')),
  input_count INT DEFAULT 0,
  output_count INT DEFAULT 0,
  error TEXT,
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  triggered_by TEXT DEFAULT 'admin'
);

-- 8. Admin accounts
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'human' CHECK (type IN ('human', 'bot')),
  api_key TEXT UNIQUE,
  permissions TEXT[] DEFAULT '{"read", "write", "pipeline", "publish"}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Seed bot admin
INSERT INTO admins (name, type, api_key, permissions)
VALUES (
  'tourist-aggregator-bot',
  'bot',
  'mlt_bot_' || encode(gen_random_bytes(24), 'hex'),
  ARRAY['read', 'write', 'pipeline', 'publish']
) ON CONFLICT DO NOTHING;

-- Seed human admin
INSERT INTO admins (name, type, permissions)
VALUES (
  'Gozo Max',
  'human',
  ARRAY['read', 'write', 'pipeline', 'publish', 'admin']
) ON CONFLICT DO NOTHING;

-- RLS policies (enable later when auth is set up)
-- For now, tables are accessible via service role key
