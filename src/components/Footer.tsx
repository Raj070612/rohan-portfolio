import { FaGithub, FaLinkedin, FaEnvelope, FaChevronUp } from 'react-icons/fa';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-brand-900 border-t border-white/10 pt-16 pb-8 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-accent-cyan/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-32 bg-accent-cyan/10 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          {/* Brand */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <a href="#home" className="text-3xl font-bold font-heading text-white mb-2 group">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-blue group-hover:neon-text-cyan transition-all">RB</span>
            </a>
            <p className="text-slate-400 text-sm max-w-xs">
              Designing the future through intelligent software, data-driven insights, and modern engineering innovation.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a href="https://github.com/Raj070612" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-300 hover:text-white hover:border-accent-cyan/50 hover:bg-accent-cyan/10 transition-all group">
              <FaGithub className="text-xl group-hover:scale-110 transition-transform" />
            </a>
            <a href="https://linkedin.com/in/rohan-baviskar-559a01238" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-300 hover:text-white hover:border-accent-blue/50 hover:bg-accent-blue/10 transition-all group">
              <FaLinkedin className="text-xl group-hover:scale-110 transition-transform" />
            </a>
            <a href="mailto:rohanbaviskar612@gmail.com" className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-300 hover:text-white hover:border-accent-purple/50 hover:bg-accent-purple/10 transition-all group">
              <FaEnvelope className="text-xl group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Rohan Avinash Baviskar. All rights reserved.</p>
          <button 
            onClick={scrollToTop}
            className="mt-4 md:mt-0 flex items-center gap-2 hover:text-accent-cyan transition-colors"
          >
            <span>Back to top</span>
            <FaChevronUp className="text-xs" />
          </button>
        </div>
      </div>
    </footer>
  );
}
