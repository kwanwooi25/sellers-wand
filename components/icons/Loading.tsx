import { cn } from '@/lib/utils';
import { LucideLoader2 } from 'lucide-react';
import { ComponentProps } from 'react';

export default function Loading({ className, ...props }: ComponentProps<typeof LucideLoader2>) {
  return <LucideLoader2 className={cn('animate-spin', className)} {...props} />;
}
