import { createSupabaseServerClient } from "@/lib/supabase/server";

export type HomepageProduct = {
  name: string;
  description: string;
  image_base64: string;
};

export type HomepagePost = {
  day: string;
  month: string;
  year: string;
  title: string;
  excerpt: string;
};

export type HomepageContactField = {
  label: string;
  placeholder: string;
};

export type HomepagePartner = {
  name: string;
  logo_base64: string;
};

export type HomepageApplication = {
  title: string;
  image_base64: string;
};

export type HomepageHeroSlide = {
  title: string;
  description: string;
  image_base64: string;
};

export type HomepageSafetySlide = {
  title: string;
  description: string;
  image_base64: string;
};

export type HomepageContent = {
  id: string;
  hero_title: string;
  hero_subtitle: string;
  hero_slides: HomepageHeroSlide[];
  partners_title: string;
  partners: HomepagePartner[];
  applications_title: string;
  applications: HomepageApplication[];
  products_title: string;
  products: HomepageProduct[];
  products_cta_label: string;
  safety_title: string;
  safety_description: string;
  safety_slides: HomepageSafetySlide[];
  news_title: string;
  news_tabs: string[];
  posts: HomepagePost[];
  contact_title: string;
  contact_fields: HomepageContactField[];
  contact_message_label: string;
  contact_message_placeholder: string;
  contact_button_label: string;
};

export const defaultHomepageContent: HomepageContent = {
  id: "homepage",
  hero_title: "Vững Kết Nối\nChuẩn Chất Lượng",
  hero_subtitle:
    "Keo dán và vải nhám công nghiệp đạt chuẩn quốc tế, đồng hành cùng sản xuất bền vững.",
  hero_slides: [
    {
      title: "Vững Kết Nối\nChuẩn Chất Lượng",
      description:
        "Keo dán và vải nhám công nghiệp đạt chuẩn quốc tế, đồng hành cùng sản xuất bền vững.",
      image_base64: "",
    },
    {
      title: "Giải Pháp Công Nghiệp\nCho Sản Xuất Bền Vững",
      description:
        "Tối ưu quy trình, tăng hiệu suất và đảm bảo chất lượng cho từng ngành ứng dụng.",
      image_base64: "",
    },
  ],
  partners_title: "Đối Tác Của Chúng Tôi",
  partners: [
    { name: "VIET’S POWER", logo_base64: "" },
    { name: "DFP", logo_base64: "" },
    { name: "FOREXCO", logo_base64: "" },
    { name: "NFC NAFOCO", logo_base64: "" },
    { name: "SHC", logo_base64: "" },
  ],
  applications_title: "Giải Pháp & Ứng Dụng",
  applications: [
    { title: "Ngành Chế Biến Gỗ", image_base64: "" },
    { title: "Ngành Veneer", image_base64: "" },
    { title: "Ngành Bao Bì Giấy & Mây Tre Lá", image_base64: "" },
    { title: "Ngành Cơ Khí & Kim Loại", image_base64: "" },
    { title: "Ngành Thủ Công Mỹ Nghệ", image_base64: "" },
  ],
  products_title: "Sản Phẩm",
  products: [
    {
      name: "KEO SỮA",
      description: "Kết dính bền cho ngành gỗ - veneer",
      image_base64: "",
    },
    {
      name: "KEO 502",
      description: "Kết dính nhanh, bền chắc mọi bề mặt",
      image_base64: "",
    },
    {
      name: "VẢI NHÁM",
      description: "Giải pháp mài mịn, hoàn thiện bề mặt gỗ",
      image_base64: "",
    },
    {
      name: "KEO XỬ LÝ KHUYẾT TẬT GỖ",
      description: "Lấp đầy, phục hồi và hoàn thiện bề mặt gỗ",
      image_base64: "",
    },
    {
      name: "KEO EPOXY",
      description: "Liên kết siêu bền cho kim loại và đá",
      image_base64: "",
    },
    {
      name: "CHẤT ĐÓNG RẮN",
      description: "Tăng cường độ bền và khả năng kết dính",
      image_base64: "",
    },
  ],
  products_cta_label: "Tất Cả Sản Phẩm",
  safety_title: "Đảm Bảo An Toàn Lao Động",
  safety_description:
    "Các giải pháp của chúng tôi giúp đơn giản hóa quá trình sản xuất. Vì vậy, khi áp dụng danh mục công nghệ đa dạng và gần 20 năm kinh nghiệm vào việc giải quyết các thách thức của khách hàng, chúng tôi có thể nâng cao hiệu quả, hiệu suất, tuổi thọ và độ an toàn cho toàn ngành.",
  safety_slides: [
    {
      title: "Đảm Bảo An Toàn Lao Động",
      description:
        "Các giải pháp của chúng tôi giúp đơn giản hóa quá trình sản xuất. Vì vậy, khi áp dụng danh mục công nghệ đa dạng và gần 20 năm kinh nghiệm vào việc giải quyết các thách thức của khách hàng, chúng tôi có thể nâng cao hiệu quả, hiệu suất, tuổi thọ và độ an toàn cho toàn ngành.",
      image_base64: "",
    },
    {
      title: "Quy Trình Sản Xuất An Toàn",
      description:
        "Tư vấn giải pháp phù hợp để giảm rủi ro vận hành, bảo vệ người lao động và nâng cao hiệu quả sản xuất.",
      image_base64: "",
    },
  ],
  news_title: "Tin Tức & Bài Viết",
  news_tabs: ["Tin Tức", "Sự Kiện", "Khuyến Mãi"],
  posts: [
    {
      day: "24",
      month: "Tháng 4",
      year: "2025",
      title: "08 Phương Pháp Kiểm Tra Độ Kết Dính Keo Dán Gỗ",
      excerpt:
        "Đánh giá đặc tính hóa học, vật lý hay các đặc trưng khác của keo dán giúp dự đoán hiệu quả và độ tin cậy của một liên kết keo dán.",
    },
    {
      day: "22",
      month: "Tháng 4",
      year: "2025",
      title: "Ứng Dụng Cụ Thể Của Các Loại Giấy Nhám",
      excerpt:
        "Đánh giá đặc tính hóa học, vật lý hay các đặc trưng khác của keo dán giúp dự đoán hiệu quả và độ tin cậy của một liên kết keo dán.",
    },
    {
      day: "19",
      month: "Tháng 4",
      year: "2025",
      title: "03 Loại Keo Dán Gỗ Thuần Tuý",
      excerpt:
        "Đánh giá đặc tính hóa học, vật lý hay các đặc trưng khác của keo dán giúp dự đoán hiệu quả và độ tin cậy của một liên kết keo dán.",
    },
    {
      day: "16",
      month: "Tháng 4",
      year: "2025",
      title: "An Toàn Cho Người Tiếp Xúc Keo 502",
      excerpt:
        "Đánh giá đặc tính hóa học, vật lý hay các đặc trưng khác của keo dán giúp dự đoán hiệu quả và độ tin cậy của một liên kết keo dán.",
    },
    {
      day: "15",
      month: "Tháng 4",
      year: "2025",
      title: "Keo Dán Gỗ, Không Thể Thiếu Trong Ngành Gỗ",
      excerpt:
        "Đánh giá đặc tính hóa học, vật lý hay các đặc trưng khác của keo dán giúp dự đoán hiệu quả và độ tin cậy của một liên kết keo dán.",
    },
    {
      day: "12",
      month: "Tháng 4",
      year: "2025",
      title: "Ứng Dụng Của Keo Epoxy, Bạn Biết Chưa?",
      excerpt:
        "Đánh giá đặc tính hóa học, vật lý hay các đặc trưng khác của keo dán giúp dự đoán hiệu quả và độ tin cậy của một liên kết keo dán.",
    },
  ],
  contact_title: "Liên Hệ Với Chúng Tôi Để Nhận Tư Vấn",
  contact_fields: [
    {
      label: "Họ tên",
      placeholder: "Nhập họ tên của bạn",
    },
    {
      label: "Số điện thoại",
      placeholder: "Nhập số điện thoại của bạn",
    },
    {
      label: "Email",
      placeholder: "Nhập email liên hệ",
    },
  ],
  contact_message_label: "Nội dung liên hệ",
  contact_message_placeholder: "Nhập những vấn đề bạn cần chúng tôi giải đáp",
  contact_button_label: "Liên Hệ Với Chúng Tôi",
};

