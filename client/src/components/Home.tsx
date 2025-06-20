import React from 'react';
import { useGame } from '../context/GameContext';
import { formatNumber } from '../utils/formatters';
import { ElementDisplay } from './ElementDisplay';
import { GameStats } from './GameStats';
import { ProfessorPip } from './ProfessorPip';
import { ProgressionChart } from './ProgressionChart';
import { Sparkles, FlaskConical, Flame, TrendingUp } from 'lucide-react';

export const Home: React.FC = () => {
  const { gameState, actions } = useGame();
  
  // Calculate total calcinations for display
  const totalCalcinations = Object.values(gameState.calcinationCounts).reduce((sum, count) => sum + count, 0);
  
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="panel-glass p-8">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="w-full md:w-1/3">
            <ProfessorPip />
          </div>
          
          <div className="w-full md:w-2/3 space-y-6">
            <div>
              <h1 className="text-4xl font-display font-bold text-white tracking-wide mb-3 flex items-center gap-3">
                <FlaskConical className="text-neon-400 animate-neon-pulse" size={40} />
                The Soulforge Alchemist
              </h1>
              <div className="h-1 w-32 bg-neon-gradient rounded-full mb-4"></div>
            </div>
            
            <p className="text-gray-200 text-lg leading-relaxed">
              Welcome to your quantum transmutation laboratory! Harness the power of molecular manipulation 
              to discover new compounds, automate processes with AI assistants, and unlock the secrets 
              of advanced alchemical science.
            </p>
            
            {gameState.tutorialProgress < 3 && (
              <div className="glass-morphism p-6 rounded-2xl relative overflow-hidden border border-electric-400/30">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-electric-gradient"></div>
                <div className="flex items-start gap-4">
                  <Sparkles className="text-electric-400 animate-float flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-display font-bold text-white mb-2">AI Assistant Guidance</h4>
                    <p className="font-body italic text-gray-300 leading-relaxed">
                      "System initialized! Begin by accessing the Laboratory interface to collect base elements. 
                      Upgrade your extractors and perform Calcination to unlock permanent bonuses for enhanced production."
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progression Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="panel-glass p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-electric-400 text-sm font-body mb-1 flex items-center gap-2">
                <Sparkles size={16} />
                Alchemical Energy
              </div>
              <div className="text-2xl font-display font-bold text-electric-100">
                {formatNumber(gameState.alchemicalEnergy)}
              </div>
            </div>
            <div className="text-3xl opacity-20">⚡</div>
          </div>
        </div>

        <div className="panel-glass p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-brass-400 text-sm font-body mb-1 flex items-center gap-2">
                <Flame size={16} />
                Calcinations
              </div>
              <div className="text-2xl font-display font-bold text-brass-100">
                {totalCalcinations}
              </div>
            </div>
            <div className="text-3xl opacity-20">🔥</div>
          </div>
        </div>

        <div className="panel-glass p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-neon-400 text-sm font-body mb-1 flex items-center gap-2">
                <TrendingUp size={16} />
                Discoveries
              </div>
              <div className="text-2xl font-display font-bold text-neon-100">
                {gameState.discoveries.length}
              </div>
            </div>
            <div className="text-3xl opacity-20">🔍</div>
          </div>
        </div>

        <div className="panel-glass p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-purple-400 text-sm font-body mb-1 flex items-center gap-2">
                <FlaskConical size={16} />
                Homunculi
              </div>
              <div className="text-2xl font-display font-bold text-purple-100">
                {gameState.homunculi.length}
              </div>
            </div>
            <div className="text-3xl opacity-20">🧙‍♂️</div>
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

      {/* Calcination Status */}
      {totalCalcinations > 0 && (
        <div className="panel-steampunk p-6">
          <h2 className="text-2xl font-display font-bold text-steampunk-header mb-6 flex items-center gap-3">
            <Flame className="text-brass-400 animate-glow" size={24} />
            Calcination Mastery
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(gameState.calcinationCounts)
              .filter(([_, count]) => count > 0)
              .map(([element, count]) => {
                const purityBonus = gameState.calcinatedPurityBonuses[element] || 1.0;
                const bonusPercent = Math.round((purityBonus - 1) * 100);
                
                return (
                  <div key={element} className="element-card p-4 hover:shadow-glow">
                    <div className="text-center">
                      <div className="text-3xl mb-2">{ELEMENTS[element]?.emoji}</div>
                      <div className="font-display capitalize text-lg text-brass-200 mb-1">{element}</div>
                      <div className="text-sm text-brass-400 mb-1">Calcinations: {count}</div>
                      <div className="text-sm text-brass-300 font-semibold">+{bonusPercent}% Production</div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

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