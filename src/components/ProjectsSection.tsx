import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaLeaf, FaRobot, FaMobileAlt, FaDatabase } from 'react-icons/fa';
import ProjectModal from './ProjectModal';

export default function ProjectsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const virtualHerbalGardenData = {
    title: "Virtual Herbal Garden Website",
    description: "Immersive educational web platform",
    longDescription: [
      "Developed a responsive web application designed to enhance user's knowledge of herbal plants through interactive experiences.",
      "Impact: Encouraged awareness of herbal benefits, provided educational insights, and promoted accessible plant-based solutions through interactive features."
    ],
    features: [
      "Chat Bot",
      "Quizzes",
      "3D garden (3D plants view)",
      "Experts Consultancy"
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Three.js', 'Firebase', 'API integrations'],
    image: "/virtual-herbal-garden.png",
    liveUrl: "https://virtual-herbal-garden-hub.netlify.app/",
    githubUrl: "#"
  };

  return (
    <div className="container mx-auto px-6 md:px-12 relative z-10">
      <div className="flex flex-col items-center mb-16 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold font-heading mb-4 inline-block relative"
        >
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-blue">Engineering Case Studies</span>
          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-accent-cyan to-transparent rounded" />
        </motion.h2>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        onClick={() => setIsModalOpen(true)}
        className="glass-card rounded-3xl overflow-hidden border-t-2 border-accent-cyan/50 p-1 md:p-2 group cursor-none hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] transition-all"
      >
        <div className="bg-brand-900/80 rounded-[22px] md:rounded-[30px] p-6 md:p-10 flex flex-col lg:flex-row gap-12 relative overflow-hidden pointer-events-auto cursor-pointer">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Image/Mockup Section */}
          <div className="lg:w-1/2 relative group-hover:transform group-hover:scale-[1.02] transition-transform duration-700">
            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10 relative bg-brand-800 flex items-center justify-center">
               <img 
                 src="/virtual-herbal-garden.png" 
                 alt="Virtual Herbal Garden Project Screenshot" 
                 loading="lazy"
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
               />
               
               {/* Glass UI overlay elements to make it cinematic */}
               <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.5 }}
                 className="absolute bottom-4 left-4 glass px-3 py-2 rounded-lg border-white/20 flex items-center gap-2 backdrop-blur-md"
               >
                 <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                 <span className="text-xs font-mono text-slate-300">Live Status: Online</span>
               </motion.div>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-1/2 flex flex-col justify-center relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-accent-cyan/10 text-accent-cyan text-xs font-mono border border-accent-cyan/20">Featured Project</span>
              <span className="px-3 py-1 rounded-full bg-accent-purple/10 text-accent-purple text-xs font-mono border border-accent-purple/20">EdTech</span>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4 group-hover:text-accent-cyan transition-colors">
              Virtual Herbal Garden Hub
            </h3>
            
            <p className="text-slate-300 mb-8 leading-relaxed">
              Developed an immersive and responsive educational web platform focused on herbal awareness and interactive learning experiences using modern frontend technologies.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8 pointer-events-none">
              <div className="glass p-4 rounded-xl border-white/5 flex flex-col gap-2">
                <FaLeaf className="text-accent-cyan text-xl" />
                <span className="text-sm text-slate-200">3D Plant Viz</span>
              </div>
              <div className="glass p-4 rounded-xl border-white/5 flex flex-col gap-2">
                <FaRobot className="text-accent-blue text-xl" />
                <span className="text-sm text-slate-200">Chatbot Integration</span>
              </div>
              <div className="glass p-4 rounded-xl border-white/5 flex flex-col gap-2">
                <FaDatabase className="text-accent-purple text-xl" />
                <span className="text-sm text-slate-200">Firebase Backend</span>
              </div>
              <div className="glass p-4 rounded-xl border-white/5 flex flex-col gap-2">
                <FaMobileAlt className="text-emerald-400 text-xl" />
                <span className="text-sm text-slate-200">Responsive UI</span>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-8 pointer-events-none">
              {['React.js', 'Three.js', 'Firebase', 'CSS', 'JavaScript', 'APIs'].map(tech => (
                <span key={tech} className="text-xs font-mono text-slate-400 px-2 py-1 rounded bg-brand-800 border border-white/5">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 mt-auto">
              <button 
                onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}
                className="px-6 py-3 rounded-full bg-accent-cyan text-brand-900 font-bold flex items-center gap-2 hover:bg-white transition-colors"
              >
                View Case Study <FaExternalLinkAlt className="text-sm" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <ProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        project={virtualHerbalGardenData} 
      />
    </div>
  );
}
