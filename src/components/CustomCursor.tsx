import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const requestRef = useRef<number>(0);
  const mousePos = useRef({ x: -100, y: -100 });
  const cursorVisPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      
      // Instantly update the dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const updateCursor = () => {
      // Smoothly interpolate the outer circle
      cursorVisPos.current.x += (mousePos.current.x - cursorVisPos.current.x) * 0.2;
      cursorVisPos.current.y += (mousePos.current.y - cursorVisPos.current.y) * 0.2;
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorVisPos.current.x}px, ${cursorVisPos.current.y}px, 0)`;
      }
      requestRef.current = requestAnimationFrame(updateCursor);
    };

    const onMouseOver = (e: MouseEvent) => {
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

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    requestRef.current = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Circle */}
      <div
        ref={cursorRef}
        className={`absolute top-0 left-0 w-8 h-8 -ml-4 -mt-4 border-2 rounded-full backdrop-blur-sm transition-colors duration-200 ${
          isHovering ? 'border-accent-cyan bg-accent-cyan/20 scale-150' : 'border-white/50 bg-white/10'
        }`}
        style={{ willChange: 'transform' }}
      />
      {/* Inner Dot */}
      <div
        ref={dotRef}
        className={`absolute top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full shadow-[0_0_10px_#06B6D4] transition-colors duration-200 ${
          isHovering ? 'bg-white' : 'bg-accent-cyan'
        }`}
        style={{ willChange: 'transform' }}
      />
    </div>
  );
}
