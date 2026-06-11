"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ProductBanner = {
  id?: string;
  title: string;
  subtitle: string | null;
  primary_button_url: string | null;
  image_file: string | null;
};

type ProductBannerSliderProps = {
  banners: ProductBanner[];
};

export default function ProductBannerSlider({ banners }: ProductBannerSliderProps) {
  const visibleSlides = useMemo(
    () => banners.filter((banner) => banner.title?.trim()),
    [banners],
  );
  
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = visibleSlides[activeIndex] ?? visibleSlides[0];

  if (!activeSlide) {
    return (
      <section className="relative flex min-h-[585px] w-full items-center overflow-hidden bg-[#173754] text-white">
        <div className="absolute inset-0 bg-slate-800" />
      </section>
    );
  }

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? visibleSlides.length - 1 : current - 1,
    );
  };

  const goToNext = () => {
    setActiveIndex((current) =>
      current === visibleSlides.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <section className="relative flex h-[600px] w-full items-center overflow-hidden bg-[#173754] text-white">
      {activeSlide.image_file ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={activeSlide.image_file}
          alt={activeSlide.title || "Banner"}
          className="absolute inset-0 h-full w-full object-cover opacity-55 grayscale transition-all duration-500"
        />
      ) : (
        <div className="absolute inset-0 bg-slate-800 transition-all duration-500" />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/20 to-black/50" />

      <div className="container relative mx-auto flex min-h-[585px] w-full flex-col justify-center px-4 py-24">
        <div className="max-w-4xl">
          <h1 className="font-alu text-[76px] font-bold uppercase leading-[0.94] tracking-tight md:text-[104px] whitespace-pre-line">
            {activeSlide.title}
          </h1>
          {activeSlide.subtitle ? (
            <p className="mt-8 max-w-[560px] text-xl font-bold leading-snug">
              {activeSlide.subtitle}
            </p>
          ) : null}
          {activeSlide.primary_button_url && (
            <a
              href={activeSlide.primary_button_url}
              className="mt-10 inline-flex h-14 min-w-[212px] items-center justify-center bg-[#003549] px-8 text-xl font-bold uppercase text-[#00aeef]"
            >
              Tìm Hiểu Thêm
            </a>
          )}
        </div>

        {/* Nút điều hướng Carousel nếu có >1 banner */}
        {visibleSlides.length > 1 ? (
          <>
            <div className="mt-10 flex gap-4">
              <button
                type="button"
                onClick={goToPrevious}
                className="grid size-12 place-items-center rounded-full border border-white/60 bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-[#173754]"
                aria-label="Chuyển về banner trước"
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={goToNext}
                className="grid size-12 place-items-center rounded-full border border-white/60 bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-[#173754]"
                aria-label="Chuyển tới banner tiếp theo"
              >
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            </div>

            <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 gap-3">
              {visibleSlides.map((slide, index) => (
                <button
                  key={`${slide.id || index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-3 rounded-full transition-all ${
                    index === activeIndex
                      ? "w-10 bg-[#00aeef]"
                      : "w-3 bg-white/70 hover:bg-white"
                  }`}
                  aria-label={`Chuyển tới banner ${index + 1}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}