'use client';

import ExcelFileDropzone from '@/components/Dropzone/ExcelFileDropzone';
import FileNameDisplay from '@/components/FileNameDisplay';
import { Button } from '@/components/ui/button';
import uniq from 'lodash/uniq';
import { useMemo, useState } from 'react';
import SelectProduct from './SelectProduct';
import SelectedProduct from './SelectedProduct';
import Table from './Table';
import { DEFAULT_ITEM, LABEL_TO_KEY } from './const';
import { AdReportRow } from './types';

export default function AdReportAnalysisPage() {
  const [fileName, setFileName] = useState('');
  const [adReportRows, setAdReportRows] = useState<AdReportRow[]>([]);
  const [selectedProductNames, setSelectedProductNames] = useState<string[]>([]);

  const productNameOptions = useMemo(
    () => uniq(adReportRows.map((row) => row.adProductName)),
    [adReportRows],
  );

  const filteredAdReportRows = useMemo(() => {
    if (!selectedProductNames.length) return adReportRows;

    return adReportRows.filter((row) => selectedProductNames.includes(row.adProductName));
  }, [adReportRows, selectedProductNames]);

  const reset = () => {
    setFileName('');
    setAdReportRows([]);
    setSelectedProductNames([]);
  };

  const handleExcelLoad = (items: AdReportRow[], fileName: string = '') => {
    setAdReportRows(items);
    setFileName(fileName);
  };

  return (
    <div className="max-w-6xl mx-auto px-2 py-4">
      {!fileName && !adReportRows.length && (
        <ExcelFileDropzone
          onChange={handleExcelLoad}
          defaultItem={DEFAULT_ITEM}
          labelKeyMap={LABEL_TO_KEY}
          fileTypeName={<b className="text-sm underline text-red-700">쿠팡 광고보고서</b>}
        />
      )}

      {!!fileName && <FileNameDisplay fileName={fileName} onRemove={reset} />}

      {!!adReportRows.length && (
        <>
          <div className="flex items-center gap-4">
            <SelectProduct
              values={selectedProductNames}
              onChange={setSelectedProductNames}
              options={productNameOptions}
            />
            {!!selectedProductNames.length && (
              <Button onClick={() => setSelectedProductNames([])} variant="destructive">
                모두 제거
              </Button>
            )}
          </div>
          <div className="mb-4 flex flex-wrap gap-x-4 gap-y-2">
            {selectedProductNames.map((productName) => (
              <SelectedProduct
                key={productName}
                label={productName}
                onRemove={() =>
                  setSelectedProductNames((prev) => prev.filter((n) => n !== productName))
                }
              />
            ))}
          </div>
          <Table rawRows={filteredAdReportRows} />
        </>
      )}
    </div>
  );
}
