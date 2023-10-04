import { cn } from "@/lib/utils";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Navbar } from "@/components/layout/navbar";
import { Providers } from "@/components/providers";

import { Toaster, toast } from "sonner";

import "react-loading-skeleton/dist/skeleton.css";
import "simplebar-react/dist/simplebar.min.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Goover",
  description: "Go over any pdf",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body
          className={cn(
            "grainy min-h-screen font-sans antialiased",
            inter.className,
          )}
        >
          <Navbar />
          {children}
          <Toaster position="bottom-right" closeButton richColors />
        </body>
      </Providers>
    </html>
  );
}
