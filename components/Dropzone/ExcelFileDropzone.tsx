'use client';

import { getExcelFileReader } from '@/lib/excel';
import { LucideFileUp } from 'lucide-react';
import { ComponentProps, ReactNode } from 'react';
import Dropzone from './BaseDropzone';

export default function ExcelFileDropzone<T>({
  onChange,
  defaultItem,
  labelKeyMap,
  dataRange,
  fileTypeName,
  onDrop,
}: Props<T>) {
  const handleDrop: ComponentProps<typeof Dropzone>['onDrop'] = async (acceptedFiles) => {
    if (!acceptedFiles.length || !onChange || !defaultItem || !labelKeyMap) return;

    const file = acceptedFiles[0];
    const reader = getExcelFileReader({
      handler: (items) => onChange(items, file.name),
      defaultItem,
      labelKeyMap,
      dataRange,
    });
    reader.readAsArrayBuffer(file);
  };

  return (
    <Dropzone
      label={
        <div className="flex flex-col items-center gap-2 py-6">
          <LucideFileUp />
          <p className="text-center text-xs">
            <span className="text-sm font-bold">Drag & Drop</span>
            <br />
            또는
            <br />
            <span className="text-sm font-bold">클릭</span>하여
            <br />
            {fileTypeName} 엑셀 파일 업로드
          </p>
        </div>
      }
      accept={{
        'application/vnd.ms-excel': [],
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
      }}
      onDrop={onDrop || handleDrop}
      maxFiles={1}
    />
  );
}

type Props<T> =
  | {
      fileTypeName?: ReactNode;
      onChange: (items: T[], fileName?: string) => void | Promise<void>;
      defaultItem: T;
      labelKeyMap: Record<string, keyof T>;
      dataRange?: string;
      onDrop?: never;
    }
  | {
      fileTypeName?: ReactNode;
      onChange?: never;
      defaultItem?: never;
      labelKeyMap?: never;
      dataRange?: never;
      onDrop: ComponentProps<typeof Dropzone>['onDrop'];
    };
