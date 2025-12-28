
import React, { useState, useEffect, useMemo } from 'react';
import { ClockTrack } from './components/ClockTrack';
import { DigitalDisplay } from './components/DigitalDisplay';

const App: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 100); // Update frequently for smooth transitions

    return () => clearInterval(timer);
  }, []);

  const timeData = useMemo(() => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const ms = time.getMilliseconds();

    return {
      hours: (hours % 12) + minutes / 60, // Smooth hour movement
      minutes: minutes + seconds / 60,    // Smooth minute movement
      seconds: seconds + ms / 1000,       // Smooth second movement
      displayHours: hours,
      displayMinutes: minutes,
      displaySeconds: seconds,
      dateString: time.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    };
  }, [time]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 transition-colors duration-1000">
      <div className="relative w-full max-w-[min(90vw,90vh)] aspect-square flex items-center justify-center">
        {/* SVG Viewbox is 400x400, center is 200,200 */}
        <svg 
          viewBox="0 0 400 400" 
          className="w-full h-full drop-shadow-[0_0_30px_rgba(0,0,0,0.5)]"
        >
          {/* Hour Track (Outer) - Thickest */}
          <ClockTrack 
            radius={185} 
            thickness={32} 
            value={timeData.hours} 
            max={12} 
            color="#3B82F6" 
            label="H"
          />
          
          {/* Minute Track (Middle) - Thinner */}
          <ClockTrack 
            radius={140} 
            thickness={20} 
            value={timeData.minutes} 
            max={60} 
            color="#F59E0B" 
            label="M"
          />
          
          {/* Second Track (Inner) - Thinnest */}
          <ClockTrack 
            radius={105} 
            thickness={10} 
            value={timeData.seconds} 
            max={60} 
            color="#EF4444" 
            label="S"
          />

          {/* Center Glow */}
          <defs>
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="200" r="80" fill="url(#centerGlow)" />
        </svg>

        {/* Central Digital Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <DigitalDisplay 
            hours={timeData.displayHours} 
            minutes={timeData.displayMinutes} 
            seconds={timeData.displaySeconds}
            dateString={timeData.dateString}
          />
        </div>
      </div>

      {/* Legend / Info Footer */}
      <div className="mt-8 flex gap-6 text-xs font-semibold tracking-widest uppercase text-white/40">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
          <span>Hours</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]"></div>
          <span>Minutes</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
          <span>Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default App;
