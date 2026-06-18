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

    const speak = (text: string) => {
      setFeedback(text);
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05; // Slightly faster
      utterance.pitch = 0.9; // Slightly deeper for a cool AI vibe
      window.speechSynthesis.speak(utterance);
    };

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const speechToText = event.results[current][0].transcript.toLowerCase().trim();
      console.log("Spidy heard:", speechToText);

      // --- NATURAL LANGUAGE UNDERSTANDING ---

      // Greetings
      if (speechToText.includes('hello') || speechToText.includes('hi') || speechToText.includes('hey')) {
        if (speechToText.includes('spidy')) speak('Hello sir! I am Spidy, ready to assist.');
        else speak('Hello! How can I help you today?');
      } 
      else if (speechToText.includes('who are you') || speechToText.includes('what are you') || speechToText.includes('your name')) {
        speak('I am Spidy, Rohan\'s personal AI assistant. I control this interface.');
      }
      
      // Scrolling
      else if (speechToText.includes('down') || speechToText.includes('lower')) {
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

      // Clear feedback UI after 4 seconds (but keep speaking)
      setTimeout(() => setFeedback(''), 4000);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      // The browser automatically stops listening after a period of silence.
      // We must reset the UI state so the user can click it again.
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
