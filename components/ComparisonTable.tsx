
import React from 'react';
import { COMPARISON_DATA } from '../constants';

const ComparisonTable: React.FC = () => {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 glass-panel">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-white/5 border-b border-white/10">
            <th className="px-6 py-4 font-bold font-heading text-[10px] tracking-widest uppercase text-zinc-500">Metric</th>
            <th className="px-6 py-4 font-bold font-heading text-[10px] tracking-widest uppercase text-zinc-600">Traditional eVTOLs</th>
            <th className="px-6 py-4 font-bold font-heading text-[10px] tracking-widest uppercase text-[#b46c00]">Sedai Aero Solution</th>
          </tr>
        </thead>
        <tbody>
          {COMPARISON_DATA.map((row, idx) => (
            <tr key={idx} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
              <td className="px-6 py-4 font-semibold text-zinc-200 uppercase text-xs tracking-tight">{row.feature}</td>
              <td className="px-6 py-4 text-zinc-500 text-sm">{row.competitors}</td>
              <td className="px-6 py-4 font-medium text-zinc-100 text-sm">{row.sedai}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
