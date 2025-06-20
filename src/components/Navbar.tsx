import React from 'react';
import { useGame } from '../context/GameContext';
import { formatNumber } from '../utils/formatters';
import { FlaskConical } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: {
    id: string;
    label: string;
    icon: React.ReactNode;
  }[];
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, tabs }) => {
  const { gameState } = useGame();
  
  // Calculate total elements for display
  const totalElements = Object.values(gameState.elements).reduce((sum, amount) => sum + amount, 0);
  
  return (
    <div className="bg-amber-950/80 border-b border-amber-700/50 backdrop-blur-sm shadow-md relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between py-3">
          {/* Logo and stats */}
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <div className="flex items-center">
              <FlaskConical size={28} className="text-amber-400" />
              <span className="ml-2 text-xl font-bold text-amber-300 font-serif tracking-wider">
                Soulforge Alchemist
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-amber-300 bg-amber-900/40 px-3 py-1 rounded-full">
              <span className="flex items-center">
                <span className="text-amber-400 mr-1">⚗️</span> 
                <span className="text-amber-200 font-medium">{formatNumber(totalElements)}</span>
              </span>
              
              <span className="flex items-center">
                <span className="text-amber-400 mr-1">🔍</span> 
                <span className="text-amber-200 font-medium">{gameState.discoveries.length}</span>
              </span>
            </div>
          </div>

          {/* Navigation tabs */}
          <nav className="flex items-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 mx-1 rounded-lg flex items-center gap-2 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-amber-700/60 text-amber-100'
                    : 'text-amber-400 hover:bg-amber-900/40 hover:text-amber-300'
                }`}
              >
                {tab.icon}
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};