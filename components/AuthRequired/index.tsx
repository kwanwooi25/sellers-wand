import { signIn } from '@/lib/auth';
import { Button } from '../ui/button';

export default function AuthRequired() {
  return (
    <form
      className="flex flex-col gap-4 items-center py-8"
      action={async () => {
        'use server';
        await signIn();
      }}
    >
      <span className="text-lg">로그인이 필요합니다</span>
      <Button type="submit" size="lg">
        로그인하고 이용하기
      </Button>
    </form>
  );
}
