import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Calimac Productions · Celebrating Sixty",
  description: "Four beautiful ways to celebrate Diane's sixtieth birthday.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Calimac Productions · Celebrating Sixty",
    description: "Four beautiful ways to celebrate you.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calimac Productions · Celebrating Sixty",
    description: "Four beautiful ways to celebrate you.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
