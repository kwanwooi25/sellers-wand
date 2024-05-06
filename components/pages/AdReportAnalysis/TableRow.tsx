import { getNumberDisplay } from '@/lib/string';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { aggregateAdReportRows } from './utils';

const CLICK_RATE_THRESHOLD = 0.002;
const CONVERSION_RATE_THRESHOLD = 0.03;

export default function TableRow({ className, title, data }: Props) {
  const {
    exposedCount,
    clickCount,
    adExpense,
    totalOrderCountFor14Days,
    totalConversionSalesAmountFor14Days,
    clickRate,
    conversionRate,
    costPerClick,
    costPerConversion,
    roas,
  } = data;

  return (
    <tr
      className={cn(
        'transition-colors border-b px-4 py-2 hover:bg-card-foreground/5 grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center gap-4',
        className,
      )}
    >
      <td className="truncate">{title}</td>
      <td className="flex flex-col items-center">{getNumberDisplay(exposedCount)}</td>
      <td className="flex flex-col items-center">
        <span>{getNumberDisplay(clickCount)}</span>
        <span className={cn('font-bold', clickRate > CLICK_RATE_THRESHOLD && 'text-green-700')}>
          ({getNumberDisplay(clickRate * 100, { decimalPlaces: 2, suffix: '%' })})
        </span>
      </td>
      <td className="flex flex-col items-center">
        <span>{getNumberDisplay(totalOrderCountFor14Days)}</span>
        <span
          className={cn(
            'font-bold',
            conversionRate > CONVERSION_RATE_THRESHOLD && 'text-green-700',
          )}
        >
          ({getNumberDisplay(conversionRate * 100, { decimalPlaces: 2, suffix: '%' })})
        </span>
      </td>
      <td className="flex flex-col items-center">
        <span>{getNumberDisplay(adExpense, { prefix: '₩' })}</span>
        <span>({getNumberDisplay(costPerClick, { prefix: '₩' })})</span>
      </td>
      <td className="flex flex-col items-center">
        <span>{getNumberDisplay(totalConversionSalesAmountFor14Days, { prefix: '₩' })}</span>
        <span>({getNumberDisplay(costPerConversion, { prefix: '₩' })})</span>
      </td>
      <td className="flex flex-col items-center">
        {getNumberDisplay(roas * 100, { suffix: '%' })}
      </td>
    </tr>
  );
}

type Props = {
  className?: string;
  title: ReactNode;
  data: ReturnType<typeof aggregateAdReportRows>;
};
