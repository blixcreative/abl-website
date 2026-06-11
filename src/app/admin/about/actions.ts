"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

async function normalizeFile(value: FormDataEntryValue | null): Promise<string | undefined> {
  if (value instanceof File) {
    if (value.size > 0) {
      const buffer = await value.arrayBuffer();
      const base64String = Buffer.from(buffer).toString("base64");
      return `data:${value.type};base64,${base64String}`;
    }
    return undefined; // No new file selected
  }
  return value ? value.toString() : undefined;
}

export async function updateAboutBanner(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) throw new Error("Unauthorized");

  const id = formData.get("id")?.toString();
  const title = formData.get("title")?.toString() || "";
  const description = formData.get("description")?.toString() || "";
  
  const payload: any = { title, description };
  const imageBase64 = await normalizeFile(formData.get("image_url"));
  if (imageBase64) payload.image_url = imageBase64;
  
  if (id) {
    await supabase.from("cms_about_banner").update(payload).eq("id", id);
  } else {
    payload.status = "published";
    await supabase.from("cms_about_banner").insert(payload);
  }
  revalidatePath("/admin/about");
}

export async function updateAboutDirector(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) throw new Error("Unauthorized");

  const id = formData.get("id")?.toString();
  const name = formData.get("name")?.toString() || "";
  const quote = formData.get("quote")?.toString() || "";
  
  const payload: any = { name, quote };
  const imageBase64 = await normalizeFile(formData.get("image_url"));
  if (imageBase64) payload.image_url = imageBase64;
  
  if (id) {
    await supabase.from("cms_about_director").update(payload).eq("id", id);
  } else {
    payload.status = "published";
    await supabase.from("cms_about_director").insert(payload);
  }
  revalidatePath("/admin/about");
}

export async function updateAboutVisionMission(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) throw new Error("Unauthorized");

  const id = formData.get("id")?.toString();
  const vision_text = formData.get("vision_text")?.toString() || "";
  const mission_text = formData.get("mission_text")?.toString() || "";
  
  const payload: any = { vision_text, mission_text };
  
  const visionImgBase64 = await normalizeFile(formData.get("vision_image_url"));
  if (visionImgBase64) payload.vision_image_url = visionImgBase64;
  
  const missionImgBase64 = await normalizeFile(formData.get("mission_image_url"));
  if (missionImgBase64) payload.mission_image_url = missionImgBase64;
  
  if (id) {
    await supabase.from("cms_about_vision_mission").update(payload).eq("id", id);
  } else {
    payload.status = "published";
    await supabase.from("cms_about_vision_mission").insert(payload);
  }
  revalidatePath("/admin/about");
}

