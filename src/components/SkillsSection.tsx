import { motion } from 'framer-motion';
import { FaCode, FaDatabase, FaServer, FaTools, FaBrain } from 'react-icons/fa';

const skillCategories = [
  {
    title: 'Coding Languages',
    icon: FaCode,
    color: 'text-accent-blue',
    borderColor: 'border-accent-blue',
    bgColor: 'bg-accent-blue/10',
    skills: [
      { name: 'Java', level: 90 },
      { name: 'C++', level: 85 },
      { name: 'Python', level: 85 },
      { name: 'SQL', level: 95 },
      { name: 'C', level: 80 },
      { name: 'HTML', level: 95 }
    ]
  },
  {
    title: 'Database Systems',
    icon: FaDatabase,
    color: 'text-accent-cyan',
    borderColor: 'border-accent-cyan',
    bgColor: 'bg-accent-cyan/10',
    skills: [
      { name: 'MySQL', level: 90 },
    ]
  },
  {
    title: 'Tools',
    icon: FaTools,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-400',
    bgColor: 'bg-emerald-400/10',
    skills: [
      { name: 'Power BI', level: 90 },
      { name: 'Microsoft Excel', level: 95 },
      { name: 'IntelliJ IDEA', level: 85 },
      { name: 'Visual Studio Code', level: 95 },
      { name: 'Linux', level: 80 }
    ]
  },
  {
    title: 'Core Concepts',
    icon: FaBrain,
    color: 'text-amber-400',
    borderColor: 'border-amber-400',
    bgColor: 'bg-amber-400/10',
    skills: [
      { name: 'Algorithm Optimization', level: 85 },
      { name: 'OS Concepts', level: 80 },
      { name: 'SDLC', level: 85 },
      { name: 'Neural Networks', level: 70 },
      { name: 'Network Protocols', level: 75 }
    ]
  }
];

export default function SkillsSection() {
  return (
    <div className="container mx-auto px-6 md:px-12 relative z-10">
      <div className="flex flex-col items-center mb-16 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold font-heading mb-4 inline-block relative"
        >
          Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-blue">Command Center</span>
          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-accent-cyan to-transparent rounded" />
        </motion.h2>
        <p className="text-slate-400 max-w-2xl">
          A visualization of my technical ecosystem, representing the hybrid capabilities across software development, frontend architecture, and data analytics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`glass-card p-6 rounded-2xl border-t-2 ${category.borderColor}/50 hover:${category.borderColor} transition-colors group relative overflow-hidden`}
          >
            {/* Background Glow */}
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full ${category.bgColor} blur-2xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700`} />
            
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${category.bgColor} ${category.color} text-xl shadow-inner`}>
                <category.icon />
              </div>
              <h3 className="text-xl font-bold font-heading text-white">{category.title}</h3>
            </div>

            <div className="space-y-4 relative z-10">
              {category.skills.map((skill, sIdx) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-sm mb-1 text-slate-300">
                    <span className="font-medium">{skill.name}</span>
                    <span className="font-mono text-slate-500">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + sIdx * 0.1, duration: 1, ease: "easeOut" }}
                      className={`h-full ${category.bgColor.replace('/10', '')} shadow-[0_0_8px_currentColor]`}
                      style={{ color: category.color.replace('text-', '') }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
