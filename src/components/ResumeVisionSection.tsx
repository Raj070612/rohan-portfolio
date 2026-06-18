import { motion } from 'framer-motion';
import { FaCertificate, FaFileAlt, FaLightbulb, FaDownload } from 'react-icons/fa';

export function ResumeVisionSection() {
  return (
    <div className="container mx-auto px-6 md:px-12 relative z-10 space-y-24">
      {/* Certifications Vault & Resume */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Achievement Vault */}
        <div>
          <h3 className="text-2xl font-bold font-heading mb-6 flex items-center gap-3">
            <FaCertificate className="text-amber-400" /> Achievement Vault
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['Internship Completion', 'Data Analytics Workshop', 'DSA Certification', 'Frontend Masterclass'].map((cert, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="glass p-4 rounded-xl border border-white/5 hover:border-amber-400/30 transition-colors flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-full bg-amber-400/10 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <FaCertificate />
                </div>
                <div className="text-sm font-medium text-slate-200">{cert}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Cinematic Resume Experience */}
        <div>
          <h3 className="text-2xl font-bold font-heading mb-6 flex items-center gap-3">
            <FaFileAlt className="text-emerald-400" /> Engineering Profile
          </h3>
          <motion.div 
            whileHover={{ y: -5 }}
            className="glass-card p-8 rounded-2xl border-t-2 border-emerald-400/50 flex flex-col items-center text-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-transparent pointer-events-none" />
            <div className="w-20 h-20 rounded-full bg-emerald-400/20 flex items-center justify-center mb-4 text-3xl text-emerald-400 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(52,211,153,0.3)] transition-all">
              <FaFileAlt />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Rohan Avinash Baviskar</h4>
            <p className="text-sm text-slate-400 mb-6">Complete overview of experience, education, skills, and projects.</p>
            <a 
              href="/Rohan_Baviskar_Resume.pdf" 
              target="_blank" 
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full glass hover:bg-white/10 text-white font-medium transition-all hover:scale-105 active:scale-95"
            >
              Download Full Resume <FaDownload />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Vision / Future Goals */}
      <div>
        <h3 className="text-3xl font-bold font-heading mb-10 text-center flex items-center justify-center gap-3">
          <FaLightbulb className="text-accent-purple" /> Innovation Roadmap
        </h3>
        
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/5 -translate-y-1/2 hidden md:block" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: 'Big Data Processing', desc: 'Mastering distributed computing with Apache Spark and Hadoop.' },
              { title: 'Advanced BI', desc: 'Developing automated, real-time enterprise dashboards.' },
              { title: 'Predictive Analytics', desc: 'Deep diving into machine learning and forecasting models.' },
              { title: 'Data Strategy', desc: 'Bridging the gap between raw data and business operations.' },
            ].map((goal, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative z-10"
              >
                <div className="hidden md:flex w-6 h-6 rounded-full bg-brand-900 border-2 border-accent-purple items-center justify-center mx-auto mb-4 z-10 shadow-[0_0_10px_rgba(139,92,246,0.5)]">
                  <div className="w-2 h-2 bg-accent-purple rounded-full animate-ping" />
                </div>
                <div className="glass-card p-6 rounded-xl border-t-2 border-accent-purple/30 text-center hover:-translate-y-2 transition-transform">
                  <h4 className="text-lg font-bold text-white mb-2">{goal.title}</h4>
                  <p className="text-sm text-slate-400">{goal.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
