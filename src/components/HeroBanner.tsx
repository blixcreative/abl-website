"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { HomepageHeroSlide } from "@/lib/homepage-content";

type HeroBannerProps = {
  slides: HomepageHeroSlide[];
};

export default function HeroBanner({ slides }: HeroBannerProps) {
  const visibleSlides = useMemo(
    () => slides.filter((slide) => slide.title.trim()),
    [slides],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = visibleSlides[activeIndex] ?? visibleSlides[0];

  if (!activeSlide) {
    return null;
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
    <section className="relative flex min-h-[750px] w-full items-center justify-center overflow-hidden bg-[#173754] text-white">
      {activeSlide.image_base64 ? (
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            backgroundImage: `url(${activeSlide.image_base64})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
          aria-hidden="true"
        />
      ) : (
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(0,174,239,0.38),transparent_32%),linear-gradient(135deg,#173754,#075f74)] bg-cover bg-center bg-no-repeat"
          aria-hidden="true"
        />
      )}
      <div className="absolute inset-0 bg-[#173754]/65" aria-hidden="true" />

      <div className="container relative mx-auto flex min-h-[750px] w-full flex-col items-start justify-center gap-10 px-4 py-24">
        <div className="max-w-5xl">
          <h1 className="font-alumni text-[64px] font-bold uppercase leading-[0.95] tracking-tight md:text-[104px] font-alu">
            {activeSlide.title.split("\n").map((line, index) => (
              <span key={`${line}-${index}`}>
                {index > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-10 max-w-3xl text-xl font-bold leading-snug md:text-2xl">
            {activeSlide.description}
          </p>
        </div>

        {visibleSlides.length > 1 ? (
          <>
            <div className="flex gap-4">
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
                  key={`${slide.title}-${index}`}
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