
import React from 'react';
import * as d3 from 'd3';

interface ClockTrackProps {
  radius: number;
  thickness: number;
  value: number;
  max: number;
  color: string;
  label?: string;
}

export const ClockTrack: React.FC<ClockTrackProps> = ({ 
  radius, 
  thickness, 
  value, 
  max, 
  color,
  label 
}) => {
  const arcGenerator = d3.arc()
    .innerRadius(radius - thickness)
    .outerRadius(radius)
    .startAngle(0)
    .endAngle((value / max) * 2 * Math.PI)
    .cornerRadius(thickness / 2);

  const backgroundArc = d3.arc()
    .innerRadius(radius - thickness)
    .outerRadius(radius)
    .startAngle(0)
    .endAngle(2 * Math.PI);

  const arcPath = arcGenerator() || '';
  const backgroundPath = backgroundArc() || '';

  return (
    <g transform="translate(200, 200)">
      {/* Track Background */}
      <path 
        d={backgroundPath} 
        fill="rgba(255,255,255,0.03)" 
      />
      
      {/* Active Track with Glow */}
      <path 
        d={arcPath} 
        fill={color}
        className="transition-all duration-300 ease-out"
        style={{ filter: `drop-shadow(0 0 8px ${color}88)` }}
      />

      {/* Optional labels or markers could go here */}
    </g>
  );
};
