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
}

interface GameActions {
  gatherElement: (element: string) => void;
  generateElements: () => void;
  transmute: (elements: string[]) => { success: boolean; compound?: string; message: string; isNew?: boolean };
  createHomunculus: (type: string) => { success: boolean; message: string };
  assignHomunculus: (homunculusIndex: string, element: string) => void;
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
};

type GameAction =
  | { type: 'GATHER_ELEMENT'; element: string }
  | { type: 'GENERATE_ELEMENTS' }
  | { type: 'TRANSMUTE'; elements: string[]; result: string }
  | { type: 'ADD_DISCOVERY'; discovery: string }
  | { type: 'CREATE_HOMUNCULUS'; homunculusType: string }
  | { type: 'ASSIGN_HOMUNCULUS'; index: number; element: string };

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'GATHER_ELEMENT':
      return {
        ...state,
        elements: {
          ...state.elements,
          [action.element]: (state.elements[action.element] || 0) + 1,
        },
      };

    case 'GENERATE_ELEMENTS':
      const newElements = { ...state.elements };
      Object.entries(state.generationRates).forEach(([element, rate]) => {
        newElements[element] = (newElements[element] || 0) + rate;
      });
      
      // Add homunculi production
      state.homunculi.forEach((homunculus) => {
        if (homunculus.assignment) {
          newElements[homunculus.assignment] = (newElements[homunculus.assignment] || 0) + homunculus.productionRate;
        }
      });

      return {
        ...state,
        elements: newElements,
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
      // For now, just create the homunculus without cost checking
      dispatch({ type: 'CREATE_HOMUNCULUS', homunculusType: type });
      return { success: true, message: `Created ${type} homunculus!` };
    },

    assignHomunculus: (homunculusIndex: string, element: string) => {
      dispatch({ type: 'ASSIGN_HOMUNCULUS', index: parseInt(homunculusIndex), element });
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