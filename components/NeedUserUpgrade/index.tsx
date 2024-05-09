import { signIn } from '@/lib/auth';

export default function NeedUserUpgrade() {
  return (
    <form
      className="flex flex-col gap-4 items-center py-16"
      action={async () => {
        'use server';
        await signIn();
      }}
    >
      <span className="text-lg">이용할 수 있는 권한이 없습니다</span>
      <span className="opacity-80">관리자에게 권한을 요청해주세요</span>
    </form>
  );
}
