import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AddCardsModal from "@/components/AddCardsModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your MTG Collection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AddCardsModal />
        {children}
      </body>
    </html>
  );
}
