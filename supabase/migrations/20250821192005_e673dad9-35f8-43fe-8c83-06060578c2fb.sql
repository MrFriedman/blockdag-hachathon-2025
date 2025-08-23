-- Create medical profiles table
CREATE TABLE public.medical_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  wallet_address TEXT,
  full_name TEXT NOT NULL,
  date_of_birth DATE,
  gender TEXT DEFAULT 'female',
  blood_type TEXT,
  allergies TEXT[],
  current_medications TEXT[],
  medical_conditions TEXT[],
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.medical_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own medical profile" 
ON public.medical_profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own medical profile" 
ON public.medical_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own medical profile" 
ON public.medical_profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own medical profile" 
ON public.medical_profiles 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_medical_profiles_updated_at
    BEFORE UPDATE ON public.medical_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();