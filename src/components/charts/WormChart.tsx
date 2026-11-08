import React, { useState } from 'react';
import { InningsDetails } from '../../types/cricket';

interface WormChartProps {
  inningsList: InningsDetails[];
  teamHomeCode: string;
  teamAwayCode: string;
}

export const WormChart: React.FC<WormChartProps> = ({ inningsList, teamHomeCode, teamAwayCode }) => {
  const [hoveredPoint, setHoveredPoint] = useState<{
    over: number;
    runs: number;
    inningsName: string;
    wicket?: string;
  } | null>(null);

  if (!inningsList || inningsList.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-sm text-slate-400">
        No innings data available for Worm Chart
      </div>
    );
  }

  // Generate cumulative progression curves for up to 2 key comparing innings
  // For limited overs: Innings 1 vs Innings 2. For Test: Current Innings vs Target/Opponent.
  const chartInnings = inningsList.slice(0, 2);
  
  // Find max overs and max runs for scaling
  let maxOvers = 20;
  let maxRuns = 100;

  const curves = chartInnings.map((inn, idx) => {
    const totalBalls = Math.round(inn.overs * 6);
    const completedOvers = Math.ceil(inn.overs);
    if (completedOvers > maxOvers) maxOvers = completedOvers;
    if (inn.runs > maxRuns) maxRuns = Math.ceil(inn.runs * 1.1);

    // Build realistic interpolated data points per over
    const points: { over: number; runs: number; wicketName?: string }[] = [];
    points.push({ over: 0, runs: 0 });

    const totalOversCount = Math.max(completedOvers, 1);
    for (let o = 1; o <= totalOversCount; o++) {
      // Approximate run progression curve matching total runs
      const ratio = o / totalOversCount;
      const progress = Math.pow(ratio, 0.95);
      const estRuns = Math.min(Math.round(progress * inn.runs), inn.runs);
      
      // Check if a wicket fell in this over
      const fow = inn.fallOfWickets.find(w => w.over === o);
      points.push({
        over: o,
        runs: o === totalOversCount ? inn.runs : estRuns,
        wicketName: fow ? `${fow.wicketNumber}w (${fow.batsmanName} ${fow.score})` : undefined
      });
    }

    return {
      innings: inn,
      points,
      color: idx === 0 ? '#38bdf8' : '#10b981'
    };
  });

  const width = 640;
  const height = 260;
  const padding = { top: 20, right: 30, bottom: 40, left: 45 };
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  const scaleX = (over: number) => padding.left + (over / Math.max(maxOvers, 1)) * graphWidth;
  const scaleY = (runs: number) => padding.top + graphHeight - (runs / Math.max(maxRuns, 1)) * graphHeight;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3 text-xs">
        <div className="flex items-center gap-4">
          {curves.map((c, i) => (
            <div key={i} className="flex items-center gap-2 font-medium">
              <span className="w-3 h-1 rounded-full" style={{ backgroundColor: c.color }} />
              <span className="text-slate-300">
                {c.innings.teamCode} ({c.innings.runs}/{c.innings.wickets} in {c.innings.overs} ov)
              </span>
            </div>
          ))}
        </div>
        <span className="text-slate-400">Cumulative Progression (Worm)</span>
      </div>

      <div className="relative bg-slate-900/60 rounded-xl p-2 border border-slate-800">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          {/* Horizontal Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((p, idx) => {
            const rVal = Math.round(p * maxRuns);
            const y = scaleY(rVal);
            return (
              <g key={idx}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="#1e293b"
                  strokeDasharray="3 3"
                />
                <text
                  x={padding.left - 8}
                  y={y + 4}
                  fill="#64748b"
                  fontSize="10"
                  textAnchor="end"
                  className="font-mono tabular-nums"
                >
                  {rVal}
                </text>
              </g>
            );
          })}

          {/* Vertical Grid lines (Overs) */}
          {Array.from({ length: 6 }).map((_, idx) => {
            const overVal = Math.round((idx / 5) * maxOvers);
            const x = scaleX(overVal);
            return (
              <g key={idx}>
                <line
                  x1={x}
                  y1={padding.top}
                  x2={x}
                  y2={height - padding.bottom}
                  stroke="#1e293b"
                  strokeDasharray="2 2"
                />
                <text
                  x={x}
                  y={height - padding.bottom + 16}
                  fill="#64748b"
                  fontSize="10"
                  textAnchor="middle"
                  className="font-mono tabular-nums"
                >
                  {overVal} ov
                </text>
              </g>
            );
          })}

          {/* Worm Lines */}
          {curves.map((curve, cIdx) => {
            const pathD = curve.points.reduce((acc, pt, i) => {
              const x = scaleX(pt.over);
              const y = scaleY(pt.runs);
              return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
            }, '');

            return (
              <g key={cIdx}>
                <path
                  d={pathD}
                  fill="none"
                  stroke={curve.color}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Points and Wicket markers */}
                {curve.points.map((pt, pIdx) => {
                  const x = scaleX(pt.over);
                  const y = scaleY(pt.runs);

                  if (pt.wicketName) {
                    return (
                      <g key={pIdx}>
                        <circle
                          cx={x}
                          cy={y}
                          r="4.5"
                          fill="#ef4444"
                          stroke="#ffffff"
                          strokeWidth="1.5"
                          className="cursor-pointer transition-transform hover:scale-125"
                          onMouseEnter={() => setHoveredPoint({
                            over: pt.over,
                            runs: pt.runs,
                            inningsName: curve.innings.teamCode,
                            wicket: pt.wicketName
                          })}
                          onMouseLeave={() => setHoveredPoint(null)}
                        />
                        <text
                          x={x}
                          y={y - 7}
                          fill="#ef4444"
                          fontSize="9"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          W
                        </text>
                      </g>
                    );
                  }

                  return (
                    <circle
                      key={pIdx}
                      cx={x}
                      cy={y}
                      r="2.5"
                      fill={curve.color}
                      className="cursor-pointer transition-transform hover:scale-150"
                      onMouseEnter={() => setHoveredPoint({
                        over: pt.over,
                        runs: pt.runs,
                        inningsName: curve.innings.teamCode
                      })}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                  );
                })}
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        {hoveredPoint && (
          <div className="absolute top-3 right-3 bg-slate-950/95 border border-slate-700/80 px-3 py-1.5 rounded-lg text-xs shadow-xl pointer-events-none">
            <span className="text-slate-400 font-semibold">{hoveredPoint.inningsName}: </span>
            <span className="font-mono tabular-nums text-sky-400">{hoveredPoint.runs} runs</span>
            <span className="text-slate-500"> in Over {hoveredPoint.over}</span>
            {hoveredPoint.wicket && (
              <div className="text-red-400 font-medium text-[11px] mt-0.5">
                Dismissal: {hoveredPoint.wicket}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
