import { GNB_HEIGHT } from '@/const/layout';
import { useMemo } from 'react';
import TableHeaderRow from './TableHeaderRow';
import TableRow from './TableRow';
import { AdReportRow } from './types';
import { aggregateAdReportRows, groupRowsByKeyword } from './utils';

export default function Table({ rawRows }: Props) {
  const { searchAreaRows, nonSearchAreaRows } = useMemo(() => {
    return rawRows.reduce(
      ({ searchAreaRows, nonSearchAreaRows }, item) => {
        const isSearchAreaRows = item.adExposureArea === '검색 영역';
        if (isSearchAreaRows) {
          return { searchAreaRows: [...searchAreaRows, item], nonSearchAreaRows };
        }

        return { searchAreaRows, nonSearchAreaRows: [...nonSearchAreaRows, item] };
      },
      {
        searchAreaRows: [] as AdReportRow[],
        nonSearchAreaRows: [] as AdReportRow[],
      },
    );
  }, [rawRows]);

  const searchAreaAggregate = useMemo(
    () => aggregateAdReportRows(searchAreaRows),
    [searchAreaRows],
  );
  const nonSearchAreaAggregate = useMemo(
    () => aggregateAdReportRows(nonSearchAreaRows),
    [nonSearchAreaRows],
  );
  const keywordRows = useMemo(() => groupRowsByKeyword(searchAreaRows), [searchAreaRows]);

  return (
    <table className="w-full">
      <thead className="sticky backdrop-blur z-10" style={{ top: GNB_HEIGHT }}>
        <TableHeaderRow />
      </thead>
      <tbody>
        <TableRow title={<b>비검색 영역</b>} data={nonSearchAreaAggregate} />
        <TableRow title={<b>검색 영역</b>} data={searchAreaAggregate} />
        {keywordRows.map(({ keyword, data }) => (
          <TableRow
            className="opacity-70"
            key={keyword}
            title={<span className="ml-4 text-sm">{keyword}</span>}
            data={data}
          />
        ))}
      </tbody>
    </table>
  );
}

type Props = {
  rawRows: AdReportRow[];
};
