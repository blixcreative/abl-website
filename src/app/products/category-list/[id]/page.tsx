import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Folder } from "lucide-react";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

async function getCategory(id: string) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;
  const { data } = await supabase
    .from("cms_product_categories")
    .select("*")
    .eq("id", id)
    .single();
  return data;
}

async function getSubcategories(parentId: string) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("cms_product_categories")
    .select("*")
    .eq("parent_id", parentId)
    .eq("status", "published")
    .order("sort_order", { ascending: true });
  return data || [];
}

async function getAdminProductsByCategories(categoryIds: string[], page: number = 1, limit: number = 12) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { data: [], count: 0 };
  
  let query = supabase
    .from("cms_products")
    .select(`
      *,
      cms_product_categories(name)
    `, { count: "exact" })
    .eq("status", "published")
    .in("category_id", categoryIds);

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  query = query.order("created_at", { ascending: false }).range(from, to);

  const { data, count } = await query;
  return { data: data || [], count: count || 0 };
}

function ProductCard({
  product,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  product: any;
}) {
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

export default async function CategoryListPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const resolvedParams = await params;
  const parentId = resolvedParams.id;
  const sp = await searchParams;
  const currentCategory = sp.category || "";
  const currentPage = parseInt(sp.page || "1", 10);
  const limit = 12;

  const [parentCategory, subcategories] = await Promise.all([
    getCategory(parentId),
    getSubcategories(parentId),
  ]);

  if (!parentCategory) {
    return (
      <main className="mx-auto w-full bg-white">
        <Header />
        <div className="py-20 text-center">
          <h1 className="text-2xl font-bold">Không tìm thấy danh mục</h1>
        </div>
        <Footer />
      </main>
    );
  }

  // Lọc sản phẩm theo danh mục con hoặc tất cả trong danh mục cha
  let filterCategoryIds: string[] = [];
  if (currentCategory) {
    filterCategoryIds = [currentCategory];
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filterCategoryIds = [parentId, ...subcategories.map((c: any) => c.id)];
  }

  const { data: adminProducts, count: totalProducts } = await getAdminProductsByCategories(
    filterCategoryIds,
    currentPage,
    limit
  );

  const totalPages = Math.ceil(totalProducts / limit);

  return (
    <main className="mx-auto w-full bg-white">
      <Header />

      {/* Hero Banner lấy hình ảnh của category */}
      <section className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
        {parentCategory.image_file ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={parentCategory.image_file}
            alt={parentCategory.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-[#075f74]" />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-wider text-center px-4 drop-shadow-md">
            {parentCategory.name}
          </h1>
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
            <aside className="space-y-4 pt-1 text-[#00aeef]">
              <Link
                href={`/products/category-list/${parentId}#products`}
                className={`flex items-center gap-2 font-bold transition-colors ${
                  !currentCategory ? "text-[#075f74]" : "hover:text-[#075f74]"
                }`}
              >
                <Folder className={`size-4 fill-current ${!currentCategory ? "text-[#075f74]" : ""}`} aria-hidden="true" />
                Tất cả {parentCategory.name}
              </Link>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {subcategories.map((category: any) => {
                const isActive = currentCategory === category.id;
                return (
                  <Link
                    href={`/products/category-list/${parentId}?category=${category.id}#products`}
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
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {adminProducts.map((product: any, index: number) => (
                    <ProductCard key={product.id || index} product={product} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic py-10 text-center">Không tìm thấy sản phẩm nào trong danh mục này.</p>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-16 flex items-center justify-center gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const p = i + 1;
                    const isActive = p === currentPage;
                    const url = `/products/category-list/${parentId}?page=${p}${currentCategory ? `&category=${currentCategory}` : ""}#products`;
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