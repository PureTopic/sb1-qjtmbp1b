import React from 'react';
import { Sparkles } from 'lucide-react';

export const ProfessorPip: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-4">
        <div className="w-32 h-32 professor-pip-steampunk flex items-center justify-center shadow-steampunk">
          <div className="text-6xl animate-float">🤖</div>
        </div>
        {/* Steampunk decorative elements */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-aetheric-gold-gradient rounded-full shadow-brass animate-glow"></div>
        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-emerald-jade-gradient rounded-full shadow-inner-glow"></div>
        <Sparkles className="absolute top-2 left-2 text-aetheric-gold-400 animate-float" size={16} />
      </div>
      
      <div className="text-center">
        <h3 className="text-2xl font-display font-bold text-steampunk-header mb-2">
          Professor Phineas "Pip" Cogsworth
        </h3>
        <p className="text-aetheric-gold-400 font-body mb-3">Master Alchemical Engineer</p>
        
        <div className="panel-steampunk rounded-xl p-4 border border-brass-500/30">
          <p className="text-sm text-brass-200 font-body italic">
            "Welcome to my laboratory, dear apprentice! The art of transmutation awaits your skilled hands."
          </p>
        </div>
      </div>
    </div>
  );
};