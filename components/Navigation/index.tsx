'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { NAV_LIST } from './const';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <NavigationMenu className="mx-auto">
      <NavigationMenuList className="flex items-center gap-4">
        {NAV_LIST.map(({ href, label }) => {
          const isActive = href === pathname;

          return (
            <NavigationMenuItem key={href}>
              <NavigationMenuLink
                className={cn(
                  'px-2 py-1 transition-colors text-foreground/60 hover:text-foreground/80',
                  isActive && 'text-foreground',
                )}
                href={href}
              >
                {label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
