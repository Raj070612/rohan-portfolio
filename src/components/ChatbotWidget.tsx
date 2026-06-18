import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaUser } from 'react-icons/fa';
import { generatePortfolioResponse } from '../utils/AIBrain';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi! I'm Rohan's AI Assistant. Ask me anything about his skills, experience, or projects!", sender: 'bot', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const handleSpidyChatbot = () => {
      setIsOpen(true);
    };
    window.addEventListener('spidy-chatbot', handleSpidyChatbot);
    return () => window.removeEventListener('spidy-chatbot', handleSpidyChatbot);
  }, []);

  const generateResponse = (query: string): string => {
    const response = generatePortfolioResponse(query);
    if (response) return response;
    
    return "That's a great question! While I'm just a simple AI assistant, I can definitely tell you about Rohan's skills, experience, projects, or how to contact him. What would you like to know?";
  };

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate network/thinking delay
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: generateResponse(userMessage.text),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      <div className="fixed bottom-6 left-6 z-[100] md:bottom-10 md:left-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full glass flex items-center justify-center text-emerald-400 border border-emerald-400/40 shadow-[0_0_20px_rgba(52,211,153,0.2)] hover:shadow-[0_0_30px_rgba(52,211,153,0.5)] transition-all relative overflow-hidden"
        >
          {isOpen ? <FaTimes className="text-xl text-white" /> : <FaRobot className="text-xl" />}
          {!isOpen && (
             <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-brand-900 animate-pulse" />
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 left-6 md:left-10 z-[100] w-80 md:w-96 h-[500px] glass-card rounded-3xl border-emerald-400/30 shadow-[0_0_40px_rgba(52,211,153,0.15)] flex flex-col overflow-hidden origin-bottom-left"
          >
            {/* Header */}
            <div className="bg-brand-900/80 p-4 border-b border-white/10 flex items-center gap-3 relative">
              <div className="w-10 h-10 rounded-full bg-emerald-400/20 flex items-center justify-center text-emerald-400 border border-emerald-400/30 relative">
                <FaRobot />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-brand-900" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Ask Rohan AI</h3>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online
                </p>
              </div>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar bg-brand-900/40">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.sender === 'user' ? 'bg-accent-blue/20 text-accent-blue' : 'bg-emerald-400/20 text-emerald-400'
                  }`}>
                    {msg.sender === 'user' ? <FaUser size={12} /> : <FaRobot size={12} />}
                  </div>
                  <div className={`max-w-[75%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-accent-blue/20 text-white rounded-tr-none border border-accent-blue/30' 
                      : 'bg-white/5 text-slate-200 rounded-tl-none border border-white/10'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-400/20 text-emerald-400 flex items-center justify-center">
                    <FaRobot size={12} />
                  </div>
                  <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/10 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-brand-900/80 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about skills or projects..."
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-400/50 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 shrink-0 rounded-full bg-emerald-400 text-brand-900 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"
              >
                <FaPaperPlane size={12} className="-ml-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
