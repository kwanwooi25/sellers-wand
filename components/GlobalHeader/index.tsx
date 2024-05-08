import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';
import Logo from '../Logo';
import Navigation from '../Navigation';
import UserMenu from '../UserMenu';
import { GNB_HEIGHT } from '@/const/layout';

export default async function GlobalHeader() {
  const session = await auth();
  const headerList = headers();
  const pathname = headerList.get('x-pathname');

  return (
    <header
      className="py-2 px-4 fixed w-full top-0 shadow-sm z-header bg-background/95 backdrop-blur border-b border-border/40 flex justify-between items-center"
      style={{ height: GNB_HEIGHT }}
    >
      <Link href="/" className="flex items-center gap-2">
        <Logo height={32} withText />
      </Link>
      {!!session && pathname !== '/' && <Navigation />}
      <UserMenu className="z-aboveHeader" />
    </header>
  );
}
