'use client';

import { KeywordData, KeywordSearchResult } from '@/app/api/search_coupang/types';
import ItemScoutExcelFileDropzone from '@/components/Dropzone/ItemScoutExcelFileDropzone';
import Loading from '@/components/icons/Loading';
import { Button } from '@/components/ui/button';
import { KeywordItem } from '@/lib/excel/keyword-analysis';
import axios from 'axios';
import chunk from 'lodash/chunk';
import { ComponentProps, useState } from 'react';
import KeywordListItem from './KeywordListItem';

export default function KeywordAnalysisPage() {
  const [isAnalyzingAll, setIsAnalyzingAll] = useState(false);
  const [loadingKeywords, setLoadingKeywords] = useState<string[]>([]);
  const [keywordData, setKeywordData] = useState<Record<string, KeywordData>>({});

  const handleExcelLoad: ComponentProps<typeof ItemScoutExcelFileDropzone>['onChange'] = async (
    items,
  ) => {
    setKeywordData({});

    items.forEach((item) => {
      setKeywordData((prev) => ({
        ...prev,
        [item.keyword]: { keywordItem: item },
      }));
    });
  };

  const analyzeKeyword = async (keywordItem: KeywordItem) => {
    const key = keywordItem.keyword;
    setLoadingKeywords((prev) => [...prev, key]);

    try {
      const res = await axios.get<KeywordSearchResult>(`/api/search_coupang?keyword=${key}`);
      const { rocket, growth, global, wing } = res.data;
      const total = rocket + growth + wing;
      const rocketRatio = (rocket / total) * 100;
      setKeywordData((prev) => ({
        ...prev,
        [key]: {
          keywordItem,
          rocket,
          growth,
          global,
          wing,
          rocketRatio,
        },
      }));
    } finally {
      setLoadingKeywords((prev) => prev.filter((k) => k !== key));
    }
  };

  const handleClickSearch = async () => {
    const keywordDataList = Object.values(keywordData).filter(
      ({ rocketRatio }) => rocketRatio !== undefined,
    );
    const chunkedKeywordDataList = chunk(keywordDataList, 20);

    setIsAnalyzingAll(true);

    await Promise.all(
      chunkedKeywordDataList.map(
        async (list) =>
          await Promise.all(list.map(async ({ keywordItem }) => await analyzeKeyword(keywordItem))),
      ),
    );

    setIsAnalyzingAll(false);
  };

  const removeKeyword = (keyword: string) => {
    setKeywordData((prev) => {
      return Object.keys(prev)
        .filter((k) => k !== keyword)
        .reduce((keywordData, key) => {
          return { ...keywordData, [key]: prev[key] };
        }, {} satisfies Record<string, KeywordData>);
    });
  };

  return (
    <>
      <ItemScoutExcelFileDropzone onChange={handleExcelLoad} />

      <div className="w-full mt-4 flex items-center justify-between gap-4">
        <Button className="ml-auto" onClick={handleClickSearch} disabled={isAnalyzingAll}>
          {isAnalyzingAll && <Loading className="mr-2 h-4 w-4" />}
          키워드 전체 분석
        </Button>
      </div>

      <ul className="py-4 flex flex-col gap-2">
        {Object.values(keywordData).map((item) => (
          <KeywordListItem
            key={item.keywordItem.keyword}
            keywordData={item}
            isLoading={loadingKeywords.includes(item.keywordItem.keyword)}
            onClickAnalysis={() => analyzeKeyword(item.keywordItem)}
            onRemove={() => removeKeyword(item.keywordItem.keyword)}
          />
        ))}
      </ul>
    </>
  );
}
