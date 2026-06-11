import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MiniSlider from "@/components/MiniSlider";
import SectionTitle from "@/components/SectionTitle";
import { getAboutUsContent } from "@/lib/about-us-content";
import { getHomepageContent } from "@/lib/homepage-content";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function ContentImage({
  src,
  className = "",
}: {
  src?: string;
  className?: string;
}) {
  if (src) {
    return (
      <div
        className={`relative overflow-hidden bg-slate-100 bg-cover bg-center ${className}`}
        style={{ backgroundImage: `url(${src})` }}
        aria-label="Content image"
      />
    );
  }
  return (
    <div
      className={`relative overflow-hidden bg-slate-300 ${className}`}
      aria-label="Image placeholder"
    />
  );
}

function ContactForm({
  title,
  fields,
  msgLabel,
  msgPlaceholder,
  btnLabel,
}: {
  title: string;
  fields: { label: string; placeholder: string }[];
  msgLabel: string;
  msgPlaceholder: string;
  btnLabel: string;
}) {
  return (
    <section className="w-full bg-white py-24">
      <div className="container mx-auto w-full px-4">
        <SectionTitle>{title}</SectionTitle>
        <form className="space-y-5">
          {fields.map(({ label, placeholder }) => (
            <label key={label} className="block font-bold text-[#404040]">
              {label}
              <input
                placeholder={placeholder}
                className="mt-2 h-14 w-full border border-[#222] px-4 font-normal outline-none"
              />
            </label>
          ))}
          <label className="block font-bold text-[#404040]">
            {msgLabel}
            <textarea
              placeholder={msgPlaceholder}
              className="mt-2 h-32 w-full resize-none border border-[#222] px-4 py-4 font-normal outline-none"
            />
          </label>
          <div className="pt-8 text-center">
            <button className="h-14 min-w-[285px] border border-[#00aeef] px-8 text-xl font-bold uppercase text-[#00aeef]">
              {btnLabel}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default async function AboutUsPage() {
  const [content, homepage] = await Promise.all([
    getAboutUsContent(),
    getHomepageContent(),
  ]);

  const supabase = await createSupabaseServerClient();
  let banners: any[] = [];
  let directors: any[] = [];
  let visions: any[] = [];
  let awardsData: any[] = [];
  let partnersData: any[] = [];
  let miniSlides: any[] = [];

  if (supabase) {
    const [bRes, dRes, vRes, aRes, pRes, sRes] = await Promise.all([
      supabase.from("cms_about_banner").select("*").limit(1),
      supabase.from("cms_about_director").select("*").limit(1),
      supabase.from("cms_about_vision_mission").select("*").limit(1),
      supabase.from("cms_about_award").select("*").order("sort_order", { ascending: true }),
      supabase.from("cms_about_partner").select("*").order("sort_order", { ascending: true }),
      supabase.from("cms_about_mini_slide").select("*").order("sort_order", { ascending: true }),
    ]);
    banners = bRes.data || [];
    directors = dRes.data || [];
    visions = vRes.data || [];
    awardsData = aRes.data || [];
    partnersData = pRes.data || [];
    miniSlides = sRes.data || [];
  }

  const banner = banners[0];
  const director = directors[0];
  const vision = visions[0];
  // Map awards to the first one for the award section if it only supports one, or display list
  const firstAward = awardsData[0];

  return (
    <main className="mx-auto w-full">
      <Header />

      {/* Banner */}
      <section className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
        {(banner?.image_url || content.banner_image_base64) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={banner?.image_url || content.banner_image_base64}
            alt={banner?.title || content.banner_title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-[#075f74]" />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 drop-shadow-md">
          <h1 className="text-5xl md:text-8xl font-alu font-bold text-white uppercase whitespace-pre-line">
            {banner?.title || content.banner_title}
          </h1>
          <p className="mt-4 max-w-[760px] text-lg text-white/95 md:text-xl whitespace-pre-line">
            {banner?.description || content.banner_subtitle}
          </p>
        </div>
      </section>

      {/* Company Info / Mini Slides */}
      <section className="w-full bg-[#00495a] text-white">
        <div className="container mx-auto w-full">
          <MiniSlider
            slides={miniSlides}
            fallback={{
              title: content.company_title,
              description: content.company_description,
              image: content.company_image_base64,
            }}
          />
        </div>
      </section>

      {/* Partners */}
      <section className="w-full bg-[#00495a] py-20 text-white md:py-28">
        <div className="container mx-auto w-full px-4">
          <SectionTitle light>Đối Tác & Khách Hàng</SectionTitle>
          <div className="flex gap-10 items-center overflow-x-auto py-6 text-center md:grid md:grid-cols-5 md:gap-x-10 md:gap-y-16 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {(partnersData.length > 0 ? partnersData : homepage.partners).map((partner: any, index: number) => (
              <div key={`${partner.name}-${index}`} className="flex min-h-20 w-[140px] md:w-auto flex-shrink-0 items-center justify-center snap-start">
                {(partner.image_file || partner.logo_base64) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={partner.image_file || partner.logo_base64}
                    alt={partner.name}
                    className="max-h-20 max-w-full object-contain"
                  />
                ) : (
                  <div className="font-alu text-4xl font-black italic tracking-wide text-white md:text-5xl">
                    {partner.name}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Director */}
      <section className="w-full bg-[#00627a] text-white">
        <div className="container mx-auto grid w-full items-center md:grid-cols-[0.85fr_1.15fr]">
          <ContentImage
            src={director?.image_url || content.director_image_base64}
            className="min-h-[350px] w-full md:min-h-[660px]"
          />
          <div className="px-4 py-16 md:px-24">
            <p className="text-2xl font-bold">Giám Đốc</p>
            <h2 className="font-alu mt-2 text-[44px] font-bold uppercase leading-none md:text-[72px]">
              {director?.name || content.director_name}
            </h2>
            <div className="my-8 h-px w-full bg-white/55" />
            <p className="max-w-[660px] text-xl leading-relaxed text-white/95 whitespace-pre-line">
              {director?.quote || content.director_quote}
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="w-full bg-white py-24">
        <div className="container mx-auto grid w-full gap-x-24 gap-y-20 px-4 md:grid-cols-2">
          <article>
            <h2 className="text-[34px] font-bold uppercase leading-none text-[#404040]">
              Tầm Nhìn
            </h2>
            <div className="mt-6 space-y-8 text-xl leading-relaxed text-[#404040] whitespace-pre-line">
              {vision?.vision_text || content.vision_paragraphs.join("\n\n")}
            </div>
          </article>
          <ContentImage
            src={vision?.vision_image_url || content.vision_image_base64}
            className="min-h-[360px] w-full"
          />

          <ContentImage
            src={vision?.mission_image_url || content.mission_image_base64}
            className="min-h-[420px] w-full"
          />
          <article className="md:pt-20">
            <h2 className="text-[34px] font-bold uppercase leading-none text-[#404040]">
              Sứ Mệnh
            </h2>
            <div className="mt-6 space-y-8 text-xl leading-relaxed text-[#404040] whitespace-pre-line">
              {vision?.mission_text || content.mission_paragraphs.join("\n\n")}
            </div>
          </article>
        </div>
      </section>

      {/* Awards */}
      <section className="w-full bg-[#08aee7] py-20 text-white md:py-28">
        <div className="container mx-auto grid w-full items-center gap-12 px-4 md:grid-cols-[0.85fr_1fr]">
          <div>
            <SectionTitle light>Giải Thưởng / Chứng Nhận</SectionTitle>
            <h2 className="font-alu text-[44px] font-bold leading-none md:text-[82px] whitespace-pre-line">
              {firstAward?.title || content.award_cert_title}
            </h2>
            <div className="mt-10 max-w-[560px] space-y-8 text-lg font-bold leading-relaxed whitespace-pre-line">
              {firstAward?.description || content.award_paragraphs.join("\n\n")}
            </div>
          </div>
          <ContentImage
            src={firstAward?.image_url || content.award_image_base64}
            className="min-h-[320px] w-full bg-slate-100"
          />
        </div>
      </section>

      <ContactForm
        title={homepage.contact_title}
        fields={homepage.contact_fields}
        msgLabel={homepage.contact_message_label}
        msgPlaceholder={homepage.contact_message_placeholder}
        btnLabel={homepage.contact_button_label}
      />

      <Footer />
    </main>
  );
}