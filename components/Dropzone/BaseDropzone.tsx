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
        'border-card-foreground hover:opacity-70 text-card-foreground flex h-full w-full cursor-pointer items-center justify-center rounded-lg border border-dashed transition-opacity py-2 px-4',
        {
          'opacity-70': isDragActive,
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
