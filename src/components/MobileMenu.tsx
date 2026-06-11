"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import HeaderSearch from "./HeaderSearch";

type NavigationItem = {
  title: string;
  url: string;
};

type ProductCategory = {
  id: string;
  name: string;
  level?: number | string;
  [key: string]: unknown;
};

type MobileMenuProps = {
  navigation: NavigationItem[];
  categories: ProductCategory[];
};

export default function MobileMenu({ navigation, categories }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className="lg:hidden flex items-center">
      {!isOpen && (
        <button 
          onClick={toggleMenu} 
          className="p-2 text-white hover:text-gray-300 transition-colors z-50"
          aria-label="Toggle Menu"
        >
          <Menu className="w-8 h-8" />
        </button>
      )}

      {/* Overlay & Menu Content */}
      {isOpen && mounted && createPortal(
        <div className="fixed inset-0 z-[100] bg-[#002330] overflow-y-auto pb-20 flex flex-col">
          {/* Header Row */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <span className="text-xl font-bold tracking-wider text-white">ABL</span>
            <button 
              onClick={toggleMenu} 
              className="p-2 text-white hover:text-gray-300 transition-colors"
              aria-label="Close Menu"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          <div className="flex flex-col p-6 space-y-4">
            
            {/* Mobile Search */}
            <div className="w-full mb-4">
              <HeaderSearch mobile />
            </div>

            {/* Navigation Items */}
            {navigation.map((item) => {
              const isProduct = 
                item.url === "/products" || 
                item.title.toLowerCase() === "sản phẩm" || 
                item.title.toLowerCase() === "products";
              
              const isExpanded = expandedItems[item.title];

              if (isProduct) {
                return (
                  <div key={`${item.title}-${item.url}`} className="border-b border-white/20 pb-2">
                    <button
                      onClick={() => toggleExpand(item.title)}
                      className="w-full flex items-center justify-between py-3 text-lg font-bold uppercase text-white hover:text-gray-300"
                    >
                      <span>{item.title}</span>
                      <ChevronDown 
                        className={`w-5 h-5 transition-transform ${isExpanded ? "rotate-180" : ""}`} 
                      />
                    </button>
                    
                    {/* Expandable Dropdown */}
                    {isExpanded && categories.length > 0 && (
                      <div className="flex flex-col bg-white/5 rounded-sm mt-2 overflow-hidden">
                        <Link 
                          href={item.url}
                          onClick={() => setIsOpen(false)}
                          className="px-6 py-3 text-white border-b border-white/10 font-semibold"
                        >
                          Tất cả {item.title}
                        </Link>
                        {categories.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/products/category-list/${cat.id}`}
                            onClick={() => setIsOpen(false)}
                            className="px-6 py-3 text-white/80 hover:bg-white/10 hover:text-white transition-colors text-sm border-b border-white/10 last:border-0"
                          >
                            {cat.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={`${item.title}-${item.url}`}
                  href={item.url}
                  onClick={() => setIsOpen(false)}
                  className="py-3 text-lg font-bold uppercase text-white hover:text-gray-300 border-b border-white/20"
                >
                  {item.title}
                </Link>
              );
            })}

            <div className="pt-4 flex justify-center mt-6">
               <span className="grid size-12 place-items-center rounded-full border border-white text-sm font-bold text-white">
                 EN
               </span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}