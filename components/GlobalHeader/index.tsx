import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';
import Logo from '../Logo';
import Navigation from '../Navigation';
import UserMenu from '../UserMenu';

export default async function GlobalHeader() {
  const session = await auth();
  const headerList = headers();
  const pathname = headerList.get('x-pathname');

  return (
    <header className="py-2 px-4 sticky w-full top-0 shadow-sm z-header bg-background/95 backdrop-blur border-b border-border/40 flex justify-between items-center">
      <Link href="/" className="flex items-center gap-2">
        <Logo height={32} withText />
      </Link>
      {!!session && pathname !== '/' && <Navigation />}
      <UserMenu className="z-aboveHeader" />
    </header>
  );
}
