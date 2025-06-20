import React from 'react';
import { Sparkles } from 'lucide-react';

export const ProfessorPip: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-4">
        <div className="w-32 h-32 glass-morphism rounded-full border border-neon-400/50 flex items-center justify-center shadow-neon">
          <div className="text-6xl animate-float">🤖</div>
        </div>
        {/* Modern decorative elements */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-electric-gradient rounded-full shadow-electric animate-neon-pulse"></div>
        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-neon-gradient rounded-full shadow-neon"></div>
        <Sparkles className="absolute top-2 left-2 text-electric-400 animate-float" size={16} />
      </div>
      
      <div className="text-center">
        <h3 className="text-2xl font-display font-bold text-white mb-2">
          ARIA - Advanced Research Intelligence Assistant
        </h3>
        <p className="text-neon-400 font-body mb-3">Quantum Lab Supervisor</p>
        
        <div className="glass-morphism rounded-xl p-4">
          <p className="text-sm text-gray-300 font-body italic">
            "Quantum transmutation protocols initialized. Ready to assist with molecular synthesis operations."
          </p>
        </div>
      </div>
    </div>
  );
};