import React, { useState } from 'react';
import { HelpCircle, Info, X } from 'lucide-react';

export const HelpTooltip = ({ title, explanation, example, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-flex items-center gap-1 group">
      {children}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="text-slate-400 hover:text-blue-400 transition-colors p-0.5 rounded-full hover:bg-slate-800"
        title="Click for explanation"
      >
        <Info className="w-3.5 h-3.5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs md:absolute md:inset-auto md:bottom-full md:left-1/2 md:-translate-x-1/2 md:mb-2 md:w-72 md:bg-slate-900 md:border md:border-slate-700 md:rounded-xl md:shadow-2xl md:p-3">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 md:p-0 shadow-2xl max-w-sm w-full md:w-auto">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
              <span className="font-bold text-xs text-blue-400 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                {title || 'Understanding this metric'}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <p className="text-xs text-slate-200 leading-relaxed">
              {explanation}
            </p>

            {example && (
              <div className="mt-2 pt-2 border-t border-slate-800/60 text-[11px] text-slate-400">
                <strong className="text-slate-300">Example:</strong> {example}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
