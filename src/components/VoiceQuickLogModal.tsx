import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  X, 
  Sparkles, 
  Check, 
  Plus, 
  Layers, 
  Volume2, 
  ArrowRight,
  RefreshCw,
  Clock
} from 'lucide-react';
import { FoodItem } from '../utils/nutrition';
import { parseVoiceInput, VoiceParseResult, ParsedVoiceItem } from '../utils/voiceParser';

interface VoiceQuickLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFoods: (items: FoodItem[]) => void;
}

export const VoiceQuickLogModal: React.FC<VoiceQuickLogModalProps> = ({
  isOpen,
  onClose,
  onAddFoods,
}) => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [parseResult, setParseResult] = useState<VoiceParseResult | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<FoodItem['category']>('breakfast');
  const [speechSupported, setSpeechSupported] = useState<boolean>(true);
  const [hasLogged, setHasLogged] = useState<boolean>(false);
  
  const recognitionRef = useRef<any>(null);

  const sampleVoicePrompts = [
    '2 large eggs and a slice of sourdough toast',
    'Grilled chicken breast with brown rice',
    'Greek yogurt with a banana and peanut butter',
    'Wild salmon fillet with avocado salad',
    'Oat milk latte and a crisp apple',
  ];

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      let current = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        current += event.results[i][0].transcript;
      }
      setTranscript(current);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  // Automatically parse whenever transcript updates
  useEffect(() => {
    if (transcript.trim().length > 1) {
      const currentHour = new Date().getHours();
      const parsed = parseVoiceInput(transcript, currentHour);
      setParseResult(parsed);
      setSelectedCategory(parsed.suggestedCategory);
    } else {
      setParseResult(null);
    }
  }, [transcript]);

  const toggleListening = () => {
    if (!speechSupported || !recognitionRef.current) {
      // If speech API isn't available or fails, pick a sample prompt as fallback
      handleSelectPrompt(sampleVoicePrompts[0]);
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      setParseResult(null);
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        setIsListening(false);
      }
    }
  };

  const handleSelectPrompt = (promptText: string) => {
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
    setTranscript(promptText);
  };

  const handleConfirmLog = () => {
    if (!parseResult || parseResult.items.length === 0) return;

    const newFoodItems: FoodItem[] = parseResult.items.map((item, idx) => ({
      id: `voice-${Date.now()}-${idx}`,
      name: item.name,
      servingSize: `${item.quantity} ${item.unit} (${item.servingGrams}g)`,
      servingGrams: item.servingGrams,
      calories: item.calories,
      protein: item.protein,
      carbs: item.carbs,
      fat: item.fat,
      fiber: item.fiber,
      category: selectedCategory,
    }));

    onAddFoods(newFoodItems);
    setHasLogged(true);

    setTimeout(() => {
      setHasLogged(false);
      setTranscript('');
      setParseResult(null);
      onClose();
    }, 700);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-5 border border-slate-200/80 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Voice Quick Log
              </h2>
              <p className="text-[11px] text-slate-400">
                Dictate natural foods, portions &amp; meals
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Central Microphone Touchpoint */}
        <div className="flex flex-col items-center justify-center py-6 px-4 bg-gradient-to-b from-slate-50 to-emerald-50/40 rounded-2xl border border-emerald-100/70 mb-4 relative overflow-hidden">
          {/* Animated Waveform rings while listening */}
          {isListening && (
            <>
              <div className="absolute w-32 h-32 rounded-full bg-emerald-400/20 animate-ping pointer-events-none" />
              <div className="absolute w-44 h-44 rounded-full bg-emerald-400/10 animate-pulse pointer-events-none" />
            </>
          )}

          <button
            onClick={toggleListening}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all transform active:scale-95 shadow-glow-primary z-10 ${
              isListening
                ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                : 'bg-emerald-500 hover:bg-emerald-600 text-white'
            }`}
            aria-label={isListening ? 'Stop listening' : 'Start microphone dictation'}
          >
            {isListening ? (
              <MicOff className="w-8 h-8" />
            ) : (
              <Mic className="w-8 h-8" />
            )}
          </button>

          <span className="text-xs font-bold text-slate-800 mt-3 tracking-tight">
            {isListening ? 'Listening... Speak your meal now' : 'Tap Microphone to Speak'}
          </span>
          <span className="text-[11px] text-slate-500 mt-0.5 text-center">
            {isListening
              ? 'e.g. "2 poached eggs with avocado toast and an iced matcha"'
              : 'Or tap an example prompt below to test immediately'}
          </span>
        </div>

        {/* Live / Editable Transcript Field */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
            <span>Dictated Food Expression</span>
            {transcript && (
              <button
                onClick={() => setTranscript('')}
                className="text-[10px] text-slate-400 hover:text-slate-600 font-normal"
              >
                Clear
              </button>
            )}
          </label>
          <input
            type="text"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder='Say or type: "2 eggs and a slice of toast"...'
            className="w-full bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-3 focus:ring-emerald-400/20 transition-all shadow-xs"
          />
        </div>

        {/* Quick Test Prompt Chips */}
        <div className="mb-4">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Suggested Quick Dictations
          </div>
          <div className="flex flex-wrap gap-1.5">
            {sampleVoicePrompts.map((p) => (
              <button
                key={p}
                onClick={() => handleSelectPrompt(p)}
                className={`text-xs px-2.5 py-1.5 rounded-full border transition-all text-left ${
                  transcript === p
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold'
                    : 'bg-slate-50 border-slate-200/80 text-slate-600 hover:bg-slate-100'
                }`}
              >
                "{p}"
              </button>
            ))}
          </div>
        </div>

        {/* Parsed Nutrition Preview */}
        {parseResult && parseResult.items.length > 0 && (
          <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80 mb-4 animate-fade-in">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Parsed Nutrition Data</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-extrabold text-slate-900 tabular-nums">
                  {parseResult.totalCalories}
                </span>
                <span className="text-[10px] text-slate-400 font-bold ml-1">KCAL</span>
              </div>
            </div>

            {/* Macro Chips */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="bg-[#f0fdfa] border border-[#ccfbf1] p-1.5 rounded-lg text-center">
                <span className="text-[9px] font-bold text-[#0f766e] uppercase block">Protein</span>
                <span className="text-xs font-extrabold text-[#0f766e] tabular-nums">
                  {parseResult.totalProtein}g
                </span>
              </div>
              <div className="bg-[#f0fdf4] border border-[#dcfce7] p-1.5 rounded-lg text-center">
                <span className="text-[9px] font-bold text-[#16a34a] uppercase block">Carbs</span>
                <span className="text-xs font-extrabold text-[#16a34a] tabular-nums">
                  {parseResult.totalCarbs}g
                </span>
              </div>
              <div className="bg-[#fef3c7] border border-[#fde68a] p-1.5 rounded-lg text-center">
                <span className="text-[9px] font-bold text-[#b45309] uppercase block">Fats</span>
                <span className="text-xs font-extrabold text-[#b45309] tabular-nums">
                  {parseResult.totalFat}g
                </span>
              </div>
            </div>

            {/* Detected Items Breakdown */}
            <div className="space-y-1.5 mb-3">
              {parseResult.items.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-2.5 rounded-xl border border-slate-200 text-xs flex items-center justify-between shadow-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <div>
                      <div className="font-semibold text-slate-800">{item.name}</div>
                      <div className="text-[10px] text-slate-400">
                        {item.quantity} {item.unit} ({item.servingGrams}g)
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-900 tabular-nums">{item.calories} kcal</div>
                    <div className="text-[10px] text-slate-400">
                      {item.protein}p • {item.carbs}c • {item.fat}f
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Meal Slot Chooser */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
                Assign to Meal Category
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedCategory(slot)}
                    className={`py-1 text-xs font-bold rounded-lg border capitalize transition-all ${
                      selectedCategory === slot
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleConfirmLog}
          disabled={!parseResult || parseResult.items.length === 0}
          className={`w-full py-3.5 rounded-full font-bold text-sm tracking-tight flex items-center justify-center gap-2 transition-all shadow-glow-primary active:scale-98 ${
            hasLogged
              ? 'bg-emerald-700 text-white'
              : parseResult && parseResult.items.length > 0
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          {hasLogged ? (
            <>
              <Check className="w-5 h-5" />
              <span>Logged to {selectedCategory}!</span>
            </>
          ) : (
            <>
              <Plus className="w-5 h-5" />
              <span>
                {parseResult && parseResult.items.length > 0
                  ? `Log to ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} (${parseResult.totalCalories} kcal)`
                  : 'Speak or Select a Food to Log'}
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
