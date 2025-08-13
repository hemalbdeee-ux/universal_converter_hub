-- Location: supabase/migrations/20250107164930_auth_user_management.sql
-- Schema Analysis: Fresh project - no existing schema
-- Integration Type: Complete new authentication schema
-- Dependencies: None (initial schema)

-- 1. Custom Types
CREATE TYPE public.user_role AS ENUM ('admin', 'user');
CREATE TYPE public.user_status AS ENUM ('active', 'inactive', 'suspended');

-- 2. Core User Profiles Table (Intermediary for PostgREST compatibility)
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    username TEXT UNIQUE,
    role public.user_role DEFAULT 'user'::public.user_role,
    status public.user_status DEFAULT 'active'::public.user_status,
    avatar_url TEXT,
    phone TEXT,
    date_of_birth DATE,
    location TEXT,
    bio TEXT,
    preferences JSONB DEFAULT '{
        "defaultPrecision": "4",
        "measurementSystem": "metric",
        "currencyDisplay": "symbol",
        "numberFormat": "us",
        "emailNotifications": true,
        "weeklyReport": true,
        "featureUpdates": false,
        "educationalContent": true
    }'::jsonb,
    privacy_settings JSONB DEFAULT '{
        "saveHistory": true,
        "shareAnalytics": true,
        "publicProfile": false
    }'::jsonb,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMPTZ,
    is_email_verified BOOLEAN DEFAULT false
);

-- 3. User Activity Log Table
CREATE TABLE public.user_activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    details JSONB DEFAULT '{}'::jsonb,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. User Sessions Table (for tracking active sessions)
CREATE TABLE public.user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    session_token TEXT UNIQUE NOT NULL,
    device_info TEXT,
    ip_address INET,
    location TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMPTZ NOT NULL,
    last_accessed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 5. Essential Indexes
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_user_profiles_username ON public.user_profiles(username);
CREATE INDEX idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX idx_user_profiles_status ON public.user_profiles(status);
CREATE INDEX idx_user_activity_logs_user_id ON public.user_activity_logs(user_id);
CREATE INDEX idx_user_activity_logs_action ON public.user_activity_logs(action);
CREATE INDEX idx_user_activity_logs_created_at ON public.user_activity_logs(created_at);
CREATE INDEX idx_user_sessions_user_id ON public.user_sessions(user_id);
CREATE INDEX idx_user_sessions_session_token ON public.user_sessions(session_token);
CREATE INDEX idx_user_sessions_expires_at ON public.user_sessions(expires_at);

-- 6. RLS Setup
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

-- 7. RLS Policies (Following Pattern 1 for core user table, Pattern 2 for others)

-- Pattern 1: Core user table - Simple direct comparison, no functions
CREATE POLICY "users_manage_own_user_profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- Admin access using auth metadata (Pattern 6A - Recommended approach)
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

CREATE POLICY "admin_full_access_user_profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (public.is_admin_from_auth())
WITH CHECK (public.is_admin_from_auth());

-- Pattern 2: Simple user ownership for activity logs
CREATE POLICY "users_manage_own_activity_logs"
ON public.user_activity_logs
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "admin_view_all_activity_logs"
ON public.user_activity_logs
FOR SELECT
TO authenticated
USING (public.is_admin_from_auth());

-- Pattern 2: Simple user ownership for sessions
CREATE POLICY "users_manage_own_sessions"
ON public.user_sessions
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "admin_view_all_sessions"
ON public.user_sessions
FOR SELECT
TO authenticated
USING (public.is_admin_from_auth());

-- 8. Functions for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (
    id, 
    email, 
    full_name, 
    username,
    role,
    is_email_verified
  )
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'user'::public.user_role),
    CASE WHEN NEW.email_confirmed_at IS NOT NULL THEN true ELSE false END
  );
  RETURN NEW;
END;
$$;

-- 9. Function to update user last login
CREATE OR REPLACE FUNCTION public.update_last_login()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE public.user_profiles
  SET 
    last_login_at = CURRENT_TIMESTAMP,
    updated_at = CURRENT_TIMESTAMP
  WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$;

