import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ClientTechDocs from "./ClientTechDocs";

export default function TechnicalDocsPage() {
  return (
    <main className="mx-auto w-full bg-white text-[#3d3d3d]">
      <Header />
      <ClientTechDocs />
      <Footer />
    </main>
  );
}