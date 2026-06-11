"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function saveProduct(id: string | null, data: any) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    throw new Error("Lỗi cấu hình Supabase.");
  }

  const payload = { ...data };
  // Generate slug if not present
  if (!payload.slug && typeof payload.name === "string") {
    payload.slug = payload.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  }

  if (id && id !== "new") {
    const { error } = await supabase.from("cms_products").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    // default status
    payload.status = payload.status || "published";
    const { error } = await supabase.from("cms_products").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath("/products");
  revalidatePath("/");
}