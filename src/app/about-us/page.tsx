import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SectionTitle from "@/components/SectionTitle";
import { getAboutUsContent } from "@/lib/about-us-content";
import { getHomepageContent } from "@/lib/homepage-content";

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

  return (
    <main className="mx-auto w-full">
      <Header />

      {/* Banner */}
      <section className="relative flex min-h-[540px] w-full items-center overflow-hidden bg-[#173754] text-white md:min-h-[720px]">
        <ContentImage
          src={content.banner_image_base64}
          className="absolute inset-0 h-full w-full opacity-60"
        />
        <div className="absolute inset-0 bg-[#002330]/55" />
        <div className="container relative mx-auto w-full px-4 pt-8">
          <h1 className="font-alu text-[74px] font-bold uppercase leading-[0.95] tracking-tight md:text-[104px] whitespace-pre-line">
            {content.banner_title}
          </h1>
          <p className="mt-7 max-w-[760px] text-lg font-bold leading-snug md:text-xl">
            {content.banner_subtitle}
          </p>
        </div>
      </section>

      {/* Company Info */}
      <section className="w-full bg-[#00495a] text-white">
        <div className="container mx-auto grid w-full md:grid-cols-[0.88fr_1fr]">
          <div className="flex min-h-[420px] flex-col justify-center bg-[#08aee7] px-4 py-16 md:px-20">
            <h2 className="max-w-[520px] text-[32px] font-bold uppercase leading-tight md:text-[38px] whitespace-pre-line">
              {content.company_title}
            </h2>
            <p className="mt-16 max-w-[520px] text-lg font-bold leading-relaxed">
              {content.company_description}
            </p>
          </div>
          <ContentImage
            src={content.company_image_base64}
            className="min-h-[420px] w-full"
          />
        </div>
      </section>

      {/* Partners */}
      <section className="w-full bg-[#00495a] py-20 text-white md:py-28">
        <div className="container mx-auto w-full px-4">
          <SectionTitle light>{homepage.partners_title}</SectionTitle>
          <div className="grid grid-cols-2 items-center gap-x-10 gap-y-16 py-6 text-center md:grid-cols-5">
            {homepage.partners.map((partner, index) => (
              <div key={`${partner.name}-${index}`} className="flex min-h-20 items-center justify-center">
                {partner.logo_base64 ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={partner.logo_base64}
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
            src={content.director_image_base64}
            className="min-h-[520px] w-full md:min-h-[660px]"
          />
          <div className="px-4 py-16 md:px-24">
            <p className="text-2xl font-bold">{content.director_role}</p>
            <h2 className="font-alu mt-2 text-[58px] font-bold uppercase leading-none md:text-[72px]">
              {content.director_name}
            </h2>
            <div className="my-8 h-px w-full bg-white/55" />
            <p className="max-w-[660px] text-xl leading-relaxed text-white/95 whitespace-pre-line">
              {content.director_quote}
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="w-full bg-white py-24">
        <div className="container mx-auto grid w-full gap-x-24 gap-y-20 px-4 md:grid-cols-2">
          <article>
            <h2 className="text-[34px] font-bold uppercase leading-none text-[#404040]">
              {content.vision_title}
            </h2>
            <div className="mt-6 space-y-8 text-xl leading-relaxed text-[#404040]">
              {content.vision_paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </article>
          <ContentImage
            src={content.vision_image_base64}
            className="min-h-[360px] w-full"
          />

          <ContentImage
            src={content.mission_image_base64}
            className="min-h-[420px] w-full"
          />
          <article className="md:pt-20">
            <h2 className="text-[34px] font-bold uppercase leading-none text-[#404040]">
              {content.mission_title}
            </h2>
            <div className="mt-6 space-y-8 text-xl leading-relaxed text-[#404040]">
              {content.mission_paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </article>
        </div>
      </section>

      {/* Awards */}
      <section className="w-full bg-[#08aee7] py-20 text-white md:py-28">
        <div className="container mx-auto grid w-full items-center gap-12 px-4 md:grid-cols-[0.85fr_1fr]">
          <div>
            <SectionTitle light>{content.award_title}</SectionTitle>
            <h2 className="font-alu text-[64px] font-bold leading-none md:text-[82px] whitespace-pre-line">
              {content.award_cert_title}
            </h2>
            <div className="mt-10 max-w-[560px] space-y-8 text-lg font-bold leading-relaxed">
              {content.award_paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <ContentImage
            src={content.award_image_base64}
            className="min-h-[520px] w-full bg-slate-100"
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