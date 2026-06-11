import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { adminModules } from "../admin-cms-data";
import CmsTable from "../components/cms-table";

type PageProps = {
  params: Promise<{
    section: string;
  }>;
};

async function getRows(table: string) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return [];
  }

  const { data } = await supabase
    .from(table)
    .select("*")
    .order("sort_order", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false })
    .limit(12);

  return data ?? [];
}

export function generateStaticParams() {
  return adminModules.map((module) => ({
    section: module.key,
  }));
}

export default async function AdminSectionPage({ params }: PageProps) {
  const { section } = await params;
  const cmsModule = adminModules.find((item) => item.key === section);

  if (!cmsModule) {
    notFound();
  }

  const rows = await getRows(cmsModule.table);

  return (
    <main className="min-h-full bg-gray-100 pb-16 text-slate-900">
      <header className="flex h-[72px] items-center border-b border-slate-200 bg-white px-8 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-slate-500 transition-colors hover:text-[#1a73e8]">
            Dashboard
          </Link>
          <span className="text-slate-300">/</span>
          <span className="font-semibold text-slate-800">{cmsModule.title}</span>
        </div>
      </header>

      <section className="px-8 pt-8">
        <div className="mb-8 relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 shadow-xl lg:p-10">
          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-4 text-white">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-sm ring-1 ring-white/20">
                  {cmsModule.icon ? <cmsModule.icon className="h-7 w-7" /> : <span className="text-2xl font-bold">{cmsModule.badge.slice(0, 1)}</span>}
                </div>
                <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
                  {cmsModule.title}
                </h1>
              </div>
              <p className="max-w-2xl text-blue-100 text-lg">
                {cmsModule.description}
              </p>
            </div>
          </div>
          
          <div className="absolute right-0 top-0 -translate-y-12 translate-x-12 opacity-10 blur-2xl">
            <div className="h-64 w-64 rounded-full bg-white"></div>
          </div>
          <div className="absolute bottom-0 right-32 translate-y-1/2 opacity-10 blur-3xl">
            <div className="h-48 w-48 rounded-full bg-pink-400"></div>
          </div>
        </div>
      </section>

      <section className="px-8">
        <CmsTable module={(({ icon, ...rest }) => rest)(cmsModule)} data={rows} />
      </section>
    </main>
  );
}
