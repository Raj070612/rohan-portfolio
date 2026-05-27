import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaChartLine, FaServer, FaUsers, FaGithub, FaFilter } from 'react-icons/fa';

// Dummy data for different metrics
const dataSets: Record<string, any[]> = {
  revenue: [
    { name: 'Jan', value: 4000 }, { name: 'Feb', value: 5500 }, { name: 'Mar', value: 4800 },
    { name: 'Apr', value: 7200 }, { name: 'May', value: 8500 }, { name: 'Jun', value: 11000 },
  ],
  users: [
    { name: 'Jan', value: 1200 }, { name: 'Feb', value: 2100 }, { name: 'Mar', value: 3500 },
    { name: 'Apr', value: 4200 }, { name: 'May', value: 5800 }, { name: 'Jun', value: 8900 },
  ],
  performance: [
    { name: 'Jan', value: 85 }, { name: 'Feb', value: 88 }, { name: 'Mar', value: 92 },
    { name: 'Apr', value: 90 }, { name: 'May', value: 96 }, { name: 'Jun', value: 99 },
  ]
};

type Metric = 'revenue' | 'users' | 'performance' | 'github';

export default function AnalyticsPlayground() {
  const [activeMetric, setActiveMetric] = useState<Metric>('revenue');
  const [githubData, setGithubData] = useState<any[]>([]);
  const [isLoadingGithub, setIsLoadingGithub] = useState(false);

  // Fetch GitHub Events to show live activity
  useEffect(() => {
    async function fetchGithub() {
      setIsLoadingGithub(true);
      try {
        const res = await fetch('https://api.github.com/users/Raj070612/events/public?per_page=30');
        const data = await res.json();
        
        if (Array.isArray(data)) {
          // Process events by day
          const activityMap: Record<string, number> = {};
          
          // Initialize last 7 days with 0
          for(let i=6; i>=0; i--) {
             const d = new Date();
             d.setDate(d.getDate() - i);
             const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
             activityMap[dateStr] = 0;
          }

          data.forEach(event => {
            const dateStr = new Date(event.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            if (activityMap[dateStr] !== undefined) {
              activityMap[dateStr]++;
            }
          });

          const formattedData = Object.keys(activityMap).map(key => ({
            name: key,
            value: activityMap[key]
          }));
          
          setGithubData(formattedData);
        }
      } catch (e) {
        console.error('Failed to fetch github stats', e);
      } finally {
        setIsLoadingGithub(false);
      }
    }
    fetchGithub();
  }, []);

  const currentData = activeMetric === 'github' ? githubData : dataSets[activeMetric];

  const getMetricDetails = (metric: Metric) => {
    switch(metric) {
      case 'revenue': return { title: 'Revenue Growth', icon: FaChartLine, color: '#06B6D4', stroke: '#06B6D4' };
      case 'users': return { title: 'User Acquisition', icon: FaUsers, color: '#8B5CF6', stroke: '#8B5CF6' };
      case 'performance': return { title: 'System Efficiency', icon: FaServer, color: '#34D399', stroke: '#34D399' };
      case 'github': return { title: 'Live GitHub Activity', icon: FaGithub, color: '#10B981', stroke: '#10B981' };
    }
  };

  const details = getMetricDetails(activeMetric);

  return (
    <div className="container mx-auto px-6 md:px-12 relative z-10 py-24">
      <div className="flex flex-col items-center mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-accent-cyan/30 text-accent-cyan text-sm font-mono mb-6"
        >
          <FaFilter /> Interactive Data Playground
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold font-heading mb-4"
        >
          See <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">Analytics in Action</span>
        </motion.h2>
        <p className="text-slate-400 max-w-2xl">
          Interact with this live dashboard. It demonstrates my ability to build clean, responsive data visualizations—now featuring live data directly from my GitHub profile!
        </p>
      </div>

      <div className="glass-card p-6 md:p-10 rounded-3xl border-white/10 relative overflow-hidden">
        {/* Glow behind chart */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-900/50 -z-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[100px] pointer-events-none -z-10" />

        {/* Dashboard Header / Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <details.icon style={{ color: details.color }} /> 
              <AnimatePresence mode="wait">
                <motion.span
                  key={details.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {details.title}
                </motion.span>
              </AnimatePresence>
            </h3>
            <p className="text-sm text-slate-400 mt-1">
               {activeMetric === 'github' ? 'Live commit & push events from @Raj070612' : 'Predictive modeling visualization'}
            </p>
          </div>

          <div className="flex flex-wrap bg-brand-900/80 p-1 rounded-xl border border-white/5 w-full md:w-auto">
            {(['revenue', 'users', 'performance', 'github'] as Metric[]).map((metric) => (
              <button
                key={metric}
                onClick={() => setActiveMetric(metric)}
                className={`flex-1 md:flex-none px-4 md:px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                  activeMetric === metric 
                    ? 'bg-white/10 text-white shadow-md' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {metric === 'github' && <FaGithub />}
                {metric.charAt(0).toUpperCase() + metric.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Chart Area */}
        <div className="w-full h-[400px] relative">
           {activeMetric === 'github' && isLoadingGithub && (
              <div className="absolute inset-0 flex items-center justify-center bg-brand-900/50 z-20 rounded-xl backdrop-blur-sm">
                 <div className="w-8 h-8 border-4 border-accent-cyan border-t-transparent rounded-full animate-spin"></div>
              </div>
           )}
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={currentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={details.color} stopOpacity={0.4}/>
                  <stop offset="95%" stopColor={details.color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(10px)' }}
                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={details.stroke} 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorValue)" 
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
