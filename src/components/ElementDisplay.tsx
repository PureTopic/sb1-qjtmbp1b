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
      <div className="text-amber-400">Unknown Element</div>
    );
  }
  
  return (
    <div className="flex flex-col items-center text-center">
      <div className={`${small ? 'text-2xl' : 'text-3xl'} mb-1`}>{elementData.emoji}</div>
      <div className={`font-serif capitalize ${small ? 'text-sm' : 'text-lg'} text-amber-200`}>
        {element}
      </div>
      <div className={`${small ? 'text-xs' : 'text-sm'} text-amber-400`}>
        {formatNumber(amount)}
      </div>
      {selected && (
        <div className="mt-1 text-xs text-amber-300 bg-amber-700/40 px-2 py-0.5 rounded-full">
          Selected
        </div>
      )}
    </div>
  );
};