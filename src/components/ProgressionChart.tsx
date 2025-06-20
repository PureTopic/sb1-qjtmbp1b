import React from 'react';
import { useGame } from '../context/GameContext';

export const ProgressionChart: React.FC = () => {
  const { gameState } = useGame();
  
  const totalElements = Object.values(gameState.elements).reduce((sum, amount) => sum + amount, 0);
  const totalDiscoveries = gameState.discoveries.length;
  
  const progressData = [
    { label: 'Elements Gathered', value: totalElements, max: 1000, color: 'bg-amber-500' },
    { label: 'Discoveries Made', value: totalDiscoveries, max: 50, color: 'bg-emerald-500' },
    { label: 'Homunculi Created', value: gameState.homunculi.length, max: 10, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-4">
      {progressData.map((item, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-amber-300">{item.label}</span>
              <span className="text-sm text-amber-200">{item.value} / {item.max}</span>
            </div>
            <div className="w-full bg-amber-950 rounded-full h-2">
              <div 
                className={`${item.color} h-2 rounded-full transition-all duration-300`}
                style={{ width: `${Math.min((item.value / item.max) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};