"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function MiniSlider({
  slides,
  fallback,
}: {
  slides: any[];
  fallback: {
    title: string;
    description: string;
    image: string;
  };
}) {
  const data = slides.length > 0 ? slides : [fallback];

  return (
    <div className="w-full relative group mini-slider-container">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        className="w-full"
      >
        {data.map((slide, index) => (
          <SwiperSlide key={slide.id || index}>
            <div className="grid w-full md:grid-cols-[0.88fr_1fr]">
              <div className="flex min-h-[420px] flex-col justify-center bg-[#08aee7] px-4 py-16 md:px-20">
                <h2 className="max-w-[520px] text-[32px] font-bold uppercase leading-tight md:text-[38px] whitespace-pre-line">
                  {slide.title}
                </h2>
                <p className="mt-16 max-w-[520px] text-lg font-bold leading-relaxed whitespace-pre-line">
                  {slide.description}
                </p>
              </div>
              {slide.image_url || slide.image ? (
                <div
                  className="relative overflow-hidden bg-slate-100 bg-cover bg-center min-h-[420px] w-full"
                  style={{
                    backgroundImage: `url(${slide.image_url || slide.image})`,
                  }}
                  aria-label="Content image"
                />
              ) : (
                <div
                  className="relative overflow-hidden bg-slate-300 min-h-[420px] w-full"
                  aria-label="Image placeholder"
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      <style jsx global>{`
        .mini-slider-container .swiper-pagination-bullet {
          background: white;
          opacity: 0.5;
        }
        .mini-slider-container .swiper-pagination-bullet-active {
          background: white;
          opacity: 1;
        }
        .mini-slider-container .swiper-button-next,
        .mini-slider-container .swiper-button-prev {
          color: white;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .mini-slider-container:hover .swiper-button-next,
        .mini-slider-container:hover .swiper-button-prev {
          opacity: 0.7;
        }
        .mini-slider-container .swiper-button-next:hover,
        .mini-slider-container .swiper-button-prev:hover {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}