import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Emoji Detective Bingo !",
  description: "Emoji Detective Bingo Game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
