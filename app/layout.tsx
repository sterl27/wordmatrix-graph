import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WordMatrix — 3D Knowledge Graph",
  description:
    "An interactive 3D force-directed graph of word associations, themes, and meanings — built for WordMatrix.",
  openGraph: {
    title: "WordMatrix — 3D Knowledge Graph",
    description: "Connect words by meaning. Explore the matrix in 3D.",
  },
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
