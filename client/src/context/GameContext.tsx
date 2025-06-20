import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { ELEMENTS, COMPOUNDS } from '../data/elements';

export interface GameState {
  elements: Record<string, number>;
  discoveries: string[];
  generationRates: Record<string, number>;
  tutorialProgress: number;
  masteries: Array<{
    name: string;
    description: string;
    level: number;
    progress: number;
  }>;
  homunculi: Array<{
    type: string;
    level: number;
    assignment: string | null;
    efficiency: number;
    productionRate: number;
  }>;
  // New Calcination properties
  calcinationCounts: Record<string, number>;
  calcinatedPurityBonuses: Record<string, number>;
  extractorLevels: Record<string, number>;
  totalProduced: Record<string, number>;
  alchemicalEnergy: number;
}

interface GameActions {
  gatherElement: (element: string) => void;
  generateElements: () => void;
  transmute: (elements: string[]) => { success: boolean; compound?: string; message: string; isNew?: boolean };
  createHomunculus: (type: string) => { success: boolean; message: string };
  assignHomunculus: (homunculusIndex: string, element: string) => void;
  calcinateElement: (element: string) => { success: boolean; message: string };
  upgradeExtractor: (element: string) => { success: boolean; message: string };
}

interface GameContextType {
  gameState: GameState;
  actions: GameActions;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const initialState: GameState = {
  elements: {
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
  },
  discoveries: [],
  generationRates: {
    fire: 1,
    water: 1,
    earth: 1,
    air: 1,
  },
  tutorialProgress: 0,
  masteries: [],
  homunculi: [],
  // New Calcination properties
  calcinationCounts: {
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
  },
  calcinatedPurityBonuses: {
    fire: 1.0,
    water: 1.0,
    earth: 1.0,
    air: 1.0,
  },
  extractorLevels: {
    fire: 1,
    water: 1,
    earth: 1,
    air: 1,
  },
  totalProduced: {
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
  },
  alchemicalEnergy: 100,
};

type GameAction =
  | { type: 'GATHER_ELEMENT'; element: string }
  | { type: 'GENERATE_ELEMENTS' }
  | { type: 'TRANSMUTE'; elements: string[]; result: string }
  | { type: 'ADD_DISCOVERY'; discovery: string }
  | { type: 'CREATE_HOMUNCULUS'; homunculusType: string }
  | { type: 'ASSIGN_HOMUNCULUS'; index: number; element: string }
  | { type: 'CALCINATE_ELEMENT'; element: string }
  | { type: 'UPGRADE_EXTRACTOR'; element: string };

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'GATHER_ELEMENT':
      const gatheredAmount = 1 * state.calcinatedPurityBonuses[action.element];
      return {
        ...state,
        elements: {
          ...state.elements,
          [action.element]: (state.elements[action.element] || 0) + gatheredAmount,
        },
        totalProduced: {
          ...state.totalProduced,
          [action.element]: (state.totalProduced[action.element] || 0) + gatheredAmount,
        },
      };

    case 'GENERATE_ELEMENTS':
      const newElements = { ...state.elements };
      const newTotalProduced = { ...state.totalProduced };
      
      Object.entries(state.generationRates).forEach(([element, rate]) => {
        const extractorLevel = state.extractorLevels[element] || 1;
        const purityBonus = state.calcinatedPurityBonuses[element] || 1.0;
        const production = rate * extractorLevel * purityBonus;
        
        newElements[element] = (newElements[element] || 0) + production;
        newTotalProduced[element] = (newTotalProduced[element] || 0) + production;
      });
      
      // Add homunculi production
      state.homunculi.forEach((homunculus) => {
        if (homunculus.assignment) {
          const purityBonus = state.calcinatedPurityBonuses[homunculus.assignment] || 1.0;
          const production = homunculus.productionRate * purityBonus;
          newElements[homunculus.assignment] = (newElements[homunculus.assignment] || 0) + production;
          newTotalProduced[homunculus.assignment] = (newTotalProduced[homunculus.assignment] || 0) + production;
        }
      });

      // Generate alchemical energy based on total production
      const totalProduction = Object.values(newElements).reduce((sum, amount) => sum + amount, 0);
      const energyGain = Math.floor(totalProduction * 0.001); // 0.1% of total elements as energy

      return {
        ...state,
        elements: newElements,
        totalProduced: newTotalProduced,
        alchemicalEnergy: state.alchemicalEnergy + energyGain,
      };

    case 'TRANSMUTE':
      const newElementsAfterTransmute = { ...state.elements };
      action.elements.forEach(element => {
        if (newElementsAfterTransmute[element] > 0) {
          newElementsAfterTransmute[element]--;
        }
      });
      
      newElementsAfterTransmute[action.result] = (newElementsAfterTransmute[action.result] || 0) + 1;

      return {
        ...state,
        elements: newElementsAfterTransmute,
      };

    case 'ADD_DISCOVERY':
      return {
        ...state,
        discoveries: [...state.discoveries, action.discovery],
      };

