import Link from "next/link";
import { adminModules } from "./admin-cms-data";

export default function AdminDashboardPage() {
  return (
    <main className="h-full pb-16 text-slate-900">
      <section className="px-8 pt-8">
        <div className="mb-8 relative overflow-hidden ">
          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
              Welcome back, Admin 👋
            </h2>
            <p className="mt-3 max-w-xl text-lg">
              Trang tổng quan hệ thống quản lý nội dung. Tại đây bạn có thể kiểm soát, chỉnh sửa và thêm mới toàn bộ dữ liệu trên website.
            </p>
          </div>
          <div className="absolute right-0 top-0 -translate-y-12 translate-x-12 opacity-10 blur-2xl">
            <div className="h-64 w-64 rounded-full bg-white"></div>
          </div>
          <div className="absolute bottom-0 right-32 translate-y-1/2 opacity-10 blur-3xl">
            <div className="h-48 w-48 rounded-full bg-pink-400"></div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {adminModules.filter(m => !["homeHero", "homePartner", "homeSolution"].includes(m.key)).map((module) => (
            <Link
              key={module.key}
              href={`/admin/${module.key}`}
              className="group relative flex flex-col overflow-hidden rounded-3xl bg-slate-100 p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_30px_-4px_rgba(26,115,232,0.15)] hover:ring-2 hover:ring-blue-500/20"
            >              
              <div className="relative flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:from-blue-500 group-hover:to-indigo-600 group-hover:text-white">
                  {module.icon ? <module.icon className="h-7 w-7" /> : <span className="text-2xl font-bold">{module.badge.slice(0, 1)}</span>}
                </div>
              </div>

              <div className="relative mt-5 flex-1">
                <h4 className="text-lg font-bold text-slate-800 transition-colors group-hover:text-blue-700">{module.title}</h4>
                <p className="mt-2 text-sm text-slate-500 line-clamp-2">
                  {module.description ?? module.subtitle}
                </p>
              </div>

              <div className="relative mt-6 flex items-center justify-between pt-5">
                <span className="flex items-center gap-1.5 text-sm font-bold text-blue-600 opacity-80 transition-all group-hover:opacity-100">
                  Thiết lập 
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
