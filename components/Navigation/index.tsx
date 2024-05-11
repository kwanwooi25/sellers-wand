'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { LNB_WIDTH } from '@/const/layout';
import { PATHS } from '@/const/paths';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '../Logo';
import { NAV_LIST } from './const';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <div className="flex items-center">
      <Link href={PATHS.HOME} className="flex items-center gap-2" style={{ width: LNB_WIDTH }}>
        <Logo height={32} withText />
      </Link>
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="flex items-center gap-2">
          {NAV_LIST.map(({ href, label }) => {
            const isActive = pathname.includes(href);

            return (
              <NavigationMenuItem key={href}>
                <Link href={href} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle({
                      className: cn(
                        'transition-opacity opacity-60 hover:opacity-80',
                        isActive && 'opacity-100',
                      ),
                    })}
                  >
                    {label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
