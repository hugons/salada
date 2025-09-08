import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'New Salad',
  description: 'Jogo de palavras inspirado no Word Salad',
  manifest: '/manifest.json',
}

export const viewport = {
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-PT">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <script src="/register-sw.js" defer></script>
      </body>
    </html>
  )
}
