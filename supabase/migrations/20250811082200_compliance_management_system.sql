-- Location: supabase/migrations/20250811082200_compliance_management_system.sql
-- Schema Analysis: Building upon existing user management schema
-- Integration Type: Addition - new compliance functionality
-- Dependencies: user_profiles table (existing)

-- 1. Create ENUMs for compliance management
CREATE TYPE public.consent_status AS ENUM ('granted', 'denied', 'pending');
CREATE TYPE public.document_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE public.request_status AS ENUM ('pending', 'processing', 'completed', 'rejected');
CREATE TYPE public.region_type AS ENUM ('gdpr', 'ccpa', 'lgpd', 'other');

-- 2. Compliance Documents Management
CREATE TABLE public.compliance_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_type TEXT NOT NULL CHECK (document_type IN ('privacy_policy', 'terms_conditions', 'cookie_policy', 'disclaimer', 'affiliate_disclosure', 'about', 'contact')),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    status public.document_status DEFAULT 'draft'::public.document_status,
    version INTEGER DEFAULT 1,
    last_updated_by UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    published_at TIMESTAMPTZ
);

-- 3. User Consent Management
CREATE TABLE public.user_consents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    consent_type TEXT NOT NULL CHECK (consent_type IN ('advertising', 'analytics', 'functional', 'essential', 'personalization')),
    consent_status public.consent_status DEFAULT 'pending'::public.consent_status,
    region public.region_type DEFAULT 'other'::public.region_type,
    ip_address INET,
    user_agent TEXT,
    consent_string TEXT, -- IAB TCF 2.2 consent string
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMPTZ
);

-- 4. Data Requests (GDPR/CCPA)
CREATE TABLE public.data_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    request_type TEXT NOT NULL CHECK (request_type IN ('access', 'deletion', 'portability', 'opt_out')),
    status public.request_status DEFAULT 'pending'::public.request_status,
    description TEXT,
    verification_code TEXT,
    verification_expires_at TIMESTAMPTZ,
    processed_by UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    processed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 5. Business Information Settings
CREATE TABLE public.business_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_name TEXT NOT NULL,
    business_address TEXT,
    business_email TEXT,
    business_phone TEXT,
    privacy_officer_email TEXT,
    adsense_publisher_id TEXT,
    ads_txt_content TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 6. Consent Logs for Audit Trail
CREATE TABLE public.consent_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    action TEXT NOT NULL CHECK (action IN ('granted', 'denied', 'withdrawn', 'updated')),
    consent_types TEXT[] NOT NULL,
    region public.region_type DEFAULT 'other'::public.region_type,
    ip_address INET,
    user_agent TEXT,
    consent_data JSONB,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 7. Create essential indexes
CREATE INDEX idx_compliance_documents_type ON public.compliance_documents(document_type);
CREATE INDEX idx_compliance_documents_status ON public.compliance_documents(status);
CREATE INDEX idx_user_consents_user_id ON public.user_consents(user_id);
CREATE INDEX idx_user_consents_type ON public.user_consents(consent_type);
CREATE INDEX idx_user_consents_region ON public.user_consents(region);
CREATE INDEX idx_data_requests_user_id ON public.data_requests(user_id);
CREATE INDEX idx_data_requests_status ON public.data_requests(status);
CREATE INDEX idx_consent_logs_user_id ON public.consent_logs(user_id);
CREATE INDEX idx_consent_logs_created_at ON public.consent_logs(created_at);

-- 8. Create trigger function for updating timestamps
CREATE OR REPLACE FUNCTION public.update_compliance_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

-- 9. Create triggers for automatic timestamp updates
CREATE TRIGGER compliance_documents_updated_at
    BEFORE UPDATE ON public.compliance_documents
    FOR EACH ROW EXECUTE FUNCTION public.update_compliance_updated_at();

CREATE TRIGGER user_consents_updated_at
    BEFORE UPDATE ON public.user_consents
    FOR EACH ROW EXECUTE FUNCTION public.update_compliance_updated_at();

CREATE TRIGGER data_requests_updated_at
    BEFORE UPDATE ON public.data_requests
    FOR EACH ROW EXECUTE FUNCTION public.update_compliance_updated_at();

CREATE TRIGGER business_settings_updated_at
    BEFORE UPDATE ON public.business_settings
    FOR EACH ROW EXECUTE FUNCTION public.update_compliance_updated_at();

