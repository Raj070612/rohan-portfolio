import { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCamera, FaChevronUp, FaChevronDown } from 'react-icons/fa';

// Global declarations for MediaPipe CDN scripts
declare global {
  interface Window {
    Hands: any;
    Camera: any;
    VERSION?: string;
  }
}

export default function HandTracking({ onClose }: { onClose: () => void }) {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isPinching, setIsPinching] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | 'none'>('none');
  
  // Refs for smooth continuous scrolling
  const scrollSpeedRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const isUnmounted = useRef(false);

  // Continuous scroll loop
  useEffect(() => {
    isUnmounted.current = false;
    const scrollLoop = () => {
      if (scrollSpeedRef.current !== 0 && !isUnmounted.current) {
        window.scrollBy({ top: scrollSpeedRef.current, behavior: 'auto' });
      }
      animationFrameRef.current = requestAnimationFrame(scrollLoop);
    };
    animationFrameRef.current = requestAnimationFrame(scrollLoop);

    return () => {
      isUnmounted.current = true;
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  useEffect(() => {
    let camera: any = null;
    let hands: any = null;

    if (!window.Hands) {
      console.error("MediaPipe Hands not loaded from CDN.");
      return;
    }

    try {
      hands = new window.Hands({
        locateFile: (file: string) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        }
      });

      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.7
      });

      const onResults = (results: any) => {
        if (isUnmounted.current) return;
        if (!isModelLoaded) setIsModelLoaded(true);
        
        const canvasCtx = canvasRef.current?.getContext('2d');
        if (canvasCtx && canvasRef.current) {
          canvasCtx.save();
          canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          
          if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            const landmarks = results.multiHandLandmarks[0];
            
            // Draw minimal skeleton (Index and Thumb)
            canvasCtx.strokeStyle = '#06B6D4';
            canvasCtx.lineWidth = 2;
            canvasCtx.beginPath();
            canvasCtx.moveTo(landmarks[5].x * 320, landmarks[5].y * 240);
            canvasCtx.lineTo(landmarks[8].x * 320, landmarks[8].y * 240);
            canvasCtx.stroke();
            
            canvasCtx.beginPath();
            canvasCtx.moveTo(landmarks[2].x * 320, landmarks[2].y * 240);
            canvasCtx.lineTo(landmarks[4].x * 320, landmarks[4].y * 240);
            canvasCtx.stroke();

            const indexTip = landmarks[8];
            const thumbTip = landmarks[4];

            // 1. Virtual Cursor mapping (mirror the x axis)
            let screenX = (1 - indexTip.x) * window.innerWidth;
            let screenY = indexTip.y * window.innerHeight;
            
            // Clamp to screen bounds
            screenX = Math.max(0, Math.min(window.innerWidth, screenX));
            screenY = Math.max(0, Math.min(window.innerHeight, screenY));
            
            setCursorPos({ x: screenX, y: screenY });

            // 2. Continuous Scroll Logic
            const scrollZoneHeight = window.innerHeight * 0.20; // Increased to 20% for easier scrolling
            if (screenY < scrollZoneHeight) {
              scrollSpeedRef.current = -12; // Smoother Scroll Up
              setScrollDirection('up');
            } else if (screenY > window.innerHeight - scrollZoneHeight) {
              scrollSpeedRef.current = 12; // Smoother Scroll Down
              setScrollDirection('down');
            } else {
              scrollSpeedRef.current = 0; // Stop scrolling
              setScrollDirection('none');
            }

            // 3. Pinch Detection (Clicking)
            const distance = Math.sqrt(
              Math.pow(indexTip.x - thumbTip.x, 2) + Math.pow(indexTip.y - thumbTip.y, 2)
            );
            
            if (distance < 0.08) { 
              if (!isPinching) {
                setIsPinching(true);
                
                // Trigger a robust click
                const el = document.elementFromPoint(screenX, screenY);
                if (el && el instanceof HTMLElement) {
                  const originalBoxShadow = el.style.boxShadow;
                  el.style.boxShadow = '0 0 30px #06B6D4, inset 0 0 20px #06B6D4';
                  
                  const clickEvent = new MouseEvent('click', { view: window, bubbles: true, cancelable: true });
                  el.dispatchEvent(clickEvent);
                  
                  if (typeof el.click === 'function') {
                    el.click();
                  }

                  setTimeout(() => { if (!isUnmounted.current) el.style.boxShadow = originalBoxShadow; }, 400);
                }
              }
            } else {
              setIsPinching(false);
            }

          } else {
            // No hand detected
            scrollSpeedRef.current = 0;
            setScrollDirection('none');
            setCursorPos({ x: -100, y: -100 });
          }
          canvasCtx.restore();
        }
      };

      hands.onResults(onResults);

      if (webcamRef.current && webcamRef.current.video && window.Camera) {
        camera = new window.Camera(webcamRef.current.video, {
          onFrame: async () => {
            if (isUnmounted.current) return;
            if (webcamRef.current && webcamRef.current.video && hands) {
              try {
                await hands.send({ image: webcamRef.current.video });
              } catch (e) {
                console.warn("Hand tracking frame skipped:", e);
              }
            }
          },
          width: 320,
          height: 240
        });
        camera.start();
      }
    } catch (error) {
       console.error("Failed to initialize MediaPipe", error);
    }

    return () => {
      isUnmounted.current = true;
      if (camera) {
        camera.stop();
      }
      if (hands) {
        try { hands.close(); } catch (e) {}
      }
      scrollSpeedRef.current = 0;
    };
  }, []);

  return (
    <>
      {/* Visual Scroll Zones (Visible only when hand tracking is active) */}
      <AnimatePresence>
        {isModelLoaded && scrollDirection === 'up' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-full h-[15vh] bg-gradient-to-b from-accent-cyan/20 to-transparent pointer-events-none z-[9998] flex items-start justify-center pt-4"
          >
            <FaChevronUp className="text-accent-cyan text-4xl animate-bounce opacity-70" />
          </motion.div>
        )}
        {isModelLoaded && scrollDirection === 'down' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed bottom-0 left-0 w-full h-[15vh] bg-gradient-to-t from-accent-cyan/20 to-transparent pointer-events-none z-[9998] flex items-end justify-center pb-4"
          >
            <FaChevronDown className="text-accent-cyan text-4xl animate-bounce opacity-70" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Picture in Picture Camera */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-24 right-6 md:right-10 z-[100] w-48 md:w-64 glass-card rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.2)] border-accent-cyan/30"
      >
        <div className="bg-brand-900/80 p-2 border-b border-white/10 flex justify-between items-center">
          <span className="text-xs font-bold text-accent-cyan flex items-center gap-2">
            <FaCamera /> AI Vision
          </span>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <FaTimes size={14} />
          </button>
        </div>
        
        <div className="relative aspect-video bg-black">
          {!isModelLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-accent-cyan/70 text-xs">
              <span className="w-5 h-5 border-2 border-accent-cyan border-t-transparent rounded-full animate-spin mb-2" />
              Loading Model...
            </div>
          )}
          <Webcam
            ref={webcamRef}
            mirrored={true}
            className="absolute inset-0 w-full h-full object-cover opacity-50"
            width={320}
            height={240}
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full transform scale-x-[-1]"
            width={320}
            height={240}
          />
        </div>
        <div className="p-2 bg-brand-900/80 text-[10px] text-slate-400 flex flex-col gap-1">
          <div className="flex justify-between">
            <span>Scroll:</span> <span className="text-white">Move to Top/Bottom Edge</span>
          </div>
          <div className="flex justify-between">
            <span>Click:</span> <span className="text-white">Pinch Fingers 🤏</span>
          </div>
        </div>
      </motion.div>

      {/* Virtual AI Cursor */}
      {isModelLoaded && cursorPos.x > 0 && (
        <div 
          className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"
        >
          <motion.div
            animate={{ 
              x: cursorPos.x - 16, 
              y: cursorPos.y - 16,
              scale: isPinching ? 0.8 : 1
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 300, mass: 0.2 }}
            className={`absolute w-8 h-8 rounded-full border-2 flex items-center justify-center backdrop-blur-sm transition-colors ${
              isPinching ? 'bg-accent-cyan/40 border-accent-cyan' : 'bg-white/10 border-white/50'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${isPinching ? 'bg-white shadow-[0_0_10px_#fff]' : 'bg-accent-cyan shadow-[0_0_10px_#06B6D4]'}`} />
          </motion.div>
        </div>
      )}
    </>
  );
}
