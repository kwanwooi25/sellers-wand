'use client';

import { COUPANG_HOST } from '@/app/api/search_coupang/const';
import { KeywordData } from '@/app/api/search_coupang/types';
import DeliveryBadge from '@/components/icons/DeliveryBadge';
import Loading from '@/components/icons/Loading';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import CoupangLogo from '@/public/logo_coupang_w350.png';
import { LucideExternalLink, LucideX } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ItemScoutLogo from './ItemScoutLogo';

export default function KeywordListItem({
  keywordData,
  isLoading = false,
  onClickAnalysis,
  onRemove,
}: Props) {
  const COUPANG_SEARCH_URL = `${COUPANG_HOST}/np/search?component=&q=${keywordData.keywordItem.keyword}`;

  const { keywordItem, rocketRatio, rocket = 0, growth = 0, global = 0, wing = 0 } = keywordData;

  const isAnalyzed = keywordData.rocketRatio !== undefined;
  const isFailed = isAnalyzed && rocketRatio && rocketRatio >= 50;
  const isSuccess = isAnalyzed && rocketRatio && rocketRatio < 50;

  return (
    <li
      className={cn(
        'transition-colors border-card-foreground/30 border px-4 py-2 h-16 hover:bg-card-foreground/5 flex items-center justify-between gap-4 rounded-md',
        isSuccess && 'bg-primary/10 border-primary/30 hover:bg-primary/20 text-primary',
        isFailed &&
          'bg-destructive/10 border-destructive/20 hover:bg-destructive/20 text-destructive',
      )}
    >
      <div className="flex flex-1 items-center gap-2">
        <span className={cn(isFailed && 'line-through', isSuccess && 'font-bold')}>
          {keywordItem.rank}. {keywordItem.keyword}
        </span>
        {!isFailed && (
          <div className="ml-auto flex items-start gap-2">
            <Link
              className="transition-opacity hover:opacity-90 opacity-60"
              href={COUPANG_SEARCH_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="flex items-center gap-1" variant="link">
                <Image src={CoupangLogo.src} alt="coupang" width={(350 * 12) / 82} height={12} />
                <LucideExternalLink size={12} />
              </Button>
            </Link>
            <Link
              className="transition-opacity hover:opacity-90 opacity-60"
              href={keywordItem.keywordLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="flex items-center gap-1" variant="link">
                <ItemScoutLogo height={12} />
                <LucideExternalLink size={12} />
              </Button>
            </Link>
          </div>
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

      {isFailed && (
        <Button onClick={onRemove} variant="destructive" size="icon">
          <LucideX />
        </Button>
      )}
    </li>
  );
}

type Props = {
  keywordData: KeywordData;
  isLoading?: boolean;
  onClickAnalysis: () => void;
  onRemove: () => void;
};
