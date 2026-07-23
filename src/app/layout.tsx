import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ChatbotWidget from '@/components/ChatbotWidget'
import JsonLd from '@/components/JsonLd'
import { buildSiteGraphJsonLd, createRootMetadata } from '@/lib/seo'

const inter = Inter({ subsets: ['latin'] })

export const metadata = createRootMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <JsonLd data={buildSiteGraphJsonLd()} />
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <ChatbotWidget />
        </div>
      </body>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1944318166167506"
        crossOrigin="anonymous"
      />
    </html>
  )
}
