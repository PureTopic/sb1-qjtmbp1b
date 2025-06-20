import React from 'react';
import { useGame } from '../context/GameContext';
import { formatNumber } from '../utils/formatters';
import { FlaskConical, Cog } from 'lucide-react';

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
    <div className="bg-gradient-to-r from-amber-950/95 to-amber-900/90 border-b-4 border-brass-600/60 backdrop-blur-sm shadow-steampunk relative z-10">
      {/* Decorative brass trim */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-brass-gradient"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-brass-gradient"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between py-4">
          {/* Logo and stats */}
          <div className="flex items-center gap-6 mb-4 sm:mb-0">
            <div className="flex items-center group">
              <div className="relative">
                <FlaskConical size={32} className="text-brass-400 group-hover:text-brass-300 transition-colors animate-bubble" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-brass-400 rounded-full animate-glow"></div>
              </div>
              <div className="ml-3">
                <span className="text-2xl font-display font-bold text-brass-200 tracking-wider drop-shadow-lg">
                  Soulforge Alchemist
                </span>
                <div className="text-xs text-brass-400/80 font-body tracking-wide">
                  Master of Transmutation
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm bg-gradient-to-r from-amber-900/60 to-amber-800/40 px-4 py-2 rounded-full border border-brass-600/40 shadow-inner-glow">
                <div className="flex items-center">
                  <span className="text-brass-400 mr-2 text-lg">⚗️</span> 
                  <span className="text-brass-200 font-semibold font-body">{formatNumber(totalElements)}</span>
                  <span className="text-brass-400/70 ml-1 text-xs">Elements</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm bg-gradient-to-r from-emerald-900/60 to-emerald-800/40 px-4 py-2 rounded-full border border-emerald-600/40 shadow-inner-glow">
                <div className="flex items-center">
                  <span className="text-emerald-400 mr-2 text-lg">🔍</span> 
                  <span className="text-emerald-200 font-semibold font-body">{gameState.discoveries.length}</span>
                  <span className="text-emerald-400/70 ml-1 text-xs">Discoveries</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation tabs */}
          <nav className="flex items-center bg-gradient-to-r from-amber-950/40 to-amber-900/30 rounded-full p-1 border border-brass-600/30">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 mx-1 rounded-full flex items-center gap-2 transition-all duration-300 font-body font-medium ${
                  activeTab === tab.id
                    ? 'bg-brass-gradient text-amber-900 shadow-brass transform scale-105 border border-brass-500'
                    : 'text-brass-300 hover:bg-amber-800/40 hover:text-brass-200 hover:shadow-inner-glow'
                }`}
              >
                <span className={`transition-transform duration-300 ${activeTab === tab.id ? 'scale-110' : ''}`}>
                  {tab.icon}
                </span>
                <span className="hidden md:inline tracking-wide">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};