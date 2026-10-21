import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import JsonLd, { businessSchema } from "./components/JsonLd";
import { ogImage } from "./lib/seo";
import { site } from "./lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;

/** Site-wide defaults; each page adds its own title, description and canonical via `pageMetadata`. */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `Mobile Homes for Sale in Waycross, GA | ${site.fullName}`,
  description:
    "Singlewide, doublewide and triplewide Live Oak Homes built right here in Georgia. Browse floor plans and 3D tours at Wayne Frier Home Center of Waycross, the exclusive Live Oak Homes retailer in Waycross, GA.",
  applicationName: site.fullName,
  openGraph: { type: "website", siteName: site.fullName, locale: "en_US", images: [ogImage] },
  twitter: { card: "summary_large_image", images: [ogImage] },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  // Paste the content value of Search Console's HTML-tag verification into GOOGLE_SITE_VERIFICATION
  ...(googleVerification && { verification: { google: googleVerification } }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body className="min-h-full">
        <JsonLd data={businessSchema} />
        {children}
      </body>
    </html>
  );
}
