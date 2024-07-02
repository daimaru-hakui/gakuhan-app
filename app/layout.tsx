import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/header/Header";
import { Toaster } from "@/components/ui/sonner";
import { NextAuthProvider } from "@/lib/providers/next-auth-provider";
import { auth } from "@/auth";

const inter = Noto_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "学校販売APP",
  description: "大丸白衣の学校販売アプリ",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={cn(inter.className, "min-h-screen")}>
        <NextAuthProvider>
          <Header />
          {children}
          <Toaster richColors closeButton duration={2000} />
        </NextAuthProvider>
      </body>
    </html>
  );
}