-- 10. Enable RLS on all tables
ALTER TABLE public.compliance_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_consents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consent_logs ENABLE ROW LEVEL SECURITY;

-- 11. Create RLS policies using safe patterns

-- Pattern 4: Public read for compliance documents, admin write
CREATE POLICY "public_can_read_compliance_documents"
ON public.compliance_documents
FOR SELECT
TO public
USING (status = 'published'::public.document_status);

-- Pattern 6: Admin full access using auth metadata
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

CREATE POLICY "admin_full_access_compliance_documents"
ON public.compliance_documents
FOR ALL
TO authenticated
USING (public.is_admin_from_auth())
WITH CHECK (public.is_admin_from_auth());

-- Pattern 2: Simple user ownership for consents and requests
CREATE POLICY "users_manage_own_consents"
ON public.user_consents
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_data_requests"
ON public.data_requests
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_view_own_consent_logs"
ON public.consent_logs
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Admin access for all consent management
CREATE POLICY "admin_full_access_user_consents"
ON public.user_consents
FOR ALL
TO authenticated
USING (public.is_admin_from_auth())
WITH CHECK (public.is_admin_from_auth());

CREATE POLICY "admin_full_access_data_requests"
ON public.data_requests
FOR ALL
TO authenticated
USING (public.is_admin_from_auth())
WITH CHECK (public.is_admin_from_auth());

CREATE POLICY "admin_full_access_business_settings"
ON public.business_settings
FOR ALL
TO authenticated
USING (public.is_admin_from_auth())
WITH CHECK (public.is_admin_from_auth());

CREATE POLICY "admin_view_consent_logs"
ON public.consent_logs
FOR SELECT
TO authenticated
USING (public.is_admin_from_auth());

-- 12. Mock data for testing
DO $$
DECLARE
    admin_user_id UUID;
    business_settings_id UUID := gen_random_uuid();
BEGIN
    -- Get existing admin user
    SELECT id INTO admin_user_id FROM public.user_profiles WHERE role = 'admin' LIMIT 1;
    
    -- Insert default business settings
    INSERT INTO public.business_settings (
        id, business_name, business_address, business_email, 
        privacy_officer_email, adsense_publisher_id
    ) VALUES (
        business_settings_id,
        'Universal Converter Hub',
        '123 Tech Street, Digital City, DC 12345',
        'contact@universalconverter.com',
        'privacy@universalconverter.com',
        'ca-pub-XXXXXXXXXXXXXXXX'
    );

    -- Insert default compliance documents
    INSERT INTO public.compliance_documents (document_type, title, content, status, last_updated_by) VALUES
    ('privacy_policy', 'Privacy Policy', 
     'Privacy Policy Content with Google AdSense compliance, DART cookies, and personalized ads information.', 
     'published'::public.document_status, admin_user_id),
    ('terms_conditions', 'Terms and Conditions', 
     'Terms and Conditions content including service usage terms.', 
     'published'::public.document_status, admin_user_id),
    ('cookie_policy', 'Cookie Policy', 
     'Detailed cookie policy including Google AdSense cookies and third-party cookies.', 
     'published'::public.document_status, admin_user_id),
    ('disclaimer', 'Disclaimer', 
     'Legal disclaimer and limitation of liability information.', 
     'published'::public.document_status, admin_user_id),
    ('affiliate_disclosure', 'Affiliate Disclosure', 
     'Affiliate marketing disclosure and partnership information.', 
     'published'::public.document_status, admin_user_id);

    -- Insert sample consent data if admin user exists
    IF admin_user_id IS NOT NULL THEN
        INSERT INTO public.user_consents (user_id, consent_type, consent_status, region) VALUES
        (admin_user_id, 'essential', 'granted'::public.consent_status, 'gdpr'::public.region_type),
        (admin_user_id, 'functional', 'granted'::public.consent_status, 'gdpr'::public.region_type),
        (admin_user_id, 'analytics', 'granted'::public.consent_status, 'gdpr'::public.region_type),
        (admin_user_id, 'advertising', 'denied'::public.consent_status, 'gdpr'::public.region_type);
        
        -- Log the consent action
        INSERT INTO public.consent_logs (user_id, action, consent_types, region) VALUES
        (admin_user_id, 'granted', ARRAY['essential', 'functional', 'analytics'], 'gdpr'::public.region_type),
        (admin_user_id, 'denied', ARRAY['advertising'], 'gdpr'::public.region_type);
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Mock data insertion failed: %', SQLERRM;
END $$;