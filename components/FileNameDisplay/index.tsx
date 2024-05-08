import { LucideX } from 'lucide-react';
import { Button } from '../ui/button';

export default function FileNameDisplay({ fileName, onRemove }: Props) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <span className="truncate">{fileName}</span>
      {!!onRemove && (
        <div className="flex items-center gap-2 shrink-0">
          <Button className="rounded-full" onClick={onRemove} variant="ghost" size="icon">
            <LucideX size={28} />
          </Button>
        </div>
      )}
    </div>
  );
}

type Props = {
  fileName: string;
  onRemove?: VoidFunction;
};
