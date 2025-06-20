import React from 'react';
import { useGame } from '../context/GameContext';
import { TrendingUp, Target, Award } from 'lucide-react';

export const ProgressionChart: React.FC = () => {
  const { gameState } = useGame();
  
  const totalElements = Object.values(gameState.elements).reduce((sum, amount) => sum + amount, 0);
  const totalDiscoveries = gameState.discoveries.length;
  
  const progressData = [
    { 
      label: 'Elements Gathered', 
      value: totalElements, 
      max: 1000, 
      color: 'from-brass-500 to-brass-400',
      bgColor: 'from-brass-900/50 to-brass-800/30',
      borderColor: 'border-brass-600/40',
      icon: <TrendingUp size={16} />
    },
    { 
      label: 'Discoveries Made', 
      value: totalDiscoveries, 
      max: 50, 
      color: 'from-emerald-500 to-emerald-400',
      bgColor: 'from-emerald-900/50 to-emerald-800/30',
      borderColor: 'border-emerald-600/40',
      icon: <Target size={16} />
    },
    { 
      label: 'Homunculi Created', 
      value: gameState.homunculi.length, 
      max: 10, 
      color: 'from-purple-500 to-purple-400',
      bgColor: 'from-purple-900/50 to-purple-800/30',
      borderColor: 'border-purple-600/40',
      icon: <Award size={16} />
    },
  ];

  return (
    <div className="space-y-4">
      {progressData.map((item, index) => {
        const percentage = Math.min((item.value / item.max) * 100, 100);
        
        return (
          <div key={index} className={`bg-gradient-to-r ${item.bgColor} border ${item.borderColor} rounded-lg p-4 shadow-inner-glow`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {item.icon}
                <span className="text-sm font-body font-medium text-amber-200">{item.label}</span>
              </div>
              <span className="text-sm font-body font-semibold text-amber-100">
                {item.value} / {item.max}
              </span>
            </div>
            
            <div className="relative">
              <div className="w-full bg-amber-950/60 rounded-full h-3 border border-amber-800/50">
                <div 
                  className={`bg-gradient-to-r ${item.color} h-full rounded-full shadow-glow transition-all duration-500 ease-out`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full opacity-50"></div>
            </div>
            
            <div className="mt-2 text-right">
              <span className="text-xs text-amber-400/80 font-body">
                {percentage.toFixed(1)}% Complete
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};