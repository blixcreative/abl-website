import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  ChevronRight,
  FileText,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import ProductGallery from "./ProductGallery";

function GrayImage({ className = "", src }: { className?: string, src?: string | null }) {
  if (src) {
    return (
      <div
        className={`flex items-center justify-center overflow-hidden bg-white border border-[#b7b7b7] ${className}`}
      >
        <img src={src} alt="Product Image" className="max-w-full max-h-full object-contain" />
      </div>
    );
  }
  return (
    <div
      className={`flex items-center justify-center overflow-hidden bg-[#eeeeee] border border-[#b7b7b7] ${className}`}
      aria-label="Khu vực hình ảnh sản phẩm"
    >
      <div className="h-1/3 w-2/3 rounded-full bg-white/35 blur-sm" />
    </div>
  );
}

function SectionHeading({ children, id }: { children: string; id?: string }) {
  return (
    <h2
      id={id}
      className="border-b border-[#3d3d3d] pb-3 text-3xl font-bold uppercase leading-tight text-[#3d3d3d]"
    >
      {children}
    </h2>
  );
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const supabase = await createSupabaseServerClient();
  if (!supabase) return notFound();

  const { data: product } = await supabase
    .from("cms_products")
    .select(`
      *,
      cms_product_categories(id, name, level, parent_id)
    `)
    .eq("id", id)
    .single();

  if (!product) {
    return notFound();
  }

  let rootCategoryId = product.cms_product_categories?.id;
  let rootCategoryName = product.cms_product_categories?.name || "Danh mục";
  let currentLevel = product.cms_product_categories?.level;
  let parentId = product.cms_product_categories?.parent_id;

  // Nếu là danh mục con, tìm lên danh mục cha level 0
  // Dùng vòng lặp an toàn giới hạn tối đa 5 cấp độ để tránh loop vô hạn
  let depth = 0;
  while ((currentLevel > 0 || currentLevel === "1" || currentLevel === "2") && parentId && depth < 5) {
    const { data: parentCat } = await supabase
      .from("cms_product_categories")
      .select("id, name, level, parent_id")
      .eq("id", parentId)
      .single();
    
    if (parentCat) {
      rootCategoryId = parentCat.id;
      rootCategoryName = parentCat.name;
      currentLevel = parentCat.level;
      parentId = parentCat.parent_id;
    } else {
      break;
    }
    depth++;
  }

  const categoryName = rootCategoryName;
  const categoryUrl = rootCategoryId ? `/products/category-list/${rootCategoryId}` : "/products";
  const fallbackImage = categoryName.toLowerCase().includes("nhám") ? "/images/product-3.png" : "/images/product-1.png";

  // Parse images if needed
  let imagesList: string[] = [];
  try {
    if (Array.isArray(product.images)) {
      imagesList = product.images;
    } else if (typeof product.images === "string") {
      const parsed = JSON.parse(product.images);
      if (Array.isArray(parsed)) imagesList = parsed;
    }
  } catch(e) {
    // ignore
  }

  const mainImage = product.main_image_url || product.image_base64 || imagesList[0] || fallbackImage;

  const { data: relatedProductsData } = await supabase
    .from("cms_products")
    .select("*")
    .eq("category_id", product.category_id)
    .neq("id", product.id)
    .limit(4);

  return (
    <main className="mx-auto w-full bg-white text-[#3d3d3d]">
      <Header />

      <div className="container mx-auto w-full px-4 py-10">
        <nav
          aria-label="Breadcrumb"
          className="mb-10 border-b border-[#3d3d3d] pb-5 text-base text-[#4a4a4a] md:text-xl"
        >
          <ol className="flex flex-wrap items-center gap-2">
            {[
              { label: "Sản Phẩm", href: "/products" },
              { label: categoryName, href: categoryUrl }
            ].map(
              (item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Link href={item.href} className="underline underline-offset-2 hover:text-[#00aeef]">
                    {item.label}
                  </Link>
                  <ChevronRight className="size-5" aria-hidden="true" />
                </li>
              ),
            )}
            <li>
              <span className="font-bold">
                {product.name}
              </span>
            </li>
          </ol>
        </nav>

        <h1 className="mb-5 text-4xl font-bold uppercase leading-tight text-[#3d3d3d] md:text-5xl">
          {product.name}
        </h1>
        {/* {product.sku && <p className="mb-8 text-xl text-gray-500">Mã: {product.sku}</p>} */}

        <div className="mb-8 flex flex-wrap bg-[#153d4b] text-white">
          {[
            ["Chi Tiết Sản Phẩm", "#chi-tiet-san-pham"],
            ["Tài Liệu & Bài Viết", "#tai-lieu-bai-viet"],
            ["Liên Hệ Tư Vấn & Báo Giá", "#lien-he"],
            ["Sản Phẩm Liên Quan", "#san-pham-lien-quan"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="px-6 py-5 text-lg transition-colors hover:bg-[#00aeef] md:px-8 md:text-xl"
            >
              {label}
            </a>
          ))}
        </div>

        <section className="grid gap-10 lg:grid-cols-[520px_1fr] lg:items-start">
          <ProductGallery images={imagesList} mainImage={mainImage} />

          <div className="pt-1">
            <h2 className="text-3xl font-bold uppercase text-[#3d3d3d]">
              Mô Tả Sản Phẩm
            </h2>
            <div className="mt-3 text-xl leading-relaxed text-[#4a4a4a] whitespace-pre-wrap">
              <strong>{product.sku || product.name}</strong> - {product.short_description || product.description}
            </div>

            <div className="mt-10">
              <h2 className="text-3xl font-bold uppercase text-[#3d3d3d]">
                Tài Liệu Kỹ Thuật
              </h2>
              <div className="mt-4 flex flex-wrap gap-x-12 gap-y-3 text-base">
                {product.datasheet_url ? (
                  <a
                    href={product.datasheet_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 underline underline-offset-2 hover:text-[#00aeef]"
                  >
                    <FileText className="size-5" aria-hidden="true" />
                    Tải Datasheet (PDF)
                  </a>
                ) : (
                  <span className="text-gray-500 italic">Đang cập nhật tài liệu</span>
                )}
              </div>
            </div>

            <a
              href="#lien-he"
              className="mt-10 inline-flex h-16 w-full items-center justify-center bg-[#00aeef] px-8 text-xl font-bold uppercase text-white hover:bg-[#075f74] transition-colors"
            >
              Liên Hệ Tư Vấn & Báo Giá
            </a>
          </div>
        </section>

        <section className="mt-24" aria-labelledby="chi-tiet-san-pham">
          <SectionHeading id="chi-tiet-san-pham">
            Chi Tiết Sản Phẩm
          </SectionHeading>
          <div className="mt-3">
            {[
              ["Tên sản phẩm", product.name],
              ["Mã sản phẩm (SKU)", product.sku],
              ["Danh mục", categoryName],
              ["Đặc tính", product.features || product.description],
              ["Quy cách đóng gói", product.specifications],
            ]
              .filter(([, value]) => value) // Chỉ hiển thị các dòng có dữ liệu
              .map(([label, value]) => (
                <div
                  key={label}
                  className="grid gap-3 border-b border-[#c7c7c7] py-4 text-lg md:grid-cols-[360px_1fr]"
                >
                  <dt className="font-bold">{label}</dt>
                  <dd className="whitespace-pre-wrap">{value}</dd>
                </div>
              ))}
          </div>
        </section>

        <section className="mt-24" aria-labelledby="tai-lieu-bai-viet">
          <SectionHeading id="tai-lieu-bai-viet">
            Tài Liệu & Bài Viết
          </SectionHeading>

          <div className="mt-10 flex flex-wrap gap-10 text-xl border-b border-gray-200 pb-4">
            <button className="border-b-4 border-[#006f95] pb-4 font-bold text-[#006f95] -mb-[20px]">
              Tài Liệu Kỹ Thuật
            </button>
          </div>

          <div className="mt-10">
            <h3 className="text-xl font-bold uppercase">{product.name}</h3>
            {product.datasheet_url ? (
               <a
                 href={product.datasheet_url}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="mt-5 inline-flex items-center gap-3 text-lg underline underline-offset-2 hover:text-[#00aeef]"
               >
                 <FileText className="size-5" aria-hidden="true" />
                 Tài Liệu Kỹ Thuật / Datasheet (PDF)
               </a>
            ) : (
               <p className="mt-5 text-lg italic text-gray-500">Đang cập nhật...</p>
            )}
          </div>
        </section>

        <section className="mt-24" aria-labelledby="lien-he">
          <SectionHeading id="lien-he">Liên Hệ Tư Vấn & Báo Giá</SectionHeading>

          <form className="mt-10 border border-[#e5e5e5] px-6 py-8 md:px-8">
            <div className="mb-10 grid gap-8 md:grid-cols-[220px_1fr]">
              <div>
                <h3 className="mb-6 text-2xl font-bold">{product.name}</h3>
                <GrayImage className="h-[120px] w-full" src={mainImage} />
              </div>

              <div className="grid gap-5 text-xl md:grid-cols-2">
                {[
                  ["Mã sản phẩm", product.sku || product.name],
                  ["Danh mục", categoryName],
                  ["Đặc tính", product.features || product.description || "Đang cập nhật"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <h4 className="font-bold">{label}</h4>
                    <p className="line-clamp-2" title={value}>{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              {[
                ["Họ tên", "Nhập họ tên của bạn"],
                ["Số điện thoại", "Nhập số điện thoại của bạn"],
                ["Email", "Nhập email liên hệ"],
              ].map(([label, placeholder]) => (
                <label key={label} className="block text-lg font-bold">
                  {label}
                  <input
                    placeholder={placeholder}
                    className="mt-2 h-14 w-full border border-[#222] px-4 font-normal outline-none focus:border-[#00aeef]"
                  />
                </label>
              ))}

              <label className="block text-lg font-bold">
                Nội dung liên hệ
                <textarea
                  placeholder="Nhập những vấn đề bạn cần chúng tôi giải đáp"
                  className="mt-2 h-32 w-full resize-none border border-[#222] px-4 py-4 font-normal outline-none focus:border-[#00aeef]"
                  defaultValue={`Tôi cần tư vấn thêm về sản phẩm ${product.name} (SKU: ${product.sku || 'N/A'})`}
                />
              </label>

              <div className="pt-8 text-center">
                <button type="button" className="h-14 min-w-[285px] border border-[#00aeef] px-8 text-xl font-bold uppercase text-[#00aeef] hover:bg-[#00aeef] hover:text-white transition-colors">
                  Gửi Yêu Cầu
                </button>
              </div>
            </div>
          </form>
        </section>

        <section className="mt-24" aria-labelledby="san-pham-lien-quan">
          <SectionHeading id="san-pham-lien-quan">
            Sản Phẩm Tương Tự
          </SectionHeading>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {relatedProductsData && relatedProductsData.length > 0 ? (
              relatedProductsData.map((related: any) => {
                let relatedImage = fallbackImage;
                if (related.main_image_url || related.image_base64) {
                  relatedImage = related.main_image_url || related.image_base64;
                } else if (related.images) {
                  try {
                    const p = typeof related.images === "string" ? JSON.parse(related.images) : related.images;
                    if (Array.isArray(p) && p.length > 0) relatedImage = p[0];
                  } catch (e) {}
                }

                return (
                  <article
                    key={related.id}
                    className="flex min-h-[420px] flex-col border border-[#e5e5e5] bg-white px-6 pb-7 pt-7 hover:shadow-md transition-shadow"
                  >
                    <Link href={`/products/${related.id}`} className="mb-auto h-[220px] w-full flex justify-center items-center">
                      <img src={relatedImage} alt={related.name} className="max-w-full max-h-full object-contain" />
                    </Link>

                    <div className="pt-8">
                      <h3 className="border-b border-[#777] pb-3 text-xl font-bold leading-tight">
                        <Link href={`/products/${related.id}`} className="hover:text-[#00aeef]">
                          {related.name}
                        </Link>
                      </h3>

                      <div className="mt-3 grid grid-cols-2 gap-5 text-sm leading-relaxed">
                        <div>
                          <h4 className="font-bold">Đặc tính</h4>
                          <p className="line-clamp-3">{related.description || related.features || "Đang cập nhật"}</p>
                        </div>
                        <div>
                          <h4 className="font-bold">Quy cách</h4>
                          <p className="line-clamp-3">{related.specifications || "Đang cập nhật"}</p>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })
            ) : (
              <p className="text-gray-500 italic">Chưa có sản phẩm tương tự nào.</p>
            )}
          </div>
        </section>
      </div>


      <Footer />
    </main>
  );
}