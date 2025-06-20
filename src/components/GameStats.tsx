import React from 'react';
import { useGame } from '../context/GameContext';
import { formatNumber } from '../utils/formatters';
import { BarChart3, TrendingUp, Users } from 'lucide-react';

export const GameStats: React.FC = () => {
  const { gameState } = useGame();
  
  const totalElements = Object.values(gameState.elements).reduce((sum, amount) => sum + amount, 0);
  
  return (
    <div className="panel-steampunk p-6">
      <h2 className="text-2xl font-display font-bold text-steampunk-header mb-6 flex items-center gap-3">
        <BarChart3 className="text-brass-400" size={24} />
        Laboratory Statistics
      </h2>
      
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-gradient-to-br from-amber-900/50 to-amber-800/30 p-5 rounded-xl border border-brass-600/40 shadow-inner-glow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-brass-400 text-sm font-body mb-1 flex items-center gap-2">
                <TrendingUp size={16} />
                Total Elements
              </div>
              <div className="text-3xl font-display font-bold text-brass-100">
                {formatNumber(totalElements)}
              </div>
            </div>
            <div className="text-4xl opacity-20">⚗️</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-900/50 to-emerald-800/30 p-5 rounded-xl border border-emerald-600/40 shadow-inner-glow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-emerald-400 text-sm font-body mb-1 flex items-center gap-2">
                <BarChart3 size={16} />
                Discoveries
              </div>
              <div className="text-3xl font-display font-bold text-emerald-100">
                {gameState.discoveries.length}
              </div>
            </div>
            <div className="text-4xl opacity-20">🔍</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 p-5 rounded-xl border border-purple-600/40 shadow-inner-glow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-purple-400 text-sm font-body mb-1 flex items-center gap-2">
                <Users size={16} />
                Homunculi
              </div>
              <div className="text-3xl font-display font-bold text-purple-100">
                {gameState.homunculi.length}
              </div>
            </div>
            <div className="text-4xl opacity-20">🧙‍♂️</div>
          </div>
        </div>
      </div>
    </div>
  );
};