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

async function getAdminProducts() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("cms_products")
    .select(`
      *,
      cms_product_categories(name)
    `)
    .eq("status", "published")
    .order("created_at", { ascending: false });
  return data || [];
}

function ProductCard({
  product,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  product: any;
}) {
  return (
    <article className="flex min-h-[440px] flex-col border border-[#e5e5e5] bg-white px-6 pb-8 pt-7">
      
      <div className="relative mx-auto mb-auto h-[220px] w-full max-w-[260px] flex items-center justify-center">
        {product.main_image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.main_image_url}
            alt={product.name}
            className="max-h-full max-w-full object-contain"
          />
        ) : product.image_base64 ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image_base64}
            alt={product.name}
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <Image
            src="/images/product-1.png"
            alt={product.name}
            fill
            className="object-contain"
            sizes="260px"
          />
        )}
      </div>

      <div className="pt-8">
        <h3 className="border-b border-[#777] pb-3 text-xl font-bold leading-tight text-[#3d3d3d]">
          {product.name}
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

export default async function ProductsPage() {
  const [adminProducts, productBanners, adminCategories] = await Promise.all([
    getAdminProducts(),
    getProductBanners(),
    getAdminCategories(),
  ]);

  // Bỏ giới hạn 4 featured categories, lấy toàn bộ, chỉ hiện danh mục cha (level 0)
  const featuredCategories = adminCategories.filter(
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
          <div className="grid gap-6 md:grid-cols-3">
            {featuredCategories.map((category) => (
              <article
                key={category.id}
                className="relative flex h-[320px] items-end overflow-hidden bg-slate-700 p-8 md:h-[400px]"
              >
                {category.image_file ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={category.image_file}
                    alt={category.name}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-slate-800" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />
                <h2 className="relative text-2xl font-bold leading-tight">
                  {category.name}
                </h2>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Products list section */}
      <section id="products" className="w-full bg-white py-20 md:py-24">
        <div className="container mx-auto w-full px-4">
          <div className="mb-8 flex flex-col gap-5 border-b border-[#3d3d3d] pb-4 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="text-4xl font-bold uppercase text-[#3d3d3d]">
              Tất Cả Sản Phẩm
            </h2>
            <button className="flex h-12 w-full items-center justify-between border border-[#b7b7b7] px-5 text-left text-sm text-[#3d3d3d] lg:w-[360px]">
              <span>Sắp xếp theo : Mức độ liên quan</span>
              <ChevronDown className="size-6" aria-hidden="true" />
            </button>
          </div>

          <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
            <aside className="space-y-4 pt-1 text-[#00aeef]">
              {adminCategories.map((category) => (
                <a
                  href="#products"
                  key={category.id}
                  className="flex items-center gap-2 font-bold"
                >
                  <Folder className="size-4 fill-current" aria-hidden="true" />
                  {category.name}
                </a>
              ))}
            </aside>

            <div>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {adminProducts.map((product, index) => (
                  <ProductCard key={product.id || index} product={product} />
                ))}
              </div>

              <div className="mt-16 text-center">
                <button className="inline-flex h-14 min-w-[272px] items-center justify-center border border-[#00aeef] px-8 text-xl font-bold uppercase text-[#00aeef]">
                  Xem Thêm Sản Phẩm
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}