import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateRemainingCalories,
  calculateMacroPercentages,
  calculateScaledNutrition,
  calculateTotalNutrition,
  formatCalories,
  type FoodItem,
} from './nutrition';

test('calculateRemainingCalories returns remaining allowance', () => {
  assert.equal(calculateRemainingCalories(2000, 580, 0), 1420);
  assert.equal(calculateRemainingCalories(2000, 2200, 0), 0);
  assert.equal(calculateRemainingCalories(2000, 1500, 300), 800);
});

test('calculateMacroPercentages calculates accurate percentage breakdown', () => {
  // 50g protein = 200 kcal
  // 50g carbs = 200 kcal
  // ~22.2g fat = 200 kcal -> total 600 kcal
  const result = calculateMacroPercentages(50, 50, 22.22);
  assert.equal(result.proteinPct, 33);
  assert.equal(result.carbsPct, 33);
  assert.equal(result.fatPct, 33);
});

test('calculateScaledNutrition scales macros by portion grams', () => {
  const base = { calories: 200, protein: 10, carbs: 20, fat: 5, fiber: 2 };
  const scaled = calculateScaledNutrition(base, 150, 100);
  assert.equal(scaled.calories, 300);
  assert.equal(scaled.protein, 15);
  assert.equal(scaled.carbs, 30);
  assert.equal(scaled.fat, 7.5);
  assert.equal(scaled.fiber, 3);
});

test('calculateTotalNutrition sums list of food items correctly', () => {
  const items: FoodItem[] = [
    {
      id: '1',
      name: 'Oats',
      category: 'breakfast',
      servingSize: '1 cup',
      servingGrams: 80,
      calories: 300,
      protein: 10,
      carbs: 54,
      fat: 5,
    },
    {
      id: '2',
      name: 'Almond Milk',
      category: 'breakfast',
      servingSize: '240ml',
      servingGrams: 240,
      calories: 30,
      protein: 1,
      carbs: 1,
      fat: 2.5,
    },
  ];
  const totals = calculateTotalNutrition(items);
  assert.equal(totals.calories, 330);
  assert.equal(totals.protein, 11);
  assert.equal(totals.carbs, 55);
  assert.equal(totals.fat, 7.5);
});

test('formatCalories formats numbers with commas', () => {
  assert.equal(formatCalories(1420), '1,420');
  assert.equal(formatCalories(0), '0');
  assert.equal(formatCalories(2500.4), '2,500');
});
