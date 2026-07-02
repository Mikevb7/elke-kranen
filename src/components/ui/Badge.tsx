import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'gold' | 'muted';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide',
        variant === 'default' && 'bg-[#F6F5F3] text-[#1A1A1A]',
        variant === 'gold' && 'bg-[#C9A96E]/10 text-[#8A6D3B]',
        variant === 'muted' && 'bg-[#E7E5E1] text-[#5A5A5A]',
        className
      )}
    >
      {children}
    </span>
  );
}
