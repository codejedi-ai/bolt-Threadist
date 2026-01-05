/*
  # Create User Profiles Table

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key) - Unique identifier
      - `user_id` (text, unique) - Auth0 user ID (e.g., "auth0|xxxxx")
      - `username` (text, nullable) - Display username
      - `full_name` (text, nullable) - User's full name
      - `avatar_url` (text, nullable) - Profile picture URL
      - `interests` (text[], nullable) - Preferred subreddits/topics
      - `created_at` (timestamptz) - When profile was created
      - `updated_at` (timestamptz) - When profile was last updated

  2. Security
    - Enable RLS on `user_profiles` table
    - Users can read their own profile
    - Users can insert their own profile
    - Users can update their own profile

  3. Notes
    - This table syncs with Auth0 users
    - user_id stores the Auth0 subject claim
*/

CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text UNIQUE NOT NULL,
  username text,
  full_name text,
  avatar_url text,
  interests text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (user_id = current_setting('request.headers', true)::json->>'x-user-id');

CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = current_setting('request.headers', true)::json->>'x-user-id');

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (user_id = current_setting('request.headers', true)::json->>'x-user-id')
  WITH CHECK (user_id = current_setting('request.headers', true)::json->>'x-user-id');

CREATE POLICY "Service role has full access to profiles"
  ON user_profiles
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
