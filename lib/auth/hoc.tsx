import AuthRequired from '@/components/AuthRequired';
import { auth } from '.';

export function withAuth(Component: () => JSX.Element | Promise<JSX.Element>) {
  return async function WithAuth() {
    const session = await auth();

    if (!session) {
      return <AuthRequired />;
    }

    return <Component />;
  };
}
