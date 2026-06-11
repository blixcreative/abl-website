"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { DUMMY_POSTS, DUMMY_CATEGORIES } from "@/lib/dummy-posts";

interface HomeNewsClientProps {
  newsTitle: string;
}

export default function HomeNewsClient({ newsTitle }: HomeNewsClientProps) {
  const [activeCategory, setActiveCategory] = useState("Tất Cả");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Lọc bài viết
  const filteredPosts = DUMMY_POSTS.filter((post) => {
    if (activeCategory === "Tất Cả") return true;
    return post.category === activeCategory;
  });

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-white py-24">
      <div className="container mx-auto w-full px-4">
        <h2 className="mb-10 text-3xl font-bold uppercase leading-tight md:text-5xl">
          {newsTitle}
        </h2>
        <div className="mb-10 flex flex-wrap items-center justify-between gap-5">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {DUMMY_CATEGORIES.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveCategory(tab)}
                className={`h-12 min-w-[128px] border px-8 whitespace-nowrap transition-colors ${
                  activeCategory === tab
                    ? "border-[#00aeef] bg-[#00aeef] text-white"
                    : "border-[#3d3d3d] bg-white text-[#3d3d3d] hover:border-[#00aeef] hover:text-[#00aeef]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex gap-4">
            <button 
              onClick={scrollLeft}
              className="grid size-12 place-items-center rounded-full bg-[#ededed] text-[#3d3d3d] hover:bg-[#00aeef] hover:text-white transition-colors"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button 
              onClick={scrollRight}
              className="grid size-12 place-items-center rounded-full bg-[#00aeef] text-white hover:bg-[#08aee7] transition-colors"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <article 
                key={post.id} 
                className="border border-[#e5e5e5] flex-none w-[300px] md:w-[350px] snap-start"
              >
                <div className="relative h-[250px] w-full bg-slate-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="mb-5 flex items-start justify-between border-b border-[#3d3d3d] pb-4">
                    <span className="text-3xl font-medium">{post.day}</span>
                    <span className="text-right text-sm">
                      {post.month}
                      <br />
                      {post.year}
                    </span>
                  </div>
                  <span className="text-[#00aeef] font-bold uppercase mb-2 text-xs block">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-bold leading-tight line-clamp-2 min-h-[56px]">
                    {post.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-base leading-relaxed text-[#4d4d4d]">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            ))
          ) : (
            <div className="w-full text-center text-gray-500 py-10">
              Không có bài viết nào trong danh mục này.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}