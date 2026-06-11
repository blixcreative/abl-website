"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { DUMMY_POSTS, DUMMY_CATEGORIES } from "@/lib/dummy-posts";

interface ClientNewsContentProps {
  config: any;
}

export default function ClientNewsContent({ config }: ClientNewsContentProps) {
  const [activeCategory, setActiveCategory] = useState("Tất Cả");

  // Lọc bài viết
  const filteredPosts = DUMMY_POSTS.filter((post) => {
    if (activeCategory === "Tất Cả") return true;
    return post.category === activeCategory;
  });

  return (
    <>
      {/* Banner */}
      <section className="relative min-h-[520px] overflow-hidden bg-[#12384d] text-white md:min-h-[700px]">
        {/* Force public/news.png as banner background */}
        <Image
          src="/news.png"
          alt="Banner tin tức"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#002330]/55" />

        <div className="container relative z-10 mx-auto flex min-h-[520px] w-full flex-col justify-center px-4 pt-10 md:min-h-[700px]">
          <h1 className="font-alu text-[72px] font-bold  leading-[0.9] tracking-tight md:text-[108px]">
            {config.banner_title}
          </h1>

          <div className="mt-8 flex flex-wrap gap-4">
            {DUMMY_CATEGORIES.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveCategory(tab)}
                className={`h-12 rounded-full border px-6 text-base transition-colors ${
                  activeCategory === tab
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
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <article
                  key={post.id}
                  className={`grid gap-8 py-10 md:grid-cols-[300px_120px_1fr] md:gap-14 ${
                    index === 0 ? "pt-0" : "border-t border-[#bdbdbd]"
                  }`}
                >
                  <div className="relative h-[245px] w-full overflow-hidden bg-[#eeeeee] md:h-[250px]">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <time
                    dateTime={`${post.year}-04-${post.day}`}
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
                    <span className="text-[#00aeef] font-bold uppercase mb-2 text-sm">
                      {post.category}
                    </span>
                    <h3 className="text-2xl font-bold leading-tight text-[#3d3d3d] md:text-[30px]">
                      {post.title}
                    </h3>
                    <p className="mt-4 max-w-[720px] text-lg leading-relaxed text-[#4d4d4d] md:text-xl">
                      {post.excerpt}
                    </p>
                  </div>
                </article>
              ))
            ) : (
              <div className="text-center text-gray-500 py-10">
                Không có bài viết nào trong danh mục này.
              </div>
            )}

            <div className="pt-6 text-center md:pt-10">
              <button className="h-16 min-w-[285px] border border-[#00aeef] px-8 text-xl font-bold uppercase text-[#00aeef] transition-colors hover:bg-[#00aeef] hover:text-white">
                Xem Thêm Bài Viết
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}