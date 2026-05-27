import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { FaChartBar, FaUsers, FaArrowUp, FaServer, FaCodeBranch, FaStar } from 'react-icons/fa';

const performanceData = [
  { name: 'Jan', queries: 4000, latency: 240 },
  { name: 'Feb', queries: 3000, latency: 139 },
  { name: 'Mar', queries: 2000, latency: 980 },
  { name: 'Apr', queries: 2780, latency: 390 },
  { name: 'May', queries: 1890, latency: 480 },
  { name: 'Jun', queries: 2390, latency: 380 },
  { name: 'Jul', queries: 3490, latency: 430 },
];

const githubStats = [
  { name: 'Java', value: 45, fill: '#ED8B00' },
  { name: 'TypeScript', value: 25, fill: '#3178C6' },
  { name: 'Python', value: 20, fill: '#3776AB' },
  { name: 'C++', value: 10, fill: '#00599C' },
];

export function AnalyticsSection() {
  return (
    <div className="container mx-auto px-6 md:px-12 relative z-10">
      <div className="flex flex-col items-center mb-16 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold font-heading mb-4 inline-block relative"
        >
          Analytics <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">Intelligence Hub</span>
          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-accent-blue to-transparent rounded" />
        </motion.h2>
        <p className="text-slate-400 max-w-2xl">
          A demonstration of data-driven thinking and performance monitoring capabilities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* KPI Cards */}
        {[
          { title: 'Data Processed', value: '5,234', unit: 'Records', change: '+25%', icon: FaChartBar, color: 'text-accent-cyan' },
          { title: 'Query Efficiency', value: '98.5', unit: '%', change: '+12%', icon: FaServer, color: 'text-accent-blue' },
          { title: 'User Retention', value: '84', unit: '%', change: '+5%', icon: FaUsers, color: 'text-accent-purple' },
        ].map((kpi, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-2xl border-white/5"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg bg-white/5 ${kpi.color}`}>
                <kpi.icon className="text-xl" />
              </div>
              <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-1 rounded">
                <FaArrowUp /> {kpi.change}
              </div>
            </div>
            <div className="text-slate-400 text-sm mb-1">{kpi.title}</div>
            <div className="text-3xl font-bold font-mono text-white">
              {kpi.value}<span className="text-lg text-slate-500 ml-1">{kpi.unit}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="lg:col-span-2 glass-card p-6 rounded-2xl border-white/5"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white font-heading">System Performance Metrics</h3>
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-accent-cyan shadow-[0_0_8px_#06B6D4]"></span>
              <span className="w-3 h-3 rounded-full bg-accent-blue shadow-[0_0_8px_#3B82F6]"></span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <AreaChart data={performanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="queries" stroke="#06B6D4" fillOpacity={1} fill="url(#colorQueries)" strokeWidth={2} />
                <Area type="monotone" dataKey="latency" stroke="#3B82F6" fillOpacity={1} fill="url(#colorLatency)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* GitHub Stats */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 rounded-2xl border-white/5 flex flex-col"
        >
          <div className="flex items-center gap-3 mb-6">
            <FaCodeBranch className="text-xl text-accent-purple" />
            <h3 className="text-lg font-bold text-white font-heading">Developer Activity</h3>
          </div>

          <div className="flex-1 flex flex-col justify-center">
             <div className="h-[200px] w-full mb-4">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <BarChart data={githubStats} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} width={80} />
                    <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '4px' }}/>
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
             </div>
             
             <div className="grid grid-cols-2 gap-4 mt-auto">
               <div className="bg-brand-900 rounded-lg p-3 text-center border border-white/5">
                 <div className="text-2xl font-mono text-white mb-1">124</div>
                 <div className="text-xs text-slate-400">Contributions</div>
               </div>
               <div className="bg-brand-900 rounded-lg p-3 text-center border border-white/5">
                 <div className="text-2xl font-mono text-white mb-1 flex items-center justify-center gap-1"><FaStar className="text-amber-400 text-sm"/> 12</div>
                 <div className="text-xs text-slate-400">Stars</div>
               </div>
             </div>
             
             <a href="https://github.com/Raj070612" target="_blank" rel="noreferrer" className="w-full mt-4 py-2 rounded border border-white/10 text-center text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
               View GitHub Profile
             </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
