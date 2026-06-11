import Link from "next/link";
import { adminModules } from "./admin-cms-data";
import { LayoutDashboard } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden  text-slate-900">

      <aside className="hidden w-[280px] shrink-0 flex-col shadow-sm lg:flex bg-gray-200 p-8 gap-8">

        <div className="flex shrink-0 items-center">
            <span className="text-lg font-bold text-slate-800">
              Quản lý nội dung
            </span>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto gap-2 flex flex-col">
          <Link
            href="/admin"
            className="group flex items-center gap-3 rounded-lg py-2.5 text-md font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-[#1a73e8]"
          >
            <LayoutDashboard className="h-3.5 w-3.5" />
            Dashboard
          </Link>

          {adminModules
            .filter(
              (m) =>
                ![
                  "homeHero",
                  "homePartner",
                  "homeSolution",
                  "homeMiniSlide",
                  "homeProductCategories",
                  "productBanner",
                  "products",
                  "productCategories",
                ].includes(m.key)
            )
            .map((module) => {
              const Icon = module.icon;
              return (
                <Link
                  key={module.key}
                  href={`/admin/${module.key}`}
                  className="group flex items-center gap-2 rounded-lg py-2.5 text-md font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-[#1a73e8]"
                >
                  {Icon ? <Icon className="h-3.5 w-3.5" /> : module.badge.slice(0, 1)}
                  {module.title}
                </Link>
              );
            })}
        </nav>

        <div className="border-t border-slate-100 p-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-200">
              <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Admin" alt="Admin" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Admin User</p>
              <p className="text-xs text-slate-500">admin@abl.com</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        {children}
      </div>
    </div>
  );
}