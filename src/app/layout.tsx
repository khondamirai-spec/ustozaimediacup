import type { Metadata } from "next";
import { Outfit, Sora } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ustoz AI Media Cup | Media Kelajagi",
  description: "Yoshlar Ishlari Agentligi va Turon Bank taqdim etadi: Ustoz AI Media Cup. Ro'yxatdan o'ting va media sohasida o'z o'rningizni toping.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body
        className={`${outfit.variable} ${sora.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
