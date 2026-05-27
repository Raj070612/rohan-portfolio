import { motion } from 'framer-motion';
import { FaBriefcase, FaChartLine, FaCode } from 'react-icons/fa';

const experiences = [
  {
    role: 'Data Analytics Intern',
    company: 'Maxgen Technologies Pvt. Ltd.',
    duration: 'June 2025 – July 2025',
    icon: FaChartLine,
    colorClasses: {
      bg: 'bg-accent-cyan',
      text: 'text-accent-cyan',
      border: 'border-accent-cyan',
      bgLight: 'bg-accent-cyan/10',
      borderLight: 'border-accent-cyan/50',
      shadow: 'shadow-[0_0_20px_rgba(6,182,212,0.5)]',
    },
    responsibilities: [
      'Cleaned and analyzed 5000+ records to extract meaningful business insights.',
      'Built 4+ interactive Power BI dashboards for performance tracking.',
      'Improved reporting efficiency by 25% through automated data pipelines.',
      'Utilized Python, SQL, Excel, and Power BI for comprehensive data solutions.'
    ],
  },
  {
    role: 'C++ Programming Intern',
    company: 'TechnoHacks Solutions',
    duration: 'June 2024 – July 2024',
    icon: FaCode,
    colorClasses: {
      bg: 'bg-accent-blue',
      text: 'text-accent-blue',
      border: 'border-accent-blue',
      bgLight: 'bg-accent-blue/10',
      borderLight: 'border-accent-blue/50',
      shadow: 'shadow-[0_0_20px_rgba(59,130,246,0.5)]',
    },
    responsibilities: [
      'Solved complex Data Structures and Algorithms (DSA) problems.',
      'Optimized algorithms to reduce time and space complexities.',
      'Implemented Standard Template Library (STL) concepts efficiently.',
      'Applied Object-Oriented Programming (OOP) principles and collaborated using Git.'
    ],
  }
];

export default function ExperienceSection() {
  return (
    <div className="container mx-auto px-6 md:px-12">
      <div className="flex flex-col items-center mb-16 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold font-heading mb-4 inline-block relative"
        >
          Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-cyan">Experience</span>
          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-accent-purple to-transparent rounded" />
        </motion.h2>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Central Timeline Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2" />

        <div className="space-y-12">
          {experiences.map((exp, idx) => (
            <div key={idx} className={`relative flex flex-col md:flex-row items-center justify-between ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Timeline Node */}
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className={`absolute left-8 md:left-1/2 w-12 h-12 rounded-full border-4 border-brand-900 ${exp.colorClasses.bg} -translate-x-1/2 flex items-center justify-center text-brand-900 ${exp.colorClasses.shadow} z-10`}
              >
                <exp.icon className="text-xl" />
              </motion.div>

              {/* Content Card */}
              <motion.div 
                initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-full pl-24 md:pl-0 md:w-[calc(50%-3rem)]"
              >
                <div className={`glass-card p-6 md:p-8 rounded-2xl border-t-2 ${exp.colorClasses.borderLight} relative overflow-hidden group`}>
                  {/* Decorative Glow */}
                  <div className={`absolute top-0 right-0 w-32 h-32 ${exp.colorClasses.bgLight} rounded-full blur-3xl -mr-16 -mt-16`} />
                  
                  <div className="flex flex-col gap-1 mb-4 relative z-10">
                    <span className={`text-sm font-mono ${exp.colorClasses.text} ${exp.colorClasses.bgLight} px-3 py-1 rounded-full w-fit mb-2`}>
                      {exp.duration}
                    </span>
                    <h3 className="text-2xl font-bold font-heading text-white">{exp.role}</h3>
                    <h4 className="text-lg text-slate-300 flex items-center gap-2">
                      <FaBriefcase className="text-slate-500" /> {exp.company}
                    </h4>
                  </div>

                  <ul className="space-y-3 relative z-10">
                    {exp.responsibilities.map((req, i) => (
                      <li key={i} className="text-sm text-slate-400 flex items-start gap-3">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${exp.colorClasses.bg} shrink-0 shadow-[0_0_5px_currentColor]`} />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Decorative tech bar at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 flex opacity-30 group-hover:opacity-100 transition-opacity">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className={`flex-1 ${exp.colorClasses.bg} border-r border-brand-900`} style={{ opacity: Math.random() * 0.5 + 0.5 }} />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
