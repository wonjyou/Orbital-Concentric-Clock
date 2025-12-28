
import React from 'react';

interface DigitalDisplayProps {
  hours: number;
  minutes: number;
  seconds: number;
  dateString: string;
}

const formatNum = (n: number) => n.toString().padStart(2, '0');

export const DigitalDisplay: React.FC<DigitalDisplayProps> = ({ 
  hours, 
  minutes, 
  seconds,
  dateString 
}) => {
  return (
    <div className="text-center animate-in fade-in duration-700">
      <div className="flex items-baseline justify-center font-extrabold tracking-tighter text-white">
        <span className="text-4xl md:text-5xl lg:text-6xl">{formatNum(hours)}</span>
        <span className="text-2xl md:text-3xl lg:text-4xl mx-1 text-white/20 animate-pulse">:</span>
        <span className="text-4xl md:text-5xl lg:text-6xl">{formatNum(minutes)}</span>
        <span className="text-xl md:text-2xl lg:text-3xl ml-2 text-white/40 tabular-nums">
          {formatNum(seconds)}
        </span>
      </div>
      <div className="mt-2 text-[10px] md:text-xs font-semibold tracking-widest text-white/50 uppercase max-w-[120px] mx-auto leading-relaxed">
        {dateString}
      </div>
    </div>
  );
};
