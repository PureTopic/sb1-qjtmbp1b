import React from 'react';
import { useGame } from '../context/GameContext';
import { formatNumber } from '../utils/formatters';
import { ElementDisplay } from './ElementDisplay';
import { GameStats } from './GameStats';
import { ProfessorPip } from './ProfessorPip';
import { ProgressionChart } from './ProgressionChart';
import { Sparkles, FlaskConical } from 'lucide-react';

export const Home: React.FC = () => {
  const { gameState, actions } = useGame();
  
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="panel-steampunk p-8">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="w-full md:w-1/3">
            <ProfessorPip />
          </div>
          
          <div className="w-full md:w-2/3 space-y-6">
            <div>
              <h1 className="text-4xl font-display font-bold text-steampunk-header tracking-wide mb-3 flex items-center gap-3">
                <FlaskConical className="text-brass-400 animate-glow" size={40} />
                The Soulforge Alchemist
              </h1>
              <div className="h-1 w-32 bg-brass-gradient rounded-full mb-4"></div>
            </div>
            
            <p className="text-steampunk-body text-lg leading-relaxed">
              Welcome back to your mystical laboratory, master alchemist! Your journey into the arcane science of 
              transmutation continues. Gather the fundamental elements, discover powerful compounds, and unlock 
              the deepest secrets of the universe through the ancient art of alchemy.
            </p>
            
            {gameState.tutorialProgress < 3 && (
              <div className="bg-gradient-to-r from-brass-900/40 to-brass-800/30 border-2 border-brass-600/50 p-6 rounded-xl shadow-steampunk relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-brass-gradient"></div>
                <div className="flex items-start gap-4">
                  <Sparkles className="text-brass-400 animate-glow flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-display font-bold text-brass-200 mb-2">Professor Pip's Guidance</h4>
                    <p className="font-body italic text-brass-100 leading-relaxed">
                      "Ah, my diligent apprentice! To begin your work today, I suggest you visit the Laboratory and start 
                      gathering the basic elements. Remember, all great alchemical works begin with the fundamental building blocks 
                      of creation itself!"
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Resources and Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="panel-steampunk p-6">
          <h2 className="text-2xl font-display font-bold text-steampunk-header mb-6 flex items-center gap-3">
            <FlaskConical className="text-brass-400" size={24} />
            Current Resources
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {Object.entries(gameState.elements)
              .filter(([_, amount]) => amount > 0)
              .sort(([_, a], [__, b]) => b - a)
              .slice(0, 6)
              .map(([element, amount]) => (
                <div key={element} className="element-card p-4 hover:shadow-glow">
                  <ElementDisplay element={element} amount={amount} small />
                </div>
              ))}
          </div>
          {Object.values(gameState.elements).every(amount => amount === 0) && (
            <div className="text-center py-8">
              <FlaskConical className="mx-auto text-brass-600/50 mb-3" size={48} />
              <p className="text-center text-brass-400 italic font-body">
                No elements gathered yet. Visit the Laboratory to begin your alchemical journey.
              </p>
            </div>
          )}
        </div>
        
        <GameStats />
      </div>

      {/* Progress Section */}
      <div className="panel-steampunk p-6">
        <h2 className="text-2xl font-display font-bold text-steampunk-header mb-6 flex items-center gap-3">
          <Sparkles className="text-brass-400 animate-glow" size={24} />
          Progress & Achievements
        </h2>
        <ProgressionChart />
      </div>
    </div>
  );
};