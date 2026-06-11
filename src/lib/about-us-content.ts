import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AboutUsContent = {
  id: string;
  banner_title: string;
  banner_subtitle: string;
  banner_image_base64: string;
  company_title: string;
  company_description: string;
  company_image_base64: string;
  director_name: string;
  director_role: string;
  director_quote: string;
  director_image_base64: string;
  vision_title: string;
  vision_paragraphs: string[];
  vision_image_base64: string;
  mission_title: string;
  mission_paragraphs: string[];
  mission_image_base64: string;
  award_title: string;
  award_cert_title: string;
  award_paragraphs: string[];
  award_image_base64: string;
};

export const defaultAboutUsContent: AboutUsContent = {
  id: "about-us",
  banner_title: "Giới Thiệu Về ABL",
  banner_subtitle: "Chào Mừng Bạn Đến Với ABL - Mài Mòn Là Tôi, Kết Dính Là Đây",
  banner_image_base64: "",
  company_title: "Công Ty TNHH\nSản Xuất Keo Dán\nVải Nhám Bá Lộc",
  company_description:
    "Công ty TNHH SX Keo dán vải nhám Bá Lộc tọa lạc tại Đường số 10 KCN Hòa Khánh, Phường Liên Chiểu, Thành phố Đà Nẵng. Là doanh nghiệp hoạt động trong lĩnh vực sản xuất các loại keo dán và vải nhám phục vụ cho ngành công nghiệp, dân dụng trong nước và quốc tế.",
  company_image_base64: "",
  director_name: "Nguyễn Thanh Phước",
  director_role: "Giám Đốc",
  director_quote:
    "“Chất lượng ổn định, hiệu quả vượt trội: Đảm bảo tất cả sản phẩm ABL đều được kiểm tra chất lượng, số lượng và quy cách trước khi đưa đến tay người tiêu dùng.”",
  director_image_base64: "",
  vision_title: "Tầm Nhìn",
  vision_paragraphs: [
    "ABL hướng tới trở thành thương hiệu hàng đầu Việt Nam và khu vực Đông Nam Á trong lĩnh vực keo dán công nghiệp và vật liệu mài mòn, không ngừng khẳng định vị thế bằng chất lượng, sáng tạo và uy tín.",
    "Chúng tôi đặt mục tiêu xây dựng hệ sinh thái sản phẩm toàn diện, đáp ứng mọi nhu cầu kết dính và xử lý bề mặt trong sản xuất hiện đại. ABL tin rằng sự đổi mới công nghệ, đầu tư con người và tinh thần hợp tác bền vững sẽ là nền tảng giúp doanh nghiệp Việt vươn tầm quốc tế.",
  ],
  vision_image_base64: "",
  mission_title: "Sứ Mệnh",
  mission_paragraphs: [
    "ABL cam kết đồng hành cùng doanh nghiệp Việt trong hành trình nâng cao năng suất và chất lượng sản xuất, thông qua việc cung cấp những sản phẩm keo dán và vải nhám đạt hiệu quả cao, an toàn và thân thiện với môi trường.",
    "Chúng tôi không ngừng nghiên cứu, cải tiến công thức, đầu tư công nghệ và đào tạo đội ngũ chuyên môn nhằm tạo ra những giá trị thật, thiết thực và bền vững cho khách hàng.",
  ],
  mission_image_base64: "",
  award_title: "Giải Thưởng Của Chúng Tôi",
  award_cert_title: "Chứng Nhận\nKeo 502",
  award_paragraphs: [
    "Giấy chứng nhận Huy chương Vàng và Danh hiệu Hàng Việt Nam Chất lượng cao - Phù hợp tiêu chuẩn được trao cho sản phẩm Keo 502 của Công ty TNHH Bá Lộc (ABL).",
    "Đây là sự ghi nhận cho chất lượng vượt trội, độ an toàn và khả năng đáp ứng tiêu chuẩn kỹ thuật quốc gia của sản phẩm Keo 502 do ABL sản xuất.",
  ],
  award_image_base64: "",
};

function withDefaultArray(value: unknown, fallback: string[]): string[] {
  return Array.isArray(value) ? (value as string[]) : fallback;
}

export function mergeAboutUsContent(
  data: Partial<AboutUsContent> | null,
): AboutUsContent {
  return {
    ...defaultAboutUsContent,
    ...data,
    vision_paragraphs: withDefaultArray(
      data?.vision_paragraphs,
      defaultAboutUsContent.vision_paragraphs,
    ),
    mission_paragraphs: withDefaultArray(
      data?.mission_paragraphs,
      defaultAboutUsContent.mission_paragraphs,
    ),
    award_paragraphs: withDefaultArray(
      data?.award_paragraphs,
      defaultAboutUsContent.award_paragraphs,
    ),
  };
}

export async function getAboutUsContent() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return defaultAboutUsContent;
  }

  const { data } = await supabase
    .from("about_us_content")
    .select("*")
    .eq("id", "about-us")
    .maybeSingle();

  return mergeAboutUsContent(data as Partial<AboutUsContent> | null);
}
