import { createSupabaseServerClient } from "@/lib/supabase/server";

export type DbPost = {
  id?: string;
  day: string;
  month: string;
  year: string;
  title: string;
  excerpt: string;
  image_base64: string;
};

export type NewsConfig = {
  id: string;
  banner_title: string;
  banner_image_base64: string;
  tabs: string[];
  highlight_title: string;
  highlight_description: string;
  highlight_image_base64: string;
};

export const defaultNewsConfig: NewsConfig = {
  id: "news_config",
  banner_title: "Tin Tức & Bài Viết",
  banner_image_base64: "",
  tabs: ["Tin Tức & Bài Viết", "Sự Kiện", "Khuyến Mãi"],
  highlight_title:
    "ABL Đã Vượt Qua Cột Mốc Sản Xuất Mới – Khẳng Định Vị Thế Dẫn Đầu Ngành Keo Dán & Vải Nhám Việt Nam",
  highlight_description:
    "Công ty TNHH SX Keo dán vải nhám Bá Lộc tọa lạc tại Đường số 10 KCN Hòa Khánh, quận Liên Chiểu, TP Đà Nẵng, là doanh nghiệp hoạt động trong lĩnh vực sản xuất các loại keo dán công nghiệp và vải nhám phục vụ cho ngành công nghiệp và dân dụng trong nước và xuất khẩu.",
  highlight_image_base64: "",
};

export const defaultPosts: DbPost[] = [
  {
    day: "24",
    month: "Tháng 4",
    year: "2025",
    title: "08 Phương Pháp Kiểm Tra Độ Kết Dính Keo Dán Gỗ",
    excerpt:
      "Đánh giá đặc tính hóa học, vật lý hay các đặc trưng khác của keo dán giúp dự đoán hiệu quả và độ tin cậy của một liên kết keo dán.",
    image_base64: "",
  },
  {
    day: "22",
    month: "Tháng 4",
    year: "2025",
    title: "Ứng Dụng Cụ Thể Của Các Loại Giấy Nhám",
    excerpt:
      "Hiện nay trên thị trường có nhiều loại giấy nhám với các bước nhám khác nhau từ P60 đến P2500 và với hình dạng, kích thước, tính năng khô hoặc...",
    image_base64: "",
  },
  {
    day: "19",
    month: "Tháng 4",
    year: "2025",
    title: "03 Loại Keo Dán Gỗ Thuần Tuý",
    excerpt:
      "Keo dán gỗ thuần tuý được xác định theo nhiều cách khác nhau như thành phần hóa học, các yêu cầu xử lý...",
    image_base64: "",
  },
  {
    day: "16",
    month: "Tháng 4",
    year: "2025",
    title: "An Toàn Cho Người Tiếp Xúc Keo 502",
    excerpt:
      "Đánh giá đặc tính hóa học, vật lý hay các đặc trưng khác của keo dán giúp dự đoán hiệu quả và độ tin cậy của một liên kết keo dán.",
    image_base64: "",
  },
];

function withDefaultArray(value: unknown, fallback: string[]): string[] {
  return Array.isArray(value) ? (value as string[]) : fallback;
}

export function mergeNewsConfig(
  data: Partial<NewsConfig> | null,
): NewsConfig {
  return {
    ...defaultNewsConfig,
    ...data,
    tabs: withDefaultArray(data?.tabs, defaultNewsConfig.tabs),
  };
}

export async function getNewsConfig() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return defaultNewsConfig;
  }

  const { data } = await supabase
    .from("news_content")
    .select("*")
    .eq("id", "news_config")
    .maybeSingle();

  return mergeNewsConfig(data as Partial<NewsConfig> | null);
}

export async function getPostsList(): Promise<DbPost[]> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return defaultPosts;
  }

  const { data } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (!data || data.length === 0) {
    return defaultPosts;
  }

  return data as DbPost[];
}
