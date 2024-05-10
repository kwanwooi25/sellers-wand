import { GNB_HEIGHT } from '@/const/layout';
import Link from 'next/link';
import Logo from '../Logo';
import Navigation from '../Navigation';
import UserMenu from '../UserMenu';

export default function GlobalHeader() {
  return (
    <header
      className="py-2 px-4 fixed w-full top-0 z-10 shadow-sm backdrop-blur border-b border-border/70 flex justify-between items-center"
      style={{ height: GNB_HEIGHT }}
    >
      <Link href="/" className="flex items-center gap-2">
        <Logo height={32} withText />
      </Link>
      <Navigation />
      <UserMenu className="z-aboveHeader" />
    </header>
  );
}
