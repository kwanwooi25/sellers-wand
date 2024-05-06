'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BOOK_KEEPING_PAGE_NAV_LIST } from './const';

export default function BookKeepingPageNavigation() {
  const pathname = usePathname();

  return (
    <NavigationMenu orientation="vertical">
      <NavigationMenuList className="flex flex-col gap-2">
        {BOOK_KEEPING_PAGE_NAV_LIST.map(({ href, label }) => {
          const isActive = pathname.includes(href);

          return (
            <NavigationMenuItem key={href} className="py-2 px-4 !m-0">
              <Link href={href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    'transition-opacity opacity-60 hover:opacity-80 hover:underline',
                    isActive && 'opacity-100 underline',
                  )}
                >
                  {label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
