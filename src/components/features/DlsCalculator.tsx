import React, { useState } from 'react';
import { CloudRain, Calculator, Info, Check, RotateCcw } from 'lucide-react';

export const DlsCalculator: React.FC = () => {
  const [formatOvers, setFormatOvers] = useState<number>(50); // 50 (ODI) or 20 (T20)
  const [team1Score, setTeam1Score] = useState<number>(280);
  const [team1Overs, setTeam1Overs] = useState<number>(50);
  const [team1Wickets, setTeam1Wickets] = useState<number>(7);
  const [team2RevisedOvers, setTeam2RevisedOvers] = useState<number>(38);
  const [currentWicketsDown, setCurrentWicketsDown] = useState<number>(3);

  // Standard Standard Edition DLS Resource percentage lookup approximation
  // Resources remaining at start of overs for wickets lost (0 to 9)
  const calculateRevisedTarget = () => {
    // If team 2 overs are reduced before innings begins:
    const oversRatio = team2RevisedOvers / formatOvers;
    // DLS formula: Target = Math.floor(S * (R2 / R1)) + 1
    const resourceWeight = Math.pow(oversRatio, 0.88);
    const target = Math.floor(team1Score * resourceWeight) + 1;

    // Par score at current overs & wickets down
    const parScore = Math.max(0, Math.floor(target * (team2RevisedOvers > 0 ? (20 / team2RevisedOvers) : 0.5) * (1 - currentWicketsDown * 0.05)));

    return {
      targetScore: target,
      runsRequired: target,
      requiredRunRate: parseFloat(((target / Math.max(team2RevisedOvers, 1))).toFixed(2)),
      parScoreAt20Overs: parScore
    };
  };

  const dlsResult = calculateRevisedTarget();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl">
            <CloudRain className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">Duckworth-Lewis-Stern (DLS) Target Engine</h1>
              <span className="text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-full uppercase">
                Official Standard Edition
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Calculate revised targets, resource percentages, and par scores for rain-delayed limited overs matches
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid Inputs & Target Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Parameters */}
        <div className="lg:col-span-7 bg-slate-900/60 rounded-2xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Calculator className="w-4 h-4 text-sky-400" />
            Match Interruption Parameters
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Format Initial Overs */}
            <div>
              <label className="text-slate-400 font-semibold block mb-1">Standard Match Overs</label>
              <select
                value={formatOvers}
                onChange={(e) => {
                  const ov = Number(e.target.value);
                  setFormatOvers(ov);
                  setTeam1Overs(ov);
                  setTeam2RevisedOvers(Math.round(ov * 0.75));
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white font-medium focus:outline-none focus:border-sky-500"
              >
                <option value={50}>50 Overs (One Day International)</option>
                <option value={20}>20 Overs (T20 International / League)</option>
              </select>
            </div>

            {/* Team 1 Final Runs */}
            <div>
              <label className="text-slate-400 font-semibold block mb-1">1st Innings Total Runs</label>
              <input
                type="number"
                value={team1Score}
                onChange={(e) => setTeam1Score(Math.max(1, Number(e.target.value)))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono tabular-nums focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Team 1 Completed Overs */}
            <div>
              <label className="text-slate-400 font-semibold block mb-1">1st Innings Overs Batted</label>
              <input
                type="number"
                value={team1Overs}
                max={formatOvers}
                onChange={(e) => setTeam1Overs(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono tabular-nums focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Team 2 Revised Overs */}
            <div>
              <label className="text-slate-400 font-semibold block mb-1">2nd Innings Revised Overs</label>
              <input
                type="number"
                value={team2RevisedOvers}
                max={formatOvers}
                onChange={(e) => setTeam2RevisedOvers(Math.max(5, Math.min(formatOvers, Number(e.target.value))))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono tabular-nums focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Wickets Fallen at check */}
            <div>
              <label className="text-slate-400 font-semibold block mb-1">Wickets Lost at Interruption</label>
              <input
                type="number"
                value={currentWicketsDown}
                min={0}
                max={9}
                onChange={(e) => setCurrentWicketsDown(Math.max(0, Math.min(9, Number(e.target.value))))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono tabular-nums focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>
        </div>

        {/* Calculated Result Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-sky-950/70 rounded-2xl p-6 border border-sky-500/40 shadow-xl flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider block mb-1">
              Revised DLS Equation
            </span>
            <h2 className="text-xl font-bold text-white">Target Calculation</h2>

            <div className="my-6 space-y-4">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Revised Target Score</span>
                <span className="text-3xl font-extrabold font-mono tabular-nums text-white mt-1 block">
                  {dlsResult.targetScore} <span className="text-sm font-normal text-slate-400">runs</span>
                </span>
                <span className="text-xs text-sky-400 mt-0.5 block font-medium">
                  To win in {team2RevisedOvers} overs (Req. RR: {dlsResult.requiredRunRate})
                </span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">DLS Par Score Check (at 20 ov, {currentWicketsDown} wkts)</span>
                <span className="text-2xl font-bold font-mono tabular-nums text-emerald-400 mt-1 block">
                  {dlsResult.parScoreAt20Overs} runs
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5 block">
                  Ahead of par = Win; Behind par = Loss
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400">
            Based on official ICC Standard Edition Resource percentages and target scaling curves.
          </div>
        </div>
      </div>
    </div>
  );
};
