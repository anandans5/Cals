export interface MacroNutrients {
  calories: number;
  protein: number; // in grams
  carbs: number;   // in grams
  fat: number;     // in grams
  fiber?: number;  // in grams
}

export interface FoodItem extends MacroNutrients {
  id: string;
  name: string;
  servingSize: string;
  servingGrams: number;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  imageUrl?: string;
  brand?: string;
  barcode?: string;
  confidence?: number;
}

export interface MealCategory {
  id: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  name: string;
  targetKcal: number;
  items: FoodItem[];
}

export interface DayNutritionGoal {
  dailyCalorieTarget: number;
  proteinTargetGrams: number;
  carbsTargetGrams: number;
  fatTargetGrams: number;
  waterTargetMl: number;
}

export function calculateRemainingCalories(target: number, consumed: number, burned: number = 0): number {
  return Math.max(0, target - consumed + burned);
}

export function calculateMacroPercentages(protein: number, carbs: number, fat: number) {
  // Protein: 4 kcal/g, Carbs: 4 kcal/g, Fat: 9 kcal/g
  const proteinKcal = Math.max(0, protein) * 4;
  const carbsKcal = Math.max(0, carbs) * 4;
  const fatKcal = Math.max(0, fat) * 9;
  const totalKcal = proteinKcal + carbsKcal + fatKcal;

  if (totalKcal === 0) {
    return { proteinPct: 0, carbsPct: 0, fatPct: 0 };
  }

  return {
    proteinPct: Math.round((proteinKcal / totalKcal) * 100),
    carbsPct: Math.round((carbsKcal / totalKcal) * 100),
    fatPct: Math.round((fatKcal / totalKcal) * 100),
  };
}

export function calculateScaledNutrition(
  baseItem: MacroNutrients,
  newGrams: number,
  baseGrams: number
): MacroNutrients {
  if (baseGrams <= 0 || newGrams <= 0) {
    return { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 };
  }
  const ratio = newGrams / baseGrams;
  return {
    calories: Math.round(baseItem.calories * ratio),
    protein: Math.round(baseItem.protein * ratio * 10) / 10,
    carbs: Math.round(baseItem.carbs * ratio * 10) / 10,
    fat: Math.round(baseItem.fat * ratio * 10) / 10,
    fiber: baseItem.fiber !== undefined ? Math.round(baseItem.fiber * ratio * 10) / 10 : undefined,
  };
}

export function calculateTotalNutrition(items: FoodItem[]): MacroNutrients {
  return items.reduce(
    (acc, item) => ({
      calories: acc.calories + (item.calories || 0),
      protein: Math.round((acc.protein + (item.protein || 0)) * 10) / 10,
      carbs: Math.round((acc.carbs + (item.carbs || 0)) * 10) / 10,
      fat: Math.round((acc.fat + (item.fat || 0)) * 10) / 10,
      fiber: (acc.fiber || 0) + (item.fiber || 0),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
  );
}

export function formatCalories(kcal: number): string {
  return new Intl.NumberFormat('en-US').format(Math.round(kcal));
}
