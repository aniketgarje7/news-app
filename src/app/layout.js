
import './globals.css'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';
import NewsContext from '@/context/NewsContext';
import { AuthContextProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'News App',
  description: 'Know the world',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
        <NewsContext>
          {children}
        </NewsContext>
        </AuthContextProvider>
        </body>
    </html>
  )
}
