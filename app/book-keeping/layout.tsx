import BookKeepingPageNavigation from '@/components/Navigation/BookKeepingPageNavigation';
import { GNB_HEIGHT, LNB_WIDTH } from '@/const/layout';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <div
        className="fixed left-0 bottom-0 w-[130px] px-4 py-2 border-r"
        style={{ top: GNB_HEIGHT }}
      >
        <BookKeepingPageNavigation />
      </div>
      <div style={{ marginLeft: LNB_WIDTH }}>{children}</div>
    </>
  );
}
