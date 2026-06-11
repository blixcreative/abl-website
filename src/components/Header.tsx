import { Search } from "lucide-react";
import { getHeaderContent } from "@/lib/header-content";

export default async function Header() {
  const content = await getHeaderContent();

  return (
    <header className="w-full flex flex-col items-center gap-2 justify-center bg-[#002330] text-white backdrop-blur-sm">
      <div className="w-full container mx-auto flex items-center justify-between gap-8 px-4 py-7">
        <div className="flex items-center gap-5">
          <div className="leading-none flex gap-4 items-center">
            {content.logo_1_base64 ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={content.logo_1_base64}
                alt="ABL logo 1"
                className="max-h-14 max-w-32 object-contain"
              />
            ) : (
              <div className="font-serif text-[42px] font-bold tracking-wide">
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
        </div>

        <div className="hidden flex-1 items-center justify-end gap-7 lg:flex">
          <div className="flex h-10 w-[400px] items-center justify-between border border-white/90 px-4 text-sm">
            <span className="text-white/90">Tìm kiếm</span>
            <Search className="size-5" aria-hidden="true" />
          </div>
          <span className="text-sm">{content.phone}</span>
          <span className="grid size-10 place-items-center rounded-full border border-white text-sm">
            EN
          </span>
        </div>
      </div>

      <nav className="flex gap-4 justify-between w-full container mx-auto px-4 pb-5 text-md font-bold uppercase">
        {content.navigation.map((item) => (
          <a
            key={`${item.title}-${item.url}`}
            href={item.url}
            className="flex-1 border-t border-white pt-3"
          >
            {item.title}
          </a>
        ))}
      </nav>
    </header>
  );
}