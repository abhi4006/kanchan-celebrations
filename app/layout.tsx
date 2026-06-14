import type { Metadata, Viewport } from "next";

import "@fontsource/hind/400.css";
import "@fontsource/hind/600.css";
import "@fontsource/hind/700.css";
import "@fontsource/rozha-one/400.css";
import "./globals.css";

const siteUrl = "https://abhi4006.github.io/kanchan-celebrations/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "कंचन का मंगल उत्सव | सगाई एवं शुभ विवाह",
  description:
    "वधू पक्ष की ओर से कंचन एवं अभिषेक के सगाई और शुभ विवाह समारोह का स्नेहिल आमंत्रण।",
  applicationName: "कंचन का मंगल उत्सव",
  manifest: "/kanchan-celebrations/manifest.webmanifest",
  alternates: {
    canonical: siteUrl
  },
  openGraph: {
    title: "कंचन का मंगल उत्सव | सगाई एवं शुभ विवाह",
    description: "वधू पक्ष की ओर से 01 और 03 जुलाई 2026 के मंगल समारोहों का आमंत्रण।",
    type: "website",
    url: siteUrl,
    siteName: "कंचन का मंगल उत्सव",
    locale: "hi_IN",
    images: [
      {
        url: `${siteUrl}cover-card-with-ganesh.jpeg`,
        alt: "कंचन संग अभिषेक मंगल उत्सव"
      }
    ]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#6f1d1b"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi">
      <body>{children}</body>
    </html>
  );
}
