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
      <body>
        {children}
        <script src="/register-sw.js" defer></script>
      </body>
    </html>
  )
}
