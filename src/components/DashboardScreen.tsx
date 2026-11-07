import React, { useState } from 'react';
import { 
  Sparkles, 
  Barcode, 
  PlusCircle, 
  Flame, 
  Droplets, 
  Calendar, 
  Trash2, 
  Plus, 
  Apple,
  Mic
} from 'lucide-react';
import { 
  FoodItem, 
  DayNutritionGoal, 
  calculateTotalNutrition, 
  calculateRemainingCalories, 
  formatCalories 
} from '../utils/nutrition';
import { ScreenId } from './Navigation';
import { VoiceQuickLogModal } from './VoiceQuickLogModal';
import { DailyStreakWidget } from './DailyStreakWidget';
import { AchievementBadgesSection } from './AchievementBadgesSection';
import { Achievement } from '../utils/streakAchievements';

interface DashboardScreenProps {
  logs: FoodItem[];
  goal: DayNutritionGoal;
  waterIntakeMl: number;
  burnedCalories: number;
  streakDays: number;
  hasLoggedToday: boolean;
  achievements: Achievement[];
  onNavigate: (screen: ScreenId, params?: { preselectedCategory?: FoodItem['category'] }) => void;
  onAddFood: (item: FoodItem) => void;
  onDeleteFood: (id: string) => void;
  onAddWater: (amountMl: number) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  logs,
  goal,
  waterIntakeMl,
  burnedCalories,
  streakDays,
  hasLoggedToday,
  achievements,
  onNavigate,
  onAddFood,
  onDeleteFood,
  onAddWater,
}) => {
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState<boolean>(false);

  const totals = calculateTotalNutrition(logs);
  const remainingCalories = calculateRemainingCalories(goal.dailyCalorieTarget, totals.calories, burnedCalories);
  
  // Progress ring calculations
  const radius = 78;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = Math.min(1, totals.calories / goal.dailyCalorieTarget);
  const strokeDashoffset = circumference - progressRatio * circumference;

  const categories: { id: FoodItem['category']; label: string; icon: string; target: number }[] = [
    { id: 'breakfast', label: 'Breakfast', icon: '🌅', target: 550 },
    { id: 'lunch', label: 'Lunch', icon: '☀️', target: 700 },
    { id: 'dinner', label: 'Dinner', icon: '🌙', target: 650 },
    { id: 'snack', label: 'Snacks & Extras', icon: '🍎', target: 300 },
  ];

  const handleAddMultipleFoods = (items: FoodItem[]) => {
    items.forEach((item) => onAddFood(item));
  };

  const handleScrollToAchievements = () => {
    const el = document.getElementById('achievements-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pb-28 pt-4 px-4 max-w-lg mx-auto">
      {/* Top Bar */}
      <header className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>CalorieIQ Biometrics</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Today's Fuel
            <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
              {logs.length === 0 ? 'Ready to Log' : 'On Track'}
            </span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-white border border-slate-200/80 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
            <span>Today</span>
          </div>
        </div>
      </header>

      {/* Specialty Component: Concentric Caloric Dial Card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft mb-5 relative overflow-hidden">
        {/* Soft background ambient glow */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-emerald-50 rounded-full blur-3xl -z-0 opacity-70 pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          {/* Concentric Progress Dial */}
          <div className="relative w-48 h-48 flex items-center justify-center shrink-0">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 190 190">
              <defs>
                <linearGradient id="calorieProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4ade80" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
              </defs>
              {/* Background track */}
              <circle
                cx="95"
                cy="95"
                r={radius}
                className="text-slate-100"
                strokeWidth="14"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Foreground progress arc */}
              <circle
                cx="95"
                cy="95"
                r={radius}
                stroke="url(#calorieProgressGradient)"
                strokeWidth="14"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Dial Center Metrics */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
                {formatCalories(remainingCalories)}
              </span>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                KCAL REMAINING
              </span>
              <span className="text-[11px] text-emerald-600 font-semibold mt-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                {totals.calories === 0 ? '0% consumed' : `${Math.round((totals.calories / goal.dailyCalorieTarget) * 100)}% consumed`}
              </span>
            </div>
          </div>

          {/* Quick Metrics Column */}
          <div className="flex-1 w-full space-y-3">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Apple className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-medium text-slate-500">Intake Target</div>
                  <div className="text-sm font-bold text-slate-800 tabular-nums">{goal.dailyCalorieTarget} kcal</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] font-medium text-slate-500">Logged</div>
                <div className="text-sm font-bold text-emerald-600 tabular-nums">{totals.calories} kcal</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-medium text-slate-500">Burned (Active)</div>
                  <div className="text-sm font-bold text-slate-800 tabular-nums">+{burnedCalories} kcal</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] font-medium text-slate-500">Net Allowance</div>
                <div className="text-sm font-bold text-slate-800 tabular-nums">{goal.dailyCalorieTarget + burnedCalories} kcal</div>
              </div>
            </div>
          </div>
        </div>

        {/* Nutritional Macro Chips (per design system specifications) */}
        <div className="grid grid-cols-3 gap-2.5 mt-5 pt-4 border-t border-slate-100">
          {/* Protein */}
          <div className="bg-[#f0fdfa] border border-[#ccfbf1] rounded-2xl p-2.5 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0f766e]">
              PROTEIN
            </span>
            <span className="text-base font-bold text-[#0f766e] tabular-nums mt-0.5">
              {totals.protein}g
            </span>
            <span className="text-[10px] text-teal-600/80 font-medium">
              of {goal.proteinTargetGrams}g target
            </span>
            <div className="w-full bg-teal-200/50 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div 
                className="bg-[#0f766e] h-full rounded-full transition-all"
                style={{ width: `${Math.min(100, (totals.protein / goal.proteinTargetGrams) * 100)}%` }}
              />
            </div>
          </div>

          {/* Carbs */}
          <div className="bg-[#f0fdf4] border border-[#dcfce7] rounded-2xl p-2.5 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#16a34a]">
              CARBS
            </span>
            <span className="text-base font-bold text-[#16a34a] tabular-nums mt-0.5">
              {totals.carbs}g
            </span>
            <span className="text-[10px] text-emerald-600/80 font-medium">
              of {goal.carbsTargetGrams}g target
            </span>
            <div className="w-full bg-emerald-200/50 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div 
                className="bg-[#16a34a] h-full rounded-full transition-all"
                style={{ width: `${Math.min(100, (totals.carbs / goal.carbsTargetGrams) * 100)}%` }}
              />
            </div>
          </div>

          {/* Fat */}
          <div className="bg-[#fef3c7] border border-[#fde68a] rounded-2xl p-2.5 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#b45309]">
              FATS
            </span>
            <span className="text-base font-bold text-[#b45309] tabular-nums mt-0.5">
              {totals.fat}g
            </span>
            <span className="text-[10px] text-amber-700/80 font-medium">
              of {goal.fatTargetGrams}g target
            </span>
            <div className="w-full bg-amber-200/50 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div 
                className="bg-[#b45309] h-full rounded-full transition-all"
                style={{ width: `${Math.min(100, (totals.fat / goal.fatTargetGrams) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* DAILY STREAK COUNTER WIDGET */}
      <DailyStreakWidget
        streakDays={streakDays}
        hasLoggedToday={hasLoggedToday}
        onOpenAchievements={handleScrollToAchievements}
      />

      {/* QUICK LOG FEATURE (Voice Dictation with Microphone) */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-4 text-white shadow-card-elevated mb-5 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsVoiceModalOpen(true)}
              className="w-12 h-12 rounded-2xl bg-white text-emerald-700 hover:bg-emerald-50 shadow-md flex items-center justify-center transition-transform active:scale-95 shrink-0"
              title="Dictate food item with microphone"
              aria-label="Dictate food with microphone"
            >
              <Mic className="w-6 h-6 animate-pulse text-emerald-600" />
            </button>
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-100 uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-emerald-300" />
                <span>AI Quick Log</span>
              </div>
              <h2 className="text-sm font-bold tracking-tight">Dictate Food with Microphone</h2>
              <p className="text-[11px] text-emerald-100/85 mt-0.5">
                Say e.g. "2 eggs &amp; sourdough toast" to auto-parse
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsVoiceModalOpen(true)}
            className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-2 rounded-xl transition-all active:scale-95 shrink-0 border border-white/20 shadow-xs"
          >
            Speak Now
          </button>
        </div>
      </div>

      {/* QUICK LOGGING ACTION BUTTONS (Exact Prototype Selectors) */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2.5 px-0.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Quick Log Input Methods
          </h2>
          <span className="text-[11px] text-emerald-600 font-semibold">Fast Capture</span>
        </div>

        {/* 3 Main Action Buttons matching prototype specification */}
        <div className="grid grid-cols-3 gap-2.5">
          {/* AI Vision Scanner Button */}
          <button
            onClick={() => onNavigate('ai-vision-scanner')}
            className="group flex flex-col items-center justify-center py-3.5 px-2 bg-gradient-to-b from-emerald-500 to-emerald-600 text-white rounded-2xl shadow-glow-primary active:scale-98 transition-all hover:brightness-105 min-h-[72px]"
          >
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center mb-1.5 shadow-inner">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <span className="text-xs font-bold tracking-tight">AI Photo</span>
          </button>

          {/* Barcode Scanner Button */}
          <button
            onClick={() => onNavigate('barcode-scanner')}
            className="group flex flex-col items-center justify-center py-3.5 px-2 bg-white text-slate-800 border border-slate-200/90 rounded-2xl shadow-soft active:scale-98 transition-all hover:border-emerald-300 hover:bg-emerald-50/30 min-h-[72px]"
          >
            <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center mb-1.5 text-slate-700 group-hover:text-emerald-600">
              <Barcode className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold tracking-tight">Barcode</span>
          </button>

          {/* Manual Food Log Button */}
          <button
            onClick={() => onNavigate('manual-food-log')}
            className="group flex flex-col items-center justify-center py-3.5 px-2 bg-white text-slate-800 border border-slate-200/90 rounded-2xl shadow-soft active:scale-98 transition-all hover:border-emerald-300 hover:bg-emerald-50/30 min-h-[72px]"
          >
            <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center mb-1.5 text-slate-700 group-hover:text-emerald-600">
              <PlusCircle className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold tracking-tight">Manual</span>
          </button>
        </div>
      </div>

      {/* Water Hydration Widget */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 text-teal-600 flex items-center justify-center">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Hydration</span>
              <span className="text-[11px] font-semibold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">
                {goal.waterTargetMl > 0 ? Math.round((waterIntakeMl / goal.waterTargetMl) * 100) : 0}%
              </span>
            </div>
            <div className="text-sm font-bold text-slate-900 tabular-nums">
              {waterIntakeMl} <span className="text-xs text-slate-400 font-normal">/ {goal.waterTargetMl} ml</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => onAddWater(250)}
          className="flex items-center gap-1 bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200/80 text-xs font-semibold px-3 py-2 rounded-xl active:scale-95 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+250ml</span>
        </button>
      </div>

      {/* ACHIEVEMENT BADGES SECTION */}
      <div id="achievements-section">
        <AchievementBadgesSection achievements={achievements} />
      </div>

      {/* Segmented Meal Logs Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-0.5">
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            Today's Meals
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            {logs.length === 0 ? 'Fresh diary — No meals logged' : `${logs.length} logged items`}
          </span>
        </div>

        {/* Welcome Empty State Banner for New Users */}
        {logs.length === 0 && (
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center space-y-1.5 mb-2">
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-bold text-slate-900">Your diary is fresh and ready!</h3>
            <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
              Tap the <span className="font-semibold text-emerald-700">Speak Now</span> microphone above or select AI Photo, Barcode, or Manual to log your first food.
            </p>
          </div>
        )}

        {categories.map((cat) => {
          const categoryItems = logs.filter((item) => item.category === cat.id);
          const categoryTotalKcal = categoryItems.reduce((sum, item) => sum + item.calories, 0);

          return (
            <div 
              key={cat.id} 
              className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{cat.icon}</span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{cat.label}</h3>
                    <div className="text-[11px] text-slate-400">
                      Target ~{cat.target} kcal
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-slate-800 tabular-nums">
                      {categoryTotalKcal}
                    </span>
                    <span className="text-[10px] text-slate-400 ml-1 font-semibold">KCAL</span>
                  </div>
                  <button
                    onClick={() => onNavigate('manual-food-log', { preselectedCategory: cat.id })}
                    className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 flex items-center justify-center transition-all ml-1"
                    title={`Add to ${cat.label}`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {categoryItems.length === 0 ? (
                <div className="py-3 px-3 rounded-xl bg-slate-50/80 border border-dashed border-slate-200 text-center text-xs text-slate-400 flex items-center justify-between">
                  <span>No foods logged yet for {cat.label.toLowerCase()}</span>
                  <button
                    onClick={() => setIsVoiceModalOpen(true)}
                    className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                  >
                    <Mic className="w-3 h-3" />
                    <span>Dictate</span>
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 mt-2">
                  {categoryItems.map((item) => (
                    <div key={item.id} className="py-2.5 flex items-center justify-between group">
                      <div className="pr-2">
                        <div className="text-xs font-semibold text-slate-800 group-hover:text-emerald-800 transition-colors">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <span>{item.servingSize}</span>
                          <span>•</span>
                          <span className="text-teal-700 font-medium">{item.protein}g P</span>
                          <span>•</span>
                          <span className="text-emerald-700 font-medium">{item.carbs}g C</span>
                          <span>•</span>
                          <span className="text-amber-700 font-medium">{item.fat}g F</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-bold text-slate-900 tabular-nums">
                          {item.calories} kcal
                        </span>
                        <button
                          onClick={() => onDeleteFood(item.id)}
                          className="opacity-60 hover:opacity-100 text-slate-400 hover:text-red-500 p-1 transition-opacity"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Voice Quick Log Modal */}
      <VoiceQuickLogModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onAddFoods={handleAddMultipleFoods}
      />
    </div>
  );
};
