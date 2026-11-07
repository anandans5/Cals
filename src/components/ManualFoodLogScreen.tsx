import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Barcode, 
  X, 
  Check, 
  Plus, 
  Sparkles, 
  ChevronLeft, 
  Sliders, 
  Scale, 
  Utensils 
} from 'lucide-react';
import { 
  FoodItem, 
  calculateScaledNutrition, 
  formatCalories 
} from '../utils/nutrition';
import { verifiedFoodDatabase, VerifiedFoodDatabaseItem } from '../data/mockData';
import { ScreenId } from './Navigation';

interface ManualFoodLogScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onAddFood: (item: FoodItem) => void;
  preselectedCategory?: FoodItem['category'];
  preloadedFood?: Partial<FoodItem> | null;
}

export const ManualFoodLogScreen: React.FC<ManualFoodLogScreenProps> = ({
  onNavigate,
  onAddFood,
  preselectedCategory = 'breakfast',
  preloadedFood = null,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FoodItem['category']>(preselectedCategory);
  const [selectedFood, setSelectedFood] = useState<VerifiedFoodDatabaseItem | null>(null);
  const [portionGrams, setPortionGrams] = useState<number>(100);
  const [servingsMultiplier, setServingsMultiplier] = useState<number>(1);
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Custom food fields
  const [customName, setCustomName] = useState('');
  const [customKcal, setCustomKcal] = useState('');
  const [customProtein, setCustomProtein] = useState('');
  const [customCarbs, setCustomCarbs] = useState('');
  const [customFat, setCustomFat] = useState('');

  // When preloaded food is passed (e.g. from AI Vision Scanner's "Edit Portions" button)
  useEffect(() => {
    if (preloadedFood) {
      if (preloadedFood.category) {
        setSelectedCategory(preloadedFood.category);
      }
      // Create a temporary database item to edit
      const tempItem: VerifiedFoodDatabaseItem = {
        id: preloadedFood.id || 'preloaded-item',
        name: preloadedFood.name || 'AI Detected Meal',
        brand: preloadedFood.brand || 'CalorieIQ AI Vision',
        servingSize: preloadedFood.servingSize || `${preloadedFood.servingGrams || 100}g portion`,
        servingGrams: preloadedFood.servingGrams || 100,
        calories: preloadedFood.calories || 250,
        protein: preloadedFood.protein || 15,
        carbs: preloadedFood.carbs || 25,
        fat: preloadedFood.fat || 8,
        fiber: preloadedFood.fiber || 3,
        category: preloadedFood.category || 'breakfast',
        tags: ['ai-scanned', 'custom'],
      };
      setSelectedFood(tempItem);
      setPortionGrams(tempItem.servingGrams);
      setServingsMultiplier(1);
    } else if (!selectedFood && verifiedFoodDatabase.length > 0) {
      // Default to first item
      const initial = verifiedFoodDatabase[0];
      setSelectedFood(initial);
      setPortionGrams(initial.servingGrams);
    }
  }, [preloadedFood]);

  // Filter food items
  const filteredDatabase = verifiedFoodDatabase.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      item.name.toLowerCase().includes(q) ||
      (item.brand && item.brand.toLowerCase().includes(q)) ||
      item.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const handleSelectFood = (item: VerifiedFoodDatabaseItem) => {
    setSelectedFood(item);
    setPortionGrams(item.servingGrams);
    setServingsMultiplier(1);
    setIsCustomMode(false);
  };

  // Calculate live nutrition based on portion
  const liveNutrition = selectedFood
    ? calculateScaledNutrition(
        {
          calories: selectedFood.calories,
          protein: selectedFood.protein,
          carbs: selectedFood.carbs,
          fat: selectedFood.fat,
          fiber: selectedFood.fiber,
        },
        portionGrams * servingsMultiplier,
        selectedFood.servingGrams
      )
    : { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 };

  const handleSaveToDiary = () => {
    if (isCustomMode) {
      if (!customName.trim()) return;
      const newCustomItem: FoodItem = {
        id: `custom-${Date.now()}`,
        name: customName,
        servingSize: `${portionGrams}g custom serving`,
        servingGrams: portionGrams,
        calories: Number(customKcal) || 0,
        protein: Number(customProtein) || 0,
        carbs: Number(customCarbs) || 0,
        fat: Number(customFat) || 0,
        category: selectedCategory,
      };
      onAddFood(newCustomItem);
    } else if (selectedFood) {
      const newFoodItem: FoodItem = {
        id: `food-${Date.now()}`,
        name: selectedFood.brand ? `${selectedFood.name} (${selectedFood.brand})` : selectedFood.name,
        servingSize: `${Math.round(portionGrams * servingsMultiplier)}g (${servingsMultiplier}x serving)`,
        servingGrams: Math.round(portionGrams * servingsMultiplier),
        calories: liveNutrition.calories,
        protein: liveNutrition.protein,
        carbs: liveNutrition.carbs,
        fat: liveNutrition.fat,
        fiber: liveNutrition.fiber,
        category: selectedCategory,
        barcode: selectedFood.barcode,
      };
      onAddFood(newFoodItem);
    }

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onNavigate('dashboard');
    }, 900);
  };

  const mealSlots: { id: FoodItem['category']; label: string }[] = [
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'lunch', label: 'Lunch' },
    { id: 'dinner', label: 'Dinner' },
    { id: 'snack', label: 'Snack' },
  ];

  return (
    <div className="pb-28 pt-4 px-4 max-w-lg mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-1 text-slate-500 hover:text-slate-800 text-xs font-semibold py-1 pr-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Dashboard</span>
        </button>

        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Nutrition Entry
        </span>

        <button
          onClick={() => setIsCustomMode(!isCustomMode)}
          className="text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 px-2.5 py-1 rounded-full transition-colors"
        >
          {isCustomMode ? 'Search Database' : '+ Custom Food'}
        </button>
      </div>

      <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-3">
        Manual Food Log
      </h1>

      {/* Meal Slot Selector */}
      <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100/80 rounded-2xl mb-4 border border-slate-200/60">
        {mealSlots.map((slot) => (
          <button
            key={slot.id}
            onClick={() => setSelectedCategory(slot.id)}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              selectedCategory === slot.id
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {slot.label}
          </button>
        ))}
      </div>

      {/* Search Input Bar with Exact Prototype Barcode Shortcut */}
      <div className="relative mb-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search food by name, brand, or tag..."
              className="w-full bg-white border border-slate-200 pl-9 pr-9 py-2.5 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-3 focus:ring-emerald-400/20 transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Exact prototype selector: //button[@title='Barcode shortcut'] */}
          <button
            title="Barcode shortcut"
            onClick={() => onNavigate('barcode-scanner')}
            className="w-11 h-11 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 rounded-xl flex items-center justify-center text-emerald-700 active:scale-95 transition-all shadow-xs"
            aria-label="Barcode shortcut"
          >
            <Barcode className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Custom Food Creation Mode */}
      {isCustomMode ? (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft mb-5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <Utensils className="w-4 h-4 text-emerald-600" />
            <span>Create Custom Food Entry</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Food or Recipe Name
            </label>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="e.g. Homemade Chicken Fried Rice"
              className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Calories (kcal)
              </label>
              <input
                type="number"
                value={customKcal}
                onChange={(e) => setCustomKcal(e.target.value)}
                placeholder="450"
                className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-500 tabular-nums"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Portion Weight (g)
              </label>
              <input
                type="number"
                value={portionGrams}
                onChange={(e) => setPortionGrams(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-500 tabular-nums"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-teal-800 mb-1">
                Protein (g)
              </label>
              <input
                type="number"
                value={customProtein}
                onChange={(e) => setCustomProtein(e.target.value)}
                placeholder="25"
                className="w-full bg-[#f0fdfa] border border-[#ccfbf1] px-2.5 py-1.5 rounded-lg text-xs font-bold text-teal-800 tabular-nums"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-emerald-800 mb-1">
                Carbs (g)
              </label>
              <input
                type="number"
                value={customCarbs}
                onChange={(e) => setCustomCarbs(e.target.value)}
                placeholder="40"
                className="w-full bg-[#f0fdf4] border border-[#dcfce7] px-2.5 py-1.5 rounded-lg text-xs font-bold text-emerald-800 tabular-nums"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-amber-800 mb-1">
                Fat (g)
              </label>
              <input
                type="number"
                value={customFat}
                onChange={(e) => setCustomFat(e.target.value)}
                placeholder="12"
                className="w-full bg-[#fef3c7] border border-[#fde68a] px-2.5 py-1.5 rounded-lg text-xs font-bold text-amber-800 tabular-nums"
              />
            </div>
          </div>
        </div>
      ) : (
        /* Selected Food Item & Portion Adjuster */
        selectedFood && (
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft mb-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                  {selectedFood.brand || 'Verified Item'}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {selectedFood.name}
                </h3>
                <p className="text-xs text-slate-400">
                  Base Reference: {selectedFood.servingSize} ({selectedFood.servingGrams}g)
                </p>
              </div>

              <div className="text-right">
                <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                  {liveNutrition.calories}
                </span>
                <span className="text-xs font-bold text-slate-400 block -mt-1">KCAL</span>
              </div>
            </div>

            {/* Dynamic Macro Chips */}
            <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 my-3">
              <div className="bg-[#f0fdfa] border border-[#ccfbf1] rounded-xl p-2 text-center">
                <span className="text-[10px] font-bold text-[#0f766e] uppercase block">Protein</span>
                <span className="text-sm font-extrabold text-[#0f766e] tabular-nums">
                  {liveNutrition.protein}g
                </span>
              </div>
              <div className="bg-[#f0fdf4] border border-[#dcfce7] rounded-xl p-2 text-center">
                <span className="text-[10px] font-bold text-[#16a34a] uppercase block">Carbs</span>
                <span className="text-sm font-extrabold text-[#16a34a] tabular-nums">
                  {liveNutrition.carbs}g
                </span>
              </div>
              <div className="bg-[#fef3c7] border border-[#fde68a] rounded-xl p-2 text-center">
                <span className="text-[10px] font-bold text-[#b45309] uppercase block">Fats</span>
                <span className="text-sm font-extrabold text-[#b45309] tabular-nums">
                  {liveNutrition.fat}g
                </span>
              </div>
            </div>

            {/* Portion Adjuster Controls */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-emerald-600" />
                  Portion Adjuster
                </span>
                <span className="text-slate-900 font-bold tabular-nums">
                  {Math.round(portionGrams * servingsMultiplier)} grams
                </span>
              </div>

              {/* Range Slider for quick grams adjustment */}
              <input
                type="range"
                min="10"
                max="500"
                step="5"
                value={portionGrams}
                onChange={(e) => setPortionGrams(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />

              {/* Serving multipliers chips */}
              <div className="flex items-center gap-2">
                {[0.5, 1, 1.5, 2].map((mult) => (
                  <button
                    key={mult}
                    onClick={() => setServingsMultiplier(mult)}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                      servingsMultiplier === mult
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {mult}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
      )}

      {/* Save Action Button */}
      <button
        onClick={handleSaveToDiary}
        className={`w-full py-3.5 rounded-full font-bold text-sm tracking-tight flex items-center justify-center gap-2 transition-all shadow-glow-primary active:scale-98 mb-6 ${
          saveSuccess
            ? 'bg-emerald-700 text-white'
            : 'bg-emerald-500 hover:bg-emerald-600 text-white'
        }`}
      >
        {saveSuccess ? (
          <>
            <Check className="w-5 h-5" />
            <span>Logged to {selectedCategory}!</span>
          </>
        ) : (
          <>
            <Plus className="w-5 h-5" />
            <span>
              {`Add to ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} (${liveNutrition.calories} kcal)`}
            </span>
          </>
        )}
      </button>

      {/* Verified Food Database List */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-0.5">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Verified Food Database ({filteredDatabase.length})
          </h2>
          <span className="text-[11px] text-slate-400">Tap to select &amp; adjust</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 divide-y divide-slate-100 shadow-soft overflow-hidden">
          {filteredDatabase.map((item) => {
            const isCurrent = selectedFood?.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectFood(item)}
                className={`w-full text-left p-3.5 flex items-center justify-between transition-colors ${
                  isCurrent ? 'bg-emerald-50/50' : 'hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    {item.name}
                    {isCurrent && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {item.brand && <span className="font-semibold text-slate-600">{item.brand} • </span>}
                    {item.servingSize} • <span className="text-teal-700 font-medium">{item.protein}g P</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-extrabold text-slate-900 tabular-nums">
                    {item.calories}
                  </span>
                  <span className="text-[10px] text-slate-400 ml-0.5 font-semibold">KCAL</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
