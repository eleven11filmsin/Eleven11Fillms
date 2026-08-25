import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Kalam } from 'next/font/google';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const marathi = Kalam({
  subsets: ['latin', 'devanagari'], // ✅ correct
  weight: ['400', '700'],           // ❗ Kalam supports 300, 400, 700 (NOT 600)
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eleven11 Films",
  description: "Capturing what you have always wished for",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
