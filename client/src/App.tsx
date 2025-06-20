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
      <div className="relative min-h-screen bg-steampunk-background text-white overflow-hidden">
        {/* Steampunk tech overlay */}
        <div className="absolute inset-0 tech-overlay opacity-60 mix-blend-soft-light pointer-events-none z-0"></div>
        
        {/* Floating particles */}
        <div className="absolute top-10 left-10 w-3 h-3 bg-aetheric-gold-400/40 rounded-full animate-float"></div>
        <div className="absolute top-20 right-20 w-2 h-2 bg-emerald-jade-400/30 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-4 h-4 bg-brass-300/30 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-aetheric-gold-300/35 rounded-full animate-float" style={{animationDelay: '3s'}}></div>
        
        <div className="relative z-10 flex flex-col h-screen">
          <Navbar activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
          
          <main className="flex-1 overflow-y-auto pb-20 scrollbar-sleek">
            <div className="container mx-auto px-6 py-8 animate-slide-up">
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
            toastClassName="glass-morphism text-white border-white/20"
            progressClassName="bg-brass-gradient"
          />
        </div>
      </div>
    </GameProvider>
  );
}

export default App;