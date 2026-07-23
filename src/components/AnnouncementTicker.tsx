import React from 'react';
import { Megaphone, ArrowRight } from 'lucide-react';
import { NotificationItem } from '../types/academic';

interface AnnouncementTickerProps {
  notifications: NotificationItem[];
  isBangla: boolean;
  onViewNotice: () => void;
}

export const AnnouncementTicker: React.FC<AnnouncementTickerProps> = ({
  notifications,
  isBangla,
  onViewNotice
}) => {
  const latestNotice = notifications.filter(n => n.priority === 'high')[0] || notifications[0];

  if (!latestNotice) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-2">
      <div 
        id="critical-announcement-banner"
        className="w-full bg-crimson text-white text-xs py-2.5 px-4 flex items-center justify-between shadow-md overflow-hidden relative rounded-lg border border-crimson-dark"
      >
        <div className="flex items-center space-x-3 flex-grow overflow-hidden mr-4">
          {/* Label Chip */}
          <span className="flex items-center space-x-1.5 shrink-0 bg-white/20 text-white font-extrabold uppercase font-mono px-2 py-0.5 rounded text-[10px] tracking-wider border border-white/20 z-10">
            <Megaphone className="w-3.5 h-3.5 animate-bounce" />
            <span>{isBangla ? 'গুরুত্বপূর্ণ' : 'URGENT NOTICE'}</span>
          </span>
          
          {/* Live News marquee description */}
          <div className="overflow-hidden flex-grow relative" onClick={onViewNotice}>
            <div className="animate-marquee font-sans font-medium hover:underline cursor-pointer py-1">
              <span className="font-mono text-red-100/90 mr-2 border-r border-white/20 pr-2">
                {new Date(latestNotice.date).toLocaleDateString(isBangla ? 'bn-BD' : 'en-US', { month: 'short', day: 'numeric' })}:
              </span>
              <span>{latestNotice.title}</span>
            </div>
          </div>
        </div>

        <button 
          id="banner-details-btn"
          onClick={onViewNotice} 
          className="shrink-0 flex items-center space-x-1 bg-white hover:bg-slate-100 text-red-700 font-extrabold px-3 py-1 rounded-md text-[10px] tracking-wide uppercase transition-all shadow hover:scale-105 active:scale-95 duration-150 z-10"
        >
          <span>{isBangla ? 'বিস্তারিত' : 'View Notice'}</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
