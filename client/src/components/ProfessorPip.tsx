import React from 'react';
import { Sparkles } from 'lucide-react';

export const ProfessorPip: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-4">
        <div className="w-32 h-32 bg-gradient-to-br from-brass-800/60 to-brass-900/40 rounded-full border-4 border-brass-600/80 flex items-center justify-center shadow-steampunk">
          <div className="text-6xl animate-bubble">🧙‍♂️</div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-brass-gradient rounded-full shadow-brass animate-glow"></div>
        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-brass-gradient rounded-full shadow-brass"></div>
        <Sparkles className="absolute top-2 left-2 text-brass-400 animate-pulse" size={16} />
      </div>
      
      <div className="text-center">
        <h3 className="text-2xl font-display font-bold text-steampunk-header mb-2">
          Professor Phineas "Pip" Cogsworth
        </h3>
        <p className="text-brass-400 font-body mb-3">Master Alchemist & Mentor</p>
        
        <div className="bg-gradient-to-r from-brass-900/40 to-brass-800/30 border border-brass-600/40 rounded-lg p-3 shadow-inner-glow">
          <p className="text-xs text-brass-300/90 font-body italic">
            "The secrets of transmutation await those with patience and curiosity, my dear apprentice."
          </p>
        </div>
      </div>
    </div>
  );
};