import DeliveryBadge from '@/components/icons/DeliveryBadge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { getNumberDisplay } from '@/lib/string';
import { cn } from '@/lib/utils';
import { Product } from '@prisma/client';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { LucideEdit3, LucideMoreVertical } from 'lucide-react';
import { ProductToCreate } from '../types';

export default function Row({ className, data }: Props) {
  const {
    productName,
    vendorProductId,
    productId,
    optionId,
    barcode,
    vendorProductCode,
    deliveryType,
    quantity,
    salesFeeRate,
    deliveryCost,
    couponPrice,
    leadtime,
  } = data;

  return (
    <tr
      className={cn(
        'transition-colors border-b px-4 py-2 hover:bg-card-foreground/5 grid grid-cols-[4fr_2fr_2fr_1fr_1fr_1fr_40px] items-center gap-4',
        className,
      )}
    >
      <td className="flex flex-col">
        <span className="line-clamp-3">{productName}</span>
      </td>
      <td className="flex flex-col items-center">
        <span>{vendorProductId}</span>
        <span>{productId}</span>
        <span>{optionId}</span>
      </td>
      <td className="flex flex-col items-center">
        <span>{barcode || '-'}</span>
        <span>{vendorProductCode || '-'}</span>
      </td>
      <td className="flex flex-col items-center">
        <DeliveryBadge type={deliveryType} />
        <span>{getNumberDisplay(quantity)}</span>
      </td>
      <td className="flex flex-col items-center">
        <span>{getNumberDisplay(salesFeeRate, { decimalPlaces: 1, suffix: '%' })}</span>
        <span>{getNumberDisplay(deliveryCost, { prefix: '₩' })}</span>
        <span>{getNumberDisplay(couponPrice, { prefix: '₩' })}</span>
      </td>
      <td className="flex flex-col items-center">
        <span>{getNumberDisplay(leadtime, { suffix: '주' })}</span>
      </td>
      <td>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <LucideMoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="!min-w-min" side="left" align="start">
            <DropdownMenuItem>
              <LucideEdit3 className="w-4 h-4 mr-2" />
              <span>수정</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
}

type Props = {
  className?: string;
  data: Product | ProductToCreate;
};
