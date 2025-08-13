-- Location: supabase/migrations/20250811082217_compliance_pack_system.sql
-- Schema Analysis: Existing app_settings table for configuration storage
-- Integration Type: Extension of existing settings system
-- Dependencies: app_settings table

-- Create compliance document management tables
CREATE TABLE public.compliance_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_type TEXT NOT NULL CHECK (document_type IN ('privacy_policy', 'terms_conditions', 'cookie_policy', 'disclaimer_affiliate', 'about_us', 'contact_us')),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    version_number INTEGER NOT NULL DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    last_updated TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create consent management table
CREATE TABLE public.user_consents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_session_id TEXT NOT NULL,
    consent_data JSONB NOT NULL DEFAULT '{}',
    consent_version TEXT NOT NULL DEFAULT '1.0',
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create data request management table
CREATE TABLE public.data_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_type TEXT NOT NULL CHECK (request_type IN ('access', 'deletion', 'portability', 'rectification')),
    email TEXT NOT NULL,
    full_name TEXT,
    request_details TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'denied')),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create compliance settings table for business information
CREATE TABLE public.compliance_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_key TEXT NOT NULL UNIQUE,
    setting_value JSONB NOT NULL DEFAULT '{}',
    setting_type TEXT NOT NULL DEFAULT 'text',
    last_updated TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_compliance_documents_type ON public.compliance_documents(document_type);
CREATE INDEX idx_compliance_documents_active ON public.compliance_documents(is_active);
CREATE INDEX idx_user_consents_session ON public.user_consents(user_session_id);
CREATE INDEX idx_data_requests_status ON public.data_requests(status);
CREATE INDEX idx_compliance_settings_key ON public.compliance_settings(setting_key);

-- Enable RLS
ALTER TABLE public.compliance_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_consents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_settings ENABLE ROW LEVEL SECURITY;

-- Create admin function for compliance management
CREATE OR REPLACE FUNCTION public.is_admin_from_auth()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM auth.users au
    WHERE au.id = auth.uid() 
    AND (au.raw_user_meta_data->>'role' = 'admin' 
         OR au.raw_app_meta_data->>'role' = 'admin')
)
$$;

-- RLS Policies
CREATE POLICY "public_can_read_compliance_documents"
ON public.compliance_documents
FOR SELECT
TO public
USING (is_active = true);

CREATE POLICY "admin_manage_compliance_documents"
ON public.compliance_documents
FOR ALL
TO authenticated
USING (public.is_admin_from_auth())
WITH CHECK (public.is_admin_from_auth());

CREATE POLICY "anyone_can_create_consents"
ON public.user_consents
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "admin_can_view_consents"
ON public.user_consents
FOR SELECT
TO authenticated
USING (public.is_admin_from_auth());

CREATE POLICY "anyone_can_create_data_requests"
ON public.data_requests
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "admin_manage_data_requests"
ON public.data_requests
FOR ALL
TO authenticated
USING (public.is_admin_from_auth())
WITH CHECK (public.is_admin_from_auth());

CREATE POLICY "public_can_read_compliance_settings"
ON public.compliance_settings
FOR SELECT
TO public
USING (true);

CREATE POLICY "admin_manage_compliance_settings"
ON public.compliance_settings
FOR ALL
TO authenticated
USING (public.is_admin_from_auth())
WITH CHECK (public.is_admin_from_auth());

-- Insert default compliance documents
INSERT INTO public.compliance_documents (document_type, title, content) VALUES
('privacy_policy', 'Privacy Policy', 'This Privacy Policy explains how we collect, use, and protect your information when you use ConvertAnything.com. We use Google AdSense to display advertisements. Google AdSense uses cookies (including the DART cookie) to serve ads based on your visits to our site and other sites on the Internet. You may opt out of personalized advertising by visiting Google Ads Settings (https://www.google.com/settings/ads) or the Network Advertising Initiative opt-out page (http://www.networkadvertising.org/managing/opt_out.asp). For users in the EU, we comply with GDPR. For California residents, we comply with CCPA. For Brazilian users, we comply with LGPD. Last updated: August 11, 2025.'),
('terms_conditions', 'Terms & Conditions', 'By using ConvertAnything.com, you agree to these terms. Our service is provided "as is" without warranties. We may display advertisements through Google AdSense. You are responsible for using our conversion tools appropriately. We reserve the right to modify these terms at any time. Last updated: August 11, 2025.'),
('cookie_policy', 'Cookie Policy', 'We use cookies to improve your experience on ConvertAnything.com. Essential cookies are necessary for site functionality. Analytics cookies help us understand how visitors interact with our website. Advertising cookies are used by Google AdSense to display relevant ads. You can manage your cookie preferences in your browser settings. Last updated: August 11, 2025.'),
('disclaimer_affiliate', 'Disclaimer & Affiliate Disclosure', 'The information provided on ConvertAnything.com is for general informational purposes only. While we strive for accuracy, we make no warranties about the completeness or reliability of the information. This site may contain affiliate links. When you make a purchase through these links, we may earn a commission at no additional cost to you. We are a participant in various affiliate advertising programs. Last updated: August 11, 2025.'),
('about_us', 'About Us', 'ConvertAnything.com is a professional unit conversion platform providing accurate measurement tools for users worldwide. Our mission is to simplify unit conversions and provide educational resources. We are committed to user privacy and comply with international data protection regulations. Last updated: August 11, 2025.'),
('contact_us', 'Contact Us', 'Contact ConvertAnything.com for support, feedback, or inquiries. Email: support@convertanything.com. Business Address: [Your Business Address]. For privacy-related requests, please use our data request form. Response time: 1-3 business days. COPPA Notice: Our service is not directed at children under 13. Last updated: August 11, 2025.');

-- Insert default compliance settings
INSERT INTO public.compliance_settings (setting_key, setting_value, setting_type) VALUES
('business_name', '{"value": "ConvertAnything.com"}', 'text'),
('business_address', '{"value": "Your Business Address\nYour City, State, ZIP\nCountry"}', 'textarea'),
('contact_email', '{"value": "support@convertanything.com"}', 'email'),
('adsense_publisher_id', '{"value": "ca-pub-XXXXXXXXXXXXXXXX"}', 'text'),
('ads_txt_content', '{"value": "google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0"}', 'textarea'),
('consent_banner_text', '{"value": "We use cookies and similar technologies to enhance your experience. By continuing to use our site, you consent to our use of cookies."}', 'textarea'),
('gdpr_enabled', '{"value": true}', 'boolean'),
('ccpa_enabled', '{"value": true}', 'boolean'),
('lgpd_enabled', '{"value": true}', 'boolean');

-- Create trigger for updated_at columns
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_compliance_documents_updated_at BEFORE UPDATE
ON public.compliance_documents FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_consents_updated_at BEFORE UPDATE
ON public.user_consents FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_data_requests_updated_at BEFORE UPDATE
ON public.data_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_compliance_settings_updated_at BEFORE UPDATE
ON public.compliance_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();