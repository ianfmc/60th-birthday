import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Celebrating Sixty",
  description: "Five beautiful ways to celebrate Diane's sixtieth birthday.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Celebrating Sixty",
    description: "Five beautiful ways to celebrate you.",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Celebrating Sixty",
    description: "Five beautiful ways to celebrate you.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
