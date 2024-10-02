import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oceanbeach",
  description:
    "Você irá mergulhar em diferentes águas e conhecer um pouco sobre algumas delas.",
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
