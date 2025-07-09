-- Location: supabase/migrations/20241216120000_auth_and_user_profiles.sql
-- Authentication & User Management Module

-- 1. Types
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_type WHERE typname = 'user_role'
    ) THEN
        CREATE TYPE public.user_role AS ENUM ('admin', 'moderator', 'member');
    END IF;
END$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_status') THEN
        CREATE TYPE public.user_status AS ENUM ('active', 'inactive', 'suspended');
    END IF;
END$$;
-- 2. Core Tables
-- Critical intermediary table for auth relationships
CREATE TABLE IF NOT EXISTS  public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    username TEXT UNIQUE,
    bio TEXT,
    avatar_url TEXT,
    cover_photo_url TEXT,
    role public.user_role DEFAULT 'member'::public.user_role,
    status public.user_status DEFAULT 'active'::public.user_status,
    is_online BOOLEAN DEFAULT false,
    last_seen TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    profile_visibility BOOLEAN DEFAULT true,
    allow_friend_requests BOOLEAN DEFAULT true,
    email_notifications BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Friend relationships table
CREATE TABLE IF NOT EXISTS public.friendships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    requester_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    addressee_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    status TEXT CHECK (status IN ('pending', 'accepted', 'rejected', 'blocked')) DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(requester_id, addressee_id)
);

-- 3. Essential Indexes
-- user_profiles.email
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes
        WHERE schemaname = 'public' AND indexname = 'idx_user_profiles_email'
    ) THEN
        CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
    END IF;
END$$;

-- user_profiles.username
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes
        WHERE schemaname = 'public' AND indexname = 'idx_user_profiles_username'
    ) THEN
        CREATE INDEX idx_user_profiles_username ON public.user_profiles(username);
    END IF;
END$$;

-- user_profiles.status
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes
        WHERE schemaname = 'public' AND indexname = 'idx_user_profiles_status'
    ) THEN
        CREATE INDEX idx_user_profiles_status ON public.user_profiles(status);
    END IF;
END$$;

-- friendships.requester_id
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes
        WHERE schemaname = 'public' AND indexname = 'idx_friendships_requester_id'
    ) THEN
        CREATE INDEX idx_friendships_requester_id ON public.friendships(requester_id);
    END IF;
END$$;

-- friendships.addressee_id
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes
        WHERE schemaname = 'public' AND indexname = 'idx_friendships_addressee_id'
    ) THEN
        CREATE INDEX idx_friendships_addressee_id ON public.friendships(addressee_id);
    END IF;
END$$;

-- friendships.status
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes
        WHERE schemaname = 'public' AND indexname = 'idx_friendships_status'
    ) THEN
        CREATE INDEX idx_friendships_status ON public.friendships(status);
    END IF;
END$$;

-- 4. RLS Setup
-- Enable RLS for user_profiles
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'user_profiles'
    ) THEN
        EXECUTE 'ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY';
    END IF;
END$$;

-- Enable RLS for friendships
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'friendships'
    ) THEN
        EXECUTE 'ALTER TABLE public.friendships ENABLE ROW LEVEL SECURITY';
    END IF;
END$$;

-- 5. Helper Functions
CREATE OR REPLACE FUNCTION public.is_profile_owner(profile_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = profile_id AND up.id = auth.uid()
)
$$;

CREATE OR REPLACE FUNCTION public.has_admin_role()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() AND up.role = 'admin'::public.user_role
)
$$;

CREATE OR REPLACE FUNCTION public.can_view_profile(profile_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = profile_id AND (
        up.profile_visibility = true OR 
        up.id = auth.uid() OR
        public.has_admin_role()
    )
)
$$;

CREATE OR REPLACE FUNCTION public.are_friends(user1_id UUID, user2_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.friendships f
    WHERE f.status = 'accepted' AND (
        (f.requester_id = user1_id AND f.addressee_id = user2_id) OR
        (f.requester_id = user2_id AND f.addressee_id = user1_id)
    )
)
$$;

CREATE OR REPLACE FUNCTION public.can_access_friendship(friendship_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.friendships f
    WHERE f.id = friendship_id AND (
        f.requester_id = auth.uid() OR 
        f.addressee_id = auth.uid()
    )
)
$$;

-- Function for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name, username, role)
    VALUES (
        NEW.id, 
        NEW.email, 
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
        COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'member'::public.user_role)
    );
    RETURN NEW;
END;
$$;

-- Update user profile timestamp function
CREATE OR REPLACE FUNCTION public.update_user_profile_timestamp()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

-- 6. Triggers
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_trigger
        WHERE tgname = 'on_auth_user_created'
    ) THEN
        EXECUTE 'DROP TRIGGER on_auth_user_created ON auth.users';
    END IF;
END$$;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_trigger
        WHERE tgname = 'update_user_profiles_timestamp'
    ) THEN
        EXECUTE 'DROP TRIGGER update_user_profiles_timestamp ON public.user_profiles';
    END IF;
END$$;

CREATE TRIGGER update_user_profiles_timestamp
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_user_profile_timestamp();

DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_trigger
        WHERE tgname = 'update_friendships_timestamp'
    ) THEN
        EXECUTE 'DROP TRIGGER update_friendships_timestamp ON public.friendships';
    END IF;
END$$;

CREATE TRIGGER update_friendships_timestamp
    BEFORE UPDATE ON public.friendships
    FOR EACH ROW EXECUTE FUNCTION public.update_user_profile_timestamp();

-- 7. RLS Policies
DROP POLICY IF EXISTS "users_view_own_profile" ON public.user_profiles;
DROP POLICY IF EXISTS "users_view_public_profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "users_update_own_profile" ON public.user_profiles;
DROP POLICY IF EXISTS "admin_manage_profiles" ON public.user_profiles;

DROP POLICY IF EXISTS "users_manage_own_friendships" ON public.friendships;
DROP POLICY IF EXISTS "users_view_accepted_friendships" ON public.friendships;

CREATE POLICY "users_view_own_profile"
ON public.user_profiles
FOR SELECT
TO authenticated
USING (public.is_profile_owner(id));

CREATE POLICY "users_view_public_profiles"
ON public.user_profiles
FOR SELECT
TO authenticated
USING (public.can_view_profile(id));

CREATE POLICY "users_update_own_profile"
ON public.user_profiles
FOR UPDATE
TO authenticated
USING (public.is_profile_owner(id))
WITH CHECK (public.is_profile_owner(id));

CREATE POLICY "admin_manage_profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (public.has_admin_role())
WITH CHECK (public.has_admin_role());

CREATE POLICY "users_manage_own_friendships"
ON public.friendships
FOR ALL
TO authenticated
USING (public.can_access_friendship(id))
WITH CHECK (public.can_access_friendship(id));

CREATE POLICY "users_view_accepted_friendships"
ON public.friendships
FOR SELECT
TO authenticated
USING (
    status = 'accepted' AND (
        requester_id = auth.uid() OR 
        addressee_id = auth.uid()
    )
);


-- 8. Complete Mock Data
DO $$
DECLARE
    admin_uuid UUID := gen_random_uuid();
    user1_uuid UUID := gen_random_uuid();
    user2_uuid UUID := gen_random_uuid();
    friendship_uuid UUID := gen_random_uuid();
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
         'admin@socialchat.com', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Admin User", "username": "admin", "role": "admin"}'::jsonb, 
         '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (user1_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'user@socialchat.com', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "John Doe", "username": "johndoe"}'::jsonb, 
         '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (user2_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'sarah@socialchat.com', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Sarah Johnson", "username": "sarahjohnson"}'::jsonb, 
         '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Create sample friendship
    INSERT INTO public.friendships (id, requester_id, addressee_id, status) VALUES
        (friendship_uuid, user1_uuid, user2_uuid, 'accepted');

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key error: %', SQLERRM;
    WHEN unique_violation THEN
        RAISE NOTICE 'Unique constraint error: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Unexpected error: %', SQLERRM;
END $$;

-- 9. Cleanup Function
CREATE OR REPLACE FUNCTION public.cleanup_auth_test_data()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    auth_user_ids_to_delete UUID[];
BEGIN
    -- Get auth user IDs first
    SELECT ARRAY_AGG(id) INTO auth_user_ids_to_delete
    FROM auth.users
    WHERE email LIKE '%@socialchat.com';

    -- Delete in dependency order (children first)
    DELETE FROM public.friendships WHERE requester_id = ANY(auth_user_ids_to_delete) OR addressee_id = ANY(auth_user_ids_to_delete);
    DELETE FROM public.user_profiles WHERE id = ANY(auth_user_ids_to_delete);
    DELETE FROM auth.users WHERE id = ANY(auth_user_ids_to_delete);

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key constraint prevents deletion: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Cleanup failed: %', SQLERRM;
END;
$$;