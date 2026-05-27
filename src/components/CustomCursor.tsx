import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Main dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-accent-cyan rounded-full pointer-events-none z-[100] mix-blend-screen shadow-[0_0_10px_#06B6D4]"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      />
      
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-accent-cyan/50 rounded-full pointer-events-none z-[99]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(6, 182, 212, 0.1)' : 'transparent',
          borderColor: isHovering ? 'rgba(6, 182, 212, 0.8)' : 'rgba(6, 182, 212, 0.5)'
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 20, mass: 0.8 }}
      />
    </>
  );
}
