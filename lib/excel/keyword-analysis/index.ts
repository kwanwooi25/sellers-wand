import isEqual from 'lodash/isEqual';
import { read, utils } from 'xlsx';
import { DEFAULT_KEYWORD_ITEM, LABEL_TO_KEY } from './const';

export type KeywordItem = typeof DEFAULT_KEYWORD_ITEM;

export function getExcelFileReader(handler: (result: KeywordItem[]) => void) {
  const reader = new FileReader();
  reader.onload = (e) => {
    if (!e.target?.result) return;

    const data = new Uint8Array(e.target.result as ArrayBufferLike);
    const workbook = read(data, { type: 'array' });
    const array = utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
    const items: KeywordItem[] = array
      .map(generateItem)
      .filter((item) => !isEqual(item, DEFAULT_KEYWORD_ITEM));
    handler(items);
  };
  return reader;
}

function generateItem(row: any) {
  return Object.entries(row).reduce((generatedRow, [key, value]) => {
    const newKey: keyof KeywordItem = LABEL_TO_KEY[key];

    if (!newKey) return generatedRow;

    return { ...generatedRow, [newKey]: value };
  }, DEFAULT_KEYWORD_ITEM);
}
