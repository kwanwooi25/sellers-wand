import isEqual from 'lodash/isEqual';
import { read, utils } from 'xlsx';

type GetExcelFileReaderOptions<T> = {
  handler: (result: T[]) => void;
  defaultItem: T;
  labelKeyMap: Record<string, keyof T>;
};

export function getExcelFileReader<T>({
  handler,
  defaultItem,
  labelKeyMap,
}: GetExcelFileReaderOptions<T>) {
  const reader = new FileReader();
  reader.onload = (e) => {
    if (!e.target?.result) return;

    const data = new Uint8Array(e.target.result as ArrayBufferLike);
    const workbook = read(data, { type: 'array' });
    const array = utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
    const items: T[] = array
      .map((row) => generateItem({ row, defaultItem, labelKeyMap }))
      .filter((item) => !isEqual(item, defaultItem));
    handler(items);
  };
  return reader;
}

type GenerateItemOptions<T> = {
  row: any;
  defaultItem: GetExcelFileReaderOptions<T>['defaultItem'];
  labelKeyMap: GetExcelFileReaderOptions<T>['labelKeyMap'];
};

function generateItem<T>({ row, defaultItem, labelKeyMap }: GenerateItemOptions<T>) {
  return Object.entries(row).reduce((generatedRow, [key, value]) => {
    const newKey: keyof T = labelKeyMap[key];

    if (!newKey) return generatedRow;

    return { ...generatedRow, [newKey]: value };
  }, defaultItem);
}
