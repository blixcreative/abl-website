import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function ContactUsPage() {
  return (
    <main className="mx-auto w-full">
      <Header />

      {/* Map Section */}
      <section className="relative w-full py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative min-h-[500px]">
            {/* Vietnam Map Image */}
            <div className="w-full md:w-1/2 relative h-[400px] md:h-[600px] flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/vnmap.png" 
                alt="Bản đồ Việt Nam" 
                className="w-full h-full object-contain"
              />
              {/* Connecting line dot at Da Nang roughly */}
            </div>

            <div className="w-full md:w-1/2 text-center md:text-left z-10">
              <h1 className="text-6xl md:text-8xl font-alu font-bold text-[#404040] ">
                Trụ Sở Chính
              </h1>
              <p className="mt-4 text-xl md:text-2xl text-[#404040] mb-8">
                Đường số 10, KCN Hoà Khánh, Liên Chiểu, Đà Nẵng
              </p>
              <button className="bg-[#00aeef] hover:bg-[#08aee7] text-white font-bold uppercase py-4 px-8 text-lg transition-colors">
                Xem Đường Đi
              </button>
            </div>
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-1/2 left-[25%] right-[25%] h-px bg-gray-400 -z-10"></div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="w-full bg-[#113a48] text-white py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-bold uppercase mb-6">
                Công Ty Sản Xuất Keo & Vải Nhám Bá Lộc
              </h2>
              <div className="space-y-2 text-lg text-white/90">
                <p>Trụ sở chính: Đường số 10, KCN Hòa Khánh, TP. Đà Nẵng</p>
                <p>Nhà máy: Đường số 10 KCN Hòa Khánh, Q. Liên Chiểu, TP. Đà Nẵng</p>
                <p>ĐT: 0236 365 9191</p>
                <p>Hotline: 0905 175 845</p>
                <p>Skype: 0905 175 845</p>
                <p>Email: baloc175@gmail.com</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold uppercase mb-6">
                Hỗ Trợ Khách Hàng
              </h2>
              <div className="space-y-6 text-lg text-white/90">
                <div>
                  <p className="font-bold text-white">Hỗ trợ kinh doanh:</p>
                  <p>0905 103 585</p>
                </div>
                <div>
                  <p className="font-bold text-white">Hỗ trợ kỹ thuật:</p>
                  <p>0935 332 920</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Distribution Network Section */}
      <section className="w-full bg-[#f9fafb] py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold uppercase text-[#404040] mb-8">
            Hệ Thống Phân Phối & Đại Lý Của ABL Trên Cả Nước
          </h2>
          
          <div className="space-y-0">
            {/* Region 1 */}
            <div className="border-t border-[#e5e7eb] py-8">
              <h3 className="text-2xl font-bold text-[#404040] mb-3">
                Khu vực Miền Bắc
              </h3>
              <p className="text-xl text-gray-600">
                Đã có mặt tại Hà Nội, Hưng Yên, Phú Thọ.
              </p>
            </div>
            
            {/* Region 2 */}
            <div className="border-t border-[#e5e7eb] py-8">
              <h3 className="text-2xl font-bold text-[#404040] mb-3">
                Khu vực Miền Trung & Tây Nguyên
              </h3>
              <p className="text-xl text-gray-600">
                Đã có mặt tại tất cả các tỉnh thành trên khu vực.
              </p>
            </div>
            
            {/* Region 3 */}
            <div className="border-t border-[#e5e7eb] py-8">
              <h3 className="text-2xl font-bold text-[#404040] mb-3">
                Khu vực Miền Nam
              </h3>
              <p className="text-xl text-gray-600">
                Đồng Nai, TP Hồ Chí Minh.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}