import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Magnet logistics",
  description: "Logistics app that helps you manage your packages",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
