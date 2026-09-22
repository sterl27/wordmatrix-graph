import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WordMatrix — 3D Knowledge Graph",
  title: "WordMatrix — 3D Knowledge Graph",
  description: "A glowing 3D force-directed graph of words, themes, and secrets.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
