import GlobalHeader from '@/components/GlobalHeader';
import { auth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import AuthProvider from '@/providers/AuthProvider';
import ThemeProvider from '@/providers/ThemeProvider';
import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
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
            <GlobalHeader />
            <main className="w-full max-w-4xl px-2 py-4 mx-auto flex-1">{children}</main>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
