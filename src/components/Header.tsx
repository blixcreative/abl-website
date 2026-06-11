import { ChevronDown } from "lucide-react";
import { getHeaderContent } from "@/lib/header-content";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import HeaderSearch from "./HeaderSearch";
import MobileMenu from "./MobileMenu";

type ProductCategory = {
  id: string;
  name: string;
  level?: number | string;
  [key: string]: unknown;
};

export default async function Header() {
  const content = await getHeaderContent();

  const supabase = await createSupabaseServerClient();
  let categories: ProductCategory[] = [];
  if (supabase) {
    const { data } = await supabase
      .from("cms_product_categories")
      .select("*")
      .eq("status", "published")
      .order("sort_order", { ascending: true });
    
    if (data) {
      categories = data.filter(
        (c: ProductCategory) => !c.level || c.level === 0 || c.level === "0"
      );
    }
  }

  return (
    <header className="w-full flex flex-col items-center gap-2 justify-center bg-[#002330] text-white backdrop-blur-sm sticky top-0 z-50">
      <div className="w-full container mx-auto flex items-center justify-between gap-4 lg:gap-8 px-4 py-4 lg:py-7">
        <MobileMenu navigation={content.navigation} categories={categories} />
        
        <div className="flex items-center gap-5 flex-1 lg:flex-none justify-center lg:justify-start">
          <div className="leading-none flex gap-4 items-center">
            {content.logo_1_base64 ? (
              
              <img
                src={content.logo_1_base64}
                alt="ABL logo 1"
                className="max-h-14 max-w-32 object-contain"
              />
            ) : (
              
              <img
                src="/logo1.png"
                alt="ABL logo 1"
                className="max-h-14 max-w-32 object-contain"
              />
            )}

            {content.logo_2_base64 ? (
              
              <img
                src={content.logo_2_base64}
                alt="ABL logo 2"
                className="max-h-14 max-w-48 object-contain"
              />
            ) : (
              <div className="flex items-center gap-4">
                
                <img
                  src="/logo2.png"
                  alt="ABL logo 2"
                  className="max-h-14 max-w-48 object-contain"
                />
                <div className="text-sm font-bold leading-tight">
                  {content.title.split("\n").map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="hidden flex-1 items-center justify-end gap-7 lg:flex">
          <HeaderSearch />
          <span className="text-sm">{content.phone}</span>
          <span className="grid size-10 place-items-center rounded-full border border-white text-sm">
            EN
          </span>
        </div>
      </div>

      <nav className="hidden lg:flex gap-4 justify-between w-full container mx-auto px-4 pb-5 text-md font-bold uppercase relative">
        {content.navigation.map((item) => {
          const isProduct = item.url === "/products" || item.title.toLowerCase() === "sản phẩm" || item.title.toLowerCase() === "products";

          if (isProduct) {
            return (
              <div key={`${item.title}-${item.url}`} className="group relative flex-1 border-t border-white pt-3">
                <Link href={item.url} className="flex items-center gap-1 hover:text-gray-300 transition-colors w-fit pb-2">
                  {item.title}
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                </Link>
                {categories.length > 0 && (
                  <div className="absolute top-[100%] left-0 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100]">
                    <div className="bg-white text-[#3d3d3d] shadow-xl border border-gray-100 flex flex-col py-2 rounded-sm mt-1">
                      {categories.map((cat: ProductCategory) => (
                        <Link 
                          key={cat.id} 
                          href={`/products/category-list/${cat.id}`}
                          className="px-5 py-3 hover:bg-gray-50 hover:text-[#00aeef] text-sm font-semibold normal-case transition-colors border-b border-gray-100 last:border-0"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={`${item.title}-${item.url}`}
              href={item.url}
              className="flex-1 border-t border-white pt-3 hover:text-gray-300 transition-colors"
            >
              {item.title}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}