import Logo from '@/components/Logo';
import Navigation from '@/components/Navigation';
import ThemeToggle from '@/components/ThemeToggle';
import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import ThemeProvider from '@/providers/ThemeProvider';

const notoSans = Noto_Sans_KR({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '셀러의 지팡이',
  description: '셀러의 마법지팡이',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={notoSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="py-2 px-4 sticky w-full top-0 shadow-sm z-header bg-background/95 backdrop-blur border-b border-border/40 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <Logo height={32} withText />
            </Link>
            <Navigation />
            <ThemeToggle />
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
