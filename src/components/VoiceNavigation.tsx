import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

export default function VoiceNavigation() {
  const [isListening, setIsListening] = useState(false); // Master switch
  const [isAwake, setIsAwake] = useState(false);         // Wake-word state
  const [feedback, setFeedback] = useState('');

  // Refs to access latest state inside SpeechRecognition callbacks
  const isListeningRef = useRef(isListening);
  const isAwakeRef = useRef(isAwake);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    isListeningRef.current = isListening;
    isAwakeRef.current = isAwake;
  }, [isListening, isAwake]);

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
    recognitionRef.current = recognition;

    const speak = (text: string) => {
      setFeedback(text);
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 0.9;
      window.speechSynthesis.speak(utterance);
    };

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const speechToText = event.results[current][0].transcript.toLowerCase().trim();
      console.log("Spidy heard:", speechToText);

      // --- WAKE WORD LOGIC ---
      if (speechToText.includes('hey spidy') || speechToText.includes('hi spidy') || speechToText.includes('wake up spidy')) {
        setIsAwake(true);
        speak('Yes sir, I am listening.');
        setTimeout(() => setFeedback(''), 4000);
        return;
      }

      if (speechToText.includes('keep quiet spidy') || speechToText.includes('go to sleep spidy') || speechToText.includes('quiet spidy')) {
        setIsAwake(false);
        speak('Going silent, sir.');
        setTimeout(() => setFeedback(''), 4000);
        return;
      }

      // If not awake, ignore all other commands
      if (!isAwakeRef.current) return;

      // --- NATURAL LANGUAGE UNDERSTANDING ---
      
      // Scrolling
      if (speechToText.includes('down') || speechToText.includes('lower')) {
        window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
        speak('Scrolling down.');
      } else if (speechToText.includes('up') || speechToText.includes('higher')) {
        window.scrollBy({ top: -window.innerHeight * 0.8, behavior: 'smooth' });
        speak('Scrolling up.');
      } else if (speechToText.includes('top') || speechToText.includes('beginning')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        speak('Taking you to the top.');
      } else if (speechToText.includes('bottom') || speechToText.includes('end')) {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        speak('Going to the bottom.');
      }
      
      // Section Navigation
      else if (speechToText.includes('about') || speechToText.includes('who is rohan') || speechToText.includes('yourself')) {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        speak('Here is some information about Rohan.');
      } else if (speechToText.includes('project') || speechToText.includes('work') || speechToText.includes('portfolio')) {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        speak('Showcasing your projects now.');
      } else if (speechToText.includes('skill') || speechToText.includes('technolog') || speechToText.includes('stack')) {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        speak('Navigating to the Engineering Command Center.');
      } else if (speechToText.includes('experience') || speechToText.includes('job') || speechToText.includes('work history')) {
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
        speak('Here is Rohan\'s professional experience.');
      } else if (speechToText.includes('contact') || speechToText.includes('hire') || speechToText.includes('email')) {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        speak('Going to the contact section. Let\'s get in touch!');
      } 
      
      // Global Actions
      else if (speechToText.includes('resume') || speechToText.includes('cv') || speechToText.includes('download')) {
        window.open('/Rohan_Baviskar_Resume.pdf', '_blank');
        speak('Downloading your resume now, sir.');
      } 
      
      // Smart Music Control
      else if (speechToText.includes('music') || speechToText.includes('song') || speechToText.includes('track') || speechToText.includes('play')) {
        if (speechToText.includes('stop') || speechToText.includes('pause') || speechToText.includes('quiet') || speechToText.includes('shut up')) {
          window.dispatchEvent(new CustomEvent('spidy-music', { detail: { action: 'pause' } }));
          speak('Pausing the music.');
        } else if (speechToText.includes('next') || speechToText.includes('skip')) {
          window.dispatchEvent(new CustomEvent('spidy-music', { detail: { action: 'next' } }));
          speak('Skipping to the next track.');
        } else if (speechToText.includes('flute') || speechToText.includes('krishna')) {
          window.dispatchEvent(new CustomEvent('spidy-music', { detail: { action: 'play', track: 0 } }));
          speak('Playing Krishna\'s Flute.');
        } else if (speechToText.includes('ghadina') || speechToText.includes('gar gar') || speechToText.includes('phire')) {
          window.dispatchEvent(new CustomEvent('spidy-music', { detail: { action: 'play', track: 1 } }));
          speak('Playing Ghadina Gata Gar Gar Phire.');
        } else if (speechToText.includes('shyamal') || speechToText.includes('sanware') || speechToText.includes('new song')) {
          window.dispatchEvent(new CustomEvent('spidy-music', { detail: { action: 'play', track: 2 } }));
          speak('Playing Shyamal Sanware.');
        } else {
          // Generic play command
          window.dispatchEvent(new CustomEvent('spidy-music', { detail: { action: 'play' } }));
          speak('Playing background music.');
        }
      } 
      
      // Fallback
      else {
         speak(`I heard you say: ${speechToText}, but I don't have a protocol for that yet.`);
      }

      setTimeout(() => setFeedback(''), 4000);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
    };

    recognition.onend = () => {
      // CONTINUOUS LISTENING: Auto-restart if master switch is ON
      if (isListeningRef.current) {
        try {
          recognition.start();
        } catch (e) {
          console.error("Failed to restart recognition", e);
        }
      }
    };

    // Initial start
    if (isListening) {
      try { recognition.start(); } catch(e) {}
    } else {
      recognition.stop();
      setIsAwake(false); // Go to sleep if master switch is turned off
    }

    return () => {
      recognition.onend = null; // Prevent auto-restart loop on unmount
      recognition.stop();
    };
  }, [isListening]); // Re-run effect only when master switch changes

  // Master switch toggle
  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Just turned on master switch. We start asleep.
      setFeedback('Master Switch ON. Say "Hey Spidy" to wake me up.');
      setTimeout(() => setFeedback(''), 4000);
    } else {
      setFeedback('Master Switch OFF.');
      setTimeout(() => setFeedback(''), 2000);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleListening}
        className={`w-12 h-12 rounded-full glass flex items-center justify-center transition-all shadow-lg border ${
          isListening 
            ? isAwake 
              ? 'bg-red-500/20 text-red-400 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-pulse' // Awake (Pulsing Red)
              : 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]'   // Asleep (Idle Cyan)
            : 'text-slate-400 border-white/10 hover:text-white' // OFF (Gray)
        }`}
        title={isListening ? (isAwake ? "Spidy is Awake (Listening to Commands)" : "Spidy is Asleep (Waiting for 'Hey Spidy')") : "Turn On Master Switch"}
      >
        {isListening ? <FaMicrophone className="text-lg" /> : <FaMicrophoneSlash className="text-lg" />}
      </motion.button>

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] glass px-6 py-3 rounded-full font-mono text-sm shadow-[0_0_30px_rgba(6,182,212,0.3)] whitespace-nowrap ${
              isAwake ? 'border-red-500/30 text-red-400' : 'border-accent-cyan/30 text-accent-cyan'
            }`}
          >
             Spidy: {feedback}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
