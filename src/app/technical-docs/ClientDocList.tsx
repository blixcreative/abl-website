"use client";

import { useMemo, useState } from "react";
import { Download, Search, ChevronDown } from "lucide-react";

type DocItem = {
  id: number;
  title: string;
  category: string;
};

type ClientDocListProps = {
  initialDocs: DocItem[];
};

export default function ClientDocList({ initialDocs }: ClientDocListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả");
  const [sortOrder, setSortOrder] = useState<"A-Z" | "Z-A">("A-Z");

  const categories = useMemo(() => {
    const cats = new Set(initialDocs.map((doc) => doc.category));
    return ["Tất cả", ...Array.from(cats)];
  }, [initialDocs]);

  const filteredAndSortedDocs = useMemo(() => {
    return initialDocs
      .filter((doc) => {
        const matchesSearch = doc.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesCategory =
          selectedCategory === "Tất cả" || doc.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortOrder === "A-Z") {
          return a.title.localeCompare(b.title);
        } else {
          return b.title.localeCompare(a.title);
        }
      });
  }, [initialDocs, searchTerm, selectedCategory, sortOrder]);

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Tìm kiếm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 pl-4 pr-10 border border-gray-300 rounded-none focus:outline-none focus:border-[#00aeef]"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
        </div>

        {/* Filters */}
        <div className="flex gap-4 w-full md:w-auto">
          {/* Category Filter */}
          <div className="relative flex-1 md:w-[260px]">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full h-12 pl-4 pr-10 border border-gray-300 rounded-none appearance-none focus:outline-none focus:border-[#00aeef] bg-white cursor-pointer truncate"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "Tất cả" ? "Tất Cả Danh Mục" : cat}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 size-5 pointer-events-none" />
          </div>

          {/* Sort */}
          <div className="relative flex-1 md:w-[220px]">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "A-Z" | "Z-A")}
              className="w-full h-12 pl-4 pr-10 border border-gray-300 rounded-none appearance-none focus:outline-none focus:border-[#00aeef] bg-white cursor-pointer"
            >
              <option value="A-Z">Sắp xếp theo: Tên (A-Z)</option>
              <option value="Z-A">Sắp xếp theo: Tên (Z-A)</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 size-5 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filteredAndSortedDocs.length > 0 ? (
          filteredAndSortedDocs.map((doc) => (
            <div key={doc.id}>
              <div className="flex items-center justify-between py-6 hover:bg-gray-50 transition-colors group cursor-pointer px-4 -mx-4 rounded-md">
                <h3 className="text-xl font-bold text-[#404040] group-hover:text-[#00aeef] transition-colors">
                  {doc.title}
                </h3>
                <button
                  type="button"
                  className="p-2 text-gray-400 group-hover:text-[#00aeef] transition-colors"
                  aria-label="Tải xuống"
                >
                  <Download className="size-6" />
                </button>
              </div>
              <div className="h-px w-full bg-[#e5e7eb]" />
            </div>
          ))
        ) : (
          <div className="py-12 text-center text-gray-500">
            Không tìm thấy tài liệu phù hợp.
          </div>
        )}
      </div>
    </div>
  );
}