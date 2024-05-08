import GlobalHeader from '@/components/GlobalHeader';
import { GNB_HEIGHT } from '@/const/layout';
import { auth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import AuthProvider from '@/providers/AuthProvider';
import ThemeProvider from '@/providers/ThemeProvider';
import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';

const notoSans = Noto_Sans_KR({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '셀러의 지팡이',
  description: '셀러의 마법지팡이',
  icons: {
    icon: '/sellers-wand_favicon.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(notoSans.className, 'min-h-screen flex flex-col')}>
        <AuthProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextTopLoader color="gray" zIndex={99999} />
            <GlobalHeader />
            <main className="w-full flex-1 relative" style={{ marginTop: GNB_HEIGHT }}>
              {children}
            </main>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