function withDefaultArray<T>(value: unknown, fallback: T[]) {
  return Array.isArray(value) ? (value as T[]) : fallback;
}

function normalizeApplications(value: unknown): HomepageApplication[] {
  if (!Array.isArray(value)) {
    return defaultHomepageContent.applications;
  }

  const applications = value
    .map((application) => {
      if (typeof application === "string") {
        return {
          title: application.trim(),
          image_base64: "",
        };
      }

      if (application && typeof application === "object") {
        const item = application as Partial<HomepageApplication>;

        return {
          title: String(item.title ?? "").trim(),
          image_base64: String(item.image_base64 ?? "").trim(),
        };
      }

      return {
        title: "",
        image_base64: "",
      };
    })
    .filter((application) => application.title || application.image_base64);

  return applications.length
    ? applications
    : defaultHomepageContent.applications;
}

function normalizeProducts(value: unknown): HomepageProduct[] {
  if (!Array.isArray(value)) {
    return defaultHomepageContent.products;
  }

  const products = value
    .map((product) => {
      if (product && typeof product === "object") {
        const item = product as Partial<HomepageProduct>;

        return {
          name: String(item.name ?? "").trim(),
          description: String(item.description ?? "").trim(),
          image_base64: String(item.image_base64 ?? "").trim(),
        };
      }

      return {
        name: "",
        description: "",
        image_base64: "",
      };
    })
    .filter(
      (product) =>
        product.name || product.description || product.image_base64,
    );

  return products.length ? products : defaultHomepageContent.products;
}

