-- Create tables for site configuration and management

-- Site settings table
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  site_name TEXT NOT NULL DEFAULT 'DentalCare',
  hero_title TEXT NOT NULL DEFAULT 'Seu sorriso é nossa prioridade',
  hero_description TEXT NOT NULL DEFAULT 'Oferecemos cuidados odontológicos modernos e personalizados para toda a família. Tecnologia avançada e atendimento humanizado.',
  hero_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Team members table
CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  experience_years INTEGER NOT NULL,
  credentials TEXT NOT NULL,
  image_url TEXT,
  specialties TEXT[] DEFAULT '{}',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Appointments table
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_name TEXT NOT NULL,
  patient_email TEXT NOT NULL,
  patient_phone TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TIME NOT NULL,
  service_type TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Admin users table (for authentication)
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for site_settings (admins can manage, everyone can read)
CREATE POLICY "Everyone can view site settings" 
ON public.site_settings 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can modify site settings" 
ON public.site_settings 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.admin_users 
  WHERE user_id = auth.uid()
));

-- RLS Policies for team_members (admins can manage, everyone can read)
CREATE POLICY "Everyone can view team members" 
ON public.team_members 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can modify team members" 
ON public.team_members 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.admin_users 
  WHERE user_id = auth.uid()
));

-- RLS Policies for appointments (admins can view all, users can create)
CREATE POLICY "Anyone can create appointments" 
ON public.appointments 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Only admins can view appointments" 
ON public.appointments 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.admin_users 
  WHERE user_id = auth.uid()
));

CREATE POLICY "Only admins can update appointments" 
ON public.appointments 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.admin_users 
  WHERE user_id = auth.uid()
));

-- RLS Policies for admin_users
CREATE POLICY "Only admins can view admin users" 
ON public.admin_users 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.admin_users 
  WHERE user_id = auth.uid()
));

CREATE POLICY "Only super admins can modify admin users" 
ON public.admin_users 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.admin_users 
  WHERE user_id = auth.uid() AND role = 'super_admin'
));

-- Insert default site settings
INSERT INTO public.site_settings (site_name, hero_title, hero_description) 
VALUES ('DentalCare', 'Seu sorriso é nossa prioridade', 'Oferecemos cuidados odontológicos modernos e personalizados para toda a família. Tecnologia avançada e atendimento humanizado.');

-- Insert default team members
INSERT INTO public.team_members (name, specialty, experience_years, credentials, specialties, display_order) VALUES
('Dra. Ana Carolina Silva', 'Ortodontia e Odontopediatria', 12, 'CRO-SP 45.123 | Especialista USP', ARRAY['Ortodontia', 'Odontopediatria', 'Estética'], 1),
('Dr. Rafael Santos', 'Implantodontia e Cirurgia', 15, 'CRO-SP 38.456 | Mestrado UNICAMP', ARRAY['Implantes', 'Cirurgia', 'Próteses'], 2),
('Dra. Marina Costa', 'Endodontia e Estética', 10, 'CRO-SP 52.789 | Especialista PUC', ARRAY['Endodontia', 'Estética', 'Clareamento'], 3);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at
BEFORE UPDATE ON public.team_members
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
BEFORE UPDATE ON public.appointments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();