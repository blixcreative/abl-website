import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  updateAboutBanner,
  updateAboutDirector,
  updateAboutVisionMission,
  upsertAboutMiniSlide,
  deleteAboutMiniSlide,
  upsertAboutPartner,
  deleteAboutPartner,
  upsertAboutAward,
  deleteAboutAward,
} from "./actions";
import { SubmitButton } from "./submit-button";
import Link from "next/link";

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

        {/* Mini Slides (Thống kê / Năng lực) Section */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-[#1a73e8]">4. Năng lực / Thống kê (Mini Slides)</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {slides?.map((item) => (
              <div key={item.id} className="border rounded-md p-4 relative bg-slate-50">
                <form action={deleteAboutMiniSlide} className="absolute top-2 right-2 z-10">
                  <input type="hidden" name="id" value={item.id} />
                  <SubmitButton variant="danger" className="!px-2 !py-1 text-xs">Xóa</SubmitButton>
                </form>
                <form action={upsertAboutMiniSlide} className="space-y-3 mt-2">
                  <input type="hidden" name="id" value={item.id} />
                  <div>
                    <label className="block text-xs font-medium mb-1">Tiêu đề</label>
                    <input type="text" name="title" defaultValue={item.title} className="w-full border rounded px-2 py-1 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Mô tả</label>
                    <textarea name="description" defaultValue={item.description} className="w-full border rounded px-2 py-1 text-sm min-h-[60px]" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Thứ tự</label>
                    <input type="number" name="sort_order" defaultValue={item.sort_order} className="w-full border rounded px-2 py-1 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Đổi ảnh</label>
                    <div className="flex flex-col gap-2">
                      {item.image_url && <img src={item.image_url} alt="" className="h-12 w-12 object-contain bg-white border" />}
                      <input type="file" name="image_url" accept="image/*" className="w-full border rounded px-2 py-1 text-xs" />
                    </div>
                  </div>
                  <div className="pt-2">
                    <SubmitButton className="w-full">Cập nhật</SubmitButton>
                  </div>
                </form>
              </div>
            ))}
            
            {/* Form thêm mới */}
            <div className="border border-dashed border-blue-300 rounded-md p-4 bg-blue-50/30">
              <h3 className="font-semibold text-sm mb-3 text-blue-700">Thêm mục mới</h3>
              <form action={upsertAboutMiniSlide} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium mb-1">Tiêu đề</label>
                  <input type="text" name="title" required className="w-full border rounded px-2 py-1 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Mô tả</label>
                  <textarea name="description" required className="w-full border rounded px-2 py-1 text-sm min-h-[60px]" />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Thứ tự</label>
                  <input type="number" name="sort_order" defaultValue={0} className="w-full border rounded px-2 py-1 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Hình ảnh</label>
                  <input type="file" name="image_url" required accept="image/*" className="w-full border rounded px-2 py-1 text-xs bg-white" />
                </div>
                <div className="pt-2">
                  <SubmitButton className="w-full">Thêm mới</SubmitButton>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Đối tác Section */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-[#1a73e8]">5. Đối tác / Khách hàng</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partners?.map((item) => (
              <div key={item.id} className="border rounded-md p-4 relative bg-slate-50 flex flex-col justify-between">
                <form action={deleteAboutPartner} className="absolute top-2 right-2 z-10">
                  <input type="hidden" name="id" value={item.id} />
                  <SubmitButton variant="danger" className="!px-2 !py-1 text-xs">Xóa</SubmitButton>
                </form>
                <form action={upsertAboutPartner} className="space-y-3 mt-2">
                  <input type="hidden" name="id" value={item.id} />
                  <div>
                    <label className="block text-xs font-medium mb-1">Tên đối tác</label>
                    <input type="text" name="name" defaultValue={item.name} className="w-full border rounded px-2 py-1 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Thứ tự</label>
                    <input type="number" name="sort_order" defaultValue={item.sort_order} className="w-full border rounded px-2 py-1 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Đổi logo</label>
                    <div className="flex flex-col gap-2">
                      {item.image_file && <img src={item.image_file} alt="" className="h-10 w-full object-contain bg-white border p-1" />}
                      <input type="file" name="image_file" accept="image/*" className="w-full border rounded px-2 py-1 text-xs" />
                    </div>
                  </div>
                  <div className="pt-2">
                    <SubmitButton className="w-full">Cập nhật</SubmitButton>
                  </div>
                </form>
              </div>
            ))}
            
            {/* Form thêm mới */}
            <div className="border border-dashed border-blue-300 rounded-md p-4 bg-blue-50/30">
              <h3 className="font-semibold text-sm mb-3 text-blue-700">Thêm đối tác mới</h3>
              <form action={upsertAboutPartner} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium mb-1">Tên đối tác</label>
                  <input type="text" name="name" required className="w-full border rounded px-2 py-1 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Thứ tự</label>
                  <input type="number" name="sort_order" defaultValue={0} className="w-full border rounded px-2 py-1 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Logo</label>
                  <input type="file" name="image_file" required accept="image/*" className="w-full border rounded px-2 py-1 text-xs bg-white" />
                </div>
                <div className="pt-2 mt-auto">
                  <SubmitButton className="w-full">Thêm mới</SubmitButton>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Giải thưởng Section */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-[#1a73e8]">6. Giải thưởng / Chứng nhận</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {awards?.map((item) => (
              <div key={item.id} className="border rounded-md p-4 relative bg-slate-50">
                <form action={deleteAboutAward} className="absolute top-2 right-2 z-10">
                  <input type="hidden" name="id" value={item.id} />
                  <SubmitButton variant="danger" className="!px-2 !py-1 text-xs">Xóa</SubmitButton>
                </form>
                <form action={upsertAboutAward} className="space-y-3 mt-2">
                  <input type="hidden" name="id" value={item.id} />
                  <div>
                    <label className="block text-xs font-medium mb-1">Tiêu đề</label>
                    <input type="text" name="title" defaultValue={item.title} className="w-full border rounded px-2 py-1 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Mô tả</label>
                    <textarea name="description" defaultValue={item.description} className="w-full border rounded px-2 py-1 text-sm min-h-[60px]" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Thứ tự</label>
                    <input type="number" name="sort_order" defaultValue={item.sort_order} className="w-full border rounded px-2 py-1 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Đổi ảnh</label>
                    <div className="flex flex-col gap-2">
                      {item.image_url && <img src={item.image_url} alt="" className="h-16 w-full object-contain bg-white border" />}
                      <input type="file" name="image_url" accept="image/*" className="w-full border rounded px-2 py-1 text-xs" />
                    </div>
                  </div>
                  <div className="pt-2">
                    <SubmitButton className="w-full">Cập nhật</SubmitButton>
                  </div>
                </form>
              </div>
            ))}
            
            {/* Form thêm mới */}
            <div className="border border-dashed border-blue-300 rounded-md p-4 bg-blue-50/30">
              <h3 className="font-semibold text-sm mb-3 text-blue-700">Thêm giải thưởng mới</h3>
              <form action={upsertAboutAward} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium mb-1">Tiêu đề</label>
                  <input type="text" name="title" required className="w-full border rounded px-2 py-1 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Mô tả</label>
                  <textarea name="description" required className="w-full border rounded px-2 py-1 text-sm min-h-[60px]" />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Thứ tự</label>
                  <input type="number" name="sort_order" defaultValue={0} className="w-full border rounded px-2 py-1 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Hình ảnh</label>
                  <input type="file" name="image_url" required accept="image/*" className="w-full border rounded px-2 py-1 text-xs bg-white" />
                </div>
                <div className="pt-2">
                  <SubmitButton className="w-full">Thêm mới</SubmitButton>
                </div>
              </form>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}