-- Create app_role enum for role-based access control
CREATE TYPE public.app_role AS ENUM ('admin', 'owner');

-- Create user_roles table to store user roles
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policy: Users can view their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

-- RLS policy: Only admins can insert roles
CREATE POLICY "Admins can insert roles"
ON public.user_roles
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- RLS policy: Only admins can update roles
CREATE POLICY "Admins can update roles"
ON public.user_roles
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- RLS policy: Only admins can delete roles
CREATE POLICY "Admins can delete roles"
ON public.user_roles
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Update businesses table RLS policies to include admin access
DROP POLICY IF EXISTS "Users can view their own businesses" ON public.businesses;
DROP POLICY IF EXISTS "Users can create their own businesses" ON public.businesses;
DROP POLICY IF EXISTS "Users can update their own businesses" ON public.businesses;

CREATE POLICY "Owners can view their own businesses and admins can view all"
ON public.businesses
FOR SELECT
USING (
  auth.uid() = user_id OR 
  public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can create businesses"
ON public.businesses
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Owners can update their own businesses and admins can update all"
ON public.businesses
FOR UPDATE
USING (
  auth.uid() = user_id OR 
  public.has_role(auth.uid(), 'admin')
);

-- Update reviews table RLS for admin access
DROP POLICY IF EXISTS "Users can view reviews for their businesses" ON public.reviews;
DROP POLICY IF EXISTS "Users can create reviews for their businesses" ON public.reviews;

CREATE POLICY "Owners can view reviews for their businesses and admins can view all"
ON public.reviews
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM businesses 
    WHERE businesses.id = reviews.business_id 
    AND businesses.user_id = auth.uid()
  ) OR 
  public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins and business owners can create reviews"
ON public.reviews
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM businesses 
    WHERE businesses.id = reviews.business_id 
    AND businesses.user_id = auth.uid()
  ) OR 
  public.has_role(auth.uid(), 'admin')
);

-- Update messages table RLS for admin access
DROP POLICY IF EXISTS "Users can view messages for their businesses" ON public.messages;
DROP POLICY IF EXISTS "Users can create messages for their businesses" ON public.messages;
DROP POLICY IF EXISTS "Users can update messages for their businesses" ON public.messages;

CREATE POLICY "Owners can view messages for their businesses and admins can view all"
ON public.messages
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM businesses 
    WHERE businesses.id = messages.business_id 
    AND businesses.user_id = auth.uid()
  ) OR 
  public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins and business owners can create messages"
ON public.messages
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM businesses 
    WHERE businesses.id = messages.business_id 
    AND businesses.user_id = auth.uid()
  ) OR 
  public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins and business owners can update messages"
ON public.messages
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM businesses 
    WHERE businesses.id = messages.business_id 
    AND businesses.user_id = auth.uid()
  ) OR 
  public.has_role(auth.uid(), 'admin')
);

-- Update csv_uploads table RLS for admin access
DROP POLICY IF EXISTS "Users can view csv uploads for their businesses" ON public.csv_uploads;
DROP POLICY IF EXISTS "Users can create csv uploads for their businesses" ON public.csv_uploads;

CREATE POLICY "Owners can view csv uploads for their businesses and admins can view all"
ON public.csv_uploads
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM businesses 
    WHERE businesses.id = csv_uploads.business_id 
    AND businesses.user_id = auth.uid()
  ) OR 
  public.has_role(auth.uid(), 'admin')
);