import { FoodItem, DayNutritionGoal } from '../utils/nutrition';

export const initialNutritionGoal: DayNutritionGoal = {
  dailyCalorieTarget: 2200,
  proteinTargetGrams: 140,
  carbsTargetGrams: 220,
  fatTargetGrams: 70,
  waterTargetMl: 2500,
};

export const initialFoodLogs: FoodItem[] = [];

export interface VerifiedFoodDatabaseItem {
  id: string;
  name: string;
  brand?: string;
  servingSize: string;
  servingGrams: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  barcode?: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  tags: string[];
}

export const verifiedFoodDatabase: VerifiedFoodDatabaseItem[] = [
  {
    id: 'db-1',
    name: 'Greek Whole Milk Plain Yogurt',
    brand: 'Chobani',
    servingSize: '3/4 cup (170g)',
    servingGrams: 170,
    calories: 160,
    protein: 16,
    carbs: 7,
    fat: 8,
    fiber: 0,
    barcode: '089470001005',
    category: 'breakfast',
    tags: ['dairy', 'protein', 'yogurt'],
  },
  {
    id: 'db-2',
    name: 'Oats ‘n Honey Crunchy Granola Bars',
    brand: 'Nature Valley',
    servingSize: '2 bars (42g)',
    servingGrams: 42,
    calories: 190,
    protein: 4,
    carbs: 29,
    fat: 7,
    fiber: 2,
    barcode: '016000264601',
    category: 'snack',
    tags: ['snack', 'granola', 'bar'],
  },
  {
    id: 'db-3',
    name: 'Unsweetened Organic Almondmilk',
    brand: 'Silk',
    servingSize: '1 cup (240ml)',
    servingGrams: 240,
    calories: 30,
    protein: 1,
    carbs: 1,
    fat: 2.5,
    fiber: 1,
    barcode: '025293000987',
    category: 'breakfast',
    tags: ['dairy-free', 'milk', 'vegan'],
  },
  {
    id: 'db-4',
    name: 'Chocolate Sea Salt Protein Bar',
    brand: 'RXBAR',
    servingSize: '1 bar (52g)',
    servingGrams: 52,
    calories: 210,
    protein: 12,
    carbs: 24,
    fat: 9,
    fiber: 5,
    barcode: '857777004232',
    category: 'snack',
    tags: ['protein', 'snack', 'clean'],
  },
  {
    id: 'db-5',
    name: 'Hass Avocado (Fresh Whole)',
    brand: 'Fresh Produce',
    servingSize: '1/2 medium avocado (100g)',
    servingGrams: 100,
    calories: 160,
    protein: 2,
    carbs: 8.5,
    fat: 14.7,
    fiber: 6.7,
    barcode: '4046',
    category: 'lunch',
    tags: ['produce', 'healthy fats', 'fruit'],
  },
  {
    id: 'db-6',
    name: 'Organic Pasture-Raised Large Eggs',
    brand: 'Vital Farms',
    servingSize: '2 large eggs (100g)',
    servingGrams: 100,
    calories: 140,
    protein: 12,
    carbs: 0.8,
    fat: 10,
    fiber: 0,
    barcode: '853578002014',
    category: 'breakfast',
    tags: ['protein', 'keto', 'egg'],
  },
  {
    id: 'db-7',
    name: 'Boneless Skinless Chicken Breast',
    brand: 'Organic Valley',
    servingSize: '1 fillet (150g)',
    servingGrams: 150,
    calories: 247,
    protein: 46.5,
    carbs: 0,
    fat: 5.4,
    fiber: 0,
    barcode: '023456789012',
    category: 'dinner',
    tags: ['poultry', 'high-protein', 'meat'],
  },
  {
    id: 'db-8',
    name: 'Wild Alaskan Sockeye Salmon',
    brand: 'Catch of the Day',
    servingSize: '1 fillet (170g)',
    servingGrams: 170,
    calories: 290,
    protein: 36,
    carbs: 0,
    fat: 15,
    fiber: 0,
    barcode: '034567890123',
    category: 'dinner',
    tags: ['fish', 'omega-3', 'seafood'],
  },
  {
    id: 'db-9',
    name: 'Organic Quinoa Grain Bowl',
    brand: 'Ancient Harvest',
    servingSize: '1 cup cooked (185g)',
    servingGrams: 185,
    calories: 222,
    protein: 8.1,
    carbs: 39.4,
    fat: 3.6,
    fiber: 5.2,
    barcode: '045678901234',
    category: 'lunch',
    tags: ['grain', 'superfood', 'fiber'],
  },
  {
    id: 'db-10',
    name: 'Creamy Natural Peanut Butter',
    brand: 'Santa Cruz Organic',
    servingSize: '2 tbsp (32g)',
    servingGrams: 32,
    calories: 190,
    protein: 8,
    carbs: 6,
    fat: 16,
    fiber: 2,
    barcode: '056789012345',
    category: 'snack',
    tags: ['nuts', 'spread', 'fats'],
  },
];

export interface DetectedDishSample {
  id: string;
  name: string;
  tagline: string;
  totalCalories: number;
  protein: number;
  carbs: number;
  fat: number;
  confidence: number;
  imageUrl: string;
  components: {
    name: string;
    weightGrams: number;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    box: { top: number; left: number; width: number; height: number };
  }[];
}

export const sampleVisionDishes: DetectedDishSample[] = [
  {
    id: 'dish-1',
    name: 'Avocado Toast & Poached Egg',
    tagline: 'Artisanal sourdough with crushed Haas avocado, free-range egg & microgreens',
    totalCalories: 395,
    protein: 14,
    carbs: 34,
    fat: 23,
    confidence: 97,
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop&q=80',
    components: [
      {
        name: 'Artisan Sourdough Toast',
        weightGrams: 75,
        calories: 175,
        protein: 6,
        carbs: 33,
        fat: 1.5,
        box: { top: 22, left: 12, width: 76, height: 68 },
      },
      {
        name: 'Crushed Hass Avocado',
        weightGrams: 70,
        calories: 115,
        protein: 1.5,
        carbs: 6,
        fat: 10.5,
        box: { top: 52, left: 16, width: 36, height: 32 },
      },
      {
        name: 'Poached Free-Range Egg',
        weightGrams: 55,
        calories: 78,
        protein: 6.5,
        carbs: 0.5,
        fat: 5.5,
        box: { top: 26, left: 42, width: 40, height: 36 },
      },
      {
        name: 'Extra Virgin Olive Oil',
        weightGrams: 3,
        calories: 27,
        protein: 0,
        carbs: 0,
        fat: 3,
        box: { top: 62, left: 56, width: 26, height: 22 },
      },
    ],
  },
  {
    id: 'dish-2',
    name: 'Atlantic Salmon & Quinoa Power Bowl',
    tagline: 'Pan-seared salmon fillet over tricolor quinoa, steamed broccoli & edamame',
    totalCalories: 640,
    protein: 51,
    carbs: 48,
    fat: 26,
    confidence: 98,
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
    components: [
      {
        name: 'Pan-Seared Salmon Fillet',
        weightGrams: 160,
        calories: 320,
        protein: 36,
        carbs: 0,
        fat: 18,
        box: { top: 32, left: 35, width: 38, height: 35 },
      },
      {
        name: 'Tricolor Steamed Quinoa',
        weightGrams: 140,
        calories: 170,
        protein: 6,
        carbs: 31,
        fat: 2.8,
        box: { top: 52, left: 25, width: 45, height: 30 },
      },
      {
        name: 'Tenderstem Broccoli & Edamame',
        weightGrams: 100,
        calories: 85,
        protein: 7,
        carbs: 9,
        fat: 2.2,
        box: { top: 28, left: 18, width: 32, height: 34 },
      },
      {
        name: 'Lemon Herb Dressing',
        weightGrams: 15,
        calories: 65,
        protein: 0.2,
        carbs: 1.5,
        fat: 6.5,
        box: { top: 45, left: 55, width: 22, height: 25 },
      },
    ],
  },
  {
    id: 'dish-3',
    name: 'Superfood Acai Berry Crunch Bowl',
    tagline: 'Wild acai smoothie base with blueberries, strawberries, chia & granola',
    totalCalories: 385,
    protein: 9,
    carbs: 68,
    fat: 9.5,
    confidence: 96,
    imageUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&auto=format&fit=crop&q=80',
    components: [
      {
        name: 'Organic Acai & Berry Base',
        weightGrams: 200,
        calories: 140,
        protein: 2,
        carbs: 26,
        fat: 3.5,
        box: { top: 30, left: 20, width: 60, height: 50 },
      },
      {
        name: 'Fresh Blueberries & Strawberries',
        weightGrams: 80,
        calories: 45,
        protein: 0.8,
        carbs: 11,
        fat: 0.3,
        box: { top: 32, left: 25, width: 30, height: 28 },
      },
      {
        name: 'Toasted Coconut Granola Clusters',
        weightGrams: 35,
        calories: 150,
        protein: 4.2,
        carbs: 23,
        fat: 5.2,
        box: { top: 40, left: 52, width: 28, height: 26 },
      },
      {
        name: 'Chia Seeds & Honey Drizzle',
        weightGrams: 12,
        calories: 50,
        protein: 1.8,
        carbs: 7.8,
        fat: 1.5,
        box: { top: 52, left: 38, width: 25, height: 22 },
      },
    ],
  },
];
