import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaMusic, FaStepForward, FaList } from 'react-icons/fa';

const PLAYLIST = [
  { id: 1, title: "Krishna's Flute", file: "/flute.mp3" },
  { id: 2, title: "Ghadina Gata Gar Gar Phire", file: "/ghadina-gata.webm" },
  { id: 3, title: "Shyamal Sanware", file: "/shyamal-sanware.webm" }
];

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      // When changing tracks, if it was playing, play the new one
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      }
    }

    const handleSpidyMusic = (e: any) => {
      const { action, track } = e.detail;
      if (action === 'pause') {
        if (audioRef.current) audioRef.current.pause();
        setIsPlaying(false);
      } else if (action === 'play') {
        if (track !== undefined && track >= 0 && track < PLAYLIST.length) {
          setCurrentTrackIndex(track);
        }
        setIsPlaying(true);
        if (audioRef.current) {
          audioRef.current.play().catch(console.error);
        }
      } else if (action === 'next') {
        setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
        setIsPlaying(true);
      }
    };

    window.addEventListener('spidy-music', handleSpidyMusic);
    return () => window.removeEventListener('spidy-music', handleSpidyMusic);
  }, [currentTrackIndex, isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
    if (!isPlaying) setIsPlaying(true);
  };

  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    if (!isPlaying) setIsPlaying(true);
  };

  const currentTrack = PLAYLIST[currentTrackIndex];

  return (
    <div className="fixed bottom-6 right-6 z-[100] md:bottom-10 md:right-10 flex flex-col items-end">
      <audio 
        ref={audioRef} 
        src={currentTrack.file} 
        onEnded={nextTrack}
      />
      
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 glass-card p-4 rounded-2xl w-64 border-accent-cyan/30 shadow-[0_0_30px_rgba(6,182,212,0.15)] origin-bottom-right"
          >
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <FaList className="text-accent-cyan" /> Playlist
              </span>
              <span className="text-[10px] uppercase text-accent-cyan font-mono animate-pulse">
                {isPlaying ? 'Playing' : 'Paused'}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              {PLAYLIST.map((track, idx) => (
                <button
                  key={track.id}
                  onClick={() => selectTrack(idx)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    currentTrackIndex === idx 
                      ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30' 
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="truncate">{track.title}</div>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between bg-brand-900/50 rounded-xl p-2 border border-white/5">
              <div className="truncate text-xs font-medium text-white px-2">
                {currentTrack.title}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={togglePlay} className="p-2 text-slate-300 hover:text-accent-cyan transition-colors">
                  {isPlaying ? <FaPause size={12} /> : <FaPlay size={12} />}
                </button>
                <button onClick={nextTrack} className="p-2 text-slate-300 hover:text-accent-cyan transition-colors">
                  <FaStepForward size={12} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        title="Toggle Music Player"
        className="w-14 h-14 rounded-full glass flex items-center justify-center text-accent-cyan border border-accent-cyan/40 shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all group overflow-hidden relative cursor-pointer"
      >
        {isPlaying ? (
          <>
            <FaMusic className="text-lg z-10 relative text-white" />
            {/* Rippling effect while playing */}
            <span className="absolute inset-0 rounded-full border-2 border-accent-cyan animate-ping opacity-30" />
            <div className="absolute inset-0 bg-accent-cyan/20 animate-pulse" />
          </>
        ) : (
          <FaMusic className="text-lg text-white group-hover:text-accent-cyan transition-colors" />
        )}
      </motion.button>
    </div>
  );
}
