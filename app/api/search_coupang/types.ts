import { KeywordItem } from '@/components/pages/KeywordAnalysis/types';
import { getKeywordSearchResult } from './utils';

export type CoupangDeliveryType = 'ROCKET' | 'GROWTH' | 'WING' | 'GLOBAL';

export type KeywordSearchResult = Awaited<ReturnType<typeof getKeywordSearchResult>>;

export type KeywordData = Omit<
  KeywordSearchResult,
  'keyword' | 'rocket' | 'growth' | 'wing' | 'global'
> & {
  keywordItem: KeywordItem;
  rocket?: number;
  growth?: number;
  wing?: number;
  global?: number;
  rocketRatio?: number;
};
