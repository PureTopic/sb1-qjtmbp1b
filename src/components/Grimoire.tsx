import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { COMPOUNDS, ELEMENTS } from '../data/elements';
import { formatNumber } from '../utils/formatters';
import { Book, Lock, Sparkles } from 'lucide-react';

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
      <div className="bg-amber-950/60 border border-amber-700/50 rounded-lg p-6 shadow-lg backdrop-blur-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-amber-200 font-serif tracking-wide flex items-center gap-3">
              <Book className="text-amber-300" />
              Alchemist's Grimoire
            </h1>
            <p className="text-amber-100 mt-1">
              Your repository of alchemical knowledge and discoveries
            </p>
          </div>

          <div className="bg-amber-900/40 px-4 py-2 rounded-lg">
            <p className="text-sm text-amber-300">Discoveries</p>
            <p className="text-xl font-bold text-amber-100">{discoveredCompounds} / {totalCompounds}</p>
            <div className="w-full bg-amber-950 rounded-full h-2 mt-1">
              <div 
                className="bg-gradient-to-r from-amber-600 to-amber-400 h-2 rounded-full" 
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-950/60 border border-amber-700/50 rounded-lg p-6 shadow-lg backdrop-blur-sm">
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-amber-600 text-amber-100' 
                  : 'bg-amber-900/40 text-amber-400 hover:bg-amber-800/60'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {filteredDiscoveries.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredDiscoveries.map((discovery) => {
              const elementData = ELEMENTS[discovery] || COMPOUNDS[discovery];
              return (
                <div
                  key={discovery}
                  className="bg-amber-900/40 border border-amber-700/30 rounded-lg p-4 flex flex-col items-center"
                >
                  <div className="text-3xl mb-2">{elementData.emoji}</div>
                  <div className="font-serif capitalize text-center text-lg text-amber-200">{discovery}</div>
                  <div className="text-xs text-amber-400 mt-1">{elementData.category}</div>
                  {elementData.tier && (
                    <div className="text-xs text-amber-300/70 mt-1">
                      Tier {elementData.tier}
                    </div>
                  )}
                  {elementData.formula && (
                    <div className="mt-2 text-xs text-amber-300/70">
                      {elementData.formula}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Lock className="mx-auto text-amber-700 mb-3" size={48} />
            <p className="text-amber-400 italic">
              No discoveries in this category yet. Continue experimenting in the Laboratory!
            </p>
          </div>
        )}
      </div>

      <div className="bg-amber-950/60 border border-amber-700/50 rounded-lg p-6 shadow-lg backdrop-blur-sm">
        <h2 className="text-2xl font-serif font-bold text-amber-200 mb-4 flex items-center gap-2">
          <Sparkles className="text-amber-300" size={20} />
          Alchemical Masteries
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {gameState.masteries.map((mastery, index) => (
            <div 
              key={index}
              className="bg-amber-900/30 border border-amber-700/30 rounded-lg p-4"
            >
              <h3 className="text-lg font-serif font-bold text-amber-300">{mastery.name}</h3>
              <p className="text-sm text-amber-100 mt-1">{mastery.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="text-xs text-amber-400">Level {mastery.level}</div>
                <div className="flex-1 h-1 bg-amber-950 rounded-full">
                  <div 
                    className="h-1 bg-amber-500 rounded-full" 
                    style={{ width: `${mastery.progress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-amber-400">{mastery.progress}%</div>
              </div>
            </div>
          ))}
          
          {gameState.masteries.length === 0 && (
            <div className="col-span-full text-center py-6">
              <p className="text-amber-400 italic">
                You haven't unlocked any masteries yet. Continue your alchemical journey to discover them!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};