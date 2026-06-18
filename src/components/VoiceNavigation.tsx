import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

export default function VoiceNavigation() {
  const [isListening, setIsListening] = useState(false); // Master switch
  const [isAwake, setIsAwake] = useState(false);         // Wake-word state
  const [feedback, setFeedback] = useState('');

  const [debugText, setDebugText] = useState('');

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
      setDebugText(`Heard: "${speechToText}"`);

      // --- WAKE WORD LOGIC ---
      // EXTREMELY LENIENT: Will wake up to anything containing "hey", "hi", "hello", "wake", or "spid"
      const wakeRegex = /(hey|hi|hello|wake up|listen|spid|speed|spider)/i;
      const sleepRegex = /(keep quiet|go to sleep|quiet|shut up|stop listening|sleep)/i;

      if (!isAwakeRef.current && wakeRegex.test(speechToText)) {
        setIsAwake(true);
        speak('Yes sir, I am listening.');
        setTimeout(() => setFeedback(''), 4000);
        return;
      }

      if (isAwakeRef.current && sleepRegex.test(speechToText)) {
        setIsAwake(false);
        speak('Going silent, sir.');
        setTimeout(() => setFeedback(''), 4000);
        return;
      }

      // If not awake, ignore all other commands
      if (!isAwakeRef.current) return;

      // --- NLP INTENT ENGINE ---
      const intents = [
        // Greetings & Conversation
        { intent: 'GREETING', regex: /(hello|hi|hey|good morning|good afternoon|greetings)\b/i },
        { intent: 'IDENTITY', regex: /(who are you|what are you|your name|introduce yourself)\b/i },
        { intent: 'CREATOR', regex: /(who made you|who created you|who programmed you|who is your boss)\b/i },
        { intent: 'COMPLIMENT', regex: /(good job|well done|awesome|cool|amazing|great|nice work)\b/i },
        { intent: 'STATUS', regex: /(how are you|how do you do|what\'s up)\b/i },

        // Global Actions
        { intent: 'DOWNLOAD_RESUME', regex: /(download|get|show|view|open|see).*(resume|cv|curriculum vitae)/i },
        { intent: 'SCROLL_DOWN', regex: /(scroll|go|move|page).*(down|lower|bottom)/i },
        { intent: 'SCROLL_UP', regex: /(scroll|go|move|page).*(up|higher|top)/i },
        { intent: 'GO_TOP', regex: /(take me|go|move|scroll).*(top|beginning|start)/i },
        { intent: 'GO_BOTTOM', regex: /(take me|go|move|scroll).*(bottom|end)/i },

        // Navigation
        { intent: 'NAVIGATE_ABOUT', regex: /(take me to|go to|show me|navigate to|open|tell me).*(about|who is rohan|yourself|profile)/i },
        { intent: 'NAVIGATE_PROJECTS', regex: /(take me to|go to|show me|navigate to|open|see|view).*(project|work|portfolio|built|made|created)/i },
        { intent: 'NAVIGATE_SKILLS', regex: /(take me to|go to|show me|navigate to|open|see|view).*(skill|technolog|stack|languages|tools)/i },
        { intent: 'NAVIGATE_EXPERIENCE', regex: /(take me to|go to|show me|navigate to|open|see|view).*(experience|job|history|career|worked)/i },
        { intent: 'NAVIGATE_CONTACT', regex: /(take me to|go to|show me|navigate to|open|get in touch).*(contact|hire|email|message|reach out)/i },

        // Music Control
        { intent: 'MUSIC_PAUSE', regex: /(stop|pause|halt|quiet|shut up|mute).*(music|song|track|audio|sound)?/i },
        { intent: 'MUSIC_NEXT', regex: /(next|skip|change|different).*(music|song|track|audio)?/i },
        { intent: 'MUSIC_PLAY_FLUTE', regex: /(play|start|put on).*(flute|krishna)/i },
        { intent: 'MUSIC_PLAY_GHADINA', regex: /(play|start|put on).*(ghadina|gar gar|phire)/i },
        { intent: 'MUSIC_PLAY_SHYAMAL', regex: /(play|start|put on).*(shyamal|sanware|new song)/i },
        { intent: 'MUSIC_PLAY_GENERIC', regex: /(play|start|put on|turn on).*(music|song|track|audio|something)/i },

        // --- WIDGET CONTROL ---
        { intent: 'TOGGLE_HAND_TRACKING', regex: /(turn on|turn off|enable|disable|start|stop|toggle).*(hand tracking|hand navigation|gestures)/i },
        { intent: 'OPEN_TERMINAL', regex: /(open|start|show|run).*(terminal|command line|console)/i },
        { intent: 'OPEN_CHATBOT', regex: /(open|start|show|talk to).*(chat|bot|chatbot|assistant text)/i },

        // --- GENERAL BROWSER ASSISTANT ---
        { intent: 'TIME', regex: /(what time is it|tell me the time|current time)/i },
        { intent: 'DATE', regex: /(what is the date|today's date|what day is it)/i },
        { intent: 'OPEN_WEBSITE', regex: /(open|go to|navigate to)\s+([a-z0-9-]+\.(com|org|net|in|co|io|edu))/i },
        { intent: 'WEB_SEARCH_YOUTUBE', regex: /(search youtube for|youtube|play on youtube)\s+(.*)/i },
        { intent: 'WEB_SEARCH_GOOGLE', regex: /(search google for|search for|look up|google)\s+(.*)/i },
      ];

      let matchedIntent = 'UNKNOWN';
      for (const { intent, regex } of intents) {
        if (regex.test(speechToText)) {
          matchedIntent = intent;
          break;
        }
      }

      console.log(`Resolved Intent: ${matchedIntent}`);

      // --- EXECUTE INTENT ---
      switch (matchedIntent) {
        case 'GREETING':
          speak('Hello! How can I help you today?');
          break;
        case 'IDENTITY':
          speak('I am Spidy, an advanced AI assistant created by Rohan.');
          break;
        case 'CREATOR':
          speak('I was engineered by Rohan Baviskar. He is a brilliant developer.');
          break;
        case 'COMPLIMENT':
          speak('Thank you! I try my best to be helpful.');
          break;
        case 'STATUS':
          speak('I am operating at optimal efficiency. All systems go!');
          break;
        case 'DOWNLOAD_RESUME':
          window.open('/Rohan_Baviskar_Resume.pdf', '_blank');
          speak('Downloading Rohan\'s resume for you right now.');
          break;
        case 'SCROLL_DOWN':
          window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
          speak('Scrolling down.');
          break;
        case 'SCROLL_UP':
          window.scrollBy({ top: -window.innerHeight * 0.8, behavior: 'smooth' });
          speak('Scrolling up.');
          break;
        case 'GO_TOP':
          window.scrollTo({ top: 0, behavior: 'smooth' });
          speak('Taking you to the top of the page.');
          break;
        case 'GO_BOTTOM':
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          speak('Going to the bottom.');
          break;
        case 'NAVIGATE_ABOUT':
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          speak('Here is everything you need to know about Rohan.');
          break;
        case 'NAVIGATE_PROJECTS':
          document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
          speak('Showcasing Rohan\'s latest projects and creations.');
          break;
        case 'NAVIGATE_SKILLS':
          document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
          speak('Entering the engineering and technology stack.');
          break;
        case 'NAVIGATE_EXPERIENCE':
          document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
          speak('Here is his professional work history.');
          break;
        case 'NAVIGATE_CONTACT':
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          speak('Going to the contact terminal. Send him a message!');
          break;
        case 'MUSIC_PAUSE':
          window.dispatchEvent(new CustomEvent('spidy-music', { detail: { action: 'pause' } }));
          speak('Pausing the audio track.');
          break;
        case 'MUSIC_NEXT':
          window.dispatchEvent(new CustomEvent('spidy-music', { detail: { action: 'next' } }));
          speak('Skipping to the next track.');
          break;
        case 'MUSIC_PLAY_FLUTE':
          window.dispatchEvent(new CustomEvent('spidy-music', { detail: { action: 'play', track: 0 } }));
          speak('Playing Krishna\'s Flute.');
          break;
        case 'MUSIC_PLAY_GHADINA':
          window.dispatchEvent(new CustomEvent('spidy-music', { detail: { action: 'play', track: 1 } }));
          speak('Playing Ghadina Gata Gar Gar Phire.');
          break;
        case 'MUSIC_PLAY_SHYAMAL':
          window.dispatchEvent(new CustomEvent('spidy-music', { detail: { action: 'play', track: 2 } }));
          speak('Playing Shyamal Sanware.');
          break;
        case 'MUSIC_PLAY_GENERIC':
          window.dispatchEvent(new CustomEvent('spidy-music', { detail: { action: 'play' } }));
          speak('Starting the background music.');
          break;
          
        // --- WIDGET CONTROL COMMANDS ---
        case 'TOGGLE_HAND_TRACKING':
          window.dispatchEvent(new CustomEvent('spidy-hand-tracking'));
          speak('Toggling the AI Hand Navigation system.');
          break;
        case 'OPEN_TERMINAL':
          window.dispatchEvent(new CustomEvent('spidy-terminal'));
          speak('Opening the developer terminal.');
          break;
        case 'OPEN_CHATBOT':
          window.dispatchEvent(new CustomEvent('spidy-chatbot'));
          speak('Opening the textual chat interface.');
          break;
          
        // --- GENERAL BROWSER ASSISTANT COMMANDS ---
        case 'TIME':
          const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          speak(`The current time is ${time}.`);
          break;
        case 'DATE':
          const date = new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
          speak(`Today is ${date}.`);
          break;
        case 'OPEN_WEBSITE': {
          const matchSite = speechToText.match(/(open|go to|navigate to)\s+([a-z0-9-]+\.(com|org|net|in|co|io|edu))/i);
          if (matchSite && matchSite[2]) {
            const url = `https://${matchSite[2]}`;
            window.open(url, '_blank');
            speak(`Opening ${matchSite[2]}`);
          }
          break;
        }
        case 'WEB_SEARCH_YOUTUBE': {
          const ytMatch = speechToText.match(/(search youtube for|youtube|play on youtube)\s+(.*)/i);
          if (ytMatch && ytMatch[2]) {
            const query = ytMatch[2].replace(/spid.*/i, '').trim(); // Remove wake word trailing
            window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, '_blank');
            speak(`Searching YouTube for ${query}`);
          }
          break;
        }
        case 'WEB_SEARCH_GOOGLE': {
          const gMatch = speechToText.match(/(search google for|search for|look up|google)\s+(.*)/i);
          if (gMatch && gMatch[2]) {
            const query = gMatch[2].replace(/spid.*/i, '').trim(); // Remove wake word trailing
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
            speak(`Searching the web for ${query}`);
          }
          break;
        }
        case 'UNKNOWN':
        default:
          // Ultimate fallback: Just search google!
          const fallbackQuery = speechToText.replace(/(hey|hi|hello|wake up|listen|spid.*|speed.*|spider)/ig, '').trim();
          if (fallbackQuery.length > 3) {
             window.open(`https://www.google.com/search?q=${encodeURIComponent(fallbackQuery)}`, '_blank');
             speak(`I don't know the answer, so I am searching the web for: ${fallbackQuery}`);
          } else {
             speak(`I am not sure what you mean, sir.`);
          }
          break;
      }

      setTimeout(() => setFeedback(''), 4000);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'not-allowed' || event.error === 'audio-capture') {
         setIsListening(false);
         setIsAwake(false);
      }
    };

    recognition.onend = () => {
      // CONTINUOUS LISTENING: Auto-restart if master switch is ON
      if (isListeningRef.current) {
        setTimeout(() => {
          try {
            recognitionRef.current?.start();
          } catch (e) {
            console.error("Failed to restart recognition", e);
          }
        }, 400); // Small delay to prevent Chrome InvalidStateError
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

        {isListening && debugText && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed bottom-4 left-4 z-[100] text-[10px] font-mono text-slate-500 pointer-events-none"
          >
            {debugText}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
