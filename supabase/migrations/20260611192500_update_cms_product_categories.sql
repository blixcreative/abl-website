-- Thêm cấu trúc cho danh mục sản phẩm (level, parent_id, slug)

alter table "public"."cms_product_categories"
add column if not exists "slug" text,
add column if not exists "level" integer default 0,
add column if not exists "parent_id" uuid references public.cms_product_categories(id) on delete set null;

-- Tự động tạo slug nếu rỗng cho migration hiện tại (nếu cần)
update "public"."cms_product_categories"
set slug = lower(regexp_replace(name, '[^a-zA-Z0-9]+', '-', 'g'))
where slug is null;