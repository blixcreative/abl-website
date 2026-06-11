export type AdminSectionKey =
  | "homepage"
  | "homeHero"
  | "homePartner"
  | "homeSolution"
  | "homeMiniSlide"
  | "homeProductCategories"
  | "productsGroup"
  | "productBanner"
  | "products"
  | "productCategories"
  | "posts"
  | "forms"
  | "technicalDocuments"
  | "siteInfo"
  | "menus"
  | "about"
  | "about_mini_slides"
  | "about_partners"
  | "about_awards";

export type AdminFieldType =
  | "text"
  | "textarea"
  | "number"
  | "url"
  | "email"
  | "tel"
  | "select"
  | "file"
  | "datetime-local";

export type AdminField = {
  name: string;
  label: string;
  type: AdminFieldType;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  fullWidth?: boolean;
  help?: string;
};

import { Home, Package, FolderTree, FileText, Mails, FileCode2, Settings, Menu, Info, MonitorPlay, Briefcase, Lightbulb, LucideIcon } from "lucide-react";

export type AdminModule = {
  key: AdminSectionKey;
  table: string;
  title: string;
  subtitle: string;
  badge: string;
  icon?: LucideIcon;
  description: string;
  fields: AdminField[];
};

export const adminModules: AdminModule[] = [
  {
    key: "homepage",
    icon: Home,
    table: "homepage_meta",
    title: "Trang chủ",
    subtitle: "Quản lý toàn bộ nội dung hiển thị trên trang chủ",
    badge: "Home",
    description: "Gồm quản lý Hero Banner, Partner Logo và Các Giải Pháp.",
    fields: [], // Dummy module for homepage route grouping
  },
  {
    key: "productsGroup",
    icon: Package,
    table: "dummy_products",
    title: "Sản phẩm",
    subtitle: "Quản lý toàn bộ thông tin sản phẩm và danh mục",
    badge: "Products",
    description: "Gồm quản lý Danh mục sản phẩm và Danh sách sản phẩm.",
    fields: [], // Dummy module for products route grouping
  },
  {
    key: "homeHero",
    icon: MonitorPlay,
    table: "cms_home_hero",
    title: "Hero Banner",
    subtitle: "Quản lý các banner xoay vòng trên cùng trang chủ.",
    badge: "Hero",
    description: "Thêm nhiều dòng để tạo carousel/banner slider trên trang chủ.",
    fields: [
      { name: "title", label: "Tiêu đề", type: "text", required: true, fullWidth: true },
      { name: "subtitle", label: "Nội dung", type: "textarea", fullWidth: true },
      { name: "primary_button_url", label: "Nút (URL)", type: "url" },
      { name: "image_file", label: "Hình ảnh (Upload)", type: "file", fullWidth: true },
    ],
  },
  {
    key: "homePartner",
    icon: Briefcase,
    table: "cms_home_partner",
    title: "Partner Logo",
    subtitle: "Quản lý logo đối tác hiển thị ở trang chủ.",
    badge: "Partner",
    description: "Danh sách logo chạy ngang màn hình.",
    fields: [
      { name: "name", label: "Tên thương hiệu", type: "text", required: true, fullWidth: true },
      { name: "image_file", label: "Hình ảnh (Upload)", type: "file", fullWidth: true },
    ],
  },
  {
    key: "homeSolution",
    icon: Lightbulb,
    table: "cms_home_solution",
    title: "Giải pháp",
    subtitle: "Quản lý các block giải pháp nổi bật.",
    badge: "Solution",
    description: "Danh sách các card giải pháp.",
    fields: [
      { name: "title", label: "Tiêu đề", type: "text", required: true, fullWidth: true },
      { name: "image_file", label: "Hình ảnh (Upload)", type: "file", fullWidth: true },
    ],
  },
  {
    key: "homeMiniSlide",
    icon: MonitorPlay,
    table: "cms_home_mini_slide",
    title: "Mini Slide",
    subtitle: "Quản lý các slide nhỏ trên trang chủ",
    badge: "Mini Slide",
    description: "Danh sách slide thu nhỏ kèm mô tả",
    fields: [
      { name: "title", label: "Tiêu đề", type: "text", required: true, fullWidth: true },
      { name: "description", label: "Mô tả", type: "textarea", fullWidth: true },
      { name: "image_file", label: "Hình ảnh (Upload)", type: "file", fullWidth: true },
    ],
  },
  {
    key: "homeProductCategories",
    icon: Package,
    table: "cms_home_product_categories",
    title: "Danh mục sản phẩm",
    subtitle: "Quản lý danh sách danh mục sản phẩm hiển thị trên trang chủ",
    badge: "Category",
    description: "Danh sách các danh mục sản phẩm kèm hình ảnh và URL.",
    fields: [
      { name: "name", label: "Tên danh mục", type: "text", required: true, fullWidth: true },
      { name: "description", label: "Mô tả", type: "textarea", fullWidth: true },
      { name: "url", label: "URL", type: "url", fullWidth: true },
      { name: "image_file", label: "Hình ảnh (Upload)", type: "file", fullWidth: true },
    ],
  },
  {
    key: "productBanner",
    icon: MonitorPlay,
    table: "cms_product_banner",
    title: "Product Banner",
    subtitle: "Quản lý banner nổi bật cho trang Sản phẩm.",
    badge: "Banner",
    description: "Thêm nhiều dòng để tạo carousel/banner slider trên đầu trang Sản phẩm.",
    fields: [
      { name: "title", label: "Tiêu đề", type: "text", required: true, fullWidth: true },
      { name: "subtitle", label: "Nội dung", type: "textarea", fullWidth: true },
      { name: "primary_button_url", label: "Nút (URL)", type: "url" },
      { name: "image_file", label: "Hình ảnh (Upload)", type: "file", fullWidth: true },
    ],
  },
  {
    key: "products",
    icon: Package,
    table: "cms_products",
    title: "Sản phẩm",
    subtitle: "Quản lý catalog sản phẩm, thông số, ảnh và tài liệu liên quan.",
    badge: "Catalog",
    description:
      "Thông tin sản phẩm được tách cột rõ ràng: mã, tên, danh mục, giá, thông số kỹ thuật, trạng thái.",
    fields: [
      { name: "sku", label: "SKU", type: "text", required: true },
      { name: "name", label: "Tên sản phẩm", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "category_id", label: "ID danh mục", type: "text", help: "Liên kết tới cms_product_categories.id" },
      { name: "short_description", label: "Mô tả ngắn", type: "textarea", fullWidth: true },
      { name: "description", label: "Mô tả chi tiết", type: "textarea", fullWidth: true },
      { name: "features", label: "Tính năng nổi bật", type: "textarea", fullWidth: true },
      { name: "specifications", label: "Thông số kỹ thuật", type: "textarea", fullWidth: true },
      { name: "price", label: "Giá", type: "number" },
      { name: "unit", label: "Đơn vị", type: "text", placeholder: "cái / bộ / hộp" },
      { name: "images", label: "Hình ảnh", type: "text", fullWidth: true },
      { name: "is_featured", label: "Nổi bật", type: "select", options: ["false", "true"] },
    ],
  },
  {
    key: "productCategories",
    icon: FolderTree,
    table: "cms_product_categories",
    title: "Danh mục sản phẩm",
    subtitle: "Quản lý các danh mục sản phẩm.",
    badge: "Danh mục",
    description:
      "Danh sách các danh mục sản phẩm.",
    fields: [
      { name: "name", label: "Tiêu đề", type: "text", required: true, fullWidth: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "parent_id", label: "Danh mục cha", type: "text", help: "Nếu để trống, đây sẽ là mục cha (Level 0). Nếu chọn, sẽ là mục con (Level 1)." },
      { name: "description", label: "Mô tả", type: "textarea", fullWidth: true },
      { name: "image_file", label: "Hình ảnh (Upload)", type: "file", fullWidth: true },
    ],
  },
  {
    key: "posts",
    icon: FileText,
    table: "cms_posts",
    title: "Bài viết",
    subtitle: "Tin tức, kiến thức, case study và bài SEO.",
    badge: "Blog",
    description:
      "Bài viết có metadata SEO, ảnh đại diện, chuyên mục và lịch xuất bản riêng.",
    fields: [
      { name: "title", label: "Tiêu đề", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "excerpt", label: "Tóm tắt", type: "textarea", fullWidth: true },
      { name: "content", label: "Nội dung", type: "textarea", fullWidth: true },
      { name: "category", label: "Chuyên mục", type: "text" },
      { name: "author_name", label: "Tác giả", type: "text" },
      { name: "cover_image_url", label: "Ảnh đại diện", type: "url", fullWidth: true },
      { name: "seo_title", label: "SEO title", type: "text" },
      { name: "seo_description", label: "SEO description", type: "textarea", fullWidth: true },
      { name: "published_at", label: "Ngày xuất bản", type: "datetime-local" },
    ],
  },
  {
    key: "forms",
    icon: Mails,
    table: "cms_forms",
    title: "Form",
    subtitle: "Form liên hệ, báo giá, tư vấn và tuyển dụng.",
    badge: "Lead",
    description:
      "Định nghĩa form và cấu hình điểm nhận dữ liệu/notification ở từng cột.",
    fields: [
      { name: "form_key", label: "Mã form", type: "text", required: true },
      { name: "name", label: "Tên form", type: "text", required: true },
      { name: "description", label: "Mô tả", type: "textarea", fullWidth: true },
      { name: "submit_button_label", label: "Nhãn nút gửi", type: "text" },
      { name: "success_message", label: "Thông báo thành công", type: "textarea", fullWidth: true },
      { name: "recipient_email", label: "Email nhận", type: "email" },
      { name: "fields_schema", label: "Schema trường nhập", type: "textarea", fullWidth: true, help: "JSON mô tả các field của form." },
    ],
  },
  {
    key: "technicalDocuments",
    icon: FileCode2,
    table: "cms_technical_documents",
    title: "Tài liệu kỹ thuật",
    subtitle: "Upload và lưu trữ datasheet, catalogue, hướng dẫn sử dụng.",
    badge: "Files",
    description:
      "File được lưu trên Supabase Storage, metadata file được lưu vào bảng tài liệu kỹ thuật.",
    fields: [
      { name: "title", label: "Tên tài liệu", type: "text", required: true },
      { name: "document_code", label: "Mã tài liệu", type: "text", required: true },
      { name: "document_type", label: "Loại tài liệu", type: "select", options: ["datasheet", "catalogue", "manual", "certificate", "drawing", "other"], required: true },
      { name: "related_product_id", label: "ID sản phẩm liên quan", type: "text" },
      { name: "version", label: "Phiên bản", type: "text" },
      { name: "language", label: "Ngôn ngữ", type: "text", placeholder: "vi / en" },
      { name: "file_url", label: "Upload file / File URL", type: "file", fullWidth: true, help: "Khi kết nối Supabase Storage, file được đưa vào bucket cms-technical-documents." },
      { name: "file_size", label: "Dung lượng byte", type: "number" },
      { name: "mime_type", label: "MIME type", type: "text" },
    ],
  },
  {
    key: "siteInfo",
    icon: Settings,
    table: "cms_site_information",
    title: "Thông tin website",
    subtitle: "Tên website, công ty, địa chỉ, điện thoại và kênh liên hệ.",
    badge: "Cấu hình",
    description:
      "Thông tin nhận diện website được lưu thành một bản ghi cấu hình có cột riêng.",
    fields: [
      { name: "site_name", label: "Tên website", type: "text", required: true },
      { name: "company_name", label: "Tên công ty", type: "text", required: true },
      { name: "address", label: "Địa chỉ liên hệ", type: "textarea", required: true, fullWidth: true },
      { name: "phone", label: "Số điện thoại", type: "tel", required: true },
      { name: "email", label: "Email", type: "email" },
      { name: "tax_code", label: "Mã số thuế", type: "text" },
      { name: "working_hours", label: "Giờ làm việc", type: "text" },
      { name: "facebook_url", label: "Facebook", type: "url" },
      { name: "youtube_url", label: "YouTube", type: "url" },
      { name: "linkedin_url", label: "LinkedIn", type: "url" },
    ],
  },
  {
    key: "menus",
    icon: Menu,
    table: "cms_menu_items",
    title: "Menu header/footer",
    subtitle: "Quản lý navigation chính, footer và liên kết phụ.",
    badge: "Menu",
    description:
      "Mỗi item menu có vị trí, nhãn, link, parent_id và thứ tự riêng biệt.",
    fields: [
      { name: "menu_location", label: "Vị trí menu", type: "select", options: ["header", "footer", "footer-products", "footer-company", "footer-support"], required: true },
      { name: "label", label: "Nhãn hiển thị", type: "text", required: true },
      { name: "url", label: "Đường dẫn", type: "url", required: true },
      { name: "parent_id", label: "ID menu cha", type: "text" },
      { name: "target", label: "Target", type: "select", options: ["_self", "_blank"], required: true },
    ],
  },
  {
    key: "about",
    icon: Info,
    table: "cms_about_page_sections",
    title: "Nội dung trang giới thiệu",
    subtitle: "Lịch sử, tầm nhìn, giá trị, đội ngũ và năng lực.",
    badge: "Giới thiệu",
    description:
      "Trang giới thiệu được chia section để dễ tái sử dụng và sắp xếp.",
    fields: [
      { name: "section_key", label: "Mã section", type: "text", required: true },
      { name: "section_type", label: "Loại section", type: "select", options: ["hero", "story", "mission", "vision", "values", "team", "capability", "cta", "custom"], required: true },
      { name: "eyebrow", label: "Nhãn nhỏ", type: "text" },
      { name: "title", label: "Tiêu đề", type: "text", required: true, fullWidth: true },
      { name: "subtitle", label: "Mô tả ngắn", type: "textarea", fullWidth: true },
      { name: "body", label: "Nội dung", type: "textarea", fullWidth: true },
      { name: "image_url", label: "Ảnh", type: "url", fullWidth: true },
    ],
  },
];

export const dashboardStats = [
  { label: "Module quản trị", value: adminModules.length.toString() },
  { label: "Bảng Supabase mới", value: "10" },
  { label: "Storage bucket", value: "1" },
  { label: "Không phụ thuộc UI cũ", value: "100%" },
];

export function getDefaultValue(field: AdminField) {
  if (field.name === "target") return "_self";
  if (field.name === "sort_order") return "1";
  if (field.name === "is_featured") return "false";
  return "";
}
