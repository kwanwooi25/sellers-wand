import { AdReportRow } from './types';

export function aggregateAdReportRows(rows: AdReportRow[]) {
  const {
    exposedCount,
    clickCount,
    adExpense,
    totalOrderCountFor14Days,
    totalConversionSalesAmountFor14Days,
  } = rows.reduce(
    (acc, cur) => {
      return {
        exposedCount: acc.exposedCount + cur.exposedCount,
        clickCount: acc.clickCount + cur.clickCount,
        adExpense: acc.adExpense + cur.adExpense,
        totalOrderCountFor14Days: acc.totalOrderCountFor14Days + cur.totalOrderCountFor14Days,
        totalConversionSalesAmountFor14Days:
          acc.totalConversionSalesAmountFor14Days + cur.totalConversionSalesAmountFor14Days,
      };
    },
    {
      exposedCount: 0,
      clickCount: 0,
      adExpense: 0,
      totalOrderCountFor14Days: 0,
      totalConversionSalesAmountFor14Days: 0,
    },
  );

  return {
    exposedCount,
    clickCount,
    adExpense,
    totalOrderCountFor14Days,
    totalConversionSalesAmountFor14Days,
    clickRate: !exposedCount ? 0 : clickCount / exposedCount,
    conversionRate: !clickCount ? 0 : totalOrderCountFor14Days / clickCount,
    costPerClick: !clickCount ? 0 : adExpense / clickCount,
    costPerConversion: !totalOrderCountFor14Days ? 0 : adExpense / totalOrderCountFor14Days,
    roas: !adExpense ? 0 : totalConversionSalesAmountFor14Days / adExpense,
  };
}

export function groupRowsByKeyword(rows: AdReportRow[]) {
  const groupByKeyword = rows.reduce((acc, row) => {
    if (!acc[row.keyword]) {
      acc[row.keyword] = [];
    }

    return {
      ...acc,
      [row.keyword]: [...acc[row.keyword], row],
    };
  }, {} as Record<string, AdReportRow[]>);

  return Object.entries(groupByKeyword)
    .map(([keyword, group]) => {
      return {
        keyword,
        data: aggregateAdReportRows(group),
      };
    })
    .sort((a, b) => (a.data.exposedCount > b.data.exposedCount ? -1 : 1))
    .sort((a, b) => (a.data.totalOrderCountFor14Days > b.data.totalOrderCountFor14Days ? -1 : 1));
}
