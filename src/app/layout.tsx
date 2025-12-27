import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const awesomeSerif = localFont({
  src: [
    {
      path: "../../public/fonts/AwesomeSerif-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/AwesomeSerif-MediumTall.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-serif",
});

const productSans = localFont({
  src: [
    {
      path: "../../public/fonts/Product Sans Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Product Sans Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "SaveCarousel - Instagram Carousel to PDF/PNG",
  description: "Save Instagram entries as PDF or PNG instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${productSans.variable} ${awesomeSerif.variable} antialiased bg-[#f4f4f4]`}
      >
        {children}
      </body>
    </html>
  );
}

