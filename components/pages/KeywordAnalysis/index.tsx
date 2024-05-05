'use client';

import { KeywordData, KeywordSearchResult } from '@/app/api/search_coupang/types';
import ItemScoutExcelFileDropzone from '@/components/Dropzone/ItemScoutExcelFileDropzone';
import Loading from '@/components/icons/Loading';
import { Button } from '@/components/ui/button';
import { KeywordItem } from '@/lib/excel';
import axios from 'axios';
import chunk from 'lodash/chunk';
import { ComponentProps, useState } from 'react';
import KeywordListItem from './KeywordListItem';

export default function KeywordAnalysisPage() {
  const [isAnalyzingAll, setIsAnalyzingAll] = useState(false);
  const [loadingKeywords, setLoadingKeywords] = useState<string[]>([]);
  const [keywordData, setKeywordData] = useState<Record<string, KeywordData>>({});

  const totalKeywordCount = Object.keys(keywordData).length;
  const completedKeywordCount = Object.values(keywordData).filter(
    (k) => k.rocketRatio !== undefined,
  ).length;

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
    const keywordDataList = Object.values(keywordData);
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

  return (
    <>
      <ItemScoutExcelFileDropzone onChange={handleExcelLoad} />

      <div className="mt-4 flex items-center gap-4">
        <Button onClick={handleClickSearch} disabled={isAnalyzingAll}>
          {isAnalyzingAll && <Loading className="mr-2 h-4 w-4" />}
          키워드 전체 분석
        </Button>
        {isAnalyzingAll && (
          <span>
            키워드별 쿠팡 상위 랭킹의 배송 방식을 분석중입니다... ({completedKeywordCount} /{' '}
            {totalKeywordCount})
          </span>
        )}
      </div>

      <ul className="py-4 flex flex-col gap-2">
        {Object.values(keywordData).map((item) => (
          <KeywordListItem
            key={item.keywordItem.keyword}
            keywordData={item}
            isLoading={loadingKeywords.includes(item.keywordItem.keyword)}
            onClickAnalysis={() => analyzeKeyword(item.keywordItem)}
          />
        ))}
      </ul>
    </>
  );
}
