'use client';

import { COUPANG_HOST } from '@/app/api/search_coupang/const';
import { KeywordData } from '@/app/api/search_coupang/types';
import DeliveryBadge from '@/components/icons/DeliveryBadge';
import Loading from '@/components/icons/Loading';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LucideExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function KeywordListItem({
  keywordData,
  isLoading = false,
  onClickAnalysis,
}: Props) {
  const COUPANG_SEARCH_URL = `${COUPANG_HOST}/np/search?component=&q=${keywordData.keywordItem.keyword}`;

  const { keywordItem, rocketRatio, rocket = 0, growth = 0, global = 0, wing = 0 } = keywordData;

  const isAnalyzed = keywordData.rocketRatio !== undefined;
  const isFailed = isAnalyzed && rocketRatio && rocketRatio >= 50;
  const isSuccess = isAnalyzed && rocketRatio && rocketRatio < 50;

  return (
    <li
      className={cn(
        'transition-colors border-card-foreground/30 border px-4 py-2 h-16 hover:bg-card-foreground/5 flex items-center justify-between rounded-md',
        isSuccess && 'bg-primary/10 border-primary/30 hover:bg-primary/20 text-primary',
        isFailed &&
          'bg-destructive/10 border-destructive/20 hover:bg-destructive/20 text-destructive',
      )}
    >
      <div className="flex items-baseline gap-2">
        <span className={cn(isFailed && 'line-through', isSuccess && 'font-bold')}>
          {keywordItem.rank}. {keywordItem.keyword}
        </span>
        {!isFailed && (
          <Link
            className="flex items-center gap-1 text-xs hover:underline opacity-50"
            href={COUPANG_SEARCH_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>쿠팡에서 보기</span>
            <LucideExternalLink size={12} />
          </Link>
        )}
      </div>

      {isAnalyzed ? (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <DeliveryBadge type="ROCKET" />
            <span className="text-lg font-bold">{rocket}</span>
          </div>
          <div className="flex items-center gap-2">
            <DeliveryBadge type="GROWTH" />
            <span className="text-lg font-bold">{growth}</span>
          </div>
          <div className="flex items-center gap-2">
            <DeliveryBadge type="GLOBAL" />
            <span className="text-lg font-bold">{global}</span>
          </div>
          <div className="flex items-center gap-2">
            <DeliveryBadge type="WING" />
            <span className="text-lg font-bold">{wing}</span>
          </div>
        </div>
      ) : (
        <Button onClick={onClickAnalysis} disabled={isLoading}>
          {isLoading && <Loading className="mr-2 h-4 w-4" />} 분석
        </Button>
      )}
    </li>
  );
}

type Props = {
  keywordData: KeywordData;
  isLoading?: boolean;
  onClickAnalysis: () => void;
};
