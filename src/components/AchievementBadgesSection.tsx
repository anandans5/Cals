import React, { useState } from 'react';
import { Award, CheckCircle2, Lock, Sparkles, X, ChevronRight } from 'lucide-react';
import { Achievement } from '../utils/streakAchievements';

interface AchievementBadgesSectionProps {
  achievements: Achievement[];
}

export const AchievementBadgesSection: React.FC<AchievementBadgesSectionProps> = ({
  achievements,
}) => {
  const [selectedBadge, setSelectedBadge] = useState<Achievement | null>(null);

  const unlockedCount = achievements.filter((a) => a.isUnlocked).length;

  const getTierColors = (tier: Achievement['tier'], isUnlocked: boolean) => {
    if (!isUnlocked) {
      return {
        bg: 'bg-slate-50',
        border: 'border-slate-200/80',
        badge: 'bg-slate-200 text-slate-600',
        text: 'text-slate-400',
      };
    }

    switch (tier) {
      case 'emerald':
        return {
          bg: 'bg-emerald-50/70',
          border: 'border-emerald-300 ring-2 ring-emerald-100',
          badge: 'bg-emerald-600 text-white',
          text: 'text-emerald-900',
        };
      case 'gold':
        return {
          bg: 'bg-amber-50/70',
          border: 'border-amber-300 ring-2 ring-amber-100',
          badge: 'bg-amber-500 text-white',
          text: 'text-amber-900',
        };
      case 'silver':
        return {
          bg: 'bg-teal-50/70',
          border: 'border-teal-300 ring-2 ring-teal-100',
          badge: 'bg-teal-600 text-white',
          text: 'text-teal-900',
        };
      case 'bronze':
      default:
        return {
          bg: 'bg-orange-50/70',
          border: 'border-orange-200',
          badge: 'bg-orange-500 text-white',
          text: 'text-orange-900',
        };
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              Goal &amp; Streak Achievements
            </h2>
            <p className="text-[11px] text-slate-400">
              {unlockedCount} of {achievements.length} Badges Unlocked
            </p>
          </div>
        </div>

        <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 tabular-nums">
          {Math.round((unlockedCount / achievements.length) * 100)}%
        </span>
      </div>

      {/* Badges Grid (Compact & Informative) */}
      <div className="grid grid-cols-3 gap-2">
        {achievements.map((ach) => {
          const colors = getTierColors(ach.tier, ach.isUnlocked);
          return (
            <button
              key={ach.id}
              onClick={() => setSelectedBadge(ach)}
              className={`p-2.5 rounded-xl border text-left transition-all relative flex flex-col justify-between group active:scale-95 ${colors.bg} ${colors.border}`}
            >
              {/* Top Row: Icon + Status */}
              <div className="flex items-start justify-between w-full">
                <span className={`text-xl transition-transform group-hover:scale-110 ${
                  ach.isUnlocked ? 'filter-none' : 'grayscale opacity-50'
                }`}>
                  {ach.icon}
                </span>

                {ach.isUnlocked ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : (
                  <Lock className="w-3 h-3 text-slate-400 shrink-0" />
                )}
              </div>

              {/* Title & Progress */}
              <div className="mt-2">
                <div className={`text-xs font-bold truncate ${
                  ach.isUnlocked ? colors.text : 'text-slate-600'
                }`}>
                  {ach.title}
                </div>

                <div className="text-[10px] text-slate-400 tabular-nums mt-0.5">
                  {ach.isUnlocked ? (
                    <span className="text-emerald-700 font-semibold">Unlocked!</span>
                  ) : (
                    <span>{ach.current} / {ach.target}</span>
                  )}
                </div>

                {/* Progress bar */}
                {!ach.isUnlocked && (
                  <div className="w-full bg-slate-200/80 h-1 rounded-full mt-1 overflow-hidden">
                    <div 
                      className="bg-amber-500 h-full rounded-full transition-all"
                      style={{ width: `${Math.min(100, (ach.current / ach.target) * 100)}%` }}
                    />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in"
          onClick={() => setSelectedBadge(null)}
        >
          <div 
            className="w-full max-w-sm bg-white rounded-3xl p-5 border border-slate-200 shadow-2xl text-center relative animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedBadge(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-16 h-16 rounded-3xl bg-amber-50 border border-amber-200 text-3xl flex items-center justify-center mx-auto mb-3 shadow-inner">
              {selectedBadge.icon}
            </div>

            <div className="flex items-center justify-center gap-1.5 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full capitalize">
                {selectedBadge.tier} Tier
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                selectedBadge.isUnlocked
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {selectedBadge.isUnlocked ? 'Unlocked' : 'In Progress'}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mt-1">
              {selectedBadge.title}
            </h3>

            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              {selectedBadge.description}
            </p>

            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 my-4">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Unlock Progress</span>
                <span className="tabular-nums font-bold">
                  {selectedBadge.current} / {selectedBadge.target}
                </span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all ${
                    selectedBadge.isUnlocked ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${Math.min(100, (selectedBadge.current / selectedBadge.target) * 100)}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => setSelectedBadge(null)}
              className="w-full py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
