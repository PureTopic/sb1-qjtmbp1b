import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { ElementDisplay } from './ElementDisplay';
import { toast } from 'react-toastify';
import { formatNumber } from '../utils/formatters';
import { ELEMENTS, COMPOUNDS } from '../data/elements';
import { Beaker, Flask, Zap, Droplets, Wind, Hammer } from 'lucide-react';

export const Laboratory: React.FC = () => {
  const { gameState, actions } = useGame();
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const [animating, setAnimating] = useState<boolean>(false);
  
  // Generate elements at regular intervals
  useEffect(() => {
    const intervalId = setInterval(() => {
      actions.generateElements();
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, [actions]);

  const handleElementClick = (element: string) => {
    // Toggle element selection
    if (selectedElements.includes(element)) {
      setSelectedElements(selectedElements.filter(e => e !== element));
    } else {
      // Limit to 3 elements for transmutation
      if (selectedElements.length < 3) {
        setSelectedElements([...selectedElements, element]);
      } else {
        toast.warning("You can only select up to 3 elements for transmutation!");
      }
    }
  };

  const handleTransmute = () => {
    if (selectedElements.length < 2) {
      toast.warning("Select at least 2 elements to transmute!");
      return;
    }

    setAnimating(true);
    
    setTimeout(() => {
      const result = actions.transmute(selectedElements);
      
      if (result.success) {
        toast.success(`You've created ${result.compound}!`);
        if (result.isNew) {
          toast.info("New discovery added to your grimoire!");
        }
        setSelectedElements([]);
      } else {
        toast.error(result.message);
      }
      
      setAnimating(false);
    }, 1500);
  };

  const getElementIcon = (element: string) => {
    switch(element) {
      case 'fire': return <Zap className="text-red-500" />;
      case 'water': return <Droplets className="text-blue-500" />;
      case 'earth': return <Hammer className="text-amber-700" />;
      case 'air': return <Wind className="text-sky-300" />;
      default: return <Flask className="text-purple-400" />;
    }
  };

  const baseElements = Object.entries(ELEMENTS)
    .filter(([_, elem]) => elem.tier === 1)
    .map(([key]) => key);
  
  const availableElements = Object.entries(gameState.elements)
    .filter(([_, amount]) => amount > 0)
    .map(([element]) => element)
    .sort((a, b) => {
      // Sort by base elements first, then by name
      const aIsBase = baseElements.includes(a);
      const bIsBase = baseElements.includes(b);
      if (aIsBase && !bIsBase) return -1;
      if (!aIsBase && bIsBase) return 1;
      return a.localeCompare(b);
    });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Element Generation Section */}
        <div className="bg-amber-950/60 border border-amber-700/50 rounded-lg p-6 shadow-lg backdrop-blur-sm md:col-span-2">
          <h2 className="text-2xl font-serif font-bold text-amber-200 mb-4">Element Generation</h2>
          <div className="grid grid-cols-2 gap-4">
            {baseElements.map((element) => {
              const elementData = ELEMENTS[element];
              const rate = gameState.generationRates[element];
              const currentAmount = gameState.elements[element] || 0;
              
              return (
                <button 
                  key={element}
                  onClick={() => actions.gatherElement(element)}
                  className="flex flex-col items-center justify-center bg-amber-900/40 hover:bg-amber-800/50 border border-amber-700/30 rounded-lg p-4 transition-colors"
                >
                  <div className="text-3xl mb-2">{elementData.emoji}</div>
                  <div className="font-serif capitalize text-lg text-amber-200">{element}</div>
                  <div className="text-sm text-amber-400">{formatNumber(currentAmount)}</div>
                  <div className="text-xs text-amber-300/70 mt-1">
                    +{formatNumber(rate)}/sec
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Transmutation Crucible Section */}
        <div className="bg-amber-950/60 border border-amber-700/50 rounded-lg p-6 shadow-lg backdrop-blur-sm">
          <h2 className="text-2xl font-serif font-bold text-amber-200 mb-4">Transmutation Crucible</h2>
          
          <div className="flex flex-col items-center">
            <div className={`relative w-32 h-32 bg-amber-900/40 border-4 border-amber-700/80 rounded-full flex items-center justify-center mb-4 ${animating ? 'animate-pulse' : ''}`}>
              {selectedElements.length > 0 ? (
                <div className="flex flex-wrap justify-center">
                  {selectedElements.map((element) => (
                    <div key={element} className="text-2xl m-1">
                      {ELEMENTS[element]?.emoji}
                    </div>
                  ))}
                </div>
              ) : (
                <Beaker size={40} className="text-amber-500/50" />
              )}
              
              {animating && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-amber-400/20 rounded-full animate-ping"></div>
                </div>
              )}
            </div>
            
            <button
              onClick={handleTransmute}
              disabled={selectedElements.length < 2 || animating}
              className={`px-6 py-2 bg-amber-700 hover:bg-amber-600 disabled:bg-amber-900/40 disabled:text-amber-700 rounded-lg shadow-lg transition-colors text-amber-100 font-serif ${animating ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Transmute
            </button>
            
            {selectedElements.length > 0 && (
              <button
                onClick={() => setSelectedElements([])}
                className="mt-2 text-amber-400 text-sm hover:text-amber-300"
              >
                Clear Selection
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Available Elements Section */}
      <div className="bg-amber-950/60 border border-amber-700/50 rounded-lg p-6 shadow-lg backdrop-blur-sm">
        <h2 className="text-2xl font-serif font-bold text-amber-200 mb-4">Available Elements</h2>
        
        {availableElements.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {availableElements.map((element) => (
              <div 
                key={element} 
                onClick={() => handleElementClick(element)}
                className={`cursor-pointer transition-all transform ${
                  selectedElements.includes(element) 
                    ? 'bg-amber-700/60 scale-105 border-amber-500' 
                    : 'bg-amber-900/40 hover:bg-amber-800/50 border-amber-700/30'
                } border rounded-lg p-4 flex flex-col items-center`}
              >
                <ElementDisplay 
                  element={element} 
                  amount={gameState.elements[element]} 
                  selected={selectedElements.includes(element)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-amber-400 italic">
              No elements available. Start by gathering the basic elements!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};