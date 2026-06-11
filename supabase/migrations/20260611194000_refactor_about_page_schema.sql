-- Refactor schema for About Page based on new structured requirements

drop table if exists public.cms_about_page_sections cascade;

create table if not exists public.cms_about_banner (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_url text,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_about_mini_slide (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_url text,
  sort_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_about_partner (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  image_file text,
  sort_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_about_director (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  quote text,
  image_url text,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_about_vision_mission (
  id uuid primary key default gen_random_uuid(),
  vision_text text,
  vision_image_url text,
  mission_text text,
  mission_image_url text,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_about_award (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_url text,
  sort_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Triggers for updated_at
drop trigger if exists trg_cms_about_banner_updated_at on public.cms_about_banner;
create trigger trg_cms_about_banner_updated_at before update on public.cms_about_banner for each row execute function public.set_cms_updated_at();

drop trigger if exists trg_cms_about_mini_slide_updated_at on public.cms_about_mini_slide;
create trigger trg_cms_about_mini_slide_updated_at before update on public.cms_about_mini_slide for each row execute function public.set_cms_updated_at();

drop trigger if exists trg_cms_about_partner_updated_at on public.cms_about_partner;
create trigger trg_cms_about_partner_updated_at before update on public.cms_about_partner for each row execute function public.set_cms_updated_at();

drop trigger if exists trg_cms_about_director_updated_at on public.cms_about_director;
create trigger trg_cms_about_director_updated_at before update on public.cms_about_director for each row execute function public.set_cms_updated_at();

drop trigger if exists trg_cms_about_vision_mission_updated_at on public.cms_about_vision_mission;
create trigger trg_cms_about_vision_mission_updated_at before update on public.cms_about_vision_mission for each row execute function public.set_cms_updated_at();

drop trigger if exists trg_cms_about_award_updated_at on public.cms_about_award;
create trigger trg_cms_about_award_updated_at before update on public.cms_about_award for each row execute function public.set_cms_updated_at();

-- Enable RLS
alter table public.cms_about_banner enable row level security;
alter table public.cms_about_mini_slide enable row level security;
alter table public.cms_about_partner enable row level security;
alter table public.cms_about_director enable row level security;
alter table public.cms_about_vision_mission enable row level security;
alter table public.cms_about_award enable row level security;

-- Public Read Policies
create policy "Public read published about banner" on public.cms_about_banner for select using (status = 'published');
create policy "Public read published about mini slide" on public.cms_about_mini_slide for select using (status = 'published');
create policy "Public read published about partner" on public.cms_about_partner for select using (status = 'published');
create policy "Public read published about director" on public.cms_about_director for select using (status = 'published');
create policy "Public read published about vision mission" on public.cms_about_vision_mission for select using (status = 'published');
create policy "Public read published about award" on public.cms_about_award for select using (status = 'published');

-- Authenticated Manage Policies
create policy "Authenticated manage about banner" on public.cms_about_banner for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated manage about mini slide" on public.cms_about_mini_slide for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated manage about partner" on public.cms_about_partner for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated manage about director" on public.cms_about_director for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated manage about vision mission" on public.cms_about_vision_mission for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated manage about award" on public.cms_about_award for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';