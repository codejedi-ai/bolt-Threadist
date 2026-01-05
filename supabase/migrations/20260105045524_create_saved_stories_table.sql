/*
  # Create Saved Stories Table

  1. New Tables
    - `saved_stories`
      - `id` (uuid, primary key) - Unique identifier
      - `user_id` (text) - Auth0 user ID who saved the story
      - `story_id` (uuid) - Reference to the saved story
      - `saved_at` (timestamptz) - When the story was saved

  2. Security
    - Enable RLS on `saved_stories` table
    - Users can only read their own saved stories
    - Users can only insert saves for themselves
    - Users can only delete their own saves

  3. Constraints
    - Unique constraint on (user_id, story_id) to prevent duplicates
*/

CREATE TABLE IF NOT EXISTS saved_stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  story_id uuid NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  saved_at timestamptz DEFAULT now(),
  UNIQUE(user_id, story_id)
);

CREATE INDEX IF NOT EXISTS idx_saved_stories_user_id ON saved_stories(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_stories_story_id ON saved_stories(story_id);

ALTER TABLE saved_stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own saved stories"
  ON saved_stories
  FOR SELECT
  TO authenticated
  USING (user_id = current_setting('request.headers', true)::json->>'x-user-id');

CREATE POLICY "Users can save stories"
  ON saved_stories
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = current_setting('request.headers', true)::json->>'x-user-id');

CREATE POLICY "Users can unsave stories"
  ON saved_stories
  FOR DELETE
  TO authenticated
  USING (user_id = current_setting('request.headers', true)::json->>'x-user-id');

CREATE POLICY "Service role has full access to saved stories"
  ON saved_stories
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
