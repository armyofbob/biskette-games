import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: { default: "Biskette Games | Playful worlds. Games with bite.", template: "%s | Biskette Games" },
  description: "Biskette Games creates character-driven games for new ways to play, including BedBugs for WOWCube.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/assets/biskette-games.png",
    shortcut: "/assets/biskette-games.png",
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
        {children}
      </body>
    </html>
  );
}
