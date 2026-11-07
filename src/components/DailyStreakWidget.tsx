import React from 'react';
import { Flame, Check, Sparkles, Award } from 'lucide-react';

interface DailyStreakWidgetProps {
  streakDays: number;
  hasLoggedToday: boolean;
  onOpenAchievements?: () => void;
}

export const DailyStreakWidget: React.FC<DailyStreakWidgetProps> = ({
  streakDays,
  hasLoggedToday,
  onOpenAchievements,
}) => {
  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const todayIndex = (new Date().getDay() + 6) % 7; // Monday = 0, Sunday = 6

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft mb-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
            hasLoggedToday
              ? 'bg-gradient-to-tr from-amber-500 to-amber-400 text-white shadow-[0_4px_16px_rgba(245,158,11,0.35)] animate-bounce'
              : 'bg-amber-50 text-amber-600 border border-amber-200'
          }`}>
            <Flame className="w-5 h-5 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-extrabold text-slate-900 tracking-tight tabular-nums">
                {streakDays} Day{streakDays === 1 ? '' : 's'}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                hasLoggedToday
                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                  : 'bg-slate-100 text-slate-500'
              }`}>
                {hasLoggedToday ? 'Streak Active' : 'Log Today to Start'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {hasLoggedToday
                ? 'Great consistency! Your momentum is growing.'
                : 'Log any meal today to start your consistency streak!'}
            </p>
          </div>
        </div>

        {onOpenAchievements && (
          <button
            onClick={onOpenAchievements}
            className="flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/80 text-xs font-bold px-2.5 py-1.5 rounded-xl transition-all active:scale-95 shrink-0"
            title="View Achievement Badges"
          >
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>Badges</span>
          </button>
        )}
      </div>

      {/* 7-Day Week Tracking Dots */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between px-1">
        {daysOfWeek.map((day, idx) => {
          const isToday = idx === todayIndex;
          const isPast = idx < todayIndex;
          const isCompleted = isToday ? hasLoggedToday : isPast && streakDays > 1;

          return (
            <div key={idx} className="flex flex-col items-center gap-1">
              <span className={`text-[10px] font-bold ${
                isToday ? 'text-amber-700 font-extrabold' : 'text-slate-400'
              }`}>
                {day}
              </span>
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all text-xs font-bold ${
                  isCompleted
                    ? 'bg-amber-500 text-white shadow-xs'
                    : isToday
                    ? 'bg-amber-100 text-amber-700 border-2 border-dashed border-amber-400 animate-pulse'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                ) : (
                  <span className="text-[10px]">•</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
