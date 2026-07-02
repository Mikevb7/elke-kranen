import { cn } from '@/lib/utils';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40',
          variant === 'primary' && 'bg-[#1A1A1A] text-white hover:bg-[#333]',
          variant === 'secondary' && 'bg-[#C9A96E] text-white hover:bg-[#b89058]',
          variant === 'ghost' && 'text-[#1A1A1A] hover:bg-[#F6F5F3]',
          variant === 'outline' && 'border border-[#E7E5E1] text-[#1A1A1A] hover:border-[#1A1A1A]',
          size === 'sm' && 'h-8 px-3 text-xs',
          size === 'md' && 'h-11 px-5 text-sm',
          size === 'lg' && 'h-13 px-7 text-base',
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
