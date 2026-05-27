import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

export default function VoiceNavigation() {
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Speech Recognition API not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const speechToText = event.results[current][0].transcript.toLowerCase().trim();

      // Execute Commands
      if (speechToText.includes('scroll down')) {
        window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
        setFeedback('Scrolling Down');
      } else if (speechToText.includes('scroll up')) {
        window.scrollBy({ top: -window.innerHeight * 0.8, behavior: 'smooth' });
        setFeedback('Scrolling Up');
      } else if (speechToText.includes('play music')) {
        const audio = document.querySelector('audio');
        if (audio) audio.play();
        setFeedback('Playing Music');
      } else if (speechToText.includes('stop music') || speechToText.includes('pause music')) {
        const audio = document.querySelector('audio');
        if (audio) audio.pause();
        setFeedback('Pausing Music');
      } else if (speechToText.includes('hello rohan')) {
        setFeedback('Hello! Welcome to my portfolio.');
      } else {
         setFeedback('Unknown Command');
      }

      // Clear feedback after 2 seconds
      setTimeout(() => setFeedback(''), 2000);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    if (isListening) {
      try { recognition.start(); } catch(e) {}
    } else {
      recognition.stop();
    }

    return () => recognition.stop();
  }, [isListening]);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsListening(!isListening)}
        className={`w-12 h-12 rounded-full glass flex items-center justify-center transition-all shadow-lg border ${
          isListening 
            ? 'bg-red-500/20 text-red-400 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-pulse' 
            : 'text-slate-400 border-white/10 hover:text-white'
        }`}
        title="Toggle AI Voice Navigation"
      >
        {isListening ? <FaMicrophone className="text-lg" /> : <FaMicrophoneSlash className="text-lg" />}
      </motion.button>

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] glass px-6 py-3 rounded-full border-accent-cyan/30 text-accent-cyan font-mono text-sm shadow-[0_0_30px_rgba(6,182,212,0.3)] whitespace-nowrap"
          >
             J.A.R.V.I.S: {feedback}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
