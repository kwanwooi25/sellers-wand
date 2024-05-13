'use client';

import AuthRequired from '@/components/AuthRequired';
import { auth } from '.';
import NeedUserUpgrade from '@/components/NeedUserUpgrade';
import { useSession } from 'next-auth/react';

export function withAuth(Component: () => JSX.Element | Promise<JSX.Element>) {
  return async function WithAuth() {
    // const session = await auth();
    const session = useSession();

    if (!session.data?.user) {
      return <AuthRequired />;
    } else if (session.data.user?.grade === 'GUEST') {
      return <NeedUserUpgrade />;
    }

    return <Component />;
  };
}
