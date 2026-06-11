const navItems = [
  "Trang Chủ",
  "Sản Phẩm",
  "Tài Liệu Kỹ Thuật",
  "Đối Tác",
  "Giải Pháp & Ứng Dụng",
  "Tin Tức & Bài Viết",
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#08aee7] py-16 text-white">
      <div className="container mx-auto w-full  px-4">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="font-serif text-[64px] font-bold leading-none">
              ABL
            </div>
            <p className="mt-7 leading-relaxed">
              <b>Địa chỉ:</b> Đường số 10, KCN Hoà Khánh, Liên Chiểu, Đà Nẵng
              <br />
              <b>Hotline:</b> +84 905 175 845 &nbsp;&nbsp;&nbsp;&nbsp;
              <b>Email:</b> baloc175@gmail.com
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <p>
                <b>Hỗ trợ kinh doanh:</b>
                <br />
                02363 659 191
              </p>
              <p>
                <b>Hotline:</b>
                <br />
                +84 914 212 791
              </p>
            </div>
          </div>
          <nav className="space-y-5 font-bold">
            {navItems.map((item) => (
              <a key={item} href="#" className="block">
                {item}
              </a>
            ))}
          </nav>
          <div className="space-y-5 font-bold">
            <div>● &nbsp; Facebook</div>
            <div>◎ &nbsp; Instagram</div>
            <div>♪ &nbsp; TikTok</div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/80 pt-10 text-center">
          © 2025 ABL
        </div>
      </div>
    </footer>
  );
}