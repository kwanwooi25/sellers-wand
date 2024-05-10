'use client';

import { PATHS } from '@/const/paths';
import {
  LucideLogIn,
  LucideLogOut,
  LucideMoon,
  LucideSettings,
  LucideSun,
  LucideUser,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export default function UserMenu({ className }: Props) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const session = useSession();
  const isAuthenticated = session.status === 'authenticated';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Avatar>
            <AvatarImage src={session.data?.user.image ?? ''} />
            <AvatarFallback>
              {!!session.data?.user.name ? (
                session.data?.user.name.charAt(0).toUpperCase()
              ) : (
                <LucideUser />
              )}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className={className}>
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              {theme === 'light' && <LucideSun className="mr-2 h-4 w-4" />}
              {theme === 'dark' && <LucideMoon className="mr-2 h-4 w-4" />}
              {theme === 'system' && <LucideSettings className="mr-2 h-4 w-4" />}
              <span>Theme</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  <LucideSun className="mr-2 h-4 w-4" />
                  <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  <LucideMoon className="mr-2 h-4 w-4" />
                  <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                  <LucideSettings className="mr-2 h-4 w-4" />
                  <span>System</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          {isAuthenticated ? (
            <DropdownMenuItem onClick={() => router.push(PATHS.SIGN_OUT)}>
              <LucideLogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => router.push(PATHS.SIGN_IN)}>
              <LucideLogIn className="mr-2 h-4 w-4" />
              <span>Login</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type Props = {
  className?: string;
};
