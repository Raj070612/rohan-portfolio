import { useState, useEffect } from 'react';
import Loader from './Loader';
import Navbar from './Navbar';
import Footer from './Footer';
import CustomCursor from './CustomCursor';
import BackgroundMusic from './BackgroundMusic';
import ChatbotWidget from './ChatbotWidget';
import HandTracking from './HandTracking';
import VoiceNavigation from './VoiceNavigation';
import TerminalWidget from './TerminalWidget';
import { FaHandPaper } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isHandTrackingEnabled, setIsHandTrackingEnabled] = useState(false);
  
  useEffect(() => {
    const handleSpidyHandTracking = () => {
      setIsHandTrackingEnabled(prev => !prev);
    };
    window.addEventListener('spidy-hand-tracking', handleSpidyHandTracking);
    return () => window.removeEventListener('spidy-hand-tracking', handleSpidyHandTracking);
  }, []);

  return (
    <>
      <TerminalWidget />
      
      {/* Hide default cursor on desktop when using custom cursor */}
      <div className={`hidden md:block ${isHandTrackingEnabled ? 'cursor-none' : ''}`}>
        {!isHandTrackingEnabled && <CustomCursor />}
      </div>
      
      {isLoading && <Loader onLoadingComplete={() => setIsLoading(false)} />}
      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* Floating Controls (Hidden on Mobile for Performance) */}
        <div className="hidden md:flex fixed top-24 left-10 z-[100] flex-col gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsHandTrackingEnabled(!isHandTrackingEnabled)}
            className={`w-12 h-12 rounded-full glass flex items-center justify-center transition-all shadow-lg border ${
              isHandTrackingEnabled 
                ? 'bg-accent-cyan/20 text-accent-cyan border-accent-cyan/50 shadow-[0_0_20px_rgba(6,182,212,0.4)]' 
                : 'text-slate-400 border-white/10 hover:text-white'
            }`}
            title="Toggle AI Hand Navigation"
          >
            <FaHandPaper className="text-lg" />
          </motion.button>
          <VoiceNavigation />
        </div>

        {isHandTrackingEnabled && <HandTracking onClose={() => setIsHandTrackingEnabled(false)} />}
        
        <ChatbotWidget />
        <BackgroundMusic />
        <Footer />
      </div>
    </>
  );
}
