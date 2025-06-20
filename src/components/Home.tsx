import React from 'react';
import { useGame } from '../context/GameContext';
import { formatNumber } from '../utils/formatters';
import { ElementDisplay } from './ElementDisplay';
import { GameStats } from './GameStats';
import { ProfessorPip } from './ProfessorPip';
import { ProgressionChart } from './ProgressionChart';

export const Home: React.FC = () => {
  const { gameState, actions } = useGame();
  
  return (
    <div className="space-y-6">
      <div className="bg-amber-950/60 border border-amber-700/50 rounded-lg p-6 shadow-lg backdrop-blur-sm">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-full md:w-1/3">
            <ProfessorPip />
          </div>
          
          <div className="w-full md:w-2/3 space-y-4">
            <h1 className="text-3xl font-bold text-amber-200 font-serif tracking-wide">
              The Soulforge Alchemist
            </h1>
            
            <p className="text-amber-100 leading-relaxed">
              Welcome back to your alchemical laboratory! Your journey into the arcane science of transmutation 
              continues. Gather elements, discover new compounds, and unlock the secrets of the universe.
            </p>
            
            {gameState.tutorialProgress < 3 && (
              <div className="bg-amber-800/30 border border-amber-600/40 p-4 rounded-md mt-4">
                <p className="font-serif italic text-amber-200">
                  "Ah, my diligent apprentice! To begin your work today, I suggest you visit the Laboratory and start 
                  gathering basic elements. Remember, all great alchemical works begin with the fundamental building blocks!"
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-amber-950/60 border border-amber-700/50 rounded-lg p-6 shadow-lg backdrop-blur-sm">
          <h2 className="text-2xl font-serif font-bold text-amber-200 mb-4">Current Resources</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {Object.entries(gameState.elements)
              .filter(([_, amount]) => amount > 0)
              .sort(([_, a], [__, b]) => b - a)
              .slice(0, 6)
              .map(([element, amount]) => (
                <ElementDisplay key={element} element={element} amount={amount} small />
              ))}
          </div>
          {Object.values(gameState.elements).every(amount => amount === 0) && (
            <p className="text-center text-amber-400 italic mt-4">
              No elements gathered yet. Visit the Laboratory to begin.
            </p>
          )}
        </div>
        
        <GameStats />
      </div>

      <div className="bg-amber-950/60 border border-amber-700/50 rounded-lg p-6 shadow-lg backdrop-blur-sm">
        <h2 className="text-2xl font-serif font-bold text-amber-200 mb-4">Progress & Achievements</h2>
        <ProgressionChart />
      </div>
    </div>
  );
};