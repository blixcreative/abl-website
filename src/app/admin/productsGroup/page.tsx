import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { adminModules } from "../admin-cms-data";
import CmsTable from "../components/cms-table";

type PageProps = {
  searchParams: Promise<{
    tab?: string;
  }>;
};

async function getRows(table: string) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];
  
  let query = supabase.from(table).select("*");
  
  if (table !== "cms_products") {
    query = query.order("sort_order", { ascending: true, nullsFirst: false });
  }
  
  query = query.order("created_at", { ascending: false }).limit(1000);
  
  const { data } = await query;
  return data ?? [];
}

export default async function AdminProductsGroupPage({ searchParams }: PageProps) {
  const { tab } = await searchParams;

  const productsModules = adminModules.filter((m) => 
    ["productBanner", "products", "productCategories"].includes(m.key)
  );

  // Mặc định chọn thành phần đầu tiên nếu không có tab trong URL
  const activeModule = productsModules.find((m) => m.key === tab) || productsModules[0] || null;

  let rows: any[] = [];

  if (activeModule) {
    rows = await getRows(activeModule.table);
  }

  return (
    <main className="min-h-full bg-gray-100 text-slate-900">
      <header className="flex items-center px-8 pt-8">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-slate-500 transition-colors hover:text-[#1a73e8]">
            Dashboard
          </Link>
          <span className="text-slate-300">/</span>
          <span className="font-semibold text-slate-800">Sản phẩm</span>
        </div>
      </header>

      <section className="px-8 pt-8 flex flex-col lg:flex-row gap-8 items-start">
        <aside className="w-full lg:w-[320px] shrink-0 sticky top-8">

          <nav className="flex flex-col gap-2 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
            {productsModules.map((module) => {
              const isActive = module.key === activeModule?.key;
              return (
                <Link
                  key={module.key}
                  href={`/admin/productsGroup?tab=${module.key}`}
                  className={`group flex items-center gap-3 rounded-lg p-3 transition-all ${
                    isActive ? "bg-blue-50 ring-1 ring-blue-200" : "hover:bg-slate-50"
                  }`}
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    isActive ? "bg-blue-600 text-white shadow-md" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                  }`}>
                    {module.icon ? <module.icon className="h-5 w-5" /> : <span className="font-bold">{module.badge.slice(0,1)}</span>}
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-sm font-bold transition-colors ${
                      isActive ? "text-blue-700" : "text-slate-700 group-hover:text-slate-900"
                    }`}>
                      {module.title}
                    </h4>
                    <p className={`text-xs ${isActive ? "text-blue-500/80" : "text-slate-500"}`}>
                      {module.badge}
                    </p>
                  </div>
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="flex-1 w-full min-w-0">
          {!activeModule ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50/50 p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm mb-4 text-2xl">
                🖱️
              </div>
              <h3 className="text-xl font-bold text-slate-800">Chọn thành phần để quản lý</h3>
              <p className="mt-2 text-slate-500 max-w-sm">
                Vui lòng chọn một trong các mục ở sidebar bên trái để bắt đầu chỉnh sửa nội dung.
              </p>
            </div>
          ) : (
            <CmsTable module={(({ icon, ...rest }) => rest)(activeModule)} data={rows} />
          )}
        </div>
      </section>
    </main>
  );
}