"use client";

import { useState } from "react";
import { Download, Search, ChevronDown } from "lucide-react";
import Image from "next/image";
import { 
  TECH_DOC_CATEGORIES, 
  SORT_OPTIONS, 
  DUMMY_TECH_DOCS 
} from "@/lib/dummy-tech-docs";

export default function ClientTechDocs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedSort, setSelectedSort] = useState("Tên (A-Z)");

  // Filter and Sort Data
  const filteredData = DUMMY_TECH_DOCS.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Tất cả" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (selectedSort) {
      case "Tên (A-Z)":
        return a.title.localeCompare(b.title);
      case "Tên (Z-A)":
        return b.title.localeCompare(a.title);
      case "Mới nhất":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "Cũ nhất":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      default:
        return 0;
    }
  });

  return (
    <>
      {/* Banner */}
      <section className="relative min-h-[400px] md:min-h-[500px] overflow-hidden text-white" style={{ backgroundImage: 'url(/techdoc.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-[#002330]/40" />

        <div className="container relative z-10 mx-auto flex min-h-[400px] md:min-h-[500px] w-full flex-col justify-center px-4 pt-10">
          <h1 className="font-alu text-[60px] md:text-[90px] font-bold uppercase leading-[1] tracking-tight">
            Tài Liệu Kỹ Thuật
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl text-white/90">
            Kho tài liệu kỹ thuật - Hướng dẫn sử dụng và tiêu chuẩn sản phẩm ABL
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full bg-white py-16 md:py-24 text-[#3d3d3d]">
        <div className="container mx-auto w-full px-4 max-w-[1000px]">
          <h2 className="text-2xl md:text-3xl font-bold uppercase mb-8">
            TẤT CẢ TÀI LIỆU KỸ THUẬT
          </h2>

          {/* Filters Row */}
          <div className="grid gap-4 md:grid-cols-3 mb-10 pb-8 border-b border-[#e5e5e5]">
            {/* Search Input */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Tìm kiếm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-12 border border-[#d1d1d1] px-4 pr-12 outline-none focus:border-[#00aeef] transition-colors"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00aeef]">
                <Search className="size-5" />
              </button>
            </div>

            {/* Category Select */}
            <div className="relative w-full">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-12 border border-[#d1d1d1] px-4 pr-10 appearance-none bg-white outline-none focus:border-[#00aeef] transition-colors cursor-pointer"
              >
                {TECH_DOC_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-5 text-gray-500 pointer-events-none" />
            </div>

            {/* Sort Select */}
            <div className="relative w-full">
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="w-full h-12 border border-[#d1d1d1] px-4 pr-10 appearance-none bg-white outline-none focus:border-[#00aeef] transition-colors cursor-pointer"
              >
                {SORT_OPTIONS.map(sort => (
                  <option key={sort} value={sort}>Sắp xếp theo: {sort}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-5 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Documents List */}
          <div className="flex flex-col">
            {filteredData.length > 0 ? (
              filteredData.map((doc) => (
                <div 
                  key={doc.id} 
                  className="flex items-center justify-between py-6 border-b border-[#e5e5e5] hover:bg-gray-50 transition-colors group"
                >
                  <h3 className="text-lg md:text-xl font-bold pr-4 group-hover:text-[#00aeef] transition-colors">
                    {doc.title}
                  </h3>
                  <button 
                    className="p-2 text-gray-400 hover:text-[#00aeef] transition-colors flex-shrink-0"
                    aria-label="Download document"
                  >
                    <Download className="size-6" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                Không tìm thấy tài liệu nào phù hợp với điều kiện lọc.
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}