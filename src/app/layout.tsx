import type { Metadata } from "next";
import { IropkeBatang, Pretendard } from "@/font";
import "./globals.css";

export const metadata: Metadata = {
  title: "에피그램 - Epigram",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${Pretendard.variable} ${IropkeBatang.variable}`}
    >
      <body className="bg-background-100">{children}</body>
    </html>
  );
}
