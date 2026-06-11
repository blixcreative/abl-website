"use client";

import { useState } from "react";

function GalleryImage({
  className = "",
  src,
  onClick,
  selected,
  isMain = false,
}: {
  className?: string;
  src?: string | null;
  onClick?: () => void;
  selected?: boolean;
  isMain?: boolean;
}) {
  if (src) {
    return (
      <div
        onClick={onClick}
        className={`flex items-center justify-center overflow-hidden bg-white ${isMain ? "" : "border"} ${
          selected && !isMain
            ? "border-[#00aeef] ring-1 ring-[#00aeef]"
            : isMain
            ? ""
            : "border-[#b7b7b7] cursor-pointer hover:border-gray-400"
        } transition-all ${className}`}
      >
        <img
          src={src}
          alt="Product Image"
          className="max-h-full max-w-full object-contain mix-blend-multiply"
        />
      </div>
    );
  }
  return (
    <div
      className={`flex items-center justify-center overflow-hidden border border-[#b7b7b7] bg-[#eeeeee] ${className}`}
      aria-label="Khu vực hình ảnh sản phẩm"
    >
      <div className="h-1/3 w-2/3 rounded-full bg-white/35 blur-sm" />
    </div>
  );
}

export default function ProductGallery({
  images,
  mainImage,
}: {
  images: (string | null)[];
  mainImage: string;
}) {
  const [activeImage, setActiveImage] = useState(mainImage);

  // Mảng hiển thị đúng 4 hình
  const displayImages = [0, 1, 2, 3].map(
    (index) => images[index] || (index === 0 ? mainImage : null),
  );

  return (
    <div className="grid gap-6 md:grid-cols-[96px_1fr]">
      {/* 4 Thumbnails on the left */}
      <div className="grid grid-cols-4 gap-3 md:grid-cols-1">
        {displayImages.map((src, index) => (
          <GalleryImage
            key={index}
            className="aspect-square"
            src={src}
            selected={src === activeImage && src !== null}
            onClick={() => {
              if (src) setActiveImage(src);
            }}
          />
        ))}
      </div>

      {/* Main Image Container - matching height of 4 thumbnails (4*96 + 3*12 = 420px) */}
      <div className="flex h-auto md:h-[420px] flex-col border border-[#b7b7b7] p-2">
        <GalleryImage isMain className="flex-1 w-full" src={activeImage} />
        <div className="mb-2 mt-4 shrink-0 text-center">
        </div>
      </div>
    </div>
  );
}