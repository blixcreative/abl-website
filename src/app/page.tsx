import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import SafetyBanner from "@/components/SafetyBanner";
import SectionTitle from "@/components/SectionTitle";
import { getHomepageContent } from "@/lib/homepage-content";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Component placeholder hình ảnh.
 * Dùng tạm cho các khu vực chưa có asset thật như sản phẩm, tin tức.
 */
function GrayImage({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-slate-300 ${className}`}>
    </div>
  );
}

export default async function Home() {
  // Lấy toàn bộ nội dung trang chủ từ nguồn dữ liệu tập trung.
  const content = await getHomepageContent();

  return (
    <main className=" mx-auto w-full ">
      {/* Header: thanh điều hướng chính của website. */}
      <Header />

      {/* Hero banner: nhiều slide có ảnh nền, nút chuyển và dots vị trí. */}
      <HeroBanner slides={content.hero_slides} />

      {/* Partners section: hiển thị danh sách đối tác/thương hiệu. */}
      <section className="w-full flex items-center justify-center bg-[#075f74] text-white">
        <div className="container mx-auto w-full py-20">
          <SectionTitle light>{content.partners_title}</SectionTitle>
          <div className="grid grid-cols-2 items-center gap-10 text-center md:grid-cols-5">
            {/* Render logo đối tác từ base64 đã cấu hình trong admin. */}
            {content.partners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex min-h-24 items-center justify-center"
              >
                {partner.logo_base64 ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={partner.logo_base64}
                    alt={partner.name || `Đối tác ${index + 1}`}
                    className="max-h-20 max-w-full object-contain"
                  />
                ) : (
                  <span className="font-alumni text-4xl font-black italic tracking-wide text-white">
                    {partner.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications section: các lĩnh vực ứng dụng của sản phẩm/dịch vụ. */}
      <section className="w-full flex items-center justify-center overflow-hidden bg-[#075f74] text-white">
        <div className="container mx-auto w-full pt-10 pb-20">
          <SectionTitle light>{content.applications_title}</SectionTitle>
          <div className="flex gap-6 overflow-hidden">
            {/* Render từng card ứng dụng theo dữ liệu applications. */}
            {content.applications.map((item, index) => (
              <article
                key={`${item.title}-${index}`}
                className="relative flex w-auto flex-1 items-end justify-start overflow-hidden bg-slate-700 bg-cover bg-center p-4 text-left h-[400px]"
                style={
                  item.image_base64
                    ? {
                        backgroundImage: `url(${item.image_base64})`,
                        backgroundPosition: "center center",
                        backgroundSize: "cover",
                      }
                    : undefined
                }
              >
                
                <h3 className="relative z-10 text-xl font-bold leading-tight text-white">
                  {item.title}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Products section: danh sách sản phẩm nổi bật và CTA xem thêm. */}
      <section className="w-full items-center justify-center bg-white py-24">
        <div className="container mx-auto w-full px-4">

          <SectionTitle>{content.products_title}</SectionTitle>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {/* Render card sản phẩm gồm ảnh, tên và mô tả. */}
            {content.products.map((product) => (
              <article key={product.name} className="pt-8">
                {product.image_base64 ? (
                  <div className="relative z-10 mx-auto flex h-[240px] w-[240px] items-center justify-center overflow-hidden p-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image_base64}
                      alt={product.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                ) : (
                  <GrayImage className="relative z-10 mx-auto h-[240px] w-[240px]" />
                )}
                <div className="-mt-8 px-4 pb-6 pt-14">
                  <h3 className="text-xl font-bold text-[#00aeef]">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-sm">{product.description}</p>
                </div>
              </article>
            ))}
          </div>

          {/* CTA điều hướng tới trang/danh sách sản phẩm đầy đủ. */}
          <div className="mt-20 text-center">
            <a
              href="#"
              className="inline-flex items-center justify-center border border-[#00aeef] text-[#00aeef] px-8 py-4 text-xl font-bold uppercase"
            >
              {content.products_cta_label}
            </a>
          </div>
        </div>

      </section>

      {/* Safety banner: nhiều slide có tiêu đề, nội dung, hình ảnh, nút chuyển và dots. */}
      <SafetyBanner slides={content.safety_slides} />

      {/* News section: tin tức với tab lọc, điều hướng và danh sách bài viết. */}
      <section className="w-fullbg-white py-24">
        <div className="container mx-auto w-full">
          <SectionTitle>{content.news_title}</SectionTitle>
          <div className="mb-10 flex flex-wrap items-center justify-between gap-5">
            <div className="flex gap-4">
              {/* Tabs phân loại tin tức, tab đầu tiên đang active. */}
              {content.news_tabs.map((tab, index) => (
                <button
                  key={tab}
                  className={`h-12 min-w-[128px] border px-8 ${
                    index === 0
                      ? "border-[#00aeef] bg-[#00aeef] text-white"
                      : "border-[#3d3d3d] bg-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex gap-4">
              {/* Nút điều hướng carousel/list tin tức. */}
              <button className="grid size-12 place-items-center rounded-full bg-[#ededed] text-white">
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
              <button className="grid size-12 place-items-center rounded-full bg-[#00aeef] text-white">
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Danh sách bài viết, mỗi card gồm ảnh, ngày tháng, tiêu đề và mô tả. */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.posts.map((post) => (
              <article key={post.title} className="border border-[#e5e5e5]">
                <GrayImage className="h-[250px]" />
                <div className="p-4">
                  <div className="mb-5 flex items-start justify-between border-b border-[#3d3d3d] pb-4">
                    <span className="text-3xl font-medium">{post.day}</span>
                    <span className="text-right text-sm">
                      {post.month}
                      <br />
                      {post.year}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold leading-tight">
                    {post.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-base leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact section: form liên hệ để khách hàng gửi thông tin. */}
      <section className="w-fullbg-white pb-28">
        <div className="container mx-auto w-full">
          <SectionTitle>{content.contact_title}</SectionTitle>
          <form className="space-y-5">
            {/* Render các input liên hệ từ cấu hình contact_fields. */}
            {content.contact_fields.map(({ label, placeholder }) => (
              <label key={label} className="block font-bold">
                {label}
                <input
                  placeholder={placeholder}
                  className="mt-2 h-14 w-full border border-[#222] px-4 font-normal outline-none"
                />
              </label>
            ))}
            {/* Trường nhập nội dung tin nhắn. */}
            <label className="block font-bold">
              {content.contact_message_label}
              <textarea
                placeholder={content.contact_message_placeholder}
                className="mt-2 h-32 w-full resize-none border border-[#222] px-4 py-4 font-normal outline-none"
              />
            </label>
            {/* Nút gửi form liên hệ. */}
            <div className="pt-8 text-center">
              <button className="h-14 min-w-[285px] border border-[#00aeef] px-8 text-xl font-bold uppercase text-[#00aeef]">
                {content.contact_button_label}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer: thông tin cuối trang và các liên kết phụ. */}
      <Footer />
    </main>
  );
}