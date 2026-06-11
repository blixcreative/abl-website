import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ChevronRight, MessageCircle, Phone, Send } from "lucide-react";
import Image from "next/image";
import { getNewsConfig, getPostsList } from "@/lib/news-content";

function FloatingContact() {
  return (
    <div className="fixed right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col overflow-hidden rounded-full bg-[#002330] text-white lg:flex">
      <a
        href="#dang-ky"
        className="grid size-14 place-items-center text-[#9feeff]"
        aria-label="Liên hệ Zalo"
      >
        <MessageCircle className="size-6" aria-hidden="true" />
      </a>
      <a
        href="tel:+84905175845"
        className="grid size-14 place-items-center text-[#9feeff]"
        aria-label="Gọi hotline"
      >
        <Phone className="size-6" aria-hidden="true" />
      </a>
      <a
        href="#dang-ky"
        className="grid size-14 place-items-center text-[#9feeff]"
        aria-label="Gửi tin nhắn"
      >
        <Send className="size-6" aria-hidden="true" />
      </a>
    </div>
  );
}

export default async function NewsPage() {
  const [config, posts] = await Promise.all([
    getNewsConfig(),
    getPostsList(),
  ]);

  return (
    <main className="mx-auto w-full bg-white text-[#3d3d3d]">
      <Header />

      {/* Banner */}
      <section className="relative min-h-[520px] overflow-hidden bg-[#12384d] text-white md:min-h-[700px]">
        {config.banner_image_base64 ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={config.banner_image_base64}
            alt="Banner tin tức"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <Image
            src="/images/hero.png"
            alt="Nhà máy sản xuất ABL"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-[#002330]/55" />

        <div className="container relative z-10 mx-auto flex min-h-[520px] w-full flex-col justify-center px-4 pt-10 md:min-h-[700px]">
          <h1 className="font-alu text-[72px] font-bold uppercase leading-[0.9] tracking-tight md:text-[108px]">
            {config.banner_title}
          </h1>

          <div className="mt-8 flex flex-wrap gap-4">
            {config.tabs.map((tab, index) => (
              <button
                key={tab}
                className={`h-12 rounded-full border px-6 text-base transition-colors ${
                  index === 0
                    ? "border-white bg-white text-[#12384d]"
                    : "border-white/80 bg-transparent text-white hover:bg-white hover:text-[#12384d]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Highlight article */}
      <section className="w-full bg-[#00627a] text-white">
        <div className="container mx-auto grid w-full md:grid-cols-[0.88fr_1fr]">
          <article className="flex min-h-[430px] flex-col justify-center bg-[#00627a] bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[length:100%_14px] px-4 py-16 md:px-20">
            <h2 className="max-w-[650px] text-[32px] font-bold uppercase leading-tight md:text-[42px]">
              {config.highlight_title}
            </h2>
            <p className="mt-16 max-w-[610px] text-base leading-relaxed md:text-lg">
              {config.highlight_description}
            </p>
          </article>

          <div className="relative min-h-[430px]">
            {config.highlight_image_base64 ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={config.highlight_image_base64}
                alt={config.highlight_title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <Image
                src="/images/news-1.png"
                alt="ABL vượt qua cột mốc sản xuất mới"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            )}
          </div>
        </div>
      </section>

      {/* Email Newsletter */}
      <section id="dang-ky" className="w-full bg-[#e9e9e9] py-20 md:py-28">
        <div className="container mx-auto grid w-full items-center gap-10 px-4 md:grid-cols-[1fr_1fr]">
          <h2 className="max-w-[500px] text-2xl font-bold leading-tight text-[#3d3d3d] md:text-3xl">
            Đăng Ký Để Nhận Thông Tin Mới Nhất
            <br />
            Từ Chúng Tôi
          </h2>

          <form className="flex items-end gap-5">
            <label className="sr-only" htmlFor="newsletter-email">
              Email của bạn
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Email của bạn"
              className="h-12 flex-1 border-b border-[#3d3d3d] bg-transparent px-0 text-base outline-none placeholder:text-[#555]"
            />
            <button className="inline-flex h-12 items-center gap-2 bg-[#00aeef] px-6 font-bold text-white">
              Đăng ký
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </form>
        </div>
      </section>

      {/* Posts list */}
      <section className="w-full bg-white py-20 md:py-28">
        <div className="container mx-auto w-full px-4">
          <div className="mx-auto max-w-[1280px]">
            {posts.map((post, index) => (
              <article
                key={post.title}
                className={`grid gap-8 py-10 md:grid-cols-[300px_120px_1fr] md:gap-14 ${
                  index === 0 ? "pt-0" : "border-t border-[#bdbdbd]"
                }`}
              >
                <div className="relative h-[245px] w-full overflow-hidden bg-[#eeeeee] md:h-[250px]">
                  {post.image_base64 ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.image_base64}
                      alt={post.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 font-bold">
                      No Image
                    </div>
                  )}
                </div>

                <time
                  dateTime={`2025-04-${post.day}`}
                  className="block text-[#3d3d3d]"
                >
                  <span className="block text-[68px] font-bold leading-none md:text-[72px]">
                    {post.day}
                  </span>
                  <span className="mt-5 block text-base leading-tight">
                    {post.month}
                    <br />
                    {post.year}
                  </span>
                </time>

                <div className="flex flex-col justify-center">
                  <h3 className="text-2xl font-bold leading-tight text-[#3d3d3d] md:text-[30px]">
                    {post.title}
                  </h3>
                  <p className="mt-4 max-w-[720px] text-lg leading-relaxed text-[#4d4d4d] md:text-xl">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            ))}

            <div className="pt-6 text-center md:pt-10">
              <button className="h-16 min-w-[285px] border border-[#00aeef] px-8 text-xl font-bold uppercase text-[#00aeef] transition-colors hover:bg-[#00aeef] hover:text-white">
                Xem Thêm Bài Viết
              </button>
            </div>
          </div>
        </div>
      </section>

      <FloatingContact />
      <Footer />
    </main>
  );
}