-- Create the shopping_items table
CREATE TABLE public.shopping_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL,
  discount numeric, -- Optional discount percentage
  image_urls text[] NOT NULL DEFAULT '{}', -- Array of image URLs
  subcategory_slug text NOT NULL, -- e.g., "cricket-gear", "gym-apparel"
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable Row Level Security (RLS) for the shopping_items table
ALTER TABLE public.shopping_items ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users to view shopping items
CREATE POLICY "Authenticated users can view shopping items."
  ON public.shopping_items FOR SELECT
  USING (auth.role() = 'authenticated');

-- Policy for admins to manage shopping items (insert, update, delete)
-- This policy assumes you have a 'role' column in your 'profiles' table
-- and a function to check if the current user is an admin.
-- For simplicity, we'll use the `createAdminClient` in Server Actions
-- which bypasses RLS. If you want RLS for admin, you'd need a more complex policy.
-- For now, we'll allow authenticated users to insert/update/delete for testing,
-- but in production, you'd restrict this to 'admin' role.
CREATE POLICY "Admins can manage shopping items."
  ON public.shopping_items FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Optional: Add an index for faster lookups by subcategory_slug
CREATE INDEX idx_shopping_items_subcategory_slug ON public.shopping_items (subcategory_slug);
