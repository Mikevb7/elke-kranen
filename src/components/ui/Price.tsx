import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface PriceProps {
  amount: string;
  currencyCode?: string;
  compareAtAmount?: string | null;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Price({ amount, currencyCode = 'EUR', compareAtAmount, className, size = 'md' }: PriceProps) {
  const hasDiscount = compareAtAmount && Number(compareAtAmount) > Number(amount);

  return (
    <span className={cn('inline-flex items-baseline gap-2', className)}>
      <span
        className={cn(
          'font-semibold tabular-nums',
          size === 'sm' && 'text-sm',
          size === 'md' && 'text-base',
          size === 'lg' && 'text-2xl'
        )}
      >
        {formatPrice(amount, currencyCode)}
      </span>
      {hasDiscount && (
        <span className="text-sm text-[#5A5A5A] line-through tabular-nums">
          {formatPrice(compareAtAmount!, currencyCode)}
        </span>
      )}
    </span>
  );
}
