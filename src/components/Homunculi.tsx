import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { formatNumber } from '../utils/formatters';
import { Beaker, Plus, Users } from 'lucide-react';
import { HOMUNCULI } from '../data/homunculi';
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
    let color = 'text-red-400';
    if (efficiency >= 150) color = 'text-green-500';
    else if (efficiency >= 100) color = 'text-amber-400';
    else if (efficiency >= 50) color = 'text-amber-600';
    
    return <span className={color}>{efficiency}%</span>;
  };

  return (
    <div className="space-y-6">
      <div className="bg-amber-950/60 border border-amber-700/50 rounded-lg p-6 shadow-lg backdrop-blur-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-amber-200 font-serif tracking-wide flex items-center gap-3">
              <Users className="text-amber-300" />
              Homunculi Laboratory
            </h1>
            <p className="text-amber-100 mt-1">
              Create and manage your alchemical assistants
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-amber-700 hover:bg-amber-600 rounded-lg text-amber-100 font-medium flex items-center gap-2 transition-colors"
          >
            <Plus size={16} />
            Create Homunculus
          </button>
        </div>
      </div>

      {/* Homunculi Grid */}
      <div className="bg-amber-950/60 border border-amber-700/50 rounded-lg p-6 shadow-lg backdrop-blur-sm">
        <h2 className="text-2xl font-serif font-bold text-amber-200 mb-4">Your Workforce</h2>
        
        {gameState.homunculi.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gameState.homunculi.map((homunculus, index) => (
              <div 
                key={index}
                className="bg-amber-900/30 border border-amber-700/30 rounded-lg p-4 flex flex-col"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-amber-300 capitalize">
                      {homunculus.type} {index + 1}
                    </h3>
                    <p className="text-xs text-amber-400 mt-0.5 capitalize">
                      Level {homunculus.level} • {homunculus.type} Specialization
                    </p>
                  </div>
                  <div className="text-2xl">
                    {HOMUNCULI[homunculus.type].emoji}
                  </div>
                </div>

                <div className="mt-4">
                  {homunculus.assignment ? (
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-amber-300">Assigned to:</span>
                        <div className="flex items-center gap-2">
                          <span className="text-amber-200 capitalize">{homunculus.assignment}</span>
                          <span className="text-xl">{ELEMENTS[homunculus.assignment]?.emoji}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-amber-300">Efficiency:</span>
                        <span>{getEfficiencyDisplay(homunculus.efficiency)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-amber-300">Production:</span>
                        <span className="text-amber-200">+{formatNumber(homunculus.productionRate)}/sec</span>
                      </div>
                      <button
                        onClick={() => setSelectedHomunculus(index.toString())}
                        className="mt-2 px-3 py-1.5 bg-amber-800 hover:bg-amber-700 rounded text-sm text-amber-200 transition-colors"
                      >
                        Reassign
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setSelectedHomunculus(index.toString())}
                      className="w-full px-3 py-2 bg-amber-800 hover:bg-amber-700 rounded text-amber-200 transition-colors"
                    >
                      Assign Task
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Beaker className="mx-auto text-amber-700 mb-3" size={48} />
            <p className="text-amber-400 italic">
              You haven't created any homunculi yet. Create your first assistant to help with element generation!
            </p>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-amber-950 border border-amber-700 rounded-lg max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-2xl font-serif font-bold text-amber-200 mb-4">Create Homunculus</h3>
            
            <div className="space-y-4">
              {Object.entries(HOMUNCULI).map(([type, data]) => (
                <button 
                  key={type}
                  onClick={() => handleCreate(type)}
                  disabled={!canAffordHomunculus(type)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border ${
                    canAffordHomunculus(type)
                      ? 'bg-amber-900/50 border-amber-700 hover:bg-amber-800/70'
                      : 'bg-amber-950/50 border-amber-800/30 opacity-70 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{data.emoji}</div>
                    <div>
                      <div className="text-amber-200 font-serif capitalize">{type}</div>
                      <div className="text-xs text-amber-400/80">{data.description}</div>
                    </div>
                  </div>
                  <div className="text-amber-300 flex items-center gap-1">
                    {Object.entries(data.cost).map(([element, amount]) => (
                      <div key={element} className="flex items-center" title={`${element}: ${amount}`}>
                        <span className="text-sm mr-1">{amount}</span>
                        <span>{ELEMENTS[element]?.emoji}</span>
                      </div>
                    ))}
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-amber-900/70 hover:bg-amber-800 rounded-lg text-amber-100 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Modal */}
      {selectedHomunculus !== null && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-amber-950 border border-amber-700 rounded-lg max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-2xl font-serif font-bold text-amber-200 mb-4">Assign Homunculus</h3>
            
            <div className="space-y-4">
              {Object.entries(ELEMENTS)
                .filter(([key, data]) => data.tier === 1) // Only show basic elements
                .map(([element, data]) => (
                  <button 
                    key={element}
                    onClick={() => handleAssign(selectedHomunculus, element)}
                    className="w-full flex items-center justify-between p-3 rounded-lg border bg-amber-900/50 border-amber-700 hover:bg-amber-800/70"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{data.emoji}</div>
                      <div className="text-amber-200 font-serif capitalize">{element}</div>
                    </div>
                  </button>
                ))}
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedHomunculus(null)}
                className="px-4 py-2 bg-amber-900/70 hover:bg-amber-800 rounded-lg text-amber-100 transition-colors"
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