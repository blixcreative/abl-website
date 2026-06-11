"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { HomepageSafetySlide } from "@/lib/homepage-content";

type SafetyBannerProps = {
  slides: HomepageSafetySlide[];
};

export default function SafetyBanner({ slides }: SafetyBannerProps) {
  const visibleSlides = useMemo(
    () =>
      slides.filter(
        (slide) =>
          slide.title.trim() ||
          slide.description.trim() ||
          slide.image_base64.trim(),
      ),
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
    <section className="w-full">
      <div className="container mx-auto overflow-hidden bg-[#08aee7] text-white">
        <div className="grid min-h-[600px] md:grid-cols-2">
          <div className="flex flex-col items-start justify-center gap-10 px-8 py-14 md:px-20">
            {visibleSlides.length > 1 ? (
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={goToPrevious}
                  className="grid size-12 place-items-center rounded-full bg-white text-[#00aeef] transition hover:bg-[#173754] hover:text-white"
                  aria-label="Chuyển về banner an toàn trước"
                >
                  <ChevronLeft className="size-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  className="grid size-12 place-items-center rounded-full bg-white text-[#00aeef] transition hover:bg-[#173754] hover:text-white"
                  aria-label="Chuyển tới banner an toàn tiếp theo"
                >
                  <ChevronRight className="size-5" aria-hidden="true" />
                </button>
              </div>
            ) : null}

            <div>
              <h2 className="font-alu text-[54px] font-bold leading-none md:text-[86px]">
                {activeSlide.title.split("\n").map((line, index) => (
                  <span key={`${line}-${index}`}>
                    {index > 0 ? <br /> : null}
                    {line}
                  </span>
                ))}
              </h2>
              <p className="mt-10 max-w-[520px] text-base leading-relaxed md:mt-14">
                {activeSlide.description}
              </p>
            </div>

            {visibleSlides.length > 1 ? (
              <div className="flex gap-3">
                {visibleSlides.map((slide, index) => (
                  <button
                    key={`${slide.title}-${index}`}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`h-3 rounded-full transition-all ${
                      index === activeIndex
                        ? "w-10 bg-white"
                        : "w-3 bg-white/55 hover:bg-white"
                    }`}
                    aria-label={`Chuyển tới banner an toàn ${index + 1}`}
                    aria-current={index === activeIndex ? "true" : undefined}
                  />
                ))}
              </div>
            ) : null}
          </div>

          <div
            className="min-h-[360px] bg-slate-500 bg-cover bg-center bg-no-repeat md:min-h-[600px]"
            style={
              activeSlide.image_base64
                ? {
                    backgroundImage: `url(${activeSlide.image_base64})`,
                    backgroundPosition: "center center",
                    backgroundSize: "cover",
                  }
                : undefined
            }
            aria-label={activeSlide.title}
          />
        </div>
      </div>
    </section>
  );
}