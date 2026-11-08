import React, { useState } from 'react';
import { WagonWheelPoint } from '../../types/cricket';

interface WagonWheelProps {
  points?: WagonWheelPoint[];
  title?: string;
}

export const WagonWheel: React.FC<WagonWheelProps> = ({ points = [], title = 'Scoring Shot Distribution (Wagon Wheel)' }) => {
  const [selectedShotType, setSelectedShotType] = useState<string>('all');
  const [hoveredPoint, setHoveredPoint] = useState<WagonWheelPoint | null>(null);

  // Fallback realistic shots if none provided
  const shotList: WagonWheelPoint[] = points.length > 0 ? points : [
    { id: '1', angle: 45, distance: 88, runs: 4, batterName: 'Batter', shotType: 'Cover Drive' },
    { id: '2', angle: 25, distance: 95, runs: 6, batterName: 'Batter', shotType: 'Extra Cover Loft' },
    { id: '3', angle: 85, distance: 98, runs: 6, batterName: 'Batter', shotType: 'Long On Smash' },
    { id: '4', angle: 135, distance: 82, runs: 4, batterName: 'Batter', shotType: 'Midwicket Pull' },
    { id: '5', angle: 165, distance: 55, runs: 2, batterName: 'Batter', shotType: 'Square Leg Flick' },
    { id: '6', angle: 225, distance: 40, runs: 1, batterName: 'Batter', shotType: 'Fine Leg Glance' },
    { id: '7', angle: 315, distance: 85, runs: 4, batterName: 'Batter', shotType: 'Point Cut' },
    { id: '8', angle: 340, distance: 65, runs: 2, batterName: 'Batter', shotType: 'Third Man Steer' }
  ];

  const filteredPoints = selectedShotType === 'all' 
    ? shotList 
    : shotList.filter(p => selectedShotType === 'boundary' ? p.runs >= 4 : p.runs < 4);

  // SVG dimensions
  const size = 320;
  const center = size / 2;
  const radius = center - 24;
  const innerCircleRadius = radius * 0.45; // 30-yard circle

  // Convert polar coordinates to Cartesian
  // 0 deg = North (Straight / Bowler), 90 deg = East (Midwicket), 180 deg = South (Fine Leg), 270 deg = West (Cover / Point)
  const polarToCartesian = (angleDeg: number, distPercent: number) => {
    // Angle in radians; rotate so 0 is straight down the ground (upwards)
    const angleRad = ((angleDeg - 90) * Math.PI) / 180;
    const currentR = (distPercent / 100) * radius;
    return {
      x: center + currentR * Math.cos(angleRad),
      y: center + currentR * Math.sin(angleRad)
    };
  };

  const getRunColor = (runs: number) => {
    if (runs === 6) return '#a855f7'; // Purple for 6
    if (runs === 4) return '#0ea5e9'; // Blue for 4
    if (runs >= 2) return '#10b981'; // Green for 2, 3
    return '#f59e0b'; // Amber for 1
  };

  // Sector breakdown stats
  const offSideRuns = shotList.filter(p => p.angle > 180 || p.angle < 30).reduce((s, p) => s + p.runs, 0);
  const legSideRuns = shotList.filter(p => p.angle >= 30 && p.angle <= 180).reduce((s, p) => s + p.runs, 0);
  const boundaryCount = shotList.filter(p => p.runs >= 4).length;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3 text-xs">
        <span className="text-slate-300 font-semibold">{title}</span>
        <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setSelectedShotType('all')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              selectedShotType === 'all' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Shots
          </button>
          <button
            onClick={() => setSelectedShotType('boundary')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              selectedShotType === 'boundary' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Boundaries Only
          </button>
          <button
            onClick={() => setSelectedShotType('singles')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              selectedShotType === 'singles' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            1s & 2s
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900/60 rounded-xl p-4 border border-slate-800 items-center">
        {/* SVG Graphic */}
        <div className="md:col-span-2 flex justify-center relative">
          <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[300px] h-auto">
            {/* Outer boundary turf circle */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="#062619"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="4 2"
            />
            
            {/* 30-yard inner circle */}
            <circle
              cx={center}
              cy={center}
              r={innerCircleRadius}
              fill="#083322"
              stroke="#047857"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />

            {/* Pitch rectangle in center */}
            <rect
              x={center - 6}
              y={center - 22}
              width={12}
              height={44}
              fill="#b45309"
              stroke="#d97706"
              strokeWidth="1"
              rx="1"
            />

            {/* Batting Crease lines */}
            <line x1={center - 8} y1={center + 12} x2={center + 8} y2={center + 12} stroke="#ffffff" strokeWidth="1" />
            <line x1={center - 8} y1={center - 12} x2={center + 8} y2={center - 12} stroke="#ffffff" strokeWidth="1" />

            {/* Field Position Sector Labels */}
            <text x={center} y={16} fill="#64748b" fontSize="8" textAnchor="middle" fontWeight="bold">LONG OFF / ON</text>
            <text x={size - 10} y={center + 3} fill="#64748b" fontSize="8" textAnchor="end" fontWeight="bold">MIDWICKET</text>
            <text x={center} y={size - 10} fill="#64748b" fontSize="8" textAnchor="middle" fontWeight="bold">FINE LEG</text>
            <text x={12} y={center + 3} fill="#64748b" fontSize="8" textAnchor="start" fontWeight="bold">COVERS / POINT</text>

            {/* Shot Rays */}
            {filteredPoints.map((pt) => {
              const target = polarToCartesian(pt.angle, pt.distance);
              const color = getRunColor(pt.runs);

              return (
                <g key={pt.id} className="cursor-pointer group">
                  <line
                    x1={center}
                    y1={center + 12} // originates from striker crease
                    x2={target.x}
                    y2={target.y}
                    stroke={color}
                    strokeWidth={pt.runs >= 4 ? '2.5' : '1.5'}
                    strokeLinecap="round"
                    opacity={hoveredPoint && hoveredPoint.id !== pt.id ? 0.3 : 0.85}
                    onMouseEnter={() => setHoveredPoint(pt)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                  <circle
                    cx={target.x}
                    cy={target.y}
                    r={pt.runs >= 4 ? 4 : 3}
                    fill={color}
                    stroke="#ffffff"
                    strokeWidth="1"
                    onMouseEnter={() => setHoveredPoint(pt)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                </g>
              );
            })}
          </svg>

          {/* Hover tool badge */}
          {hoveredPoint && (
            <div className="absolute top-2 left-2 bg-slate-950/95 border border-slate-700 px-3 py-1.5 rounded-lg text-xs shadow-lg">
              <div className="font-semibold text-slate-200">{hoveredPoint.shotType || 'Scoring Shot'}</div>
              <div className="text-slate-400 font-mono tabular-nums">
                {hoveredPoint.runs} runs · {hoveredPoint.batterName}
              </div>
            </div>
          )}
        </div>

        {/* Legend & Sector Splits */}
        <div className="flex flex-col gap-3 text-xs">
          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
            <span className="text-slate-400 font-semibold block mb-2">Shot Run Distribution</span>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Sixes (6s)
                </span>
                <span className="font-mono tabular-nums text-purple-400 font-bold">
                  {shotList.filter(p => p.runs === 6).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500" /> Fours (4s)
                </span>
                <span className="font-mono tabular-nums text-sky-400 font-bold">
                  {shotList.filter(p => p.runs === 4).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Twos & Threes
                </span>
                <span className="font-mono tabular-nums text-emerald-400 font-bold">
                  {shotList.filter(p => p.runs === 2 || p.runs === 3).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Singles (1s)
                </span>
                <span className="font-mono tabular-nums text-amber-400 font-bold">
                  {shotList.filter(p => p.runs === 1).length}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
            <span className="text-slate-400 font-semibold block mb-2">Zone Split</span>
            <div className="flex items-center justify-between mb-1">
              <span className="text-slate-300">Off-Side:</span>
              <span className="font-mono tabular-nums text-sky-400 font-semibold">{offSideRuns} runs</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Leg-Side:</span>
              <span className="font-mono tabular-nums text-emerald-400 font-semibold">{legSideRuns} runs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
