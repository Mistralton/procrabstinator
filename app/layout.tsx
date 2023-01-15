"use client";
import { ContextProvider } from "@/context/ContextProvider";
import "./globals.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="w-screen h-screen bg-[#8B4000] relative font-RedHat">
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