function normalizeSafetySlides(value: unknown): HomepageSafetySlide[] {
  if (!Array.isArray(value)) {
    return defaultHomepageContent.safety_slides;
  }

  const slides = value
    .map((slide) => {
      if (slide && typeof slide === "object") {
        const item = slide as Partial<HomepageSafetySlide>;

        return {
          title: String(item.title ?? "").trim(),
          description: String(item.description ?? "").trim(),
          image_base64: String(item.image_base64 ?? "").trim(),
        };
      }

      return {
        title: "",
        description: "",
        image_base64: "",
      };
    })
    .filter((slide) => slide.title || slide.description || slide.image_base64);

  return slides.length ? slides : defaultHomepageContent.safety_slides;
}

function normalizePartners(value: unknown): HomepagePartner[] {
  if (!Array.isArray(value)) {
    return defaultHomepageContent.partners;
  }

  const partners = value
    .map((partner) => {
      if (typeof partner === "string") {
        return {
          name: partner.trim(),
          logo_base64: "",
        };
      }

      if (partner && typeof partner === "object") {
        const item = partner as Partial<HomepagePartner>;

        return {
          name: String(item.name ?? "").trim(),
          logo_base64: String(item.logo_base64 ?? "").trim(),
        };
      }

      return {
        name: "",
        logo_base64: "",
      };
    })
    .filter((partner) => partner.name || partner.logo_base64);

  return partners.length ? partners : defaultHomepageContent.partners;
}

export function mergeHomepageContent(
  data: Partial<HomepageContent> | null,
): HomepageContent {
  return {
    ...defaultHomepageContent,
    ...data,
    partners: normalizePartners(data?.partners),
    applications: normalizeApplications(data?.applications),
    hero_slides: withDefaultArray(
      data?.hero_slides,
      data?.hero_title || data?.hero_subtitle
        ? [
            {
              title: data.hero_title ?? defaultHomepageContent.hero_title,
              description:
                data.hero_subtitle ?? defaultHomepageContent.hero_subtitle,
              image_base64: "",
            },
          ]
        : defaultHomepageContent.hero_slides,
    ),
    products: normalizeProducts(data?.products),
    safety_slides: normalizeSafetySlides(
      data?.safety_slides ??
        (data?.safety_title || data?.safety_description
          ? [
              {
                title: data.safety_title ?? defaultHomepageContent.safety_title,
                description:
                  data.safety_description ??
                  defaultHomepageContent.safety_description,
                image_base64: "",
              },
            ]
          : defaultHomepageContent.safety_slides),
    ),
    news_tabs: withDefaultArray(data?.news_tabs, defaultHomepageContent.news_tabs),
    posts: withDefaultArray(data?.posts, defaultHomepageContent.posts),
    contact_fields: withDefaultArray(
      data?.contact_fields,
      defaultHomepageContent.contact_fields,
    ),
  };
}

export async function getHomepageContent() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return defaultHomepageContent;
  }

  const { data } = await supabase
    .from("homepage_content")
    .select("*")
    .eq("id", "homepage")
    .maybeSingle();

  const finalData = mergeHomepageContent(data as Partial<HomepageContent> | null);

  // Fetch Hero Banner từ CMS mới
  const { data: heroData } = await supabase
    .from("cms_home_hero")
    .select("*")
    .order("sort_order", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (heroData) {
    finalData.hero_slides = heroData.map((item) => ({
      title: item.title || "",
      description: item.subtitle || "",
      image_base64: item.image_file || "",
    }));
  }

  // Fetch Partner từ CMS mới
  const { data: partnerData } = await supabase
    .from("cms_home_partner")
    .select("*")
    .order("sort_order", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (partnerData) {
    finalData.partners = partnerData.map((item) => ({
      name: item.name || "",
      logo_base64: item.image_file || "",
    }));
  }

  // Fetch Applications từ CMS mới (home solution)
  const { data: solutionData } = await supabase
    .from("cms_home_solution")
    .select("*")
    .order("sort_order", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (solutionData) {
    finalData.applications = solutionData.map((item) => ({
      title: item.title || "",
      image_base64: item.image_file || "",
    }));
  }

  // Fetch Mini Slide (safety slides) từ CMS mới
  const { data: miniSlideData } = await supabase
    .from("cms_home_mini_slide")
    .select("*")
    .order("sort_order", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (miniSlideData) {
    finalData.safety_slides = miniSlideData.map((item) => ({
      title: item.title || "",
      description: item.description || "",
      image_base64: item.image_file || "",
    }));
  }

  // Fetch danh mục sản phẩm từ CMS mới (homeProductCategories)
  const { data: productCategoriesData } = await supabase
    .from("cms_home_product_categories")
    .select("*")
    .order("sort_order", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (productCategoriesData) {
    finalData.products = productCategoriesData.map((item) => ({
      name: item.name || "",
      description: item.description || "",
      image_base64: item.image_file || "",
    }));
  }

  return finalData;
}
