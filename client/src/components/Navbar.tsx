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
    <div className="panel-steampunk border-b-2 border-brass-600/40 relative z-10 rounded-none">
      {/* Brass accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-brass-gradient"></div>
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between py-4">
          {/* Logo and stats */}
          <div className="flex items-center gap-6 mb-4 sm:mb-0">
            <div className="flex items-center group">
              <div className="relative">
                <FlaskConical size={32} className="text-aetheric-gold-400 group-hover:text-aetheric-gold-300 transition-colors animate-glow" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-jade-400 rounded-full animate-float"></div>
              </div>
              <div className="ml-3">
                <span className="text-2xl font-display font-bold text-steampunk-header tracking-wider">
                  Soulforge Alchemist
                </span>
                <div className="text-xs text-brass-400/80 font-body tracking-wide">
                  Steampunk Botanical Laboratory
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="panel-steampunk px-4 py-2 rounded-2xl border border-brass-500/30">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-aetheric-gold-400 text-lg">⚗️</span> 
                  <span className="text-brass-200 font-semibold">{formatNumber(totalElements)}</span>
                  <span className="text-brass-400/80 text-xs">Elements</span>
                </div>
              </div>
              
              <div className="panel-steampunk px-4 py-2 rounded-2xl border border-brass-500/30">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-emerald-jade-400 text-lg">🔬</span> 
                  <span className="text-brass-200 font-semibold">{gameState.discoveries.length}</span>
                  <span className="text-brass-400/80 text-xs">Discoveries</span>
                </div>
              </div>

              <div className="panel-steampunk px-4 py-2 rounded-2xl border border-brass-500/30">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-aetheric-gold-400 text-lg">⚡</span> 
                  <span className="text-brass-200 font-semibold">{formatNumber(gameState.alchemicalEnergy)}</span>
                  <span className="text-brass-400/80 text-xs">Energy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation tabs */}
          <nav className="panel-steampunk rounded-2xl p-1 border border-brass-500/40">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 mx-1 rounded-xl flex items-center gap-2 transition-all duration-300 font-medium ${
                  activeTab === tab.id
                    ? 'bg-brass-gradient text-white shadow-brass transform scale-105 border border-brass-400/50'
                    : 'text-brass-300 hover:bg-brass-800/30 hover:text-brass-200 border border-transparent'
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