import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://127.0.0.1:3000"),
  title: "LOOMWIRE | Build the Name. Protect the Idea.",
  description:
    "LOOMWIRE is an AI-powered brand operating system for creators, founders, artists, designers, musicians, fashion labels, and cultural builders.",
  openGraph: {
    title: "LOOMWIRE",
    description: "Turn an idea into a protected cultural system.",
    images: ["/art/loomwire-atelier-hero.png"]
  }
};

export const viewport: Viewport = {
  themeColor: "#070705",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
