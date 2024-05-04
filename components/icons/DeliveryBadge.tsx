import RocketBadge from '@/public/badge_rocket.png';
import GrowthBadge from '@/public/badge_growth.png';
import GlobalBadge from '@/public/badge_global.png';
import WingBadge from '@/public/badge_wing.png';
import { CoupangDeliveryType } from '@/app/api/search_coupang/types';
import Image from 'next/image';

const BADGE_IMAGE_SRC: Record<CoupangDeliveryType, string> = {
  ROCKET: RocketBadge.src,
  GROWTH: GrowthBadge.src,
  GLOBAL: GlobalBadge.src,
  WING: WingBadge.src,
};

export default function DeliveryBadge({ type, size = 24 }: Props) {
  const src = BADGE_IMAGE_SRC[type];

  return <Image src={src} alt={`${type} badge`} width={size} height={size} />;
}

type Props = {
  type: CoupangDeliveryType;
  size?: number;
};
