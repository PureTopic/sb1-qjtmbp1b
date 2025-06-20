import React from 'react';
import { ELEMENTS, COMPOUNDS } from '../data/elements';
import { formatNumber } from '../utils/formatters';

interface ElementDisplayProps {
  element: string;
  amount: number;
  small?: boolean;
  selected?: boolean;
}

export const ElementDisplay: React.FC<ElementDisplayProps> = ({ 
  element, 
  amount, 
  small = false,
  selected = false
}) => {
  const elementData = ELEMENTS[element] || COMPOUNDS[element];
  
  if (!elementData) {
    return (
      <div className="text-neon-400 font-body">Unknown Element</div>
    );
  }
  
  return (
    <div className="flex flex-col items-center text-center">
      <div className={`${small ? 'text-3xl' : 'text-4xl'} mb-2 transition-transform duration-300 hover:scale-110`}>
        {elementData.emoji}
      </div>
      <div className={`font-display capitalize ${small ? 'text-base' : 'text-lg'} text-white font-semibold mb-1`}>
        {element}
      </div>
      <div className={`${small ? 'text-sm' : 'text-base'} text-neon-300 font-body font-medium`}>
        {formatNumber(amount)}
      </div>
      {selected && (
        <div className="mt-2 text-xs text-white bg-neon-gradient px-3 py-1 rounded-full font-body font-semibold shadow-neon">
          Selected
        </div>
      )}
    </div>
  );
};