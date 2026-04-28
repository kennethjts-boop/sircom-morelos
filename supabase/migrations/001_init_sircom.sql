-- Migration 001: Init SIRCOM schema

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS sources (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null,
  url text,
  category text,
  municipality text,
  reliability_base integer default 50,
  active boolean default true,
  last_success_at timestamptz,
  last_error_at timestamptz,
  last_error text,
  metadata jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

CREATE TABLE IF NOT EXISTS findings (
  id uuid primary key default gen_random_uuid(),
  source_name text,
  source_type text,
  source_url text,
  title text,
  raw_text text,
  clean_text text,
  summary text,
  category text,
  subcategory text,
  municipality text,
  locality_approx text,
  confidence_level text,
  risk_level text,
  score numeric,
  url text,
  published_at timestamptz,
  detected_at timestamptz default now(),
  hash text unique,
  is_new boolean default true,
  is_secondary_signal boolean default false,
  personal_data_removed boolean default false,
  metadata jsonb default '{}',
  created_at timestamptz default now()
);

CREATE TABLE IF NOT EXISTS reports (
  id uuid primary key default gen_random_uuid(),
  report_type text,
  period_start timestamptz,
  period_end timestamptz,
  title text,
  markdown_report text,
  whatsapp_text text,
  facebook_text text,
  total_findings integer default 0,
  new_findings integer default 0,
  critical_findings integer default 0,
  general_risk_level text,
  metadata jsonb default '{}',
  created_at timestamptz default now()
);

CREATE TABLE IF NOT EXISTS runs (
  id uuid primary key default gen_random_uuid(),
  run_type text,
  started_at timestamptz default now(),
  finished_at timestamptz,
  status text,
  total_raw integer default 0,
  total_new integer default 0,
  total_alerts integer default 0,
  report_path text,
  errors jsonb default '[]',
  metadata jsonb default '{}'
);

CREATE TABLE IF NOT EXISTS telegram_logs (
  id uuid primary key default gen_random_uuid(),
  chat_id text,
  message_type text,
  content text,
  status text,
  error text,
  created_at timestamptz default now()
);

-- Indices
CREATE INDEX IF NOT EXISTS findings_hash_idx ON findings(hash);
CREATE INDEX IF NOT EXISTS findings_category_idx ON findings(category);
CREATE INDEX IF NOT EXISTS findings_municipality_idx ON findings(municipality);
CREATE INDEX IF NOT EXISTS findings_risk_level_idx ON findings(risk_level);
CREATE INDEX IF NOT EXISTS findings_detected_at_idx ON findings(detected_at);
CREATE INDEX IF NOT EXISTS reports_created_at_idx ON reports(created_at);
CREATE INDEX IF NOT EXISTS runs_started_at_idx ON runs(started_at);
