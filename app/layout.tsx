import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "sonner";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://parilatafoundation.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Parilata Foundation — Environmental Stories & Action, led by Kajal Kaser",
    template: "%s | Parilata Foundation",
  },
  description:
    "Parilata Foundation documents environmental stories, awareness campaigns, and community action across India, founded by environmental activist Kajal Kaser.",
  keywords: [
    "Parilata Foundation",
    "Kajal Kaser",
    "environmental NGO",
    "climate action India",
    "environmental storytelling",
    "conservation blog",
  ],
  authors: [{ name: "Kajal Kaser" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Parilata Foundation",
    title: "Parilata Foundation — Environmental Stories & Action",
    description:
      "Documenting environmental stories, awareness campaigns, and community action, led by Kajal Kaser.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Parilata Foundation",
    description: "Environmental stories & action, led by Kajal Kaser.",
    images: ["/og-image.jpg"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Parilata Foundation",
    founder: { "@type": "Person", name: "Kajal Kaser" },
    url: siteUrl,
    sameAs: [],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fraunces.variable} ${manrope.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
