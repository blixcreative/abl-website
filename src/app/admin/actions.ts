"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { promises as fs } from "fs";
import path from "path";

const tableAllowList = new Set([
  "cms_home_hero",
  "cms_home_partner",
  "cms_home_solution",
  "cms_home_mini_slide",
  "cms_product_banner",
  "cms_home_product_categories",
  "cms_products",
  "cms_product_categories",
  "cms_posts",
  "cms_forms",
  "cms_technical_documents",
  "cms_site_information",
  "cms_menu_items",
  "cms_about_page_sections",
  "cms_about_mini_slide",
  "cms_about_partner",
  "cms_about_award",
]);

async function normalizeValue(value: FormDataEntryValue) {
  if (value instanceof File) {
    return value;
  }

  const trimmed = value.trim();

  if (trimmed === "") {
    return null;
  }

  if (trimmed === "true") {
    return true;
  }

  if (trimmed === "false") {
    return false;
  }

  return trimmed;
}

export async function createCmsRecord(table: string, formData: FormData) {
  if (!tableAllowList.has(table)) {
    throw new Error("Bảng dữ liệu không hợp lệ.");
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    throw new Error(
      "Chưa cấu hình NEXT_PUBLIC_SUPABASE_URL hoặc NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }

  const payload: Record<string, string | boolean | number | null> = {};

  for (const [key, value] of formData.entries()) {
    if (key.startsWith("$ACTION_")) {
      continue;
    }

    const normalized = await normalizeValue(value);

    if (normalized instanceof File) {
      if (normalized.size > 0) {
        const fileExt = normalized.name.split(".").pop() || "";
        const originalName = normalized.name.replace(`.${fileExt}`, "");
        // Clean original name to be safe for filesystem
        const safeOriginalName = originalName.replace(/[^a-zA-Z0-9_-]/g, "-").substring(0, 30);
        const fileName = `${safeOriginalName}-${Date.now()}.${fileExt}`;
        const buffer = await normalized.arrayBuffer();
        
        // Define path to save in public/uploads folder
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        
        // Ensure directory exists
        try {
          await fs.access(uploadDir);
        } catch {
          await fs.mkdir(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, fileName);
        
        // Write the file to disk
        await fs.writeFile(filePath, Buffer.from(buffer));
        
        // Use relative URL from public root
        const publicUrl = `/uploads/${fileName}`;

        // Assign the url to the payload based on whether it is a file URL or image field
        if (table === "cms_technical_documents" && key === "file_url") {
          payload[key] = publicUrl;
          payload["file_size"] = normalized.size;
          payload["mime_type"] = normalized.type;
        } else {
          // Store the path to the file rather than base64
          payload[key] = publicUrl;
        }
      }
    } else if (normalized !== undefined) {
      if (key === "file_url" && typeof normalized === "string" && normalized.startsWith("http")) {
        // If a file URL was manually typed in instead of a file upload, use that
        payload[key] = normalized;
      } else {
        payload[key] = normalized as string | boolean | number | null;
      }
    }
  }

  // Auto-generate slug if missing on products
  if (table === 'cms_products' && !payload.slug && typeof payload.name === 'string') {
    payload.slug = payload.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }
  // Auto-generate slug if missing on posts
  if (table === 'cms_posts' && !payload.slug && typeof payload.title === 'string') {
    payload.slug = payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }

  // Auto assign level based on parent_id for product categories
  if (table === 'cms_product_categories') {
    if (payload.parent_id) {
      payload.level = 1;
    } else {
      payload.level = 0;
    }
  }

  // Auto-generate document_code if missing on technical documents to prevent unique constraint errors
  if (table === "cms_technical_documents" && !payload.document_code && typeof payload.title === "string") {
    // Generate a unique code like DOC-1234567890
    payload.document_code = `DOC-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }

  // Luôn luôn đặt trạng thái là published theo yêu cầu
  payload.status = "published";

  const { error } = await supabase.from(table).insert(payload);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function updateCmsRecord(table: string, id: string | number, formData: FormData) {
  if (!tableAllowList.has(table)) {
    throw new Error("Bảng dữ liệu không hợp lệ.");
  }

  if (!id) {
    throw new Error("Không tìm thấy ID bản ghi cần cập nhật.");
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    throw new Error(
      "Chưa cấu hình NEXT_PUBLIC_SUPABASE_URL hoặc NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }

  const payload: Record<string, string | boolean | number | null> = {};

  for (const [key, value] of formData.entries()) {
    if (key.startsWith("$ACTION_") || key === "id") {
      continue;
    }

    const normalized = await normalizeValue(value);

    if (normalized instanceof File) {
      if (normalized.size > 0) {
        const fileExt = normalized.name.split(".").pop() || "";
        const originalName = normalized.name.replace(`.${fileExt}`, "");
        // Clean original name to be safe for filesystem
        const safeOriginalName = originalName.replace(/[^a-zA-Z0-9_-]/g, "-").substring(0, 30);
        const fileName = `${safeOriginalName}-${Date.now()}.${fileExt}`;
        const buffer = await normalized.arrayBuffer();
        
        // Define path to save in public/uploads folder
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        
        // Ensure directory exists
        try {
          await fs.access(uploadDir);
        } catch {
          await fs.mkdir(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, fileName);
        
        // Write the file to disk
        await fs.writeFile(filePath, Buffer.from(buffer));
        
        // Use relative URL from public root
        const publicUrl = `/uploads/${fileName}`;

        if (table === "cms_technical_documents" && key === "file_url") {
          payload[key] = publicUrl;
          payload["file_size"] = normalized.size;
          payload["mime_type"] = normalized.type;
        } else {
          // Store the path to the file rather than base64
          payload[key] = publicUrl;
        }
      }
    } else if (normalized !== undefined) {
      if (key === "file_url" && typeof normalized === "string" && normalized.startsWith("http")) {
        // If a file URL was manually typed in instead of a file upload, use that
        payload[key] = normalized;
      } else {
        payload[key] = normalized as string | boolean | number | null;
      }
    }
  }

  // Auto-generate slug if missing on products
  if (table === 'cms_products' && !payload.slug && typeof payload.name === 'string') {
    payload.slug = payload.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }
  // Auto-generate slug if missing on posts
  if (table === 'cms_posts' && !payload.slug && typeof payload.title === 'string') {
    payload.slug = payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }

  // Auto assign level based on parent_id for product categories
  if (table === 'cms_product_categories') {
    if (payload.parent_id) {
      payload.level = 1;
    } else {
      payload.level = 0;
      payload.parent_id = null; // Ensure parent_id is strictly null if empty
    }
  }

  // Auto-generate document_code if missing on technical documents to prevent unique constraint errors
  if (table === "cms_technical_documents" && !payload.document_code && typeof payload.title === "string") {
    payload.document_code = `DOC-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }

  // Luôn luôn đặt trạng thái là published
  payload.status = "published";

  const { error } = await supabase.from(table).update(payload).eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function updateCmsRecordsOrder(table: string, ids: (string | number)[]) {
  if (!tableAllowList.has(table)) {
    throw new Error("Bảng dữ liệu không hợp lệ.");
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    throw new Error("Lỗi cấu hình Supabase.");
  }

  // Optimize by sending bulk update if possible, or iterative update
  const promises = ids.map((id, index) => {
    return supabase
      .from(table)
      .update({ sort_order: index + 1 })
      .eq("id", id);
  });

  const results = await Promise.all(promises);
  
  const hasError = results.find((r) => r.error);
  if (hasError) {
    throw new Error(hasError.error?.message || "Lỗi cập nhật thứ tự.");
  }

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function deleteCmsRecord(table: string, id: string | number) {
  if (!tableAllowList.has(table)) {
    throw new Error("Bảng dữ liệu không hợp lệ.");
  }

  if (!id) {
    throw new Error("Không tìm thấy ID bản ghi cần xóa.");
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    throw new Error(
      "Chưa cấu hình NEXT_PUBLIC_SUPABASE_URL hoặc NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }

  const { error } = await supabase.from(table).delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath("/");
}
