
-- =========================
-- ROLES & PROFILES
-- =========================
create type public.app_role as enum ('admin', 'staff');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

-- Trigger: on signup create profile, first user becomes admin
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  total_users int;
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.email));

  select count(*) into total_users from public.profiles;
  if total_users = 1 then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  end if;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Profiles policies
create policy "Profiles: read own" on public.profiles for select to authenticated using (auth.uid() = id);
create policy "Profiles: admins read all" on public.profiles for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Profiles: update own" on public.profiles for update to authenticated using (auth.uid() = id);

-- user_roles policies
create policy "Roles: read own" on public.user_roles for select to authenticated using (auth.uid() = user_id);
create policy "Roles: admins manage" on public.user_roles for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- =========================
-- CATEGORIES
-- =========================
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
alter table public.categories enable row level security;

create policy "Categories: public read" on public.categories for select to anon, authenticated using (true);
create policy "Categories: admin write" on public.categories for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- =========================
-- PRODUCTS
-- =========================
create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null default '',
  price numeric(10,2) not null default 0,
  image_url text,
  category_id uuid references public.categories(id) on delete set null,
  sizes text[] not null default '{}',
  colors text[] not null default '{}',
  featured boolean not null default false,
  best_seller boolean not null default false,
  new_arrival boolean not null default false,
  in_stock boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.products enable row level security;

create policy "Products: public read" on public.products for select to anon, authenticated using (true);
create policy "Products: admin write" on public.products for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger products_touch before update on public.products
  for each row execute function public.touch_updated_at();

-- =========================
-- CUSTOM ORDERS
-- =========================
create table public.custom_orders (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  contact_name text not null,
  phone text not null,
  email text,
  product_type text not null,
  quantity text not null,
  colors text,
  notes text,
  file_url text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);
alter table public.custom_orders enable row level security;

create policy "Custom orders: anyone submits" on public.custom_orders for insert to anon, authenticated with check (true);
create policy "Custom orders: admin read" on public.custom_orders for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Custom orders: admin update" on public.custom_orders for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Custom orders: admin delete" on public.custom_orders for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- =========================
-- STORAGE BUCKETS
-- =========================
insert into storage.buckets (id, name, public) values
  ('product-images', 'product-images', true),
  ('custom-uploads', 'custom-uploads', false)
on conflict (id) do nothing;

-- product-images: public read, admin write
create policy "product-images public read" on storage.objects for select to anon, authenticated using (bucket_id = 'product-images');
create policy "product-images admin insert" on storage.objects for insert to authenticated with check (bucket_id = 'product-images' and public.has_role(auth.uid(), 'admin'));
create policy "product-images admin update" on storage.objects for update to authenticated using (bucket_id = 'product-images' and public.has_role(auth.uid(), 'admin'));
create policy "product-images admin delete" on storage.objects for delete to authenticated using (bucket_id = 'product-images' and public.has_role(auth.uid(), 'admin'));

-- custom-uploads: anyone upload (with their custom order), admin read
create policy "custom-uploads anyone insert" on storage.objects for insert to anon, authenticated with check (bucket_id = 'custom-uploads');
create policy "custom-uploads admin read" on storage.objects for select to authenticated using (bucket_id = 'custom-uploads' and public.has_role(auth.uid(), 'admin'));
create policy "custom-uploads admin delete" on storage.objects for delete to authenticated using (bucket_id = 'custom-uploads' and public.has_role(auth.uid(), 'admin'));
