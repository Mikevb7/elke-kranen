import { ANNOUNCEMENT } from '@/lib/constants';

export function AnnouncementBar() {
  return (
    <div className="bg-[#1A1A1A] text-white py-2 text-center text-xs tracking-widest uppercase font-medium">
      {ANNOUNCEMENT}
    </div>
  );
}
