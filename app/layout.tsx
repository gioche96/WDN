import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${fontTitle.variable} ${fontAmpersand.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}