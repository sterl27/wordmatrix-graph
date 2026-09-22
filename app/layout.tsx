import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WordMatrix — 3D Knowledge Graph",
  description:
    "An interactive 3D force-directed graph of the WordMatrix knowledge base. Themes, words, and secrets as glowing nodes with particle links.",
  openGraph: {
    title: "WordMatrix — 3D Knowledge Graph",
    description: "Spin the matrix. Click a node to focus.",
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
