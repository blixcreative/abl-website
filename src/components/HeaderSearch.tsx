"use client";

import { Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { searchProducts } from "./searchActions";

type SearchResult = {
  id: string;
  name: string;
};

export default function HeaderSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.length >= 2) {
        setIsLoading(true);
        const data = await searchProducts(searchTerm);
        setResults(data);
        setIsLoading(false);
        setIsOpen(true);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex h-10 w-[400px] items-center justify-between border border-white/90 px-4 text-sm bg-transparent">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="w-full bg-transparent text-white/90 outline-none placeholder:text-white/70"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => {
            if (searchTerm.length >= 2) setIsOpen(true);
          }}
        />
        <Search className="size-5 text-white/90" aria-hidden="true" />
      </div>

      {isOpen && (searchTerm.length >= 2) && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white text-[#3d3d3d] shadow-lg rounded-sm overflow-hidden z-50">
          {isLoading ? (
            <div className="px-4 py-3 text-sm text-gray-500">Đang tìm...</div>
          ) : results.length > 0 ? (
            <div className="flex flex-col">
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="px-4 py-2 hover:bg-gray-100 hover:text-[#00aeef] transition-colors text-sm border-b border-gray-100 last:border-0 truncate block"
                  onClick={() => setIsOpen(false)}
                >
                  {product.name}
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500">Không tìm thấy sản phẩm.</div>
          )}
        </div>
      )}
    </div>
  );
}