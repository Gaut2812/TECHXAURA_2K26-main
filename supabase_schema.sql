-- Create the team_members table
create table team_members (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  phone_number text not null,
  screenshot_url text not null
);

-- Set up Row Level Security (RLS)
-- Enable RLS
alter table team_members enable row level security;

-- Create policy to allow anyone to insert (if that's the desired behavior, or restricted to authenticated users)
-- For this public form example, we might allow public inserts but only admin reads.
-- ADJUST THIS POLICY BASED ON YOUR AUTH REQUIREMENTS
create policy "Enable insert for all users" on team_members for insert with check (true);

-- Create policy to allow only admins/authenticated users to view (example)
-- create policy "Enable read for authenticated users only" on team_members for select using (auth.role() = 'authenticated');
