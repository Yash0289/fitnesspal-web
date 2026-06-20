-- Run this in your Supabase SQL editor or psql connected to your project
create table if not exists users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text,
  goal text,
  created_at timestamptz default now()
);

-- Add an index on email if you will query by email often
create index if not exists idx_users_email on users(email);
