import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  updateAboutBanner,
  updateAboutDirector,
  updateAboutVisionMission,
} from "./actions";
import { SubmitButton } from "./submit-button";
import Link from "next/link";
import CmsTable, { SafeAdminModule } from "../components/cms-table";

const miniSlideModule: SafeAdminModule = {
  key: "about_mini_slides",
  title: "4. Năng lực / Thống kê (Mini Slides)",
  subtitle: "Quản lý các slide năng lực, thống kê hiển thị trên trang Giới thiệu.",
  badge: "Năng lực",
  description: "",
  table: "cms_about_mini_slide",
  fields: [
    { name: "title", label: "Tiêu đề", type: "text", required: true },
    { name: "image_url", label: "Hình ảnh", type: "file", required: true },
    { name: "description", label: "Mô tả", type: "textarea", required: true, fullWidth: true },
  ],
};

const partnerModule: SafeAdminModule = {
  key: "about_partners",
  title: "5. Đối tác / Khách hàng",
  subtitle: "Quản lý danh sách logo đối tác và khách hàng.",
  badge: "Đối tác",
  description: "",
  table: "cms_about_partner",
  fields: [
    { name: "name", label: "Tên đối tác", type: "text", required: true },
    { name: "image_file", label: "Logo đối tác", type: "file", required: true },
  ],
};

const awardModule: SafeAdminModule = {
  key: "about_awards",
  title: "6. Giải thưởng / Chứng nhận",
  subtitle: "Quản lý danh sách giải thưởng, chứng nhận của công ty.",
  badge: "Giải thưởng",
  description: "",
  table: "cms_about_award",
  fields: [
    { name: "title", label: "Tiêu đề giải thưởng", type: "text", required: true },
    { name: "image_url", label: "Hình ảnh / Chứng nhận", type: "file", required: true },
    { name: "description", label: "Mô tả", type: "textarea", required: true, fullWidth: true },
  ],
};

export default async function AboutAdminPage() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return <div>Unauthorized</div>;

  const [{ data: banners }, { data: directors }, { data: visions }, { data: slides }, { data: partners }, { data: awards }] = await Promise.all([
    supabase.from("cms_about_banner").select("*").limit(1),
    supabase.from("cms_about_director").select("*").limit(1),
    supabase.from("cms_about_vision_mission").select("*").limit(1),
    supabase.from("cms_about_mini_slide").select("*").order("sort_order", { ascending: true }),
    supabase.from("cms_about_partner").select("*").order("sort_order", { ascending: true }),
    supabase.from("cms_about_award").select("*").order("sort_order", { ascending: true }),
  ]);

  const banner = banners?.[0] || null;
  const director = directors?.[0] || null;
  const vision = visions?.[0] || null;

  return (
    <main className="min-h-full bg-gray-100 text-slate-900 pb-20">
      <header className="flex items-center px-8 pt-8 pb-4">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-slate-500 transition-colors hover:text-[#1a73e8]">
            Dashboard
          </Link>
          <span className="text-slate-300">/</span>
          <span className="font-semibold text-slate-800">Trang Giới thiệu</span>
        </div>
      </header>

      <div className="px-8 space-y-8">
        
        {/* Banner Section */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-[#1a73e8]">1. Banner Giới thiệu</h2>
          <form action={updateAboutBanner} className="space-y-4">
            <input type="hidden" name="id" value={banner?.id || ""} />
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tiêu đề</label>
                <input type="text" name="title" defaultValue={banner?.title || ""} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Hình ảnh (Upload)</label>
                <div className="flex items-center gap-4">
                  {banner?.image_url && <img src={banner.image_url} alt="Banner" className="h-10 w-20 object-cover rounded" />}
                  <input type="file" name="image_url" accept="image/*" className="w-full border rounded px-3 py-1.5 text-sm" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mô tả ngắn</label>
              <textarea name="description" defaultValue={banner?.description || ""} className="w-full border rounded px-3 py-2 min-h-[80px]" />
            </div>
            <div className="text-right">
              <SubmitButton>Cập nhật Banner</SubmitButton>
            </div>
          </form>
        </section>

        {/* Thông điệp Giám đốc Section */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-[#1a73e8]">2. Thông điệp Giám đốc</h2>
          <form action={updateAboutDirector} className="space-y-4">
            <input type="hidden" name="id" value={director?.id || ""} />
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tên Giám đốc</label>
                <input type="text" name="name" defaultValue={director?.name || ""} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Ảnh đại diện (Upload)</label>
                <div className="flex items-center gap-4">
                  {director?.image_url && <img src={director.image_url} alt="Director" className="h-10 w-10 object-cover rounded-full" />}
                  <input type="file" name="image_url" accept="image/*" className="w-full border rounded px-3 py-1.5 text-sm" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Thông điệp / Trích dẫn</label>
              <textarea name="quote" defaultValue={director?.quote || ""} className="w-full border rounded px-3 py-2 min-h-[100px]" />
            </div>
            <div className="text-right">
              <SubmitButton>Cập nhật Thông điệp</SubmitButton>
            </div>
          </form>
        </section>

        {/* Tầm nhìn / Sứ mệnh Section */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-[#1a73e8]">3. Tầm nhìn & Sứ mệnh</h2>
          <form action={updateAboutVisionMission} className="space-y-6">
            <input type="hidden" name="id" value={vision?.id || ""} />
            
            <div className="border-b pb-4">
              <h3 className="font-semibold mb-3">Tầm nhìn (Vision)</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nội dung Tầm nhìn</label>
                  <textarea name="vision_text" defaultValue={vision?.vision_text || ""} className="w-full border rounded px-3 py-2 min-h-[100px]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Ảnh Tầm nhìn (Upload)</label>
                  <div className="space-y-2">
                    {vision?.vision_image_url && <img src={vision.vision_image_url} alt="Vision" className="h-20 w-32 object-cover rounded" />}
                    <input type="file" name="vision_image_url" accept="image/*" className="w-full border rounded px-3 py-1.5 text-sm" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Sứ mệnh (Mission)</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nội dung Sứ mệnh</label>
                  <textarea name="mission_text" defaultValue={vision?.mission_text || ""} className="w-full border rounded px-3 py-2 min-h-[100px]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Ảnh Sứ mệnh (Upload)</label>
                  <div className="space-y-2">
                    {vision?.mission_image_url && <img src={vision.mission_image_url} alt="Mission" className="h-20 w-32 object-cover rounded" />}
                    <input type="file" name="mission_image_url" accept="image/*" className="w-full border rounded px-3 py-1.5 text-sm" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <SubmitButton>Cập nhật Tầm nhìn & Sứ mệnh</SubmitButton>
            </div>
          </form>
        </section>

        <CmsTable module={miniSlideModule} data={slides || []} />
        
        <CmsTable module={partnerModule} data={partners || []} />
        
        <CmsTable module={awardModule} data={awards || []} />

      </div>
    </main>
  );
}