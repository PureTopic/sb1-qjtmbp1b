import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { formatNumber } from '../utils/formatters';
import { Beaker, Plus, Users, Settings, Zap } from 'lucide-react';
import { HOMUNCULI } from '../data/homunculi';
import { ELEMENTS } from '../data/elements';
import { ElementDisplay } from './ElementDisplay';

export const Homunculi: React.FC = () => {
  const { gameState, actions } = useGame();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedHomunculus, setSelectedHomunculus] = useState<string | null>(null);

  const handleCreate = (type: string) => {
    const result = actions.createHomunculus(type);
    setShowCreateModal(false);
  };

  const handleAssign = (homunculus: string, element: string) => {
    actions.assignHomunculus(homunculus, element);
    setSelectedHomunculus(null);
  };

  const canAffordHomunculus = (type: string) => {
    const homunculus = HOMUNCULI[type];
    return Object.entries(homunculus.cost).every(([element, amount]) => 
      gameState.elements[element] >= amount
    );
  };

  // Create efficiency percentage display
  const getEfficiencyDisplay = (efficiency: number) => {
    let colorClass = 'text-red-400';
    if (efficiency >= 150) colorClass = 'text-green-400';
    else if (efficiency >= 100) colorClass = 'text-brass-300';
    else if (efficiency >= 50) colorClass = 'text-amber-500';
    
    return <span className={`${colorClass} font-semibold`}>{efficiency}%</span>;
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="panel-steampunk p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Users className="text-brass-300 animate-glow" size={48} />
              <Zap className="absolute -top-2 -right-2 text-brass-400" size={20} />
            </div>
            <div>
              <h1 className="text-4xl font-display font-bold text-steampunk-header tracking-wide mb-2">
                Homunculi Laboratory
              </h1>
              <p className="text-steampunk-body text-lg opacity-90">
                Create and manage your mystical alchemical assistants
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-steampunk flex items-center gap-3 text-lg font-display tracking-wide"
          >
            <Plus size={20} />
            Create Homunculus
          </button>
        </div>
      </div>

      {/* Homunculi Grid */}
      <div className="panel-steampunk p-6">
        <h2 className="text-2xl font-display font-bold text-steampunk-header mb-6 flex items-center gap-3">
          <Settings className="text-brass-400" size={24} />
          Your Workforce
        </h2>
        
        {gameState.homunculi.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gameState.homunculi.map((homunculus, index) => (
              <div 
                key={index}
                className="element-card p-6 flex flex-col hover:shadow-glow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-display font-bold text-brass-300 capitalize mb-1">
                      {homunculus.type} #{index + 1}
                    </h3>
                    <p className="text-sm text-brass-400/80 font-body capitalize">
                      Level {homunculus.level} • {homunculus.type} Specialization
                    </p>
                  </div>
                  <div className="text-4xl animate-bubble">
                    {HOMUNCULI[homunculus.type].emoji}
                  </div>
                </div>

                <div className="flex-1">
                  {homunculus.assignment ? (
                    <div className="space-y-3">
                      <div className="bg-gradient-to-r from-amber-900/40 to-amber-800/30 p-3 rounded-lg border border-brass-600/30">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-brass-300 font-body">Assigned to:</span>
                          <div className="flex items-center gap-2">
                            <span className="text-brass-200 capitalize font-semibold">{homunculus.assignment}</span>
                            <span className="text-2xl">{ELEMENTS[homunculus.assignment]?.emoji}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-brass-300 font-body">Efficiency:</span>
                          <span>{getEfficiencyDisplay(homunculus.efficiency)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-brass-300 font-body">Production:</span>
                          <span className="text-brass-200 font-semibold">+{formatNumber(homunculus.productionRate)}/sec</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => setSelectedHomunculus(index.toString())}
                        className="w-full px-4 py-2 bg-gradient-to-r from-amber-800/60 to-amber-700/40 hover:from-amber-700/70 hover:to-amber-600/50 rounded-lg text-brass-200 font-body font-medium transition-all duration-300 border border-amber-600/40 hover:border-amber-500/60"
                      >
                        Reassign Task
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setSelectedHomunculus(index.toString())}
                      className="w-full px-4 py-3 btn-steampunk font-body"
                    >
                      Assign Task
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Beaker className="mx-auto text-brass-600/50 mb-4 animate-pulse" size={64} />
            <p className="text-brass-400 italic font-body text-lg mb-2">
              You haven't created any homunculi yet.
            </p>
            <p className="text-brass-500/80 font-body">
              Create your first mystical assistant to help with element generation!
            </p>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="grimoire-book max-w-md w-full p-8 shadow-2xl">
            <h3 className="text-3xl font-display font-bold text-steampunk-header mb-6 text-center">Create Homunculus</h3>
            
            <div className="space-y-4">
              {Object.entries(HOMUNCULI).map(([type, data]) => (
                <button 
                  key={type}
                  onClick={() => handleCreate(type)}
                  disabled={!canAffordHomunculus(type)}
                  className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all duration-300 ${
                    canAffordHomunculus(type)
                      ? 'element-card hover:shadow-glow'
                      : 'bg-amber-950/30 border-amber-800/20 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{data.emoji}</div>
                    <div className="text-left">
                      <div className="text-brass-200 font-display capitalize text-lg">{type}</div>
                      <div className="text-sm text-brass-400/80 font-body">{data.description}</div>
                    </div>
                  </div>
                  <div className="text-brass-300 flex items-center gap-2">
                    {Object.entries(data.cost).map(([element, amount]) => (
                      <div key={element} className="flex items-center bg-amber-900/40 px-2 py-1 rounded-full" title={`${element}: ${amount}`}>
                        <span className="text-sm mr-1 font-semibold">{amount}</span>
                        <span className="text-lg">{ELEMENTS[element]?.emoji}</span>
                      </div>
                    ))}
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-2 bg-gradient-to-r from-amber-900/70 to-amber-800/50 hover:from-amber-800/80 hover:to-amber-700/60 rounded-lg text-brass-200 font-body font-medium transition-all duration-300 border border-amber-600/40"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Modal */}
      {selectedHomunculus !== null && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="grimoire-book max-w-md w-full p-8 shadow-2xl">
            <h3 className="text-3xl font-display font-bold text-steampunk-header mb-6 text-center">Assign Homunculus</h3>
            
            <div className="space-y-3">
              {Object.entries(ELEMENTS)
                .filter(([key, data]) => data.tier === 1) // Only show basic elements
                .map(([element, data]) => (
                  <button 
                    key={element}
                    onClick={() => handleAssign(selectedHomunculus, element)}
                    className="w-full flex items-center justify-between p-4 element-card hover:shadow-glow"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{data.emoji}</div>
                      <div className="text-brass-200 font-display capitalize text-lg">{element}</div>
                    </div>
                  </button>
                ))}
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setSelectedHomunculus(null)}
                className="px-6 py-2 bg-gradient-to-r from-amber-900/70 to-amber-800/50 hover:from-amber-800/80 hover:to-amber-700/60 rounded-lg text-brass-200 font-body font-medium transition-all duration-300 border border-amber-600/40"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};