import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WordMatrix — 3D Knowledge Graph",
  description: "Interactive 3D force graph of the WordMatrix vocabulary.",
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
