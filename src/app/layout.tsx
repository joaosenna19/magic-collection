import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AddCardsModal from "@/components/AddCardsModal";
import { Toaster } from "@/components/ui/toaster";
import DeleteModal from "@/components/DeleteModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your MTG Collection",
};

export default async function asyncRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AddCardsModal />
        <DeleteModal />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
