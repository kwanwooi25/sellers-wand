import { Button } from '@/components/ui/button';
import { LucideX } from 'lucide-react';
import { ReactNode } from 'react';

export default function SelectedProduct({ label, onRemove }: Props) {
  return (
    <div className="rounded-full flex items-center gap-4 border shrink-0 pl-4">
      {typeof label === 'string' ? <span>{label}</span> : label}
      <Button className="rounded-full" onClick={onRemove} size="icon" variant="ghost">
        <LucideX />
      </Button>
    </div>
  );
}

type Props = {
  label: ReactNode;
  onRemove?: () => void;
};
