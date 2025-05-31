import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Import your Navbar and Footer components
import Navbar from "./defaultcomponents/navbar";
import Footer from "./defaultcomponents/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.ico',
  },
  title: "Marpu NGO",
  description: "The change NGO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased
          min-h-screen flex flex-col`} // Use flexbox for vertical stacking (header, main, footer)
      >
        {/* Navbar is fixed at the top */}
        <Navbar />

        {/* 
          Main content area:
          - flex-grow: Allows it to expand and fill available vertical space, pushing the footer down.
          - pt-20: Adds top padding equal to the Navbar's height (80px), ensuring content appears below the fixed Navbar.
        */}
        <main className="flex-grow pt-20">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}