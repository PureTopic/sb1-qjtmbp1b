import React, { useState, useEffect } from 'react';
import { Home } from './components/Home';
import { Laboratory } from './components/Laboratory';
import { Grimoire } from './components/Grimoire';
import { Navbar } from './components/Navbar';
import { GameProvider } from './context/GameContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { Beaker, BookOpen, Flask, Home as HomeIcon } from 'lucide-react';
import { Homunculi } from './components/Homunculi';

function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  
  const tabs = [
    { id: 'home', label: 'Home', icon: <HomeIcon size={20} /> },
    { id: 'laboratory', label: 'Laboratory', icon: <Flask size={20} /> },
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
      <div className="relative min-h-screen bg-gradient-to-b from-amber-900/90 to-emerald-950 text-amber-100 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/src/assets/parchment-texture.png')] opacity-5 mix-blend-overlay pointer-events-none z-0"></div>
        
        <div className="relative z-10 flex flex-col h-screen">
          <Navbar activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
          
          <main className="flex-1 overflow-y-auto pb-20 scrollbar-thin scrollbar-thumb-amber-700 scrollbar-track-transparent">
            <div className="container mx-auto px-4 py-4">
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
          />
        </div>
      </div>
    </GameProvider>
  );
}

export default App;