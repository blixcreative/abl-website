import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { MessageCircle, Phone, Send } from "lucide-react";
import { getNewsConfig } from "@/lib/news-content";
import ClientNewsContent from "./ClientNewsContent";



export default async function NewsPage() {
  const config = await getNewsConfig();

  return (
    <main className="mx-auto w-full bg-white text-[#3d3d3d]">
      <Header />
      <ClientNewsContent config={config} />
      <Footer />
    </main>
  );
}
