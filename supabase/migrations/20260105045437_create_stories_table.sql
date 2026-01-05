/*
  # Create Stories Table

  1. New Tables
    - `stories`
      - `id` (uuid, primary key) - Unique identifier
      - `title` (text) - Story title
      - `content` (text) - Full story content
      - `author` (text) - Reddit username of the author
      - `subreddit` (text) - Name of the subreddit (references subreddits.name)
      - `upvotes` (integer) - Number of upvotes
      - `comments` (integer) - Number of comments
      - `is_narrated` (boolean) - Whether AI narration is available
      - `audio_url` (text, nullable) - URL to the audio narration
      - `reddit_id` (text, nullable) - Original Reddit post ID
      - `reddit_url` (text, nullable) - Link to original Reddit post
      - `created_at` (timestamptz) - When the story was posted

  2. Security
    - Enable RLS on `stories` table
    - Add policy for public read access (stories are public content)

  3. Indexes
    - Index on `subreddit` for filtering by community
    - Index on `upvotes` for sorting by popularity
    - Index on `created_at` for sorting by newest
    - Index on `reddit_id` for deduplication
*/

CREATE TABLE IF NOT EXISTS stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  author text NOT NULL,
  subreddit text NOT NULL REFERENCES subreddits(name) ON DELETE CASCADE,
  upvotes integer NOT NULL DEFAULT 0,
  comments integer NOT NULL DEFAULT 0,
  is_narrated boolean NOT NULL DEFAULT false,
  audio_url text,
  reddit_id text,
  reddit_url text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_stories_subreddit ON stories(subreddit);
CREATE INDEX IF NOT EXISTS idx_stories_upvotes ON stories(upvotes DESC);
CREATE INDEX IF NOT EXISTS idx_stories_created_at ON stories(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_stories_reddit_id ON stories(reddit_id);

ALTER TABLE stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read stories"
  ON stories
  FOR SELECT
  TO anon, authenticated
  USING (true);
