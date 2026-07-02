import { cn } from '@/lib/utils';

interface PlaceholderImageProps {
  title?: string;
  className?: string;
  aspectRatio?: string;
}

export function PlaceholderImage({ title, className, aspectRatio = 'aspect-square' }: PlaceholderImageProps) {
  return (
    <div
      className={cn(
        aspectRatio,
        'relative flex items-center justify-center overflow-hidden bg-[#F6F5F3]',
        className
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="phGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F6F5F3" />
            <stop offset="50%" stopColor="#EDE9E1" />
            <stop offset="100%" stopColor="#F6F5F3" />
          </linearGradient>
        </defs>
        <rect width="400" height="400" fill="url(#phGrad)" />
        <text
          x="200"
          y="180"
          textAnchor="middle"
          fontSize="48"
          fill="#C9A96E"
          opacity="0.3"
          fontFamily="sans-serif"
        >
          ◈
        </text>
      </svg>
      {title && (
        <span className="relative z-10 px-4 text-center text-xs font-medium tracking-wider text-[#5A5A5A] uppercase">
          {title}
        </span>
      )}
    </div>
  );
}
