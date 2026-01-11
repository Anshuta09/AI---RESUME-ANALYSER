import React from 'react';

interface ScoreCardProps {
  label: string;
  score: number;
  color: string;
  icon?: React.ReactNode;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ label, score, color, icon }) => {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white dark:bg-burgundy-950 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-burgundy-900/40 flex flex-col items-center justify-center space-y-4 transition-all hover:shadow-md">
      <div className="relative inline-flex items-center justify-center">
        <svg className="w-24 h-24 transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-slate-100 dark:text-burgundy-900/20"
          />
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            style={{ strokeDashoffset: offset }}
            strokeLinecap="round"
            className={`${color} transition-all duration-1000 ease-out`}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-2xl font-black text-slate-800 dark:text-white">{score}%</span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="text-burgundy-800 dark:text-burgundy-400 opacity-50">{icon}</div>
        <span className="text-[10px] font-black text-slate-400 dark:text-burgundy-500 uppercase tracking-widest">{label}</span>
      </div>
    </div>
  );
};

export default ScoreCard;
