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
      if (speechToText.includes('scroll down') || speechToText.includes('go down')) {
        window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
        setFeedback('Scrolling Down');
      } else if (speechToText.includes('scroll up') || speechToText.includes('go up')) {
        window.scrollBy({ top: -window.innerHeight * 0.8, behavior: 'smooth' });
        setFeedback('Scrolling Up');
      } else if (speechToText.includes('top') || speechToText.includes('go to top')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setFeedback('Going to Top');
      } else if (speechToText.includes('bottom') || speechToText.includes('go to bottom')) {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        setFeedback('Going to Bottom');
      } else if (speechToText.includes('about')) {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        setFeedback('Navigating to About');
      } else if (speechToText.includes('project')) {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        setFeedback('Navigating to Projects');
      } else if (speechToText.includes('skill')) {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        setFeedback('Navigating to Skills');
      } else if (speechToText.includes('experience')) {
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
        setFeedback('Navigating to Experience');
      } else if (speechToText.includes('contact')) {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        setFeedback('Navigating to Contact');
      } else if (speechToText.includes('resume') || speechToText.includes('download')) {
        window.open('/Rohan_Baviskar_Resume.pdf', '_blank');
        setFeedback('Opening Resume');
      } else if (speechToText.includes('play music')) {
        const audio = document.querySelector('audio');
        if (audio) audio.play();
        setFeedback('Playing Music');
      } else if (speechToText.includes('stop music') || speechToText.includes('pause music')) {
        const audio = document.querySelector('audio');
        if (audio) audio.pause();
        setFeedback('Pausing Music');
      } else if (speechToText.includes('hello spidy') || speechToText.includes('hi spidy')) {
        setFeedback('Hello sir! I am Spidy, ready to assist.');
      } else if (speechToText.includes('who are you')) {
        setFeedback('I am Spidy, Rohan\'s personal AI assistant.');
      } else {
         setFeedback(`Command not recognized: ${speechToText}`);
      }

      // Clear feedback after 3 seconds
      setTimeout(() => setFeedback(''), 3000);
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
             Spidy: {feedback}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
