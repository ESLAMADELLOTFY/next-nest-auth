import "./globals.css";
import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter-face",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Log in Page",
  description: "Log in Page",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} ${inter.variable} h-full`}
    >
      <body className="h-full w-full bg-white font-sans">
        {children}
      </body>
    </html>
  );
}
