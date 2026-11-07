/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navigation, ScreenId } from './components/Navigation';
import { DashboardScreen } from './components/DashboardScreen';
import { ManualFoodLogScreen } from './components/ManualFoodLogScreen';
import { BarcodeScannerScreen } from './components/BarcodeScannerScreen';
import { AIVisionScannerScreen } from './components/AIVisionScannerScreen';
import { LoginScreen } from './components/LoginScreen';
import { 
  FoodItem, 
  DayNutritionGoal,
  calculateTotalNutrition
} from './utils/nutrition';
import { 
  initialFoodLogs, 
  initialNutritionGoal 
} from './data/mockData';
import { 
  evaluateAchievements, 
  calculateDailyStreak,
  UserStats 
} from './utils/streakAchievements';
import { dbService } from './db/indexedDb';
import { User, LogOut, Database, ShieldCheck } from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isDbLoaded, setIsDbLoaded] = useState<boolean>(false);
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('dashboard');
  const [foodLogs, setFoodLogs] = useState<FoodItem[]>(initialFoodLogs);
  const [goal, setGoal] = useState<DayNutritionGoal>(initialNutritionGoal);
  const [waterIntakeMl, setWaterIntakeMl] = useState<number>(0);
  const [burnedCalories, setBurnedCalories] = useState<number>(0);
  const [preselectedCategory, setPreselectedCategory] = useState<FoodItem['category'] | undefined>(undefined);
  const [preloadedFood, setPreloadedFood] = useState<Partial<FoodItem> | null>(null);

  // Initialize and load persistent database records
  useEffect(() => {
    async function initAndLoadDatabase() {
      try {
        const session = await dbService.getAuthSession();
        if (session && session.isLoggedIn && session.username === 'user101') {
          setIsAuthenticated(true);
          const savedLogs = await dbService.getFoodLogs('user101');
          setFoodLogs(savedLogs);
          const profile = await dbService.getUserProfile('user101');
          setWaterIntakeMl(profile.waterIntakeMl || 0);
          setBurnedCalories(profile.burnedCalories || 0);
        }
      } catch (err) {
        console.warn('Database initialization error:', err);
      } finally {
        setIsDbLoaded(true);
      }
    }
    initAndLoadDatabase();
  }, []);

  const totals = calculateTotalNutrition(foodLogs);
  const hasLoggedToday = foodLogs.length > 0;
  const streakDays = calculateDailyStreak(hasLoggedToday, 0);

  const userStats: UserStats = {
    totalMealsLogged: foodLogs.length,
    voiceLogsCount: foodLogs.filter((f) => f.id.startsWith('voice-')).length,
    scansCount: foodLogs.filter((f) => Boolean(f.barcode) || f.id.startsWith('ai-') || f.id.startsWith('barcode-')).length,
    waterIntakeMl,
    caloriesConsumed: totals.calories,
    calorieTarget: goal.dailyCalorieTarget,
    streakDays,
    hasLoggedToday,
  };

  const achievements = evaluateAchievements(userStats);

  const handleLoginSuccess = async (username: string) => {
    setIsAuthenticated(true);
    try {
      await dbService.setAuthSession({
        isLoggedIn: true,
        username,
        userId: username,
        loginTimestamp: Date.now(),
      });
      const savedLogs = await dbService.getFoodLogs(username);
      setFoodLogs(savedLogs);
      const profile = await dbService.getUserProfile(username);
      setWaterIntakeMl(profile.waterIntakeMl || 0);
      setBurnedCalories(profile.burnedCalories || 0);
    } catch (err) {
      console.warn('Error saving session:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await dbService.clearAuthSession();
    } catch {}
    setIsAuthenticated(false);
  };

  const handleNavigate = (
    screen: ScreenId,
    params?: { preselectedCategory?: FoodItem['category']; preloadedFood?: Partial<FoodItem> }
  ) => {
    if (params?.preselectedCategory) {
      setPreselectedCategory(params.preselectedCategory);
    }
    if (params?.preloadedFood) {
      setPreloadedFood(params.preloadedFood);
    } else if (screen !== 'manual-food-log') {
      // Clear preloaded food when navigating elsewhere
      setPreloadedFood(null);
    }
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddFood = async (item: FoodItem) => {
    setFoodLogs((prev) => [item, ...prev]);
    try {
      await dbService.saveFoodLog(item, 'user101');
    } catch (err) {
      console.error('Failed to persist food log to database:', err);
    }
  };

  const handleDeleteFood = async (id: string) => {
    setFoodLogs((prev) => prev.filter((item) => item.id !== id));
    try {
      await dbService.deleteFoodLog(id, 'user101');
    } catch (err) {
      console.error('Failed to remove item from database:', err);
    }
  };

  const handleAddWater = async (amountMl: number) => {
    const nextAmount = waterIntakeMl + amountMl;
    setWaterIntakeMl(nextAmount);
    try {
      await dbService.saveUserProfile({
        userId: 'user101',
        username: 'user101',
        waterIntakeMl: nextAmount,
        burnedCalories,
        streakDays,
        lastActiveDate: new Date().toISOString().split('T')[0],
      });
    } catch (err) {
      console.error('Failed to persist user profile:', err);
    }
  };

  // If not authenticated, render Beta Login Screen
  if (!isAuthenticated && isDbLoaded) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] antialiased">
      {/* Top Beta Header with User Status and Database Sync Indicator */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 py-2 flex items-center justify-between max-w-lg mx-auto text-xs sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px]">
            <User className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-center gap-1.5 font-bold text-slate-800">
            <span>user101</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-semibold border border-emerald-200">
              Beta
            </span>
          </div>
          <span className="text-[10px] text-slate-400 flex items-center gap-1 ml-1">
            <Database className="w-3 h-3 text-emerald-600" />
            <span>DB Synced</span>
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-slate-500 hover:text-slate-800 text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-full transition-colors"
          title="Sign out of beta session"
        >
          <LogOut className="w-3 h-3" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Active Screen View */}
      <main className="w-full">
        {currentScreen === 'dashboard' && (
          <DashboardScreen
            logs={foodLogs}
            goal={goal}
            waterIntakeMl={waterIntakeMl}
            burnedCalories={burnedCalories}
            streakDays={streakDays}
            hasLoggedToday={hasLoggedToday}
            achievements={achievements}
            onNavigate={handleNavigate}
            onAddFood={handleAddFood}
            onDeleteFood={handleDeleteFood}
            onAddWater={handleAddWater}
          />
        )}

        {currentScreen === 'manual-food-log' && (
          <ManualFoodLogScreen
            onNavigate={handleNavigate}
            onAddFood={handleAddFood}
            preselectedCategory={preselectedCategory}
            preloadedFood={preloadedFood}
          />
        )}

        {currentScreen === 'barcode-scanner' && (
          <BarcodeScannerScreen
            onNavigate={handleNavigate}
            onAddFood={handleAddFood}
          />
        )}

        {currentScreen === 'ai-vision-scanner' && (
          <AIVisionScannerScreen
            onNavigate={handleNavigate}
            onAddFood={handleAddFood}
          />
        )}
      </main>

      {/* Persistent Bottom Navigation with XPath Data Paths */}
      <Navigation
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
