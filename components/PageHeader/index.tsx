'use client';

import { LucideChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, ReactNode } from 'react';
import { Button } from '../ui/button';

export default function PageHeader({ title, children, backButton }: Props) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between px-4 py-2 mb-2">
      <div className="flex items-center gap-2">
        {!!backButton && typeof backButton === 'boolean' && (
          <Button onClick={() => router.back()} variant="ghost" size="icon">
            <LucideChevronLeft />
          </Button>
        )}
        {!!backButton && typeof backButton !== 'boolean' && backButton}
        {!!title && typeof title === 'string' && <h2 className="text-lg font-bold">{title}</h2>}
        {!!title && typeof title !== 'string' && title}
      </div>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}

type Props = PropsWithChildren & {
  title?: ReactNode;
  backButton?: boolean | ReactNode;
};
