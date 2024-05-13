import AuthRequired from '@/components/AuthRequired';
import { auth } from '.';
import NeedUserUpgrade from '@/components/NeedUserUpgrade';

export function withAuth(Component: () => JSX.Element | Promise<JSX.Element>) {
  return async function WithAuth() {
    const session = await auth();

    if (!session?.user) {
      return <AuthRequired />;
    } else if (session?.user?.grade === 'GUEST') {
      return <NeedUserUpgrade />;
    }

    return <Component />;
  };
}
