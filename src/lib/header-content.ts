import { createSupabaseServerClient } from "@/lib/supabase/server";

export type HeaderNavigationItem = {
  title: string;
  url: string;
};

export type HeaderContent = {
  id: string;
  logo_1_base64: string;
  logo_2_base64: string;
  title: string;
  phone: string;
  navigation: HeaderNavigationItem[];
};

export const defaultHeaderContent: HeaderContent = {
  id: "header",
  logo_1_base64: "",
  logo_2_base64: "",
  title: "Adhesive & Industrial\nAbrasive Cloth",
  phone: "+84 914 212 791",
  navigation: [
    {
      title: "Trang Chủ",
      url: "/",
    },
    {
      title: "Sản Phẩm",
      url: "/products",
    },
    {
      title: "Giới thiệu",
      url: "/about-us",
    },
    {
      title: "Tài Liệu Kỹ Thuật",
      url: "#",
    },
    {
      title: "Giải Pháp & Ứng Dụng",
      url: "#",
    },
    {
      title: "Tin Tức & Bài Viết",
      url: "/news",
    },
    {
      title: "Liên hệ",
      url: "#",
    },
  ],
};

function withDefaultNavigation(
  value: unknown,
  fallback: HeaderNavigationItem[],
) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const navigation = value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const record = item as Record<string, unknown>;
      const title = String(record.title ?? "").trim();
      const url = String(record.url ?? "").trim();

      if (!title) {
        return null;
      }

      return {
        title,
        url: url || "#",
      };
    })
    .filter(Boolean) as HeaderNavigationItem[];

  return navigation.length ? navigation : fallback;
}

export function mergeHeaderContent(
  data: Partial<HeaderContent> | null,
): HeaderContent {
  return {
    ...defaultHeaderContent,
    ...data,
    navigation: withDefaultNavigation(
      data?.navigation,
      defaultHeaderContent.navigation,
    ),
  };
}

export async function getHeaderContent() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return defaultHeaderContent;
  }

  const { data } = await supabase
    .from("header_content")
    .select("*")
    .eq("id", "header")
    .maybeSingle();

  return mergeHeaderContent(data as Partial<HeaderContent> | null);
}