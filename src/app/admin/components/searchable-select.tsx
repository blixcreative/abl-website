"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";

export function SearchableSelect({
  name,
  defaultValue = "",
  options = [],
  required = false,
}: {
  name: string;
  defaultValue?: string;
  options: { value: string; label: string }[];
  required?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [value, setValue] = useState(defaultValue);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Hidden input to hold the actual value for form submission */}
      <input type="hidden" name={name} value={value} required={required} />

      {/* Select Box trigger */}
      <div
        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 cursor-pointer flex justify-between items-center focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedOption ? "text-gray-900" : "text-gray-400 truncate pr-4"}>
          {selectedOption ? selectedOption.label : "-- Chọn --"}
        </span>
        <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 flex flex-col">
          <div className="p-2 border-b border-gray-100 sticky top-0 bg-white rounded-t-md">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Tìm kiếm..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                autoFocus
              />
            </div>
          </div>
          <div className="overflow-y-auto p-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={`px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-blue-50 truncate ${
                    value === option.value ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-700"
                  }`}
                  onClick={() => {
                    setValue(option.value);
                    setIsOpen(false);
                    setSearch("");
                  }}
                >
                  {option.label}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-gray-500 text-center">
                Không tìm thấy kết quả
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}