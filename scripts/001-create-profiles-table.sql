-- Create the profiles table
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE,
  full_name text,
  mobile text,
  address text,
  role text DEFAULT 'user' NOT NULL, -- 'user' or 'admin'
  PRIMARY KEY (id)
);

-- Enable Row Level Security (RLS) for the profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create a policy for users to view their own profile
CREATE POLICY "Users can view their own profile."
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Create a policy for users to update their own profile
CREATE POLICY "Users can update their own profile."
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create a policy for new users to insert their own profile
CREATE POLICY "New users can insert their own profile."
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Optional: Policy for admins to manage all profiles (if you have an admin role setup)
-- This assumes you have a 'role' column in your profiles table and a function to check it.
-- For simplicity, we'll omit an admin-specific policy for now, as the `createAdminClient`
-- bypasses RLS. If you need RLS for admin, you'd add a policy like:
-- CREATE POLICY "Admins can manage all profiles."
--   ON public.profiles FOR ALL
--   USING (get_user_role() = 'admin');
-- (You'd need to define a `get_user_role()` function or similar)
