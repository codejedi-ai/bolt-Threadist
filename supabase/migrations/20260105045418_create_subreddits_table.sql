/*
  # Create Subreddits Table

  1. New Tables
    - `subreddits`
      - `id` (uuid, primary key) - Unique identifier
      - `name` (text, unique) - Subreddit name (e.g., "nosleep", "tifu")
      - `description` (text) - Description of the subreddit
      - `members` (integer) - Number of members/subscribers
      - `online` (integer) - Currently online users
      - `icon` (text, nullable) - URL to subreddit icon
      - `created_at` (timestamptz) - When the record was created

  2. Security
    - Enable RLS on `subreddits` table
    - Add policy for public read access (subreddits are public content)

  3. Indexes
    - Index on `name` for fast lookups
    - Index on `members` for sorting by popularity
*/

CREATE TABLE IF NOT EXISTS subreddits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text NOT NULL DEFAULT '',
  members integer NOT NULL DEFAULT 0,
  online integer NOT NULL DEFAULT 0,
  icon text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_subreddits_name ON subreddits(name);
CREATE INDEX IF NOT EXISTS idx_subreddits_members ON subreddits(members DESC);

ALTER TABLE subreddits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read subreddits"
  ON subreddits
  FOR SELECT
  TO anon, authenticated
  USING (true);
