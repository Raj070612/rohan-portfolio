import { motion } from 'framer-motion';
import HeroDashboard from '../components/HeroDashboard';
import AnalyticsPlayground from '../components/AnalyticsPlayground';
import ParticleNetwork from '../components/ParticleNetwork';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import ExperienceSection from '../components/ExperienceSection';
import ProjectsSection from '../components/ProjectsSection';
import { AnalyticsSection } from '../components/AnalyticsSection';
import ContactSection from '../components/ContactSection';
import { ResumeVisionSection } from '../components/ResumeVisionSection';
import { FaDownload, FaArrowRight } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      {/* 1. Hero Section - Data Analyst Focus */}
      <section id="home" className="min-h-screen relative flex items-center justify-center overflow-hidden pt-20 pb-10">
        <div className="absolute inset-0 bg-brand-900 -z-20" />
        <ParticleNetwork />
        
        <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
          <div className="lg:w-1/2 z-10 flex flex-col items-start pt-10 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-accent-cyan/30 text-accent-cyan text-sm font-mono mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse"></span>
              Data Analyst & Engineering Student
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Transforming Raw Data into <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-blue neon-text-cyan">Strategic Intelligence</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-slate-400 text-lg mb-8 max-w-lg leading-relaxed"
            >
              Data Analyst passionate about uncovering hidden patterns, building interactive dashboards, and driving business decisions through advanced analytics and visualization.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <a href="#projects" className="px-6 py-3 rounded-full bg-gradient-to-r from-accent-cyan to-accent-blue text-white font-medium flex items-center gap-2 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all group">
                Explore Projects
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="/Rohan_Baviskar_Resume.pdf" target="_blank" className="px-6 py-3 rounded-full glass hover:bg-white/10 text-white font-medium flex items-center gap-2 transition-all">
                Download Resume
                <FaDownload />
              </a>
            </motion.div>
          </div>
          
          <div className="lg:w-1/2 w-full z-10 flex justify-center lg:justify-end mt-12 lg:mt-0">
             <HeroDashboard />
          </div>
        </div>
      </section>

      {/* Analytics Playground - TOP 1% FEATURE */}
      <section className="py-12 relative overflow-hidden border-t border-white/5 bg-brand-900">
        <AnalyticsPlayground />
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative overflow-hidden border-t border-white/5 bg-brand-800/30">
        <AboutSection />
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 relative overflow-hidden border-t border-white/5 bg-brand-900">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-cyan/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <SkillsSection />
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 relative overflow-hidden border-t border-white/5 bg-brand-800/30">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-accent-purple/5 rounded-full blur-[100px] -z-10 pointer-events-none -translate-y-1/2" />
        <ExperienceSection />
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 relative overflow-hidden border-t border-white/5 bg-brand-900">
        <ProjectsSection />
      </section>

      {/* Analytics Section */}
      <section id="analytics" className="py-24 relative overflow-hidden border-t border-white/5 bg-brand-800/30">
        <AnalyticsSection />
      </section>

      {/* Resume & Vision Section */}
      <section id="resume-vision" className="py-24 relative overflow-hidden border-t border-white/5 bg-brand-900">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-400/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
         <ResumeVisionSection />
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative overflow-hidden border-t border-white/5 bg-brand-800/30">
        <ContactSection />
      </section>
    </div>
  );
}
