
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { 
  CheckCircle, XCircle, FileText, Target, Zap, 
  Lightbulb, TrendingUp, ExternalLink, Globe, DollarSign
} from 'lucide-react';
import { ResumeAnalysis } from '../types';
import ScoreCard from './ScoreCard';

interface Props {
  data: ResumeAnalysis;
}

const AnalysisDashboard: React.FC<Props> = ({ data }) => {
  const chartData = data.skillGaps.map(item => ({
    name: item.skill,
    importance: item.importance,
  }));

  // Burgundy-inspired colors for the chart
  const COLORS = ['#800020', '#a3223f', '#c32f50', '#da4d69', '#ec7c91'];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ScoreCard label="Match Rank" score={data.overallScore} color="text-burgundy-800 dark:text-burgundy-500" icon={<TrendingUp size={16} />} />
        <ScoreCard label="ATS Score" score={data.atsCompatibility} color="text-emerald-500" icon={<CheckCircle size={16} />} />
        <ScoreCard label="Keywords" score={data.keywordMatch} color="text-blue-500" icon={<Target size={16} />} />
        <ScoreCard label="Format" score={data.formattingScore} color="text-amber-500" icon={<FileText size={16} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Market Intel Card */}
        <div className="lg:col-span-2 bg-white dark:bg-burgundy-950 p-10 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-burgundy-900/40">
          <h3 className="text-xl font-black text-slate-800 dark:text-white mb-8 flex items-center">
            <Globe className="mr-3 text-burgundy-800 dark:text-burgundy-400" /> Market Context 2025
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Industry Pulse</h4>
              <ul className="space-y-4">
                {data.marketInsights.trends.map((trend, i) => (
                  <li key={i} className="flex items-start text-sm text-slate-600 dark:text-burgundy-100/70 bg-slate-50 dark:bg-black/20 p-4 rounded-2xl border border-slate-100 dark:border-burgundy-900/30">
                    <Zap size={14} className="text-burgundy-800 dark:text-burgundy-400 mt-1 mr-3 shrink-0" />
                    {trend}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-8">
              <div className="p-8 rounded-[2rem] bg-burgundy-50 dark:bg-burgundy-900/10 border border-burgundy-100 dark:border-burgundy-900/30">
                <h4 className="flex items-center text-[10px] font-black text-burgundy-800 dark:text-burgundy-400 uppercase tracking-widest mb-3">
                  <DollarSign size={14} className="mr-1" /> Estimated Salary
                </h4>
                <p className="text-3xl font-black text-burgundy-900 dark:text-white">{data.marketInsights.salaryRange}</p>
              </div>
              <div className="p-8 rounded-[2rem] bg-emerald-50 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/30">
                <h4 className="flex items-center text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-3">
                  <TrendingUp size={14} className="mr-1" /> Outlook
                </h4>
                <p className="text-xl font-bold text-emerald-900 dark:text-emerald-400">{data.marketInsights.growthOutlook}</p>
              </div>
            </div>
          </div>
        </div>

        {/* References */}
        <div className="bg-white dark:bg-burgundy-950 p-10 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-burgundy-900/40">
          <h3 className="text-xl font-black text-slate-800 dark:text-white mb-8 flex items-center">
            <ExternalLink className="mr-3 text-burgundy-800 dark:text-burgundy-400" /> Citations
          </h3>
          <div className="space-y-4">
            {data.sources?.map((source, i) => (
              <a 
                key={i} 
                href={source.url} 
                target="_blank" 
                className="group block p-4 rounded-2xl bg-slate-50 dark:bg-black/20 border border-transparent hover:border-burgundy-200 dark:hover:border-burgundy-800 transition-all"
              >
                <p className="text-sm font-bold text-slate-800 dark:text-burgundy-100 line-clamp-1 group-hover:text-burgundy-800 transition-colors">{source.title}</p>
                <p className="text-[10px] text-burgundy-500 font-bold uppercase flex items-center mt-2">
                  Verify Source <ExternalLink size={10} className="ml-1" />
                </p>
              </a>
            ))}
            {(!data.sources || data.sources.length === 0) && (
              <p className="text-sm text-slate-400 italic py-4">Direct AI analysis without web links.</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Swot Card */}
        <div className="bg-white dark:bg-burgundy-950 p-10 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-burgundy-900/40">
          <h3 className="text-xl font-black text-slate-800 dark:text-white mb-8 flex items-center">
            <Zap className="mr-3 text-burgundy-800 dark:text-burgundy-400" /> Executive SWOT
          </h3>
          <div className="space-y-8">
            <div>
              <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-4">Prime Advantages</h4>
              <ul className="space-y-3">
                {data.strengths.map((s, i) => (
                  <li key={i} className="flex items-start text-slate-600 dark:text-burgundy-100/70 text-sm">
                    <CheckCircle size={16} className="text-emerald-500 mt-0.5 mr-3 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-4">Strategic Gaps</h4>
              <ul className="space-y-3">
                {data.weaknesses.map((w, i) => (
                  <li key={i} className="flex items-start text-slate-600 dark:text-burgundy-100/70 text-sm">
                    <XCircle size={16} className="text-rose-500 mt-0.5 mr-3 shrink-0" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Chart Card */}
        <div className="bg-white dark:bg-burgundy-950 p-10 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-burgundy-900/40">
          <h3 className="text-xl font-black text-slate-800 dark:text-white mb-8 flex items-center">
            <Target className="mr-3 text-burgundy-800 dark:text-burgundy-400" /> Skill Priority Matrix
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" opacity={0.1} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 'bold' }} />
                <Tooltip cursor={{ fill: 'rgba(128,0,32,0.05)' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', backgroundColor: '#fff' }} />
                <Bar dataKey="importance" radius={[0, 8, 8, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Summary Highlight */}
      <div className="bg-burgundy-800 dark:bg-burgundy-900 p-12 rounded-[3rem] shadow-2xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-10">
          <FileText size={120} />
        </div>
        <div className="relative z-10">
          <h3 className="text-xl font-black mb-6 flex items-center text-burgundy-100">
            <Lightbulb className="mr-3" /> AI Professional Synopsis
          </h3>
          <p className="text-burgundy-50 leading-relaxed text-2xl font-light italic">
            "{data.suggestedSummary}"
          </p>
          <button 
            onClick={() => navigator.clipboard.writeText(data.suggestedSummary)}
            className="mt-10 px-8 py-4 bg-white text-burgundy-900 hover:bg-burgundy-50 rounded-2xl text-sm font-black transition-all flex items-center gap-3 shadow-lg"
          >
            <FileText size={18} /> Copy Synopsis
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDashboard;
