import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { ElementDisplay } from './ElementDisplay';
import { toast } from 'react-toastify';
import { formatNumber } from '../utils/formatters';
import { ELEMENTS, COMPOUNDS } from '../data/elements';
import { Beaker, FlaskConical, Zap, Droplets, Wind, Hammer, Sparkles } from 'lucide-react';

type AnimationStep = 'idle' | 'pre-transmute' | 'filling' | 'blooming';

export const Laboratory: React.FC = () => {
  const { gameState, actions } = useGame();
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const [animating, setAnimating] = useState<boolean>(false);
  const [animationStep, setAnimationStep] = useState<AnimationStep>('idle');
  const [fillProgress, setFillProgress] = useState<number>(0);
  const [transmutationResultCompound, setTransmutationResultCompound] = useState<string | null>(null);
  
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

    if (animating) return;

    // Check if player has enough elements before starting animation
    for (const element of selectedElements) {
      if ((gameState.elements[element] || 0) < 1) {
        toast.error(`Not enough ${element}!`);
        return;
      }
    }

    // Find the compound that would be created
    const sortedElements = selectedElements.sort();
    const compound = Object.entries(COMPOUNDS).find(([_, data]) => {
      const requiredElements = data.recipe.sort();
      return JSON.stringify(sortedElements) === JSON.stringify(requiredElements);
    });

    if (!compound) {
      toast.error('No known compound can be created with these elements.');
      return;
    }

    const [compoundName] = compound;
    setTransmutationResultCompound(compoundName);
    setAnimating(true);
    setAnimationStep('pre-transmute');

    // Pre-transmute phase (0.5s)
    setTimeout(() => {
      setAnimationStep('filling');
      
      // Filling animation (1.5s)
      const fillDuration = 1500;
      const fillInterval = 50;
      const fillSteps = fillDuration / fillInterval;
      let currentStep = 0;

      const fillTimer = setInterval(() => {
        currentStep++;
        const progress = (currentStep / fillSteps) * 100;
        setFillProgress(Math.min(progress, 100));

        if (currentStep >= fillSteps) {
          clearInterval(fillTimer);
          
          // Perform actual transmutation
          const result = actions.transmute(selectedElements);
          
          if (result.success) {
            // Play success sound effect (placeholder)
            // playSuccessSound();
            
            setAnimationStep('blooming');
            
            if (result.isNew) {
              toast.info("New discovery added to your grimoire!");
            }
            
            // Blooming phase (1s)
            setTimeout(() => {
              toast.success(`You've created ${result.compound}!`);
              
              // Reset all animation states
              setAnimating(false);
              setAnimationStep('idle');
              setFillProgress(0);
              setTransmutationResultCompound(null);
              setSelectedElements([]);
            }, 1000);
          } else {
            // Handle failure
            toast.error(result.message);
            setAnimating(false);
            setAnimationStep('idle');
            setFillProgress(0);
            setTransmutationResultCompound(null);
          }
        }
      }, fillInterval);
    }, 500);
  };

  const getElementIcon = (element: string) => {
    switch(element) {
      case 'fire': return <Zap className="text-red-500" />;
      case 'water': return <Droplets className="text-blue-500" />;
      case 'earth': return <Hammer className="text-amber-700" />;
      case 'air': return <Wind className="text-sky-300" />;
      default: return <FlaskConical className="text-purple-400" />;
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

  const renderCrucibleContent = () => {
    switch (animationStep) {
      case 'idle':
        return selectedElements.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-1">
            {selectedElements.map((element) => (
              <div key={element} className="text-3xl animate-bubble">
                {ELEMENTS[element]?.emoji}
              </div>
            ))}
          </div>
        ) : (
          <Beaker size={48} className="text-brass-500/50" />
        );

      case 'pre-transmute':
        return (
          <div className="flex flex-wrap justify-center gap-1">
            {selectedElements.map((element) => (
              <div key={element} className="text-3xl animate-pulse">
                {ELEMENTS[element]?.emoji}
              </div>
            ))}
          </div>
        );

      case 'filling':
        const compoundData = transmutationResultCompound ? COMPOUNDS[transmutationResultCompound] : null;
        return (
          <div className="relative w-20 h-24">
            {/* Flask container */}
            <div className="absolute inset-0 flex items-end justify-center">
              <div className="relative w-16 h-20 border-4 border-brass-400 rounded-b-full bg-transparent overflow-hidden">
                {/* Liquid fill */}
                <div 
                  className="flask-liquid absolute bottom-0 left-0 right-0 transition-all duration-100 ease-out"
                  style={{ 
                    height: `${fillProgress}%`,
                    backgroundColor: compoundData?.color || '#fcd34d',
                  }}
                />
              </div>
            </div>
            {/* Flask neck */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-6 border-4 border-t-0 border-brass-400 bg-transparent" />
          </div>
        );

      case 'blooming':
        const bloomCompoundData = transmutationResultCompound ? COMPOUNDS[transmutationResultCompound] : null;
        return (
          <div className="relative w-20 h-24">
            {/* Filled flask */}
            <div className="absolute inset-0 flex items-end justify-center">
              <div className="relative w-16 h-20 border-4 border-brass-400 rounded-b-full bg-transparent overflow-hidden">
                <div 
                  className="absolute bottom-0 left-0 right-0 h-full"
                  style={{ 
                    backgroundColor: bloomCompoundData?.color || '#fcd34d',
                  }}
                />
              </div>
            </div>
            {/* Flask neck */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-6 border-4 border-t-0 border-brass-400 bg-transparent" />
            {/* Blooming flower */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-4xl flask-flower animate-bloom-flower">
              {bloomCompoundData?.flowerEmoji || bloomCompoundData?.emoji || '🌸'}
            </div>
          </div>
        );

      default:
        return <Beaker size={48} className="text-brass-500/50" />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Element Generation Section */}
        <div className="panel-glass p-8 md:col-span-2">
          <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3">
            <Sparkles className="text-electric-400 animate-float" />
            Quantum Generators
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {baseElements.map((element) => {
              const elementData = ELEMENTS[element];
              const rate = gameState.generationRates[element];
              const currentAmount = gameState.elements[element] || 0;
              
              return (
                <button 
                  key={element}
                  onClick={() => actions.gatherElement(element)}
                  className="element-card-modern p-6 flex flex-col items-center justify-center group"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {elementData.emoji}
                  </div>
                  <div className="font-display capitalize text-xl text-white mb-2">{element}</div>
                  <div className="text-lg text-neon-300 font-semibold">{formatNumber(currentAmount)}</div>
                  <div className="text-sm text-gray-400 mt-2 glass-morphism px-3 py-1 rounded-full">
                    +{formatNumber(rate)}/sec
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quantum Reactor Section */}
        <div className="panel-glass p-6">
          <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-2">
            <FlaskConical className="text-neon-400" />
            Quantum Reactor
          </h2>
          
          <div className="flex flex-col items-center">
            <div className={`relative w-36 h-36 glass-morphism border border-neon-400/50 rounded-full flex items-center justify-center mb-6 ${animating ? 'animate-neon-pulse' : ''}`}>
              {renderCrucibleContent()}
              
              {animating && animationStep !== 'filling' && animationStep !== 'blooming' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-brass-400/20 rounded-full animate-ping"></div>
                  <div className="absolute w-3/4 h-3/4 bg-brass-300/30 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                </div>
              )}
              
              {/* Decorative brass elements */}
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-brass-gradient rounded-full shadow-brass"></div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-brass-gradient rounded-full shadow-brass"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-brass-gradient rounded-full shadow-brass"></div>
              <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-brass-gradient rounded-full shadow-brass"></div>
            </div>
            
            <button
              onClick={handleTransmute}
              disabled={selectedElements.length < 2 || animating}
              className={`btn-steampunk text-lg font-display tracking-wide ${animating ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {animating ? 'Transmuting...' : 'Transmute Elements'}
            </button>
            
            {selectedElements.length > 0 && !animating && (
              <button
                onClick={() => setSelectedElements([])}
                className="mt-3 text-brass-400 text-sm hover:text-brass-300 font-body underline transition-colors"
              >
                Clear Selection
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Available Elements Section */}
      <div className="panel-steampunk p-6">
        <h2 className="text-2xl font-display font-bold text-steampunk-header mb-6 flex items-center gap-3">
          <FlaskConical className="text-brass-400" />
          Laboratory Inventory
        </h2>
        
        {availableElements.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {availableElements.map((element) => (
              <div 
                key={element} 
                onClick={() => handleElementClick(element)}
                className={`element-card cursor-pointer transition-all transform p-4 ${
                  selectedElements.includes(element) 
                    ? 'selected scale-105 shadow-glow' 
                    : 'hover:scale-105'
                }`}
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
          <div className="text-center py-12">
            <FlaskConical className="mx-auto text-brass-600/50 mb-4" size={64} />
            <p className="text-brass-400 italic font-body text-lg">
              No elements available. Start by gathering the basic elements from the crucibles above!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};