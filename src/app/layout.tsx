import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DisclaimerBanner } from "@/components/layout/DisclaimerBanner";
import { strings } from "@/lib/i18n/strings";

export const metadata: Metadata = {
  title: `${strings.brand.name} — ${strings.brand.tagline}`,
  description: strings.brand.shortDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-MZ" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <DisclaimerBanner />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
