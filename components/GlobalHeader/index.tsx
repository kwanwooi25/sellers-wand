'use client';

import { GNB_HEIGHT } from '@/const/layout';
import Navigation from '../Navigation';
import UserMenu from '../UserMenu';

export default function GlobalHeader() {
  return (
    <header
      className="py-2 px-4 fixed w-full top-0 z-10 shadow-sm backdrop-blur border-b border-border/70 flex justify-between items-center"
      style={{ height: GNB_HEIGHT }}
    >
      <Navigation />
      <UserMenu className="z-aboveHeader" />
    </header>
  );
}
