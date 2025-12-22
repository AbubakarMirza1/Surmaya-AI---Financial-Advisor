
import React, { useState, useEffect } from 'react';
import { AppData, Screen } from '../types';
import { GeminiService } from '../services/gemini';

interface AIAdvisorOverlayProps {
  currentScreen: Screen;
  data: AppData;
  onChatClick: () => void;
}

const AIAdvisorOverlay: React.FC<AIAdvisorOverlayProps> = ({ currentScreen, data, onChatClick }) => {
  const [advice, setAdvice] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [minimized, setMinimized] = useState(false);

  const gemini = new GeminiService();

  useEffect(() => {
    const fetchAdvice = async () => {
      setLoading(true);
      const res = await gemini.getContextualAdvice(currentScreen, data);
      setAdvice(res);
      setLoading(false);
    };

    fetchAdvice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentScreen]);

  if (currentScreen === Screen.ADVISOR) return null;

  return (
    <div className={`fixed bottom-24 left-4 right-4 z-40 transition-all duration-300 ${minimized ? 'translate-y-2' : ''}`}>
      <div className={`bg-white rounded-2xl shadow-2xl border border-emerald-50 overflow-hidden transform transition-all ${minimized ? 'h-12' : 'p-4'}`}>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center text-white text-[10px]">
              <i className="fa-solid fa-robot"></i>
            </div>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-tighter">Sarmaya Advisor</span>
          </div>
          <button 
            onClick={() => setMinimized(!minimized)}
            className="text-slate-400 hover:text-slate-600"
          >
            <i className={`fa-solid ${minimized ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
          </button>
        </div>

        {!minimized && (
          <div className="space-y-3">
            {loading ? (
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-slate-100 rounded w-full"></div>
                <div className="h-4 bg-slate-100 rounded w-3/4"></div>
              </div>
            ) : (
              <>
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  "{advice?.advice || 'Analysing your finances...'}"
                </p>
                <div className="flex gap-2 items-center">
                  <button 
                    onClick={onChatClick}
                    className="flex-1 bg-emerald-50 text-emerald-700 text-xs font-bold py-2 px-3 rounded-lg hover:bg-emerald-100 transition-colors flex justify-between items-center"
                  >
                    <span>{advice?.promptSuggestion || 'Ask me anything'}</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAdvisorOverlay;
