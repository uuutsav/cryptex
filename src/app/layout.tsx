import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/providers";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cryptex",
  description: "An AI powered crypto trading learning platform",
  icons: {
    icon: "icon.svg",
  },
  keywords: ["crypto", "AI", "trading", "learning", "platform"],
  authors: [{ name: "Cryptex Team", url: "" }],
  openGraph: {
    title: "Cryptex",
    description: "An AI powered crypto trading learning platform",
    url: "",
    siteName: "Cryptex",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cryptex",
    description: "An AI powered crypto trading learning platform",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} antialiased min-h-screen overscroll-none`}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
