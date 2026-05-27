import { motion } from 'framer-motion';
import { FaGraduationCap, FaBrain, FaChartBar, FaLaptopCode, FaRocket } from 'react-icons/fa';

const education = [
  {
    degree: 'B.E Computer Engineering',
    year: '2022–2026',
    status: 'Present',
  },
  {
    degree: 'HSC Science',
    year: '2021–2022',
    status: 'Completed',
  }
];

const interests = [
  { icon: FaChartBar, label: 'Data Analytics', color: 'text-accent-cyan' },
  { icon: FaLaptopCode, label: 'Full Stack Development', color: 'text-accent-blue' },
  { icon: FaBrain, label: 'DSA & Problem Solving', color: 'text-accent-purple' },
];

const features = [
  { title: 'Data-Driven Thinking', desc: 'Transforming raw data into actionable insights.' },
  { title: 'Scalable Architecture', desc: 'Building systems that grow with business needs.' },
  { title: 'Frontend Creativity', desc: 'Designing premium, immersive user experiences.' },
  { title: 'Adaptability', desc: 'Rapid learning and execution in fast-paced environments.' }
];

export default function AboutSection() {
  return (
    <div className="container mx-auto px-6 md:px-12 relative z-10">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        {/* Left Side: Cinematic Portrait */}
        <div className="lg:w-2/5 flex justify-center lg:justify-end">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 rounded-full border-2 border-accent-cyan/30 border-dashed animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-4 rounded-full border border-accent-blue/50 animate-[spin_15s_linear_infinite_reverse]" />
            <div className="absolute inset-8 rounded-full bg-brand-800 flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.3)] border-2 border-white/10">
              <img 
                src="/profile.png" 
                alt="Rohan Avinash Baviskar" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-accent-cyan to-accent-purple opacity-20 blur-3xl rounded-full -z-10" />
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="lg:w-3/5 text-center lg:text-left">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-heading mb-6"
          >
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">Data-Driven Solutions</span>
          </motion.h2>
          
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            I am a Data Analyst driven by the challenge of transforming complex datasets into actionable business intelligence. With a strong foundation in computer engineering, I specialize in SQL, Power BI, Python, and data modeling. I believe that every dataset tells a story, and my expertise lies in uncovering those narratives to drive strategic decisions and optimize processes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {interests.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ y: -5 }}
                className="glass-card p-4 rounded-xl flex items-center gap-4 border-white/5 hover:border-white/20 transition-colors"
              >
                <div className={`p-3 rounded-lg bg-white/5 ${item.color}`}>
                  <item.icon className="text-xl" />
                </div>
                <div className="text-sm font-medium text-slate-200">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Education Timeline */}
        <div className="lg:w-1/3">
          <h3 className="text-2xl font-bold font-heading mb-8 flex items-center gap-3">
            <FaGraduationCap className="text-accent-cyan" /> Education
          </h3>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
            {education.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-brand-900 bg-accent-cyan text-brand-900 shadow-[0_0_15px_rgba(6,182,212,0.5)] z-10">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl glass-card border-white/5 group-hover:border-accent-cyan/50 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-accent-cyan">{item.year}</span>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 bg-white/5 px-2 py-1 rounded">{item.status}</span>
                  </div>
                  <div className="font-heading text-lg text-white">{item.degree}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Why Hire Me */}
        <div className="lg:w-2/3">
          <h3 className="text-2xl font-bold font-heading mb-8 flex items-center gap-3">
            <FaRocket className="text-accent-blue" /> Why Hire Me
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="p-6 rounded-2xl glass-card relative overflow-hidden group border-white/5 hover:border-accent-blue/30"
              >
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-accent-blue/10 rounded-full blur-2xl group-hover:bg-accent-blue/20 transition-colors" />
                <h4 className="text-xl font-bold font-heading mb-2 text-white">{feature.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
