import React from 'react';
import { useGame } from '../context/GameContext';
import { formatNumber } from '../utils/formatters';

export const GameStats: React.FC = () => {
  const { gameState } = useGame();
  
  return (
    <div className="bg-amber-950/60 border border-amber-700/50 rounded-lg p-6 shadow-lg backdrop-blur-sm">
      <h2 className="text-2xl font-serif font-bold text-amber-200 mb-4">Laboratory Statistics</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-amber-900/40 p-4 rounded-lg">
          <div className="text-amber-400 text-sm">Total Elements</div>
          <div className="text-2xl font-bold text-amber-100">{formatNumber(Object.values(gameState.elements).reduce((sum, amount) => sum + amount, 0))}</div>
        </div>
        
        <div className="bg-amber-900/40 p-4 rounded-lg">
          <div className="text-amber-400 text-sm">Discoveries</div>
          <div className="text-2xl font-bold text-amber-100">{gameState.discoveries.length}</div>
        </div>
      </div>
    </div>
  );
};