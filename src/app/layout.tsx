import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YuvaQ Software Solutions | Premium Digital Products",
  description: "YuvaQ is a serious technology company that builds secure, scalable, high-performance digital solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-foreground antialiased selection:bg-cyan-500/30 overflow-x-hidden`}>
        <SmoothScroll>
          <Navbar />
          <main className="relative min-h-screen flex flex-col">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
