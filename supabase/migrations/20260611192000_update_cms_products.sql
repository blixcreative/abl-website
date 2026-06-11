-- Cập nhật cấu trúc bảng cms_products theo yêu cầu mới
-- Xóa các cột cũ không dùng nữa
alter table public.cms_products drop column if exists main_image_url cascade;
alter table public.cms_products drop column if exists datasheet_url cascade;

-- Thêm các cột JSONB mới (sử dụng default '[]'::jsonb cho an toàn)
alter table public.cms_products add column if not exists images jsonb not null default '[]'::jsonb;
alter table public.cms_products add column if not exists technical_documents jsonb not null default '[]'::jsonb;
alter table public.cms_products add column if not exists details jsonb not null default '[]'::jsonb;
alter table public.cms_products add column if not exists summaries jsonb not null default '[]'::jsonb;
alter table public.cms_products add column if not exists related_products jsonb not null default '[]'::jsonb;

-- Reload schema
NOTIFY pgrst, 'reload schema';