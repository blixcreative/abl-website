import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SectionTitle from "@/components/SectionTitle";
import { ChevronDown, Folder } from "lucide-react";
import Image from "next/image";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import ProductBannerSlider from "@/components/ProductBannerSlider";

async function getProductBanners() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];
  
  const { data } = await supabase
    .from("cms_product_banner")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true });

  return data || [];
}

async function getAdminCategories() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("cms_product_categories")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true });
  return data || [];
}

async function getAdminProducts(categoryId?: string, page: number = 1, limit: number = 12) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { data: [], count: 0 };
  
  let query = supabase
    .from("cms_products")
    .select(`
      *,
      cms_product_categories(name)
    `, { count: "exact" })
    .eq("status", "published");

  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  query = query.order("created_at", { ascending: false }).range(from, to);

  const { data, count } = await query;
  return { data: data || [], count: count || 0 };
}

import Link from "next/link";

function ProductCard({
  product,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  product: any;
}) {
  // Xác định hình mặc định theo danh mục
  const catName = product.cms_product_categories?.name?.toLowerCase() || "";
  const fallbackImage = catName.includes("nhám") ? "/images/product-3.png" : "/images/product-1.png";

  let firstImageUrl = product.main_image_url || product.image_base64 || fallbackImage;
  if (!product.main_image_url && !product.image_base64 && product.images) {
    try {
      const parsed = typeof product.images === "string" ? JSON.parse(product.images) : product.images;
      if (Array.isArray(parsed) && parsed.length > 0 && parsed[0]) {
        firstImageUrl = parsed[0];
      }
    } catch (e) {
      // ignore
    }
  }

  return (
    <article className="flex min-h-[440px] flex-col border border-[#e5e5e5] bg-white px-6 pb-8 pt-7 relative hover:shadow-lg transition-shadow duration-300">
      
      <Link href={`/products/${product.id}`} className="relative mx-auto mb-auto h-[220px] w-full max-w-[260px] flex items-center justify-center group z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={firstImageUrl}
          alt={product.name}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <div className="pt-8">
        <h3 className="border-b border-[#777] pb-3 text-xl font-bold leading-tight text-[#3d3d3d]">
          <Link href={`/products/${product.id}`} className="hover:text-[#00aeef] transition-colors relative z-10">
            {product.name}
          </Link>
        </h3>

        <div className="mt-3 grid grid-cols-2 gap-6 text-sm leading-relaxed text-[#3d3d3d]">
          <div>
            <h4 className="font-bold">Đặc tính</h4>
            <p>{product.description}</p>
          </div>
          <div>
            <h4 className="font-bold">Quy cách</h4>
            <ul className="list-disc pl-4">
              {product.specifications ? (
                product.specifications.split('\n').map((item: string) => (
                  <li key={item}>{item}</li>
                ))
              ) : product.specs?.map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const params = await searchParams;
  const currentCategory = params.category || "";
  const currentPage = parseInt(params.page || "1", 10);
  const limit = 12;

  const [productsData, productBanners, adminCategories] = await Promise.all([
    getAdminProducts(currentCategory, currentPage, limit),
    getProductBanners(),
    getAdminCategories(),
  ]);

  const { data: adminProducts, count: totalProducts } = productsData;
  const totalPages = Math.ceil(totalProducts / limit);

  // Chỉ hiện danh mục cha (level 0)
  const level0Categories = adminCategories.filter(
    (c: any) => !c.level || c.level === 0 || c.level === "0"
  );

  return (
    <main className="mx-auto w-full bg-white">
      <Header />

      {/* Banner Slider thay cho Banner tĩnh */}
      <ProductBannerSlider banners={productBanners} />

      {/* Featured categories */}
      <section className="w-full bg-[#075f74] py-14 text-white md:py-20">
        <div className="container mx-auto w-full px-4">
          <SectionTitle light>Phân Loại Sản Phẩm</SectionTitle>
          <div className="flex gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:gap-6 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {level0Categories.map((category) => (
              <Link
                key={category.id}
                href={`/products/category-list/${category.id}`}
                className="relative flex h-[320px] w-[280px] md:w-auto flex-shrink-0 items-end overflow-hidden bg-slate-700 p-8 md:h-[400px] group block snap-start"
              >
                {category.image_file ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={category.image_file}
                    alt={category.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-slate-800" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />
                <h2 className="relative text-2xl font-bold leading-tight group-hover:text-[#00aeef] transition-colors">
                  {category.name}
                </h2>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products list section */}
      <section id="products" className="w-full bg-white py-20">
        <div className="container mx-auto w-full px-4">
          <div className="mb-8 flex flex-col gap-5 border-b border-[#3d3d3d] pb-4 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="text-4xl font-bold uppercase text-[#3d3d3d]">
              Sản Phẩm
            </h2>
          </div>

          <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
            <aside className="flex gap-4 overflow-x-auto pb-4 lg:flex-col lg:space-y-4 lg:pb-0 lg:pt-1 text-[#00aeef] whitespace-nowrap hide-scrollbar" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              <Link
                href="/products#products"
                className={`flex items-center gap-2 font-bold transition-colors ${
                  !currentCategory ? "text-[#075f74]" : "hover:text-[#075f74]"
                }`}
              >
                <Folder className={`size-4 fill-current ${!currentCategory ? "text-[#075f74]" : ""}`} aria-hidden="true" />
                Tất cả sản phẩm
              </Link>
              {level0Categories.map((category) => {
                const isActive = currentCategory === category.id;
                return (
                  <Link
                    href={`/products?category=${category.id}#products`}
                    key={category.id}
                    className={`flex items-center gap-2 font-bold transition-colors ${
                      isActive ? "text-[#075f74]" : "hover:text-[#075f74]"
                    }`}
                  >
                    <Folder className={`size-4 fill-current ${isActive ? "text-[#075f74]" : ""}`} aria-hidden="true" />
                    {category.name}
                  </Link>
                );
              })}
            </aside>

            <div>
              {adminProducts.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {adminProducts.map((product, index) => (
                    <ProductCard key={product.id || index} product={product} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic py-10 text-center">Không tìm thấy sản phẩm nào.</p>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-16 flex items-center justify-center gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const p = i + 1;
                    const isActive = p === currentPage;
                    const url = `/products?page=${p}${currentCategory ? `&category=${currentCategory}` : ""}#products`;
                    return (
                      <Link
                        key={p}
                        href={url}
                        className={`inline-flex h-10 w-10 items-center justify-center border text-lg font-bold transition-colors ${
                          isActive
                            ? "bg-[#00aeef] border-[#00aeef] text-white"
                            : "border-[#e5e5e5] text-[#3d3d3d] hover:border-[#00aeef] hover:text-[#00aeef]"
                        }`}
                      >
                        {p}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}