
-- Lock down SECURITY DEFINER helpers so anon/authenticated cannot call them directly
revoke execute on function public.has_role(uuid, public.app_role) from anon, authenticated, public;
revoke execute on function public.handle_new_user() from anon, authenticated, public;
revoke execute on function public.touch_updated_at() from anon, authenticated, public;

-- touch_updated_at is just a trigger func, set search path defensively
alter function public.touch_updated_at() set search_path = public;

-- Tighten product-images bucket: only allow getting individual files, not listing.
-- Drop the broad select and rely on Supabase's public-URL access for reads.
drop policy if exists "product-images public read" on storage.objects;
