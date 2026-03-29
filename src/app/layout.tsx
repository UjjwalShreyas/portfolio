import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "G. Ujjwal Shreyas | Portfolio",
  description: "Aspiring engineer turning ideas into real-world solutions. Developer, Data Analyst, and Builder based in Hyderabad.",
  openGraph: {
    title: "G. Ujjwal Shreyas | Portfolio",
    description: "Aspiring engineer turning ideas into real-world solutions. Developer, Data Analyst, and Builder based in Hyderabad.",
    url: "https://ujjwalshreyas.com",
    siteName: "G. Ujjwal Shreyas Portfolio",
    locale: "en_IN",
    type: "website",
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
      className={`${inter.variable} ${bebasNeue.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col relative selection:bg-scarlet-red selection:text-white" suppressHydrationWarning>
        <div className="bg-noise"></div>
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
