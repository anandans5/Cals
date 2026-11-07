export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'streak' | 'nutrition' | 'features' | 'hydration';
  target: number;
  current: number;
  isUnlocked: boolean;
  unlockedAt?: string;
  tier: 'bronze' | 'silver' | 'gold' | 'emerald';
}

export interface UserStats {
  totalMealsLogged: number;
  voiceLogsCount: number;
  scansCount: number;
  waterIntakeMl: number;
  caloriesConsumed: number;
  calorieTarget: number;
  streakDays: number;
  hasLoggedToday: boolean;
}

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-fuel',
    title: 'First Fuel',
    description: 'Log your very first meal to initiate your nutrition journey.',
    icon: '🌱',
    category: 'nutrition',
    target: 1,
    current: 0,
    isUnlocked: false,
    tier: 'bronze',
  },
  {
    id: 'voice-virtuoso',
    title: 'Voice Virtuoso',
    description: 'Dictate a meal using the AI microphone quick log.',
    icon: '🎙️',
    category: 'features',
    target: 1,
    current: 0,
    isUnlocked: false,
    tier: 'bronze',
  },
  {
    id: 'hydration-hero',
    title: 'Hydration Hero',
    description: 'Track at least 1,000 ml of daily hydration.',
    icon: '💧',
    category: 'hydration',
    target: 1000,
    current: 0,
    isUnlocked: false,
    tier: 'silver',
  },
  {
    id: 'smart-scanner',
    title: 'Visionary Scanner',
    description: 'Identify food using AI Camera or Barcode scanner.',
    icon: '📸',
    category: 'features',
    target: 1,
    current: 0,
    isUnlocked: false,
    tier: 'silver',
  },
  {
    id: 'macro-mindful',
    title: 'Macro Mindful',
    description: 'Log 3 distinct meals in a single day.',
    icon: '🥗',
    category: 'nutrition',
    target: 3,
    current: 0,
    isUnlocked: false,
    tier: 'gold',
  },
  {
    id: 'consistency-champion',
    title: 'Streak Starter',
    description: 'Maintain a 3-day consistent logging streak.',
    icon: '🔥',
    category: 'streak',
    target: 3,
    current: 1,
    isUnlocked: false,
    tier: 'emerald',
  },
];

export function evaluateAchievements(stats: UserStats, prevAchievements: Achievement[] = INITIAL_ACHIEVEMENTS): Achievement[] {
  return prevAchievements.map((ach) => {
    let current = ach.current;
    let isUnlocked = ach.isUnlocked;

    switch (ach.id) {
      case 'first-fuel':
        current = Math.min(ach.target, stats.totalMealsLogged);
        isUnlocked = stats.totalMealsLogged >= ach.target;
        break;
      case 'voice-virtuoso':
        current = Math.min(ach.target, stats.voiceLogsCount);
        isUnlocked = stats.voiceLogsCount >= ach.target;
        break;
      case 'hydration-hero':
        current = Math.min(ach.target, stats.waterIntakeMl);
        isUnlocked = stats.waterIntakeMl >= ach.target;
        break;
      case 'smart-scanner':
        current = Math.min(ach.target, stats.scansCount);
        isUnlocked = stats.scansCount >= ach.target;
        break;
      case 'macro-mindful':
        current = Math.min(ach.target, stats.totalMealsLogged);
        isUnlocked = stats.totalMealsLogged >= ach.target;
        break;
      case 'consistency-champion':
        current = Math.min(ach.target, stats.streakDays);
        isUnlocked = stats.streakDays >= ach.target;
        break;
    }

    return {
      ...ach,
      current,
      isUnlocked,
      unlockedAt: isUnlocked && !ach.isUnlocked ? 'Just now' : ach.unlockedAt,
    };
  });
}

export function calculateDailyStreak(hasLoggedToday: boolean, baseStreak: number = 0): number {
  if (hasLoggedToday) {
    return Math.max(1, baseStreak + 1);
  }
  return baseStreak;
}