    case 'CREATE_HOMUNCULUS':
      return {
        ...state,
        homunculi: [
          ...state.homunculi,
          {
            type: action.homunculusType,
            level: 1,
            assignment: null,
            efficiency: 100,
            productionRate: 1,
          },
        ],
      };

    case 'ASSIGN_HOMUNCULUS':
      const updatedHomunculi = [...state.homunculi];
      updatedHomunculi[action.index] = {
        ...updatedHomunculi[action.index],
        assignment: action.element,
      };
      
      return {
        ...state,
        homunculi: updatedHomunculi,
      };

    case 'CALCINATE_ELEMENT':
      const calcinationCount = state.calcinationCounts[action.element] + 1;
      const purityBonusIncrease = 0.15; // 15% bonus per calcination
      const newPurityBonus = 1.0 + (calcinationCount * purityBonusIncrease);
      
      return {
        ...state,
        extractorLevels: {
          ...state.extractorLevels,
          [action.element]: 1, // Reset to level 1
        },
        totalProduced: {
          ...state.totalProduced,
          [action.element]: 0, // Reset total produced
        },
        calcinationCounts: {
          ...state.calcinationCounts,
          [action.element]: calcinationCount,
        },
        calcinatedPurityBonuses: {
          ...state.calcinatedPurityBonuses,
          [action.element]: newPurityBonus,
        },
      };

    case 'UPGRADE_EXTRACTOR':
      const currentLevel = state.extractorLevels[action.element] || 1;
      const upgradeCost = Math.floor(10 * Math.pow(1.5, currentLevel - 1));
      
      if (state.alchemicalEnergy >= upgradeCost) {
        return {
          ...state,
          extractorLevels: {
            ...state.extractorLevels,
            [action.element]: currentLevel + 1,
          },
          alchemicalEnergy: state.alchemicalEnergy - upgradeCost,
        };
      }
      return state;

    default:
      return state;
  }
}

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);

  const actions: GameActions = {
    gatherElement: (element: string) => {
      dispatch({ type: 'GATHER_ELEMENT', element });
    },

    generateElements: () => {
      dispatch({ type: 'GENERATE_ELEMENTS' });
    },

    transmute: (elements: string[]) => {
      // Check if player has enough elements
      for (const element of elements) {
        if ((gameState.elements[element] || 0) < 1) {
          return { success: false, message: `Not enough ${element}!` };
        }
      }

      // Find matching compound
      const sortedElements = elements.sort();
      const compound = Object.entries(COMPOUNDS).find(([_, data]) => {
        const requiredElements = data.recipe.sort();
        return JSON.stringify(sortedElements) === JSON.stringify(requiredElements);
      });

      if (compound) {
        const [compoundName] = compound;
        const isNew = !gameState.discoveries.includes(compoundName);
        
        dispatch({ type: 'TRANSMUTE', elements, result: compoundName });
        
        if (isNew) {
          dispatch({ type: 'ADD_DISCOVERY', discovery: compoundName });
        }

        return { 
          success: true, 
          compound: compoundName, 
          message: `Created ${compoundName}!`,
          isNew 
        };
      }

      return { success: false, message: 'No known compound can be created with these elements.' };
    },

    createHomunculus: (type: string) => {
      dispatch({ type: 'CREATE_HOMUNCULUS', homunculusType: type });
      return { success: true, message: `Created ${type} homunculus!` };
    },

    assignHomunculus: (homunculusIndex: string, element: string) => {
      dispatch({ type: 'ASSIGN_HOMUNCULUS', index: parseInt(homunculusIndex), element });
    },

    calcinateElement: (element: string) => {
      const extractorLevel = gameState.extractorLevels[element] || 1;
      const totalProduced = gameState.totalProduced[element] || 0;
      const calcinationCount = gameState.calcinationCounts[element] || 0;
      
      // Calculate requirements for calcination
      const levelRequirement = 10 + (calcinationCount * 5); // Increases with each calcination
      const productionRequirement = 1000 * Math.pow(2, calcinationCount); // Exponential growth
      
      if (extractorLevel >= levelRequirement && totalProduced >= productionRequirement) {
        dispatch({ type: 'CALCINATE_ELEMENT', element });
        return { 
          success: true, 
          message: `Calcinated ${element}! Gained permanent +15% production bonus.` 
        };
      } else {
        return { 
          success: false, 
          message: `Requirements not met. Need level ${levelRequirement} and ${productionRequirement} total produced.` 
        };
      }
    },

    upgradeExtractor: (element: string) => {
      const currentLevel = gameState.extractorLevels[element] || 1;
      const upgradeCost = Math.floor(10 * Math.pow(1.5, currentLevel - 1));
      
      if (gameState.alchemicalEnergy >= upgradeCost) {
        dispatch({ type: 'UPGRADE_EXTRACTOR', element });
        return { success: true, message: `Upgraded ${element} extractor to level ${currentLevel + 1}!` };
      } else {
        return { success: false, message: `Not enough Alchemical Energy. Need ${upgradeCost}.` };
      }
    },
  };

  return (
    <GameContext.Provider value={{ gameState, actions }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};