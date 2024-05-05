'use client';

import { KeywordItem, getExcelFileReader } from '@/lib/excel';
import { LucideFileUp } from 'lucide-react';
import { ComponentProps } from 'react';
import Dropzone from '.';

export default function ItemScoutExcelFileDropzone({ onChange }: Props) {
  const handleDrop: ComponentProps<typeof Dropzone>['onDrop'] = async (acceptedFiles) => {
    if (!acceptedFiles.length) return;

    const file = acceptedFiles[0];
    const reader = getExcelFileReader(onChange);
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
            아이템 스카우트 키워드 엑셀 파일 업로드
          </p>
        </div>
      }
      accept={{
        'application/vnd.ms-excel': [],
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
      }}
      onDrop={handleDrop}
      maxFiles={1}
    />
  );
}

type Props = {
  onChange: (items: KeywordItem[]) => void | Promise<void>;
};
