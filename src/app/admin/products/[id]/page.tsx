import { notFound } from "next/navigation";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import ProductForm from "./product-form";

export default async function AdminProductEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return <div>Không thể kết nối cơ sở dữ liệu</div>;
  }

  let product = null;

  if (!isNew) {
    const { data, error } = await supabase
      .from("cms_products")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      notFound();
    }
    product = data;
  }

  // Lấy dữ liệu cho dropdowns
  const [{ data: categories }, { data: docs }, { data: products }] = await Promise.all([
    supabase.from("cms_product_categories").select("id, name"),
    supabase.from("cms_technical_documents").select("id, title, document_type"),
    supabase.from("cms_products").select("id, name, sku"),
  ]);

  return (
    <main className="min-h-full bg-gray-50 pb-16 text-slate-900">
      <header className="flex h-[72px] items-center border-b border-slate-200 bg-white px-8 shadow-sm sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/productsGroup?tab=products"
            className="text-slate-500 transition-colors hover:text-[#1a73e8]"
          >
            Sản phẩm
          </Link>
          <span className="text-slate-300">/</span>
          <span className="font-semibold text-slate-800">
            {isNew ? "Thêm mới sản phẩm" : `Chỉnh sửa: ${product?.name}`}
          </span>
        </div>
      </header>

      <section className="px-8 pt-8 max-w-6xl mx-auto">
        <ProductForm
          initialData={product}
          categories={categories || []}
          docs={docs || []}
          products={products || []}
        />
      </section>
    </main>
  );
}