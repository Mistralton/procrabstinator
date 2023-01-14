'use client'
import './globals.css'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body className="w-screen h-screen bg-zinc-900 relative font-RedHat">
          {children}
      </body>
    </html>
  )
}
