import type { Metadata } from "next";
import { Alumni_Sans, Barlow } from "next/font/google";
import "./globals.css";

const alumniSans = Alumni_Sans({
  variable: "--font-alumni-sans",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ABL - Adhesive & Industrial Abrasive Cloth",
  description:
    "Keo dán và vải nhám công nghiệp đạt chuẩn quốc tế, đồng hành cùng sản xuất bền vững.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${alumniSans.variable} ${barlow.variable}`}>
      <body className="w-screen overflow-x-hidden items-center justify-center">{children}</body>
    </html>
  );
}