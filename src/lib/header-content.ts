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
      url: "/technical-docs",
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
      url: "/contact-us",
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
      let url = String(record.url ?? "").trim();

      if (!title) {
        return null;
      }

      if (url && url !== "#" && !url.startsWith("/") && !url.startsWith("http")) {
        url = "/" + url;
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

  const finalData = mergeHeaderContent(data as Partial<HeaderContent> | null);

  // Fetch Site Information
  const { data: siteInfo } = await supabase
    .from("cms_site_information")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (siteInfo) {
    if (siteInfo.phone) {
      finalData.phone = siteInfo.phone;
    }
    if (siteInfo.site_name) {
      finalData.title = siteInfo.site_name;
    }
  }

  // Fetch Menu Items (Header)
  const { data: menuItems } = await supabase
    .from("cms_menu_items")
    .select("*")
    .eq("menu_location", "header")
    .order("sort_order", { ascending: true, nullsFirst: false });

  if (menuItems && menuItems.length > 0) {
    finalData.navigation = menuItems.map(item => {
      let url = item.url || "#";
      if (url && url !== "#" && !url.startsWith("/") && !url.startsWith("http")) {
        url = "/" + url;
      }
      return {
        title: item.label,
        url: url,
      };
    });
  }

  return finalData;
}
