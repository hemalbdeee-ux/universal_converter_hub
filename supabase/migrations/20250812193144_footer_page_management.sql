-- Location: supabase/migrations/20250812193144_footer_page_management.sql
-- Schema Analysis: Existing schema has no footer-related functionality
-- Integration Type: Addition of new footer page management module
-- Dependencies: Existing is_admin_from_auth function

-- Create footer page management tables
CREATE TABLE public.footer_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT,
    meta_description TEXT,
    is_published BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create footer links management table
CREATE TABLE public.footer_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    target_type TEXT DEFAULT '_self' CHECK (target_type IN ('_self', '_blank')),
    is_external BOOLEAN DEFAULT false,
    footer_page_id UUID REFERENCES public.footer_pages(id) ON DELETE SET NULL,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create footer sections to organize links
CREATE TABLE public.footer_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    is_visible BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create junction table for section-link relationships
CREATE TABLE public.footer_section_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_id UUID REFERENCES public.footer_sections(id) ON DELETE CASCADE,
    link_id UUID REFERENCES public.footer_links(id) ON DELETE CASCADE,
    sort_order INTEGER DEFAULT 0,
    UNIQUE(section_id, link_id)
);

-- Create indexes
CREATE INDEX idx_footer_pages_slug ON public.footer_pages(slug);
CREATE INDEX idx_footer_pages_published ON public.footer_pages(is_published);
CREATE INDEX idx_footer_pages_sort ON public.footer_pages(sort_order);
CREATE INDEX idx_footer_links_sort ON public.footer_links(sort_order);
CREATE INDEX idx_footer_links_active ON public.footer_links(is_active);
CREATE INDEX idx_footer_links_page_id ON public.footer_links(footer_page_id);
CREATE INDEX idx_footer_sections_sort ON public.footer_sections(sort_order);
CREATE INDEX idx_footer_section_links_section ON public.footer_section_links(section_id);
CREATE INDEX idx_footer_section_links_link ON public.footer_section_links(link_id);

-- Enable RLS
ALTER TABLE public.footer_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.footer_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.footer_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.footer_section_links ENABLE ROW LEVEL SECURITY;

-- RLS Policies using Pattern 6A (auth.users metadata) for admin access
CREATE POLICY "public_can_read_footer_pages"
ON public.footer_pages
FOR SELECT
TO public
USING (is_published = true);

CREATE POLICY "admin_manage_footer_pages"
ON public.footer_pages
FOR ALL
TO authenticated
USING (public.is_admin_from_auth())
WITH CHECK (public.is_admin_from_auth());

CREATE POLICY "public_can_read_footer_links"
ON public.footer_links
FOR SELECT
TO public
USING (is_active = true);

CREATE POLICY "admin_manage_footer_links"
ON public.footer_links
FOR ALL
TO authenticated
USING (public.is_admin_from_auth())
WITH CHECK (public.is_admin_from_auth());

CREATE POLICY "public_can_read_footer_sections"
ON public.footer_sections
FOR SELECT
TO public
USING (is_visible = true);

CREATE POLICY "admin_manage_footer_sections"
ON public.footer_sections
FOR ALL
TO authenticated
USING (public.is_admin_from_auth())
WITH CHECK (public.is_admin_from_auth());

CREATE POLICY "public_can_read_footer_section_links"
ON public.footer_section_links
FOR SELECT
TO public
USING (true);

CREATE POLICY "admin_manage_footer_section_links"
ON public.footer_section_links
FOR ALL
TO authenticated
USING (public.is_admin_from_auth())
WITH CHECK (public.is_admin_from_auth());

-- Create triggers for updated_at columns
CREATE TRIGGER update_footer_pages_updated_at BEFORE UPDATE
ON public.footer_pages FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_footer_links_updated_at BEFORE UPDATE
ON public.footer_links FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_footer_sections_updated_at BEFORE UPDATE
ON public.footer_sections FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default footer sections
INSERT INTO public.footer_sections (title, sort_order) VALUES
('Company', 1),
('Legal', 2),
('Resources', 3),
('Support', 4);

-- Insert default footer pages and links
DO $$
DECLARE
    about_page_id UUID := gen_random_uuid();
    privacy_page_id UUID := gen_random_uuid();
    terms_page_id UUID := gen_random_uuid();
    contact_page_id UUID := gen_random_uuid();
    company_section_id UUID;
    legal_section_id UUID;
    support_section_id UUID;
    about_link_id UUID := gen_random_uuid();
    privacy_link_id UUID := gen_random_uuid();
    terms_link_id UUID := gen_random_uuid();
    contact_link_id UUID := gen_random_uuid();
BEGIN
    -- Get section IDs
    SELECT id INTO company_section_id FROM public.footer_sections WHERE title = 'Company' LIMIT 1;
    SELECT id INTO legal_section_id FROM public.footer_sections WHERE title = 'Legal' LIMIT 1;
    SELECT id INTO support_section_id FROM public.footer_sections WHERE title = 'Support' LIMIT 1;

    -- Insert default footer pages
    INSERT INTO public.footer_pages (id, title, slug, content, meta_description, sort_order) VALUES
        (about_page_id, 'About Us', 'about', 'Learn more about ConvertAnything.com and our mission to provide accurate conversion tools.', 'Learn about ConvertAnything.com - your trusted source for accurate unit conversions and measurement tools.', 1),
        (privacy_page_id, 'Privacy Policy', 'privacy', 'Our privacy policy explaining how we collect, use, and protect your information.', 'Privacy Policy for ConvertAnything.com - Learn how we protect your data and respect your privacy.', 2),
        (terms_page_id, 'Terms of Service', 'terms', 'Terms and conditions for using ConvertAnything.com services.', 'Terms of Service for ConvertAnything.com - Review our usage terms and conditions.', 3),
        (contact_page_id, 'Contact Us', 'contact', 'Get in touch with the ConvertAnything.com team for support and inquiries.', 'Contact ConvertAnything.com - Get support, ask questions, or provide feedback.', 4);

    -- Insert default footer links
    INSERT INTO public.footer_links (id, title, url, footer_page_id, sort_order) VALUES
        (about_link_id, 'About Us', '/about', about_page_id, 1),
        (privacy_link_id, 'Privacy Policy', '/privacy', privacy_page_id, 1),
        (terms_link_id, 'Terms of Service', '/terms', terms_page_id, 2),
        (contact_link_id, 'Contact Us', '/contact', contact_page_id, 1);

    -- Insert section-link relationships
    INSERT INTO public.footer_section_links (section_id, link_id, sort_order) VALUES
        (company_section_id, about_link_id, 1),
        (legal_section_id, privacy_link_id, 1),
        (legal_section_id, terms_link_id, 2),
        (support_section_id, contact_link_id, 1);

EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Error inserting mock data: %', SQLERRM;
END $$;