import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    longDescription: string[];
    tech: string[];
    image: string;
    liveUrl: string;
    githubUrl: string;
    features: string[];
  } | null;
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-900/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 md:p-8"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-brand-800 border border-white/10 rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative shadow-2xl flex flex-col hide-scrollbar"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-10"
              >
                <FaTimes />
              </button>

              {/* Header Image */}
              <div className="w-full h-64 md:h-80 relative bg-brand-900">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-800 to-transparent" />
                <div className="absolute bottom-6 left-6 md:left-10">
                  <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-2">{project.title}</h2>
                  <p className="text-accent-cyan font-mono text-sm md:text-base">{project.description}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-10 flex flex-col lg:flex-row gap-10">
                <div className="lg:w-2/3 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Project Overview</h3>
                    {project.longDescription.map((paragraph, i) => (
                      <p key={i} className="text-slate-300 leading-relaxed mb-4">{paragraph}</p>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
                    <ul className="space-y-2">
                      {project.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-accent-cyan mt-1">▹</span>
                          <span className="text-slate-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:w-1/3 space-y-8">
                  <div>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map(tech => (
                        <span key={tech} className="px-3 py-1 rounded bg-white/5 border border-white/10 text-slate-300 text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="w-full py-3 rounded-lg bg-accent-cyan text-brand-900 font-bold flex items-center justify-center gap-2 hover:bg-white transition-colors">
                      View Live Site <FaExternalLinkAlt className="text-sm" />
                    </a>
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="w-full py-3 rounded-lg border border-white/20 text-white font-bold flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
                      View Source Code <FaGithub className="text-lg" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
