import React from 'react';

export const ProfessorPip: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-24 h-24 bg-amber-800/60 rounded-full border-4 border-amber-600/80 flex items-center justify-center mb-3 shadow-lg">
        <div className="text-4xl">🧙‍♂️</div>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-serif font-bold text-amber-200">Professor Pip</h3>
        <p className="text-sm text-amber-400">Master Alchemist</p>
      </div>
    </div>
  );
};