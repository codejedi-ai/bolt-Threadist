/*
  # Create Waitlist Table

  1. New Tables
    - `waitlist`
      - `id` (uuid, primary key) - Unique identifier
      - `email` (text, unique) - User's email address
      - `name` (text, nullable) - User's name
      - `interests` (text[], nullable) - Array of interests/subreddits
      - `notified` (boolean) - Whether user has been notified of access
      - `created_at` (timestamptz) - When they signed up

  2. Security
    - Enable RLS on `waitlist` table
    - Allow anonymous users to insert (sign up for waitlist)
    - No public read access (admin only via service role)

  3. Notes
    - Email is unique to prevent duplicate signups
*/

CREATE TABLE IF NOT EXISTS waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  interests text[],
  notified boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at DESC);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join waitlist"
  ON waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
