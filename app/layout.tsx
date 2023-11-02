'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Script
          src='https://telegram.org/js/telegram-web-app.js'
          strategy='beforeInteractive'
        />
        {children}
      </body>
    </html>
  )
}