-- 10. Function to log user activity
CREATE OR REPLACE FUNCTION public.log_user_activity(
  user_uuid UUID,
  action_text TEXT,
  activity_details JSONB DEFAULT '{}'::jsonb,
  user_ip INET DEFAULT NULL,
  user_agent_text TEXT DEFAULT NULL
)
RETURNS UUID
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
DECLARE
  log_id UUID := gen_random_uuid();
BEGIN
  INSERT INTO public.user_activity_logs (
    id, user_id, action, details, ip_address, user_agent
  )
  VALUES (
    log_id, user_uuid, action_text, activity_details, user_ip, user_agent_text
  );
  RETURN log_id;
END;
$$;

-- 11. Function to clean up expired sessions
CREATE OR REPLACE FUNCTION public.cleanup_expired_sessions()
RETURNS INTEGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM public.user_sessions
  WHERE expires_at < CURRENT_TIMESTAMP OR is_active = false;
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$;

-- 12. Function for admin to delete users (with cascade handling)
CREATE OR REPLACE FUNCTION public.admin_delete_user(target_user_id UUID)
RETURNS BOOLEAN
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Check if current user is admin
  IF NOT public.is_admin_from_auth() THEN
    RAISE EXCEPTION 'Access denied: Admin privileges required';
  END IF;

  -- Prevent admin from deleting themselves
  IF target_user_id = auth.uid() THEN
    RAISE EXCEPTION 'Cannot delete your own account';
  END IF;

  -- Log the deletion action
  PERFORM public.log_user_activity(
    auth.uid(),
    'ADMIN_DELETE_USER',
    jsonb_build_object('deleted_user_id', target_user_id)
  );

  -- Delete from auth.users (cascades to user_profiles)
  DELETE FROM auth.users WHERE id = target_user_id;
  
  RETURN true;
END;
$$;

-- 13. Triggers
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 14. Mock Data with complete auth.users records
DO $$
DECLARE
    admin_uuid UUID := gen_random_uuid();
    user_uuid UUID := gen_random_uuid();
BEGIN
    -- Create complete auth users with required fields
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (admin_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@example.com', crypt('admin123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "System Admin", "username": "admin", "role": "admin"}'::jsonb, 
         '{"provider": "email", "providers": ["email"], "role": "admin"}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (user_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'user@example.com', crypt('user123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Test User", "username": "testuser", "role": "user"}'::jsonb, 
         '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Log initial activities
    INSERT INTO public.user_activity_logs (user_id, action, details) VALUES
        (admin_uuid, 'ACCOUNT_CREATED', '{"type": "admin", "method": "system"}'::jsonb),
        (user_uuid, 'ACCOUNT_CREATED', '{"type": "user", "method": "system"}'::jsonb);

EXCEPTION
    WHEN unique_violation THEN
        RAISE NOTICE 'Mock users already exist, skipping creation';
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key error: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Error creating mock data: %', SQLERRM;
END $$;

-- 15. Cleanup function for testing
CREATE OR REPLACE FUNCTION public.cleanup_test_auth_data()
RETURNS VOID
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
DECLARE
    auth_user_ids_to_delete UUID[];
BEGIN
    -- Get test user IDs
    SELECT ARRAY_AGG(id) INTO auth_user_ids_to_delete
    FROM auth.users
    WHERE email IN ('admin@example.com', 'user@example.com');

    -- Delete in dependency order
    DELETE FROM public.user_sessions WHERE user_id = ANY(auth_user_ids_to_delete);
    DELETE FROM public.user_activity_logs WHERE user_id = ANY(auth_user_ids_to_delete);
    DELETE FROM public.user_profiles WHERE id = ANY(auth_user_ids_to_delete);
    
    -- Delete auth.users last
    DELETE FROM auth.users WHERE id = ANY(auth_user_ids_to_delete);
    
    RAISE NOTICE 'Test authentication data cleaned up successfully';
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Cleanup failed: %', SQLERRM;
END;
$$;