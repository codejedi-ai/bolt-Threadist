/*
  # Create Listening History Table

  1. New Tables
    - `listening_history`
      - `id` (uuid, primary key) - Unique identifier
      - `user_id` (text) - Auth0 user ID who listened
      - `story_id` (uuid) - Reference to the story listened to
      - `listened_at` (timestamptz) - When the listening started
      - `duration_seconds` (integer) - How long they listened
      - `completed` (boolean) - Whether they finished the story

  2. Security
    - Enable RLS on `listening_history` table
    - Users can only read their own history
    - Users can only insert their own history entries
    - Users can update their own history (e.g., mark as completed)

  3. Notes
    - Unlike saved_stories, users can have multiple entries for the same story
      (listening to it multiple times)
*/

CREATE TABLE IF NOT EXISTS listening_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  story_id uuid NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  listened_at timestamptz DEFAULT now(),
  duration_seconds integer NOT NULL DEFAULT 0,
  completed boolean NOT NULL DEFAULT false
);

CREATE INDEX IF NOT EXISTS idx_listening_history_user_id ON listening_history(user_id);
CREATE INDEX IF NOT EXISTS idx_listening_history_story_id ON listening_history(story_id);
CREATE INDEX IF NOT EXISTS idx_listening_history_listened_at ON listening_history(listened_at DESC);

ALTER TABLE listening_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own listening history"
  ON listening_history
  FOR SELECT
  TO authenticated
  USING (user_id = current_setting('request.headers', true)::json->>'x-user-id');

CREATE POLICY "Users can add listening history"
  ON listening_history
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = current_setting('request.headers', true)::json->>'x-user-id');

CREATE POLICY "Users can update own listening history"
  ON listening_history
  FOR UPDATE
  TO authenticated
  USING (user_id = current_setting('request.headers', true)::json->>'x-user-id')
  WITH CHECK (user_id = current_setting('request.headers', true)::json->>'x-user-id');

CREATE POLICY "Service role has full access to listening history"
  ON listening_history
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
