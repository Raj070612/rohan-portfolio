import { motion } from 'framer-motion';
import { FaPython, FaDatabase, FaChartBar, FaChartLine, FaRobot, FaChartPie, FaTable, FaBook } from 'react-icons/fa';
import { Suspense, lazy } from 'react';

const WebGLScene = lazy(() => import('./WebGLScene'));

const techIcons = [
  { Icon: FaDatabase, color: '#4479A1', label: 'SQL' },
  { Icon: FaChartBar, color: '#F2C811', label: 'Power BI' },
  { Icon: FaPython, color: '#3776AB', label: 'Python' },
  { Icon: FaChartPie, color: '#E97627', label: 'Tableau' },
  { Icon: FaTable, color: '#150458', label: 'Pandas' },
  { Icon: FaRobot, color: '#FF9900', label: 'Machine Learning' },
  { Icon: FaBook, color: '#F37626', label: 'Jupyter' },
  { Icon: FaChartLine, color: '#06B6D4', label: 'Analytics' },
];

export default function HeroDashboard() {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      {/* Background 3D Scene */}
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <WebGLScene />
        </Suspense>
      </div>

      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-cyan/20 rounded-full blur-[80px]" />
      <div className="absolute top-1/3 left-1/3 w-48 h-48 bg-accent-blue/20 rounded-full blur-[60px]" />
      
      {/* Central Hub */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[400px] h-[400px] border border-white/5 rounded-full border-dashed"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[300px] h-[300px] border border-accent-cyan/20 rounded-full"
      />

      {/* Floating Dashboard Cards */}
      <motion.div 
        initial={{ opacity: 0, x: 50, y: -50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute -top-10 -right-10 md:top-0 md:right-0 w-48 glass-card p-4 rounded-xl border-accent-cyan/30"
        style={{ animation: 'float 6s ease-in-out infinite' }}
      >
        <div className="text-xs text-slate-400 mb-2">Performance Analytics</div>
        <div className="flex items-end gap-2">
          <div className="text-2xl font-bold font-mono text-accent-cyan">98.5%</div>
          <div className="text-xs text-emerald-400 mb-1">↑ 2.1%</div>
        </div>
        <div className="mt-3 flex gap-1 h-8 items-end">
          {[40, 70, 45, 90, 65, 100, 80].map((h, i) => (
            <motion.div 
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: 1 + i * 0.1 }}
              className="flex-1 bg-accent-blue/50 rounded-t-sm"
            />
          ))}
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: -50, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-10 -left-10 md:bottom-20 md:left-0 w-56 glass-card p-4 rounded-xl border-accent-purple/30 z-10"
        style={{ animation: 'float 7s ease-in-out infinite reverse' }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-accent-purple/20 flex items-center justify-center text-accent-purple">
            <FaChartBar />
          </div>
          <div>
            <div className="text-sm font-bold text-white">Data Pipeline</div>
            <div className="text-[10px] text-slate-400">Real-time Processing</div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: '90%' }} transition={{ delay: 1.5, duration: 1 }} className="h-full bg-gradient-to-r from-accent-purple to-accent-cyan" />
          </div>
          <div className="h-1.5 w-3/4 bg-slate-800 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: 1.7, duration: 1 }} className="h-full bg-gradient-to-r from-accent-purple to-accent-cyan" />
          </div>
        </div>
      </motion.div>

      {/* Floating Technology Icons */}
      {techIcons.map((tech, i) => {
        const angle = (i * 360) / techIcons.length;
        const radius = 150;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;

        return (
          <motion.div
            key={tech.label}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 + i * 0.1, type: 'spring' }}
            className="absolute flex items-center justify-center w-12 h-12 rounded-full glass border-white/20 text-2xl group hover:scale-125 transition-transform"
            style={{ 
              x, y,
              animation: `float ${5 + (i % 3)}s ease-in-out infinite ${(i % 2) * 2}s`
            }}
          >
            <tech.Icon style={{ color: tech.color }} />
            
            {/* Tooltip */}
            <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono bg-slate-800 px-2 py-1 rounded text-white pointer-events-none whitespace-nowrap">
              {tech.label}
            </div>
          </motion.div>
        );
      })}

      {/* Center Core */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring', bounce: 0.5 }}
        className="relative z-20 w-24 h-24 rounded-full bg-brand-900 border-2 border-accent-cyan flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.4)]"
      >
        <span className="font-heading font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-br from-accent-cyan to-accent-blue">RB</span>
        <div className="absolute inset-0 rounded-full bg-accent-cyan/20 animate-ping" />
      </motion.div>
    </div>
  );
}
