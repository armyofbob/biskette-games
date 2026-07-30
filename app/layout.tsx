import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  createPageMetadata,
  HOME_SOCIAL_IMAGE,
  JsonLd,
  organizationJsonLd,
  personJsonLd,
} from "./site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Biskette Games | We make daymares come true.",
    description:
      "Biskette Games is Bob Glahn's independent studio, creating character-driven games with playful systems, theatrical premises, and unusual ways to play.",
    path: "/",
    image: HOME_SOCIAL_IMAGE,
    imageAlt: "BedBugs running across the screens of a WOWCube",
  }),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/assets/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/assets/biskette-games-512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={personJsonLd} />
        {children}
      </body>
    </html>
  );
}
