import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

export default function Dropzone({
  className,
  label,
  isLoading,
  loadingLabel = 'Uploading...',
  disabled,
  ...props
}: Props) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    ...props,
    disabled: disabled || isLoading,
  });

  return (
    <div
      className={cn(
        'border-card-foreground hover:border-card-foreground/50 text-card-foreground hover:text-card-foreground/50 flex h-full w-full cursor-pointer items-center justify-center rounded-lg border border-dashed transition-colors py-2 px-4',
        {
          'border-card-foreground/50 text-card-foreground/50': isDragActive,
          'cursor-not-allowed': isLoading || disabled,
        },
        className,
      )}
      {...getRootProps()}
    >
      {isLoading ? (
        loadingLabel
      ) : (
        <>
          <input {...getInputProps()} />
          <div>{label || 'Drag and drop here'}</div>
        </>
      )}
    </div>
  );
}

type Props = DropzoneOptions & {
  className?: string;
  label?: ReactNode;
  isLoading?: boolean;
  loadingLabel?: ReactNode;
};
