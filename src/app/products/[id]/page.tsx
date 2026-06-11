import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";
import {
  ChevronRight,
  FileText,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

const product = {
  name: "Keo sữa ABL - 130",
  code: "ABL - 130",
  brand: "ABL",
  category: "Keo Sữa 01 Thành Phần",
  description:
    "ABL - 130 được nghiên cứu và sản xuất chuyên biệt cho ngành dán veneer gỗ, mang lại độ bám dính cao, bề mặt láng mịn và đường keo trong suốt, giữ trọn vẹn vẻ đẹp tự nhiên của gỗ. Ưu điểm nổi bật với độ kết dính mạnh, tạo liên kết chắc chắn, hạn chế bong tróc. An toàn & thân thiện môi trường. Ứng dụng dễ dàng trong việc dán veneer gỗ tự nhiên trong sản xuất nội thất cao cấp. Phù hợp cho các nhà máy, xưởng sản xuất đồ gỗ xuất khẩu.",
  details: [
    ["Mã sản phẩm", "ABL - 130"],
    ["Thương hiệu", "ABL"],
    ["Giải pháp ứng dụng", "Dán veneer giấy, dán veneer gỗ, ghép nối đầu, ghép ngang"],
    ["Đặc tính", "Keo 01 thành phần, màu trắng sữa, dạng lỏng, khô mờ"],
    ["Nguồn gốc nguyên liệu chính", "Germany, Japan, Singapore"],
    ["Bảo quản", "Bảo quản ở nhiệt độ phòng, đậy kín sau khi sử dụng"],
    ["Quy cách sản phẩm", "Xô, phuy, IBC"],
    ["Dung tích thực", "20 lít/xô, 200 kg/phuy, 1000 kg/IBC"],
    ["Hướng dẫn sử dụng", "Xem trên bao bì sản phẩm"],
    ["Bảng tiêu chuẩn", "MSDS, TDS, COA"],
    ["Các chứng nhận", "SGS, Quatest 2"],
  ],
};

const relatedProducts = [
  "Keo sữa ABL - 310",
  "Keo sữa ABL - 320",
  "Keo sữa ABL - 323",
  "Keo sữa ABL - 410",
];

function GrayImage({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden bg-[#eeeeee] ${className}`}
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

export function generateStaticParams() {
  return [{ id: "abl-130" }];
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await params;

  return (
    <main className="mx-auto w-full bg-white text-[#3d3d3d]">
      <Header />

      <div className="container mx-auto w-full px-4 py-12 md:py-16">
        <nav
          aria-label="Breadcrumb"
          className="mb-10 border-b border-[#3d3d3d] pb-5 text-base text-[#4a4a4a] md:text-xl"
        >
          <ol className="flex flex-wrap items-center gap-2">
            {["Keo - Chất Đóng Rắn", "Keo Sữa", product.category].map(
              (item) => (
                <li key={item} className="flex items-center gap-2">
                  <Link href="/products" className="underline underline-offset-2">
                    {item}
                  </Link>
                  <ChevronRight className="size-5" aria-hidden="true" />
                </li>
              ),
            )}
            <li>
              <span className="underline underline-offset-2">
                {product.code}
              </span>
            </li>
          </ol>
        </nav>

        <h1 className="mb-5 text-4xl font-bold uppercase leading-tight text-[#3d3d3d] md:text-5xl">
          {product.name}
        </h1>

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
          <div className="grid gap-6 md:grid-cols-[96px_1fr]">
            <div className="grid grid-cols-4 gap-3 md:grid-cols-1">
              {[1, 2, 3, 4].map((item) => (
                <GrayImage
                  key={item}
                  className="aspect-square border border-[#b7b7b7]"
                />
              ))}
            </div>

            <div className="border border-[#b7b7b7] p-6">
              <GrayImage className="h-[360px] w-full" />
              <div className="mt-8 text-center">
                <span className="inline-flex rounded-full border border-[#3d3d3d] px-5 py-2 text-sm">
                  Di chuột vào ảnh để phóng to
                </span>
              </div>
            </div>
          </div>

          <div className="pt-1">
            <h2 className="text-3xl font-bold uppercase text-[#3d3d3d]">
              Mô Tả Sản Phẩm
            </h2>
            <p className="mt-3 text-xl leading-relaxed text-[#4a4a4a]">
              <strong>{product.code}</strong> {product.description}
            </p>

            <div className="mt-10">
              <h2 className="text-3xl font-bold uppercase text-[#3d3d3d]">
                Tài Liệu Kỹ Thuật
              </h2>
              <div className="mt-4 flex flex-wrap gap-x-12 gap-y-3 text-base">
                {["Tech Data Sheet (PDF)", "Safety Data Sheet (PDF)"].map(
                  (item) => (
                    <a
                      key={item}
                      href="#tai-lieu-bai-viet"
                      className="inline-flex items-center gap-3 underline underline-offset-2"
                    >
                      <FileText className="size-5" aria-hidden="true" />
                      {item}
                    </a>
                  ),
                )}
              </div>
            </div>

            <a
              href="#lien-he"
              className="mt-10 inline-flex h-16 w-full items-center justify-center bg-[#00aeef] px-8 text-xl font-bold uppercase text-white"
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
            {product.details.map(([label, value]) => (
              <div
                key={label}
                className="grid gap-3 border-b border-[#c7c7c7] py-4 text-lg md:grid-cols-[360px_1fr]"
              >
                <dt className="font-bold">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24" aria-labelledby="tai-lieu-bai-viet">
          <SectionHeading id="tai-lieu-bai-viet">
            Tài Liệu & Bài Viết
          </SectionHeading>

          <div className="mt-10 flex flex-wrap gap-10 text-xl">
            <button className="border-b-4 border-[#006f95] pb-4 font-bold text-[#006f95]">
              Tài Liệu Hướng Dẫn Sử Dụng
            </button>
            <button>Tài Liệu An Toàn Kỹ Thuật</button>
            <button>Bài Viết</button>
          </div>

          <div className="mt-10">
            <h3 className="text-xl font-bold uppercase">{product.name}</h3>
            <a
              href="#"
              className="mt-5 inline-flex items-center gap-3 text-lg underline underline-offset-2"
            >
              <FileText className="size-5" aria-hidden="true" />
              Tài Liệu Hướng Dẫn Sử Dụng (PDF)
            </a>
            <p className="mt-5 text-lg">Tên/Số tài liệu: ABL-130-HDSD</p>
          </div>
        </section>

        <section className="mt-24" aria-labelledby="lien-he">
          <SectionHeading id="lien-he">Liên Hệ Tư Vấn & Báo Giá</SectionHeading>

          <form className="mt-10 border border-[#e5e5e5] px-6 py-8 md:px-8">
            <div className="mb-10 grid gap-8 md:grid-cols-[220px_1fr]">
              <div>
                <h3 className="mb-6 text-2xl font-bold">{product.name}</h3>
                <GrayImage className="h-[120px] w-full" />
              </div>

              <div className="grid gap-5 text-xl md:grid-cols-2">
                {[
                  ["Mã sản phẩm", product.name],
                  ["Thương hiệu", product.brand],
                  ["Đặc tính", "Keo 01 thành phần, màu trắng sữa, dạng lỏng, khô mờ"],
                  ["Quy cách sản phẩm", "Xô, phuy, IBC"],
                  ["Dung tích", "20 lít/thùng"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <h4 className="font-bold">{label}</h4>
                    <p>{value}</p>
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
                    className="mt-2 h-14 w-full border border-[#222] px-4 font-normal outline-none"
                  />
                </label>
              ))}

              <label className="block text-lg font-bold">
                Nội dung liên hệ
                <textarea
                  placeholder="Nhập những vấn đề bạn cần chúng tôi giải đáp"
                  className="mt-2 h-32 w-full resize-none border border-[#222] px-4 py-4 font-normal outline-none"
                />
              </label>

              <div className="pt-8 text-center">
                <button className="h-14 min-w-[285px] border border-[#00aeef] px-8 text-xl font-bold uppercase text-[#00aeef]">
                  Liên Hệ Với Chúng Tôi
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
            {relatedProducts.map((name) => (
              <article
                key={name}
                className="flex min-h-[420px] flex-col border border-[#e5e5e5] bg-white px-6 pb-7 pt-7"
              >
                <GrayImage className="mb-auto h-[220px] w-full" />

                <div className="pt-8">
                  <h3 className="border-b border-[#777] pb-3 text-xl font-bold leading-tight">
                    {name}
                  </h3>

                  <div className="mt-3 grid grid-cols-2 gap-5 text-sm leading-relaxed">
                    <div>
                      <h4 className="font-bold">Đặc tính</h4>
                      <p>Màu trắng sữa, khô mờ, dạng sệt, màng keo khô trong.</p>
                    </div>
                    <div>
                      <h4 className="font-bold">Quy cách</h4>
                      <ul>
                        <li>20 kg/xô</li>
                        <li>200 kg/phuy</li>
                        <li>1.000 kg/IBC</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <div className="fixed right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col overflow-hidden rounded-full bg-[#002330] text-white lg:flex">
        {[MessageCircle, Phone, Send].map((Icon, index) => (
          <a
            key={index}
            href="#lien-he"
            className="grid size-14 place-items-center text-[#9feeff]"
          >
            <Icon className="size-6" aria-hidden="true" />
          </a>
        ))}
      </div>

      <Footer />
    </main>
  );
}