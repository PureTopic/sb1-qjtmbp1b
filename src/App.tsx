import React, { useState, useEffect } from 'react';
import { Home } from './components/Home';
import { Laboratory } from './components/Laboratory';
import { Grimoire } from './components/Grimoire';
import { Navbar } from './components/Navbar';
import { GameProvider } from './context/GameContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { Beaker, BookOpen, FlaskConical, Home as HomeIcon } from 'lucide-react';
import { Homunculi } from './components/Homunculi';

function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  
  const tabs = [
    { id: 'home', label: 'Home', icon: <HomeIcon size={20} /> },
    { id: 'laboratory', label: 'Laboratory', icon: <FlaskConical size={20} /> },
    { id: 'grimoire', label: 'Grimoire', icon: <BookOpen size={20} /> },
    { id: 'homunculi', label: 'Homunculi', icon: <Beaker size={20} /> },
  ];

  // Render active component based on tab
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'laboratory':
        return <Laboratory />;
      case 'grimoire':
        return <Grimoire />;
      case 'homunculi':
        return <Homunculi />;
      default:
        return <Home />;
    }
  };

  return (
    <GameProvider>
      <div className="relative min-h-screen bg-steampunk-gradient text-amber-100 overflow-hidden">
        {/* Parchment texture overlay */}
        <div className="absolute inset-0 parchment-overlay opacity-30 mix-blend-overlay pointer-events-none z-0"></div>
        
        {/* Ambient steam effects */}
        <div className="absolute top-10 left-10 w-4 h-4 bg-steam-300/20 rounded-full animate-steam"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-steam-300/15 rounded-full animate-steam" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-5 h-5 bg-steam-300/10 rounded-full animate-steam" style={{animationDelay: '2s'}}></div>
        
        <div className="relative z-10 flex flex-col h-screen">
          <Navbar activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
          
          <main className="flex-1 overflow-y-auto pb-20 scrollbar-steampunk">
            <div className="container mx-auto px-4 py-6">
              {renderContent()}
            </div>
          </main>
          
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            toastClassName="bg-amber-950/95 border border-brass-600/50 text-amber-100"
            progressClassName="bg-brass-500"
          />
        </div>
      </div>
    </GameProvider>
  );
}

export default App;