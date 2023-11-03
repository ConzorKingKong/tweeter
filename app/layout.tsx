import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Titlebar from './components/Titlebar/Titlebar'
import AuthProvider from './components/AuthProvider/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'tweeter',
  description: 'The ultimate communication platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <main>
            <Titlebar></Titlebar>
            <div className="flex flex-col items-center h-screen">
              {children}
            </div>
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
