
-- 1. Storage: lock down custom-uploads bucket
DROP POLICY IF EXISTS "custom-uploads anyone insert" ON storage.objects;

CREATE POLICY "custom-uploads scoped insert"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'custom-uploads'
  AND (storage.foldername(name))[1] = 'public-submissions'
  AND length(name) < 256
);

-- Explicit no-update policy (no policy = deny, but be explicit by NOT creating one).
-- Admin update if needed:
CREATE POLICY "custom-uploads admin update"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'custom-uploads' AND has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (bucket_id = 'custom-uploads' AND has_role(auth.uid(), 'admin'::app_role));

-- 2. Prevent privilege escalation on user_roles
-- Restrictive policy: only admins can insert, even if other permissive policies exist
CREATE POLICY "Roles: block non-admin insert"
ON public.user_roles
AS RESTRICTIVE
FOR INSERT
TO anon, authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Roles: block non-admin update"
ON public.user_roles
AS RESTRICTIVE
FOR UPDATE
TO anon, authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Roles: block non-admin delete"
ON public.user_roles
AS RESTRICTIVE
FOR DELETE
TO anon, authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- 3. Tighten custom_orders public insert (replace WITH CHECK true)
DROP POLICY IF EXISTS "Custom orders: anyone submits" ON public.custom_orders;

CREATE POLICY "Custom orders: anyone submits"
ON public.custom_orders
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(company) BETWEEN 1 AND 200
  AND length(contact_name) BETWEEN 1 AND 200
  AND length(phone) BETWEEN 3 AND 40
  AND length(product_type) BETWEEN 1 AND 120
  AND length(quantity) BETWEEN 1 AND 40
  AND (email IS NULL OR length(email) <= 200)
  AND (notes IS NULL OR length(notes) <= 4000)
  AND (colors IS NULL OR length(colors) <= 200)
  AND status = 'new'
);

-- 4. Revoke has_role execute from anon (only authenticated needs it for RLS)
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
