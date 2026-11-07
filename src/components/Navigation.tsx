import React from 'react';
import { Home, Sparkles, Barcode, BookOpen } from 'lucide-react';

export type ScreenId = 'dashboard' | 'manual-food-log' | 'barcode-scanner' | 'ai-vision-scanner';

interface NavigationProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentScreen, onNavigate }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-4 py-2 sm:py-3 shadow-bottom-sheet max-w-lg mx-auto">
      <div className="flex items-center justify-around">
        {/* Home Dashboard Link */}
        <a
          href="#dashboard"
          data-path="dashboard"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('dashboard');
          }}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-all rounded-lg px-2 py-1 ${
            currentScreen === 'dashboard'
              ? 'text-emerald-700 font-semibold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
          aria-label="Home Dashboard"
        >
          <Home className={`w-5 h-5 mb-0.5 ${currentScreen === 'dashboard' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
          <span className="text-[11px] tracking-tight">Today</span>
        </a>

        {/* AI Vision Scanner Link */}
        <a
          href="#ai-vision-scanner"
          data-path="ai-vision-scanner"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('ai-vision-scanner');
          }}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-all rounded-lg px-2 py-1 ${
            currentScreen === 'ai-vision-scanner'
              ? 'text-emerald-700 font-semibold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
          aria-label="AI Vision Scanner"
        >
          <div className="relative">
            <Sparkles className={`w-5 h-5 mb-0.5 ${currentScreen === 'ai-vision-scanner' ? 'text-emerald-600 stroke-[2.5]' : 'stroke-[1.75]'}`} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          </div>
          <span className="text-[11px] tracking-tight">AI Vision</span>
        </a>

        {/* Barcode Scanner Link */}
        <a
          href="#barcode-scanner"
          data-path="barcode-scanner"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('barcode-scanner');
          }}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-all rounded-lg px-2 py-1 ${
            currentScreen === 'barcode-scanner'
              ? 'text-emerald-700 font-semibold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
          aria-label="Barcode Scanner"
        >
          <Barcode className={`w-5 h-5 mb-0.5 ${currentScreen === 'barcode-scanner' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
          <span className="text-[11px] tracking-tight">Barcode</span>
        </a>

        {/* Manual Food Log Link */}
        <a
          href="#manual-food-log"
          data-path="manual-food-log"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('manual-food-log');
          }}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-all rounded-lg px-2 py-1 ${
            currentScreen === 'manual-food-log'
              ? 'text-emerald-700 font-semibold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
          aria-label="Manual Food Log"
        >
          <BookOpen className={`w-5 h-5 mb-0.5 ${currentScreen === 'manual-food-log' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
          <span className="text-[11px] tracking-tight">Food Log</span>
        </a>
      </div>
    </nav>
  );
};
