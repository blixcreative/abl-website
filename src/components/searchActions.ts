"use server"

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function searchProducts(searchTerm: string) {
  if (!searchTerm || searchTerm.length < 2) return [];

  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("cms_products")
    .select("id, name")
    .eq("status", "published")
    .ilike("name", `%${searchTerm}%`)
    .limit(5);

  return data || [];
}