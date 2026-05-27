import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onLoadingComplete }: { onLoadingComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onLoadingComplete, 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);
    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: -50, transition: { duration: 0.8, ease: 'easeInOut' } }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-900"
      >
        <div className="relative flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-6xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-blue mb-8"
          >
            RB
          </motion.div>
          
          <div className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden mb-4 relative">
            <motion.div
              className="h-full bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-purple shadow-[0_0_10px_rgba(6,182,212,0.7)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
          </div>
          
          <div className="flex justify-between w-64 text-xs font-mono text-slate-400">
            <span>Initializing Engineering Interface...</span>
            <span>{Math.min(progress, 100)}%</span>
          </div>
        </div>
        
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      </motion.div>
    </AnimatePresence>
  );
}
