import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Analytics', href: '#analytics' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navLinks.map(link => link.name.toLowerCase());
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        isScrolled ? 'py-4 glass' : 'py-6 bg-transparent'
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#home" className="text-2xl font-bold font-heading text-white flex items-center gap-2 group">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-blue group-hover:neon-text-cyan transition-all">RB</span>
          <span className="text-sm font-mono text-slate-400 group-hover:text-slate-200 transition-colors hidden sm:block">.dev</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-white relative',
                    activeSection === link.name.toLowerCase() ? 'text-white' : 'text-slate-400'
                  )}
                  onClick={() => setActiveSection(link.name.toLowerCase())}
                >
                  {link.name}
                  {activeSection === link.name.toLowerCase() && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-accent-cyan shadow-[0_0_8px_#06B6D4]"
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="px-5 py-2 text-sm font-medium text-white border border-accent-cyan/50 rounded-full hover:bg-accent-cyan/10 hover:border-accent-cyan transition-all neon-text-cyan"
          >
            Hire Me
          </a>
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="space-y-1.5">
            <span className={cn("block w-6 h-0.5 bg-current transform transition-all", isMobileMenuOpen ? "rotate-45 translate-y-2" : "")}></span>
            <span className={cn("block w-6 h-0.5 bg-current transition-all", isMobileMenuOpen ? "opacity-0" : "")}></span>
            <span className={cn("block w-6 h-0.5 bg-current transform transition-all", isMobileMenuOpen ? "-rotate-45 -translate-y-2" : "")}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10"
          >
            <ul className="flex flex-col py-4 px-6 gap-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-slate-300 hover:text-white font-medium"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
