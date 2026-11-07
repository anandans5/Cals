import test from 'node:test';
import assert from 'node:assert/strict';
import { 
  evaluateAchievements, 
  calculateDailyStreak, 
  INITIAL_ACHIEVEMENTS, 
  UserStats 
} from './streakAchievements';

test('calculateDailyStreak returns 1 when logged today from fresh start', () => {
  assert.equal(calculateDailyStreak(true, 0), 1);
  assert.equal(calculateDailyStreak(false, 0), 0);
  assert.equal(calculateDailyStreak(true, 3), 4);
});

test('evaluateAchievements unlocks First Fuel on logging 1 meal', () => {
  const stats: UserStats = {
    totalMealsLogged: 1,
    voiceLogsCount: 0,
    scansCount: 0,
    waterIntakeMl: 0,
    caloriesConsumed: 250,
    calorieTarget: 2200,
    streakDays: 1,
    hasLoggedToday: true,
  };

  const updated = evaluateAchievements(stats, INITIAL_ACHIEVEMENTS);
  const firstFuel = updated.find((a) => a.id === 'first-fuel');
  assert.equal(firstFuel?.isUnlocked, true);
  assert.equal(firstFuel?.current, 1);
});

test('evaluateAchievements unlocks Hydration Hero when reaching 1000ml', () => {
  const stats: UserStats = {
    totalMealsLogged: 0,
    voiceLogsCount: 0,
    scansCount: 0,
    waterIntakeMl: 1000,
    caloriesConsumed: 0,
    calorieTarget: 2200,
    streakDays: 0,
    hasLoggedToday: false,
  };

  const updated = evaluateAchievements(stats, INITIAL_ACHIEVEMENTS);
  const hydration = updated.find((a) => a.id === 'hydration-hero');
  assert.equal(hydration?.isUnlocked, true);
  assert.equal(hydration?.current, 1000);
});

test('evaluateAchievements keeps Locked status if target not met', () => {
  const stats: UserStats = {
    totalMealsLogged: 0,
    voiceLogsCount: 0,
    scansCount: 0,
    waterIntakeMl: 500,
    caloriesConsumed: 0,
    calorieTarget: 2200,
    streakDays: 0,
    hasLoggedToday: false,
  };

  const updated = evaluateAchievements(stats, INITIAL_ACHIEVEMENTS);
  const hydration = updated.find((a) => a.id === 'hydration-hero');
  assert.equal(hydration?.isUnlocked, false);
  assert.equal(hydration?.current, 500);
});
