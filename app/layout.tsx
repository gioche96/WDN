import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import I18nProvider from "./I18nProvider";

/** Font names */
const fontTitle = localFont({
  src: "../fonts/PinyonScript.ttf",
  variable: "--font-title",
  display: "swap",
});

/** Font & */
const fontAmpersand = localFont({
  src: "../fonts/Runethia.otf",
  variable: "--font-ampersand",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Alice & Giorgio",
  description: "4 Settembre 2027",
  metadataBase: new URL("https://gioche96.github.io/WDN/"),

  openGraph: {
    title: "Alice & Giorgio",
    description: "4 Settembre 2027",
    type: "website",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "Alice & Giorgio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alice & Giorgio",
    description: "4 Settembre 2027",
    images: ["/icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontTitle.variable} ${fontAmpersand.variable} ${inter.variable}`}
    >
      <body>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}