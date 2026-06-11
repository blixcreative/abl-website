import { getHeaderContent } from "@/lib/header-content";
import Link from "next/link";

export default async function Footer() {
  const content = await getHeaderContent();

  return (
    <footer className="w-full bg-[#08aee7] py-16 text-white">
      <div className="container mx-auto w-full px-4">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="leading-none flex gap-4 items-center">
              {content.logo_1_base64 ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={content.logo_1_base64}
                  alt="ABL logo 1"
                  className="max-h-14 max-w-32 object-contain"
                />
              ) : (
                <div className="font-serif text-[64px] font-bold leading-none">
                  ABL
                </div>
              )}

              {content.logo_2_base64 ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={content.logo_2_base64}
                  alt="ABL logo 2"
                  className="max-h-14 max-w-48 object-contain"
                />
              ) : (
                <div className="text-sm font-bold leading-tight">
                  {content.title.split("\n").map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </div>
              )}
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
                {content.phone || "+84 914 212 791"}
              </p>
            </div>
          </div>
          <nav className="space-y-5 font-bold">
            {content.navigation.map((item) => (
              <Link key={`${item.title}-${item.url}`} href={item.url} className="block">
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-12 border-t border-white/80 pt-10 text-center">
          © {new Date().getFullYear()} ABL
        </div>
      </div>
    </footer>
  );
}