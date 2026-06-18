import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTerminal, FaTimes } from 'react-icons/fa';

export default function TerminalWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ type: 'input' | 'output' | 'error' | 'system', text: string }[]>([
    { type: 'system', text: 'ROHAN OS v1.0.0 initialized.' },
    { type: 'system', text: 'Type "help" to see available commands.' }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Secret code trigger logic
  useEffect(() => {
    let keyBuffer = '';
    const secretCode = 'rohan';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen) return; // Don't track if already open

      keyBuffer += e.key.toLowerCase();
      if (keyBuffer.length > secretCode.length) {
        keyBuffer = keyBuffer.slice(1);
      }

      if (keyBuffer === secretCode) {
        setIsOpen(true);
        keyBuffer = '';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Spidy Voice Control integration
  useEffect(() => {
    const handleSpidyTerminal = () => {
      setIsOpen(true);
    };
    window.addEventListener('spidy-terminal', handleSpidyTerminal);
    return () => window.removeEventListener('spidy-terminal', handleSpidyTerminal);
  }, []);

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, { type: 'input' as const, text: `admin@rohan:~$ ${input}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({ type: 'output', text: 'Available commands: help, whoami, skills, clear, exit, sudo hire' });
        break;
      case 'whoami':
        newHistory.push({ type: 'output', text: 'Rohan Baviskar - Data Analyst & Engineering Student' });
        break;
      case 'skills':
        newHistory.push({ type: 'output', text: 'Data Analytics, React, Python, Machine Learning, UI/UX' });
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'exit':
        setIsOpen(false);
        break;
      case 'sudo hire':
        newHistory.push({ type: 'system', text: 'Initiating hire sequence...' });
        newHistory.push({ type: 'system', text: 'Success: Rohan has been hired. Excellent choice.' });
        // Trigger a nice visual effect
        document.body.style.boxShadow = 'inset 0 0 100px #10B981';
        setTimeout(() => document.body.style.boxShadow = '', 1000);
        break;
      default:
        newHistory.push({ type: 'error', text: `Command not found: ${cmd}` });
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20 }}
          className="fixed inset-x-0 top-20 mx-auto w-11/12 max-w-2xl z-[9999] glass-card rounded-lg overflow-hidden border border-accent-cyan/30 shadow-[0_0_50px_rgba(6,182,212,0.2)]"
        >
          {/* Terminal Header */}
          <div className="bg-brand-900/90 p-2 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
              <FaTerminal /> root@rohan-portfolio
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-red-400 transition-colors">
              <FaTimes />
            </button>
          </div>

          {/* Terminal Body */}
          <div className="p-4 h-64 overflow-y-auto bg-black/80 font-mono text-sm" onClick={() => inputRef.current?.focus()}>
            {history.map((line, i) => (
              <div key={i} className={`mb-1 ${
                line.type === 'error' ? 'text-red-400' :
                line.type === 'system' ? 'text-accent-blue' :
                line.type === 'input' ? 'text-white' : 'text-accent-cyan'
              }`}>
                {line.text}
              </div>
            ))}
            
            <form onSubmit={handleCommand} className="flex items-center text-white mt-2">
              <span className="mr-2 text-green-400">admin@rohan:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 p-0"
                autoComplete="off"
                spellCheck="false"
              />
            </form>
            <div ref={bottomRef} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
