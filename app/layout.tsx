import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DUITku - Pengelolaan Anggaran",
  description: "Aplikasi Manajemen & Monitoring Budget",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Navbar dipasang di sini agar muncul di seluruh halaman */}
        <Navbar />
        
        {/* Konten utama halaman */}
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}