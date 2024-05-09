'use client';

import GlobalHeader from '@/components/GlobalHeader';
import SideNavigation from '@/components/Navigation/SideNavigation';
import { NAV_LIST } from '@/components/Navigation/const';
import { GNB_HEIGHT, LNB_WIDTH } from '@/const/layout';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default function MainLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const currentNav = NAV_LIST.find(({ href }) => pathname?.includes(href));
  const { href, submenus } = currentNav || {};

  return (
    <>
      <GlobalHeader />
      <main className="w-full flex-1 relative" style={{ marginTop: GNB_HEIGHT }}>
        {submenus?.length ? (
          <>
            <div
              className="fixed left-0 bottom-0 px-4 py-2 border-r border-border/30"
              style={{ top: GNB_HEIGHT, width: LNB_WIDTH }}
            >
              <SideNavigation rootPath={href} navList={submenus} />
            </div>

            <div style={{ marginLeft: LNB_WIDTH }}>{children}</div>
          </>
        ) : (
          children
        )}
      </main>
    </>
  );
}
