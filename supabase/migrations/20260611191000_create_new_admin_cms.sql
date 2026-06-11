-- New standalone CMS schema for /admin.
-- All content groups use dedicated tables and separate columns instead of reusing old files/design data.

create extension if not exists pgcrypto;

drop table if exists public.cms_home_hero cascade;
drop table if exists public.cms_home_partner cascade;
drop table if exists public.cms_home_solution cascade;
drop table if exists public.cms_home_mini_slide cascade;
drop table if exists public.cms_product_banner cascade;
drop table if exists public.cms_home_product_categories cascade;
drop table if exists public.cms_product_categories cascade;
drop table if exists public.cms_products cascade;
drop table if exists public.cms_posts cascade;
drop table if exists public.cms_forms cascade;
drop table if exists public.cms_form_submissions cascade;
drop table if exists public.cms_technical_documents cascade;
drop table if exists public.cms_site_information cascade;
drop table if exists public.cms_menu_items cascade;
drop table if exists public.cms_about_page_sections cascade;

create or replace function public.set_cms_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.cms_home_hero (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  primary_button_url text,
  image_file text,
  sort_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_home_partner (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  image_file text,
  sort_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_home_solution (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_file text,
  sort_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_home_mini_slide (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_file text,
  sort_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_product_banner (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  primary_button_url text,
  image_file text,
  sort_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_home_product_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  url text,
  image_file text,
  sort_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_product_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  image_file text,
  sort_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.cms_product_categories(id) on delete set null,
  sku text not null unique,
  name text not null,
  slug text not null unique,
  short_description text,
  description text,
  features text,
  specifications text,
  price numeric(14,2),
  unit text,
  main_image_url text,
  datasheet_url text,
  is_featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  category text,
  author_name text,
  cover_image_url text,
  seo_title text,
  seo_description text,
  published_at timestamptz,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_forms (
  id uuid primary key default gen_random_uuid(),
  form_key text not null unique,
  name text not null,
  description text,
  submit_button_label text,
  success_message text,
  recipient_email text,
  fields_schema jsonb not null default '[]'::jsonb,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_form_submissions (
  id uuid primary key default gen_random_uuid(),
  form_id uuid references public.cms_forms(id) on delete set null,
  form_key text,
  full_name text,
  email text,
  phone text,
  company text,
  subject text,
  message text,
  product_interest text,
  submitted_payload jsonb not null default '{}'::jsonb,
  status text not null default 'new' check (status in ('new', 'processing', 'done', 'spam')),
  created_at timestamptz not null default now()
);

create table if not exists public.cms_technical_documents (
  id uuid primary key default gen_random_uuid(),
  related_product_id uuid references public.cms_products(id) on delete set null,
  title text not null,
  document_code text not null unique,
  document_type text not null default 'other' check (document_type in ('datasheet', 'catalogue', 'manual', 'certificate', 'drawing', 'other')),
  version text,
  language text,
  file_url text,
  file_size bigint,
  mime_type text,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_site_information (
  id uuid primary key default gen_random_uuid(),
  site_name text not null,
  company_name text not null,
  address text not null,
  phone text not null,
  email text,
  tax_code text,
  working_hours text,
  facebook_url text,
  youtube_url text,
  linkedin_url text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_menu_items (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references public.cms_menu_items(id) on delete cascade,
  menu_location text not null check (menu_location in ('header', 'footer', 'footer-products', 'footer-company', 'footer-support')),
  label text not null,
  url text not null,
  target text not null default '_self' check (target in ('_self', '_blank')),
  sort_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_about_page_sections (
  id uuid primary key default gen_random_uuid(),
  section_key text not null unique,
  section_type text not null default 'custom',
  eyebrow text,
  title text not null,
  subtitle text,
  body text,
  image_url text,
  sort_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_cms_home_hero_status_sort on public.cms_home_hero(status, sort_order);
create index if not exists idx_cms_home_partner_status_sort on public.cms_home_partner(status, sort_order);
create index if not exists idx_cms_home_solution_status_sort on public.cms_home_solution(status, sort_order);
create index if not exists idx_cms_home_mini_slide_status_sort on public.cms_home_mini_slide(status, sort_order);
create index if not exists idx_cms_product_banner_status_sort on public.cms_product_banner(status, sort_order);
create index if not exists idx_cms_home_product_categories_status_sort on public.cms_home_product_categories(status, sort_order);
create index if not exists idx_cms_products_category_status on public.cms_products(category_id, status);
create index if not exists idx_cms_posts_status_published_at on public.cms_posts(status, published_at desc);
create index if not exists idx_cms_forms_key_status on public.cms_forms(form_key, status);
create index if not exists idx_cms_form_submissions_form_created on public.cms_form_submissions(form_id, created_at desc);
create index if not exists idx_cms_technical_documents_product_status on public.cms_technical_documents(related_product_id, status);
create index if not exists idx_cms_menu_items_location_sort on public.cms_menu_items(menu_location, sort_order);
create index if not exists idx_cms_about_page_sections_status_sort on public.cms_about_page_sections(status, sort_order);

drop trigger if exists trg_cms_home_hero_updated_at on public.cms_home_hero;
create trigger trg_cms_home_hero_updated_at before update on public.cms_home_hero for each row execute function public.set_cms_updated_at();

drop trigger if exists trg_cms_home_partner_updated_at on public.cms_home_partner;
create trigger trg_cms_home_partner_updated_at before update on public.cms_home_partner for each row execute function public.set_cms_updated_at();

drop trigger if exists trg_cms_home_solution_updated_at on public.cms_home_solution;
create trigger trg_cms_home_solution_updated_at before update on public.cms_home_solution for each row execute function public.set_cms_updated_at();

drop trigger if exists trg_cms_home_mini_slide_updated_at on public.cms_home_mini_slide;
create trigger trg_cms_home_mini_slide_updated_at before update on public.cms_home_mini_slide for each row execute function public.set_cms_updated_at();

drop trigger if exists trg_cms_product_banner_updated_at on public.cms_product_banner;
create trigger trg_cms_product_banner_updated_at before update on public.cms_product_banner for each row execute function public.set_cms_updated_at();

drop trigger if exists trg_cms_home_product_categories_updated_at on public.cms_home_product_categories;
create trigger trg_cms_home_product_categories_updated_at before update on public.cms_home_product_categories for each row execute function public.set_cms_updated_at();

drop trigger if exists trg_cms_product_categories_updated_at on public.cms_product_categories;
create trigger trg_cms_product_categories_updated_at before update on public.cms_product_categories for each row execute function public.set_cms_updated_at();

drop trigger if exists trg_cms_products_updated_at on public.cms_products;
create trigger trg_cms_products_updated_at before update on public.cms_products for each row execute function public.set_cms_updated_at();

drop trigger if exists trg_cms_posts_updated_at on public.cms_posts;
create trigger trg_cms_posts_updated_at before update on public.cms_posts for each row execute function public.set_cms_updated_at();

drop trigger if exists trg_cms_forms_updated_at on public.cms_forms;
create trigger trg_cms_forms_updated_at before update on public.cms_forms for each row execute function public.set_cms_updated_at();

drop trigger if exists trg_cms_technical_documents_updated_at on public.cms_technical_documents;
create trigger trg_cms_technical_documents_updated_at before update on public.cms_technical_documents for each row execute function public.set_cms_updated_at();

drop trigger if exists trg_cms_site_information_updated_at on public.cms_site_information;
create trigger trg_cms_site_information_updated_at before update on public.cms_site_information for each row execute function public.set_cms_updated_at();

drop trigger if exists trg_cms_menu_items_updated_at on public.cms_menu_items;
create trigger trg_cms_menu_items_updated_at before update on public.cms_menu_items for each row execute function public.set_cms_updated_at();

drop trigger if exists trg_cms_about_page_sections_updated_at on public.cms_about_page_sections;
create trigger trg_cms_about_page_sections_updated_at before update on public.cms_about_page_sections for each row execute function public.set_cms_updated_at();

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'cms-technical-documents',
  'cms-technical-documents',
  true,
  52428800,
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'image/png',
    'image/jpeg',
    'image/webp'
  ]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

alter table public.cms_home_hero enable row level security;
alter table public.cms_home_partner enable row level security;
alter table public.cms_home_solution enable row level security;
alter table public.cms_home_mini_slide enable row level security;
alter table public.cms_product_banner enable row level security;
alter table public.cms_home_product_categories enable row level security;
alter table public.cms_product_categories enable row level security;
alter table public.cms_products enable row level security;
alter table public.cms_posts enable row level security;
alter table public.cms_forms enable row level security;
alter table public.cms_form_submissions enable row level security;
alter table public.cms_technical_documents enable row level security;
alter table public.cms_site_information enable row level security;
alter table public.cms_menu_items enable row level security;
alter table public.cms_about_page_sections enable row level security;

drop policy if exists "Public read published hero" on public.cms_home_hero;
drop policy if exists "Public read published partner" on public.cms_home_partner;
drop policy if exists "Public read published solution" on public.cms_home_solution;
drop policy if exists "Public read published mini slide" on public.cms_home_mini_slide;
drop policy if exists "Public read published product banner" on public.cms_product_banner;
drop policy if exists "Public read published home product categories" on public.cms_home_product_categories;
drop policy if exists "Public read published product categories" on public.cms_product_categories;
drop policy if exists "Public read published products" on public.cms_products;
drop policy if exists "Public read published posts" on public.cms_posts;
drop policy if exists "Public read published forms" on public.cms_forms;
drop policy if exists "Public read published technical documents" on public.cms_technical_documents;
drop policy if exists "Public read published site information" on public.cms_site_information;
drop policy if exists "Public read published menu items" on public.cms_menu_items;
drop policy if exists "Public read published about sections" on public.cms_about_page_sections;

create policy "Public read published hero" on public.cms_home_hero for select using (status = 'published');
create policy "Public read published partner" on public.cms_home_partner for select using (status = 'published');
create policy "Public read published solution" on public.cms_home_solution for select using (status = 'published');
create policy "Public read published mini slide" on public.cms_home_mini_slide for select using (status = 'published');
create policy "Public read published product banner" on public.cms_product_banner for select using (status = 'published');
create policy "Public read published home product categories" on public.cms_home_product_categories for select using (status = 'published');
create policy "Public read published product categories" on public.cms_product_categories for select using (status = 'published');
create policy "Public read published products" on public.cms_products for select using (status = 'published');
create policy "Public read published posts" on public.cms_posts for select using (status = 'published');
create policy "Public read published forms" on public.cms_forms for select using (status = 'published');
create policy "Public read published technical documents" on public.cms_technical_documents for select using (status = 'published');
create policy "Public read published site information" on public.cms_site_information for select using (status = 'published');
create policy "Public read published menu items" on public.cms_menu_items for select using (status = 'published');
create policy "Public read published about sections" on public.cms_about_page_sections for select using (status = 'published');

drop policy if exists "Authenticated manage hero" on public.cms_home_hero;
drop policy if exists "Authenticated manage partner" on public.cms_home_partner;
drop policy if exists "Authenticated manage solution" on public.cms_home_solution;
drop policy if exists "Authenticated manage mini slide" on public.cms_home_mini_slide;
drop policy if exists "Authenticated manage product banner" on public.cms_product_banner;
drop policy if exists "Authenticated manage home product categories" on public.cms_home_product_categories;
drop policy if exists "Authenticated manage product categories" on public.cms_product_categories;
drop policy if exists "Authenticated manage products" on public.cms_products;
drop policy if exists "Authenticated manage posts" on public.cms_posts;
drop policy if exists "Authenticated manage forms" on public.cms_forms;
drop policy if exists "Authenticated manage form submissions" on public.cms_form_submissions;
drop policy if exists "Authenticated manage technical documents" on public.cms_technical_documents;
drop policy if exists "Authenticated manage site information" on public.cms_site_information;
drop policy if exists "Authenticated manage menu items" on public.cms_menu_items;
drop policy if exists "Authenticated manage about sections" on public.cms_about_page_sections;

create policy "Authenticated manage hero" on public.cms_home_hero for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated manage partner" on public.cms_home_partner for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated manage solution" on public.cms_home_solution for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated manage mini slide" on public.cms_home_mini_slide for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated manage product banner" on public.cms_product_banner for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated manage home product categories" on public.cms_home_product_categories for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated manage product categories" on public.cms_product_categories for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated manage products" on public.cms_products for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated manage posts" on public.cms_posts for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated manage forms" on public.cms_forms for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated manage form submissions" on public.cms_form_submissions for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated manage technical documents" on public.cms_technical_documents for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated manage site information" on public.cms_site_information for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated manage menu items" on public.cms_menu_items for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated manage about sections" on public.cms_about_page_sections for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "Authenticated upload technical documents" on storage.objects;
create policy "Authenticated upload technical documents" on storage.objects
for insert to authenticated
with check (bucket_id = 'cms-technical-documents');

drop policy if exists "Public read technical documents" on storage.objects;
create policy "Public read technical documents" on storage.objects
for select
using (bucket_id = 'cms-technical-documents');

-- Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';
