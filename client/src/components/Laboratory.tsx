import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { ElementDisplay } from './ElementDisplay';
import { toast } from 'react-toastify';
import { formatNumber } from '../utils/formatters';
import { ELEMENTS, COMPOUNDS } from '../data/elements';
import { Beaker, FlaskConical, Zap, Droplets, Wind, Hammer, Sparkles, TrendingUp, Flame } from 'lucide-react';

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

  const handleUpgradeExtractor = (element: string) => {
    const result = actions.upgradeExtractor(element);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const handleCalcinateElement = (element: string) => {
    const result = actions.calcinateElement(element);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.warning(result.message);
    }
  };

  const canCalcinate = (element: string) => {
    const extractorLevel = gameState.extractorLevels[element] || 1;
    const totalProduced = gameState.totalProduced[element] || 0;
    const calcinationCount = gameState.calcinationCounts[element] || 0;
    
    const levelRequirement = 10 + (calcinationCount * 5);
    const productionRequirement = 1000 * Math.pow(2, calcinationCount);
    
    return extractorLevel >= levelRequirement && totalProduced >= productionRequirement;
  };

  const getUpgradeCost = (element: string) => {
    const currentLevel = gameState.extractorLevels[element] || 1;
    return Math.floor(10 * Math.pow(1.5, currentLevel - 1));
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
      {/* Alchemical Energy Display */}
      <div className="panel-glass p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="text-electric-400 animate-float" size={24} />
            <h2 className="text-xl font-display font-bold text-white">Alchemical Energy</h2>
          </div>
          <div className="text-2xl font-display font-bold text-electric-400">
            {formatNumber(gameState.alchemicalEnergy)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Element Generation Section */}
        <div className="panel-glass p-8 md:col-span-2">
          <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3">
            <Sparkles className="text-electric-400 animate-float" />
            Quantum Generators
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {baseElements.map((element) => {
              const elementData = ELEMENTS[element];
              const rate = gameState.generationRates[element];
              const currentAmount = gameState.elements[element] || 0;
              const extractorLevel = gameState.extractorLevels[element] || 1;
              const purityBonus = gameState.calcinatedPurityBonuses[element] || 1.0;
              const calcinationCount = gameState.calcinationCounts[element] || 0;
              const totalProduced = gameState.totalProduced[element] || 0;
              const upgradeCost = getUpgradeCost(element);
              const canAffordUpgrade = gameState.alchemicalEnergy >= upgradeCost;
              
              return (
                <div key={element} className="element-card-modern p-6 space-y-4">
                  {/* Element Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{elementData.emoji}</div>
                      <div>
                        <div className="font-display capitalize text-xl text-white">{element}</div>
                        <div className="text-sm text-gray-400">Level {extractorLevel}</div>
                      </div>
                    </div>
                    {calcinationCount > 0 && (
                      <div className="flex items-center gap-1 bg-brass-gradient px-2 py-1 rounded-full">
                        <Flame size={12} />
                        <span className="text-xs font-bold text-white">{calcinationCount}</span>
                      </div>
                    )}
                  </div>

                  {/* Production Stats */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Current:</span>
                      <span className="text-lg text-neon-300 font-semibold">{formatNumber(currentAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Rate:</span>
                      <span className="text-sm text-gray-300">+{formatNumber(rate * extractorLevel * purityBonus)}/sec</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Total Produced:</span>
                      <span className="text-sm text-gray-300">{formatNumber(totalProduced)}</span>
                    </div>
                    {purityBonus > 1.0 && (
                      <div className="flex justify-between">
                        <span className="text-sm text-brass-400">Purity Bonus:</span>
                        <span className="text-sm text-brass-300">+{Math.round((purityBonus - 1) * 100)}%</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => actions.gatherElement(element)}
                        className="flex-1 btn-sleek text-sm py-2"
                      >
                        Gather
                      </button>
                      <button
                        onClick={() => handleUpgradeExtractor(element)}
                        disabled={!canAffordUpgrade}
                        className={`flex-1 text-sm py-2 px-3 rounded-lg transition-all ${
                          canAffordUpgrade 
                            ? 'bg-electric-gradient hover:shadow-electric text-white' 
                            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        Upgrade ({upgradeCost})
                      </button>
                    </div>
                    
                    <button
                      onClick={() => handleCalcinateElement(element)}
                      disabled={!canCalcinate(element)}
                      className={`w-full text-sm py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
                        canCalcinate(element)
                          ? 'bg-brass-gradient hover:shadow-glow text-white font-semibold'
                          : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <Flame size={16} />
                      Calcinate {element.charAt(0).toUpperCase() + element.slice(1)}
                    </button>
                  </div>
                </div>
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
              No elements available. Start by gathering the basic elements from the generators above!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};