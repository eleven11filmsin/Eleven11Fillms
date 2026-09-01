import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { Kalam } from 'next/font/google';
import "./globals.css";
import ClickSparkProvider from '@/components/ClickSparkProvider';
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

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
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-manrope", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <ClickSparkProvider>{children}</ClickSparkProvider>
      </body>
    </html>
  );
}

// export default function AppRootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" className={cn("font-sans", inter.variable)}>
//       <body>
//         {/* everything else in <body> stays exactly as it was */}
//         <ClickSparkProvider>{children}</ClickSparkProvider>
//       </body>
//     </html>
//   );
// }