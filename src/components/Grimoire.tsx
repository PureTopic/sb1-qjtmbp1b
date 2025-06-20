import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { COMPOUNDS, ELEMENTS } from '../data/elements';
import { formatNumber } from '../utils/formatters';
import { Book, Lock, Sparkles, Scroll, Star } from 'lucide-react';

export const Grimoire: React.FC = () => {
  const { gameState } = useGame();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter discoveries based on selected category
  const filteredDiscoveries = selectedCategory === 'all'
    ? gameState.discoveries
    : gameState.discoveries.filter(discovery => {
        const element = ELEMENTS[discovery] || COMPOUNDS[discovery];
        return element?.category === selectedCategory;
      });

  // Calculate completion percentage
  const totalCompounds = Object.keys(COMPOUNDS).length;
  const discoveredCompounds = gameState.discoveries.filter(d => COMPOUNDS[d]).length;
  const completionPercentage = (discoveredCompounds / totalCompounds) * 100;

  // Get all available categories
  const categories = ['all', ...Array.from(new Set(
    Object.values(COMPOUNDS).map(compound => compound.category)
  ))];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="grimoire-book p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Book className="text-brass-300 animate-glow" size={48} />
              <Scroll className="absolute -top-2 -right-2 text-brass-400" size={20} />
            </div>
            <div>
              <h1 className="text-4xl font-display font-bold text-steampunk-header tracking-wide mb-2">
                The Alchemist's Grimoire
              </h1>
              <p className="text-steampunk-body text-lg opacity-90">
                Your repository of alchemical knowledge and mystical discoveries
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-900/60 to-emerald-800/40 px-6 py-4 rounded-xl border-2 border-emerald-600/50 shadow-steampunk">
            <div className="text-center">
              <p className="text-sm text-emerald-300 font-body mb-1">Discoveries Catalogued</p>
              <p className="text-3xl font-display font-bold text-emerald-100">{discoveredCompounds} / {totalCompounds}</p>
              <div className="w-32 bg-emerald-950/60 rounded-full h-3 mt-2 border border-emerald-700/50">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-full shadow-glow transition-all duration-500" 
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-emerald-400/80 mt-1">{completionPercentage.toFixed(1)}% Complete</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Section */}
      <div className="panel-steampunk p-6">
        <h3 className="text-xl font-display font-bold text-steampunk-header mb-4 flex items-center gap-2">
          <Star className="text-brass-400" size={20} />
          Knowledge Categories
        </h3>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'btn-steampunk transform scale-105' 
                  : 'bg-gradient-to-r from-amber-900/40 to-amber-800/30 text-brass-300 border border-brass-600/30 hover:border-brass-500/50 hover:text-brass-200 hover:shadow-inner-glow'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1).replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Discoveries Grid */}
      <div className="panel-steampunk p-6">
        <h3 className="text-xl font-display font-bold text-steampunk-header mb-6 flex items-center gap-2">
          <Sparkles className="text-brass-400 animate-glow" size={20} />
          Discovered Compounds
        </h3>
        
        {filteredDiscoveries.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredDiscoveries.map((discovery) => {
              const elementData = ELEMENTS[discovery] || COMPOUNDS[discovery];
              return (
                <div
                  key={discovery}
                  className="element-card p-5 flex flex-col items-center group hover:shadow-glow"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {elementData.emoji}
                  </div>
                  <div className="font-display capitalize text-center text-lg text-brass-200 mb-2">
                    {discovery}
                  </div>
                  <div className="text-xs text-brass-400/80 bg-amber-900/30 px-2 py-1 rounded-full mb-2">
                    {elementData.category.replace('_', ' ')}
                  </div>
                  {elementData.tier && (
                    <div className="text-xs text-brass-300/70 bg-brass-800/30 px-2 py-1 rounded-full mb-2">
                      Tier {elementData.tier}
                    </div>
                  )}
                  {elementData.formula && (
                    <div className="text-xs text-center text-amber-300/80 font-body bg-amber-950/40 px-2 py-1 rounded border border-amber-700/30">
                      {elementData.formula}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <Lock className="mx-auto text-brass-600/50 mb-4 animate-pulse" size={64} />
            <p className="text-brass-400 italic font-body text-lg mb-2">
              No discoveries in this category yet.
            </p>
            <p className="text-brass-500/80 font-body">
              Continue experimenting in the Laboratory to unlock new knowledge!
            </p>
          </div>
        )}
      </div>

      {/* Masteries Section */}
      <div className="panel-steampunk p-6">
        <h2 className="text-2xl font-display font-bold text-steampunk-header mb-6 flex items-center gap-3">
          <Sparkles className="text-brass-300 animate-glow" size={24} />
          Alchemical Masteries
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {gameState.masteries.map((mastery, index) => (
            <div 
              key={index}
              className="element-card p-5 hover:shadow-glow"
            >
              <h3 className="text-lg font-display font-bold text-brass-300 mb-2">{mastery.name}</h3>
              <p className="text-sm text-steampunk-body mb-3">{mastery.description}</p>
              <div className="flex items-center gap-3">
                <div className="text-xs text-brass-400 bg-brass-900/30 px-2 py-1 rounded-full">
                  Level {mastery.level}
                </div>
                <div className="flex-1 h-2 bg-amber-950/60 rounded-full border border-amber-800/50">
                  <div 
                    className="h-full bg-brass-gradient rounded-full shadow-glow transition-all duration-500" 
                    style={{ width: `${mastery.progress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-brass-400 font-semibold">{mastery.progress}%</div>
              </div>
            </div>
          ))}
          
          {gameState.masteries.length === 0 && (
            <div className="col-span-full text-center py-12">
              <Star className="mx-auto text-brass-600/50 mb-4" size={48} />
              <p className="text-brass-400 italic font-body text-lg">
                You haven't unlocked any masteries yet. Continue your alchemical journey to discover them!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};