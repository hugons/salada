import type { Metadata } from 'next'
import { Cairo } from 'next/font/google'
import './globals.css'

const cairo = Cairo({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

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
    <html lang="pt-PT" className={cairo.className}>
      <body>
        {children}
        <script src="/register-sw.js" defer></script>
      </body>
    </html>
  )
}
