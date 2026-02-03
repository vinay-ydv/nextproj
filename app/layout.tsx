import React from "react"
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'AI ToolsHub - Discover the Best AI Tools',
    template: '%s | AI ToolsHub',
  },
  description: 'Discover and explore the best AI tools for every task. Browse our curated directory of AI-powered solutions for writing, image generation, coding, video, audio, and more.',
  keywords: ['AI tools', 'artificial intelligence', 'machine learning', 'ChatGPT', 'Midjourney', 'AI directory', 'productivity tools'],
  authors: [{ name: 'AI ToolsHub' }],
  openGraph: {
    title: 'AI ToolsHub - Discover the Best AI Tools',
    description: 'Discover and explore the best AI tools for every task.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI ToolsHub - Discover the Best AI Tools',
    description: 'Discover and explore the best AI tools for every task.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#171717',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
