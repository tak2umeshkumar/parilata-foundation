-- ============================================================
-- PARILATA FOUNDATION — Supabase schema
-- Run this in the Supabase SQL editor (or via `supabase db push`)
-- ============================================================

create extension if not exists "uuid-ossp";

-- ---------- USERS (extends Supabase auth.users) ----------
create type user_role as enum ('admin', 'editor', 'volunteer', 'reader');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  role user_role not null default 'reader',
  bio text,
  created_at timestamptz not null default now()
);

-- ---------- CATEGORIES & TAGS (shared by blogs + stories) ----------
create table public.categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now()
);

create table public.tags (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  slug text not null unique
);

-- ---------- BLOGS ----------
create type post_status as enum ('draft', 'published', 'scheduled');

create table public.blogs (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,              -- rich text / HTML from editor
  featured_image text,
  category_id uuid references public.categories(id),
  author_id uuid references public.profiles(id),
  status post_status not null default 'draft',
  meta_title text,
  meta_description text,
  published_at timestamptz,
  scheduled_at timestamptz,
  view_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.blog_tags (
  blog_id uuid references public.blogs(id) on delete cascade,
  tag_id uuid references public.tags(id) on delete cascade,
  primary key (blog_id, tag_id)
);

-- ---------- STORIES (environmental / success / community stories) ----------
create type story_type as enum ('environmental', 'success', 'community');

create table public.stories (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  featured_image text,
  story_type story_type not null default 'environmental',
  category_id uuid references public.categories(id),
  author_id uuid references public.profiles(id),
  status post_status not null default 'draft',
  location text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- COMMENTS (polymorphic: blog or story) ----------
create table public.comments (
  id uuid primary key default uuid_generate_v4(),
  blog_id uuid references public.blogs(id) on delete cascade,
  story_id uuid references public.stories(id) on delete cascade,
  user_id uuid references public.profiles(id),
  guest_name text,
  guest_email text,
  content text not null,
  is_approved boolean not null default false,
  created_at timestamptz not null default now(),
  check (blog_id is not null or story_id is not null)
);

-- ---------- GALLERY ----------
create table public.gallery_images (
  id uuid primary key default uuid_generate_v4(),
  title text,
  image_url text not null,
  category_id uuid references public.categories(id),
  caption text,
  uploaded_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

-- ---------- VIDEOS ----------
create table public.videos (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  description text,
  video_url text not null,          -- YouTube/Vimeo embed URL
  thumbnail_url text,
  category_id uuid references public.categories(id),
  uploaded_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

-- ---------- DONATIONS ----------
create type donation_status as enum ('pending', 'completed', 'failed');

create table public.donations (
  id uuid primary key default uuid_generate_v4(),
  donor_name text not null,
  donor_email text,
  donor_phone text,
  amount numeric(10,2) not null,
  currency text not null default 'INR',
  payment_method text,               -- 'upi', 'card', etc.
  transaction_ref text,
  status donation_status not null default 'pending',
  message text,
  created_at timestamptz not null default now()
);

-- ---------- VOLUNTEERS ----------
create table public.volunteer_applications (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  email text not null,
  phone text,
  city text,
  areas_of_interest text[],          -- e.g. {'reforestation','cleanups','education'}
  availability text,
  message text,
  status text not null default 'new', -- new | contacted | active | inactive
  created_at timestamptz not null default now()
);

-- ---------- CONTACT MESSAGES ----------
create table public.contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.profiles enable row level security;
alter table public.blogs enable row level security;
alter table public.stories enable row level security;
alter table public.comments enable row level security;
alter table public.gallery_images enable row level security;
alter table public.videos enable row level security;
alter table public.donations enable row level security;
alter table public.volunteer_applications enable row level security;
alter table public.contact_messages enable row level security;
alter table public.categories enable row level security;
alter table public.tags enable row level security;

-- Public can read published content
create policy "Public read published blogs" on public.blogs
  for select using (status = 'published');

create policy "Public read published stories" on public.stories
  for select using (status = 'published');

create policy "Public read approved comments" on public.comments
  for select using (is_approved = true);

create policy "Public read gallery" on public.gallery_images for select using (true);
create policy "Public read videos" on public.videos for select using (true);
create policy "Public read categories" on public.categories for select using (true);
create policy "Public read tags" on public.tags for select using (true);

-- Anyone can submit (insert) these — no read access to public
create policy "Anyone can submit volunteer application" on public.volunteer_applications
  for insert with check (true);

create policy "Anyone can submit contact message" on public.contact_messages
  for insert with check (true);

create policy "Anyone can record a donation" on public.donations
  for insert with check (true);

create policy "Anyone can comment" on public.comments
  for insert with check (true);

-- Admin/editor full access (checks role in profiles table)
create policy "Admins manage blogs" on public.blogs
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','editor'))
  );

create policy "Admins manage stories" on public.stories
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','editor'))
  );

create policy "Admins manage gallery" on public.gallery_images
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','editor'))
  );

create policy "Admins manage videos" on public.videos
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','editor'))
  );

create policy "Admins view submissions" on public.volunteer_applications
  for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "Admins view contact messages" on public.contact_messages
  for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "Admins view donations" on public.donations
  for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "Users read own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Admins read all profiles" on public.profiles
  for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- ============================================================
-- STORAGE BUCKETS (run in Supabase Dashboard > Storage, or via SQL)
-- ============================================================
insert into storage.buckets (id, name, public) values ('blog-images', 'blog-images', true)
  on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('gallery', 'gallery', true)
  on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true)
  on conflict (id) do nothing;

create policy "Public read blog-images" on storage.objects
  for select using (bucket_id = 'blog-images');
create policy "Public read gallery" on storage.objects
  for select using (bucket_id = 'gallery');
create policy "Authenticated upload blog-images" on storage.objects
  for insert with check (bucket_id = 'blog-images' and auth.role() = 'authenticated');
create policy "Authenticated upload gallery" on storage.objects
  for insert with check (bucket_id = 'gallery' and auth.role() = 'authenticated');

-- ============================================================
-- Helpful indexes
-- ============================================================
create index idx_blogs_status on public.blogs(status);
create index idx_blogs_category on public.blogs(category_id);
create index idx_stories_status on public.stories(status);
create index idx_comments_blog on public.comments(blog_id);
create index idx_comments_story on public.comments(story_id);

-- ============================================================
-- AUTO-CREATE A PROFILE ROW WHEN A NEW USER SIGNS UP
-- (needed so the admin login/middleware role-check has something to read)
-- ============================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, new.raw_user_meta_data->>'full_name', 'reader');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
