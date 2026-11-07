import { FoodItem } from './nutrition';

export interface ParsedVoiceItem {
  name: string;
  quantity: number;
  unit: string;
  servingGrams: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  category: FoodItem['category'];
  confidence: number;
}

export interface VoiceParseResult {
  rawTranscript: string;
  suggestedCategory: FoodItem['category'];
  items: ParsedVoiceItem[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

interface KnownFoodReference {
  keywords: string[];
  canonicalName: string;
  defaultUnit: string;
  gramsPerUnit: number;
  caloriesPerUnit: number;
  proteinPerUnit: number;
  carbsPerUnit: number;
  fatPerUnit: number;
  fiberPerUnit: number;
  preferredCategory: FoodItem['category'];
}

const FOOD_DICTIONARY: KnownFoodReference[] = [
  {
    keywords: ['egg', 'eggs', 'scrambled egg', 'boiled egg', 'poached egg'],
    canonicalName: 'Large Egg(s)',
    defaultUnit: 'egg',
    gramsPerUnit: 50,
    caloriesPerUnit: 70,
    proteinPerUnit: 6,
    carbsPerUnit: 0.5,
    fatPerUnit: 5,
    fiberPerUnit: 0,
    preferredCategory: 'breakfast',
  },
  {
    keywords: ['sourdough', 'toast', 'bread', 'slice of toast', 'sourdough toast'],
    canonicalName: 'Artisan Toast Slice',
    defaultUnit: 'slice',
    gramsPerUnit: 40,
    caloriesPerUnit: 110,
    proteinPerUnit: 4,
    carbsPerUnit: 22,
    fatPerUnit: 1,
    fiberPerUnit: 1.5,
    preferredCategory: 'breakfast',
  },
  {
    keywords: ['chicken', 'chicken breast', 'grilled chicken'],
    canonicalName: 'Grilled Chicken Breast',
    defaultUnit: 'fillet (150g)',
    gramsPerUnit: 150,
    caloriesPerUnit: 245,
    proteinPerUnit: 46,
    carbsPerUnit: 0,
    fatPerUnit: 5.5,
    fiberPerUnit: 0,
    preferredCategory: 'lunch',
  },
  {
    keywords: ['rice', 'brown rice', 'white rice', 'jasmine rice'],
    canonicalName: 'Cooked Brown Rice',
    defaultUnit: 'cup',
    gramsPerUnit: 195,
    caloriesPerUnit: 216,
    proteinPerUnit: 5,
    carbsPerUnit: 45,
    fatPerUnit: 1.8,
    fiberPerUnit: 3.5,
    preferredCategory: 'lunch',
  },
  {
    keywords: ['avocado', 'hass avocado'],
    canonicalName: 'Fresh Hass Avocado',
    defaultUnit: 'half avocado',
    gramsPerUnit: 100,
    caloriesPerUnit: 160,
    proteinPerUnit: 2,
    carbsPerUnit: 8.5,
    fatPerUnit: 14.7,
    fiberPerUnit: 6.7,
    preferredCategory: 'lunch',
  },
  {
    keywords: ['banana', 'bananas'],
    canonicalName: 'Medium Banana',
    defaultUnit: 'banana',
    gramsPerUnit: 118,
    caloriesPerUnit: 105,
    proteinPerUnit: 1.3,
    carbsPerUnit: 27,
    fatPerUnit: 0.3,
    fiberPerUnit: 3.1,
    preferredCategory: 'snack',
  },
  {
    keywords: ['apple', 'apples', 'honeycrisp apple'],
    canonicalName: 'Crisp Apple',
    defaultUnit: 'apple',
    gramsPerUnit: 150,
    caloriesPerUnit: 80,
    proteinPerUnit: 0.4,
    carbsPerUnit: 21,
    fatPerUnit: 0.3,
    fiberPerUnit: 3.7,
    preferredCategory: 'snack',
  },
  {
    keywords: ['greek yogurt', 'yogurt', 'skyr'],
    canonicalName: 'Plain Greek Yogurt',
    defaultUnit: 'cup (170g)',
    gramsPerUnit: 170,
    caloriesPerUnit: 160,
    proteinPerUnit: 16,
    carbsPerUnit: 7,
    fatPerUnit: 8,
    fiberPerUnit: 0,
    preferredCategory: 'breakfast',
  },
  {
    keywords: ['salmon', 'salmon fillet', 'grilled salmon'],
    canonicalName: 'Wild Salmon Fillet',
    defaultUnit: 'fillet (170g)',
    gramsPerUnit: 170,
    caloriesPerUnit: 290,
    proteinPerUnit: 36,
    carbsPerUnit: 0,
    fatPerUnit: 15,
    fiberPerUnit: 0,
    preferredCategory: 'dinner',
  },
  {
    keywords: ['oat milk', 'almond milk', 'latte', 'coffee', 'oat milk latte'],
    canonicalName: 'Oat Milk Latte',
    defaultUnit: 'cup (240ml)',
    gramsPerUnit: 240,
    caloriesPerUnit: 120,
    proteinPerUnit: 3,
    carbsPerUnit: 18,
    fatPerUnit: 4,
    fiberPerUnit: 1.5,
    preferredCategory: 'breakfast',
  },
  {
    keywords: ['protein shake', 'whey protein', 'protein powder'],
    canonicalName: 'Whey Protein Shake',
    defaultUnit: 'scoop (35g)',
    gramsPerUnit: 35,
    caloriesPerUnit: 140,
    proteinPerUnit: 25,
    carbsPerUnit: 3,
    fatPerUnit: 2,
    fiberPerUnit: 1,
    preferredCategory: 'snack',
  },
  {
    keywords: ['peanut butter', 'almond butter'],
    canonicalName: 'Natural Peanut Butter',
    defaultUnit: 'tbsp (16g)',
    gramsPerUnit: 16,
    caloriesPerUnit: 95,
    proteinPerUnit: 4,
    carbsPerUnit: 3,
    fatPerUnit: 8,
    fiberPerUnit: 1,
    preferredCategory: 'snack',
  },
  {
    keywords: ['steak', 'ribeye', 'beef', 'sirloin'],
    canonicalName: 'Seared Beef Steak',
    defaultUnit: 'steak (200g)',
    gramsPerUnit: 200,
    caloriesPerUnit: 420,
    proteinPerUnit: 44,
    carbsPerUnit: 0,
    fatPerUnit: 26,
    fiberPerUnit: 0,
    preferredCategory: 'dinner',
  },
  {
    keywords: ['salad', 'caesar salad', 'green salad'],
    canonicalName: 'Fresh Garden Salad',
    defaultUnit: 'bowl (150g)',
    gramsPerUnit: 150,
    caloriesPerUnit: 85,
    proteinPerUnit: 2.5,
    carbsPerUnit: 8,
    fatPerUnit: 5,
    fiberPerUnit: 3,
    preferredCategory: 'lunch',
  },
  {
    keywords: ['oatmeal', 'oats', 'porridge'],
    canonicalName: 'Warm Rolled Oats',
    defaultUnit: 'bowl (200g)',
    gramsPerUnit: 200,
    caloriesPerUnit: 180,
    proteinPerUnit: 6,
    carbsPerUnit: 32,
    fatPerUnit: 3.5,
    fiberPerUnit: 4.5,
    preferredCategory: 'breakfast',
  },
];

const NUMBER_WORDS: Record<string, number> = {
  a: 1,
  an: 1,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  half: 0.5,
  quarter: 0.25,
};

export function parseVoiceInput(transcript: string, timeOfDayHour: number = 8): VoiceParseResult {
  const clean = transcript.toLowerCase().trim();
  if (!clean) {
    return {
      rawTranscript: transcript,
      suggestedCategory: 'breakfast',
      items: [],
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
    };
  }

  // Determine meal category from time of day or keywords in transcript
  let suggestedCategory: FoodItem['category'] = 'breakfast';
  if (clean.includes('breakfast')) suggestedCategory = 'breakfast';
  else if (clean.includes('lunch')) suggestedCategory = 'lunch';
  else if (clean.includes('dinner')) suggestedCategory = 'dinner';
  else if (clean.includes('snack')) suggestedCategory = 'snack';
  else if (timeOfDayHour >= 5 && timeOfDayHour < 11) suggestedCategory = 'breakfast';
  else if (timeOfDayHour >= 11 && timeOfDayHour < 16) suggestedCategory = 'lunch';
  else if (timeOfDayHour >= 16 && timeOfDayHour < 21) suggestedCategory = 'dinner';
  else suggestedCategory = 'snack';

  // Split transcript into food clauses using conjunctions and punctuation
  const clauses = clean
    .split(/,|\band\b|\bwith\b|\bplus\b/i)
    .map((c) => c.trim())
    .filter((c) => c.length > 0);

  const parsedItems: ParsedVoiceItem[] = [];

  for (const clause of clauses) {
    // Extract quantity if present (e.g., "2", "two", "1/2", "half", "1.5")
    let quantity = 1;
    const tokens = clause.split(/\s+/);
    
    // Check first token for number or word
    if (tokens.length > 0) {
      const first = tokens[0];
      if (/^\d+(\.\d+)?$/.test(first)) {
        quantity = parseFloat(first);
      } else if (first in NUMBER_WORDS) {
        quantity = NUMBER_WORDS[first];
      }
    }

    // Match against known food dictionary
    let matchedFood: KnownFoodReference | null = null;
    let highestScore = 0;

    for (const food of FOOD_DICTIONARY) {
      for (const kw of food.keywords) {
        if (clause.includes(kw)) {
          const score = kw.length;
          if (score > highestScore) {
            highestScore = score;
            matchedFood = food;
          }
        }
      }
    }

    if (matchedFood) {
      const scaledGrams = Math.round(matchedFood.gramsPerUnit * quantity);
      const scaledKcal = Math.round(matchedFood.caloriesPerUnit * quantity);
      const scaledProtein = Math.round(matchedFood.proteinPerUnit * quantity * 10) / 10;
      const scaledCarbs = Math.round(matchedFood.carbsPerUnit * quantity * 10) / 10;
      const scaledFat = Math.round(matchedFood.fatPerUnit * quantity * 10) / 10;
      const scaledFiber = Math.round(matchedFood.fiberPerUnit * quantity * 10) / 10;

      parsedItems.push({
        name: matchedFood.canonicalName,
        quantity,
        unit: matchedFood.defaultUnit,
        servingGrams: scaledGrams,
        calories: scaledKcal,
        protein: scaledProtein,
        carbs: scaledCarbs,
        fat: scaledFat,
        fiber: scaledFiber,
        category: suggestedCategory,
        confidence: 95,
      });
    } else if (clause.length >= 3) {
      // Fallback for unrecognized food item: smart estimate based on words
      const sanitizedName = clause
        .replace(/^(a|an|some|one|two|three)\s+/i, '')
        .trim();
      const capitalized = sanitizedName.charAt(0).toUpperCase() + sanitizedName.slice(1);
      
      parsedItems.push({
        name: capitalized,
        quantity: 1,
        unit: 'serving (120g)',
        servingGrams: 120,
        calories: 180,
        protein: 8,
        carbs: 22,
        fat: 6,
        fiber: 2,
        category: suggestedCategory,
        confidence: 75,
      });
    }
  }

  const totals = parsedItems.reduce(
    (acc, it) => ({
      calories: acc.calories + it.calories,
      protein: Math.round((acc.protein + it.protein) * 10) / 10,
      carbs: Math.round((acc.carbs + it.carbs) * 10) / 10,
      fat: Math.round((acc.fat + it.fat) * 10) / 10,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  return {
    rawTranscript: transcript,
    suggestedCategory,
    items: parsedItems,
    totalCalories: totals.calories,
    totalProtein: totals.protein,
    totalCarbs: totals.carbs,
    totalFat: totals.fat,
  };
}
