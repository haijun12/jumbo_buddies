import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./ui/Navbar";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Down the Rabbit Hole",
  description: "A rating list for everything you've ever done, eaten, seen, read, etc. Built by Jumbobuddies Ash, Charles, Cheng, Haijun, and Phuong. Made with Next.js, Clerk, and NeonDB.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-row w-full`}>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
