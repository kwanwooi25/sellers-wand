import BookKeepingPageNavigation from '@/components/Navigation/BookKeepingPageNavigation';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="absolute top-0 left-0 bottom-0 w-[130px] px-4 py-2 border-r">
        <BookKeepingPageNavigation />
      </div>
      <div className="ml-[130px]">{children}</div>
    </>
  );
}
