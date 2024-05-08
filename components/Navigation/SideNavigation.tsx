'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LIST } from './const';

export default function SideNavigation({ rootPath = '', navList }: Props) {
  const pathname = usePathname();

  return (
    <NavigationMenu orientation="vertical">
      <NavigationMenuList className="flex flex-col items-start gap-2">
        {navList.map(({ href, label }) => {
          const isActive = pathname.includes(href);

          return (
            <NavigationMenuItem key={href} className="py-2 px-4 !m-0">
              <Link href={`${rootPath}${href}`} legacyBehavior passHref>
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

type Props = {
  rootPath?: string;
  navList: (typeof NAV_LIST)[number]['submenus'];
};
