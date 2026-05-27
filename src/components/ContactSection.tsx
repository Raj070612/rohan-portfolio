import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FaPaperPlane, FaGithub, FaLinkedin, FaMapMarkerAlt, FaEnvelope, FaCheckCircle } from 'react-icons/fa';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus('sending');
    try {
      // NOTE: Replace with actual Service ID, Template ID, and Public Key from EmailJS
      await emailjs.send(
        'service_placeholder',
        'template_placeholder',
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
        },
        'public_key_placeholder'
      );
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="container mx-auto px-6 md:px-12 relative z-10">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Left Side: Contact Info */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-heading mb-6"
          >
            Let's Build the Future Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-blue">Technology.</span>
          </motion.h2>
          <p className="text-slate-400 text-lg mb-10">
            Open for opportunities, collaborations, and discussions on how we can create innovative engineering solutions together.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: FaEnvelope, label: 'Email', value: 'rohanbaviskar612@gmail.com', href: 'mailto:rohanbaviskar612@gmail.com', color: 'text-accent-cyan' },
              { icon: FaLinkedin, label: 'LinkedIn', value: 'rohan-baviskar', href: 'https://linkedin.com/in/rohan-baviskar-559a01238', color: 'text-accent-blue' },
              { icon: FaGithub, label: 'GitHub', value: 'Raj070612', href: 'https://github.com/Raj070612', color: 'text-accent-purple' },
              { icon: FaMapMarkerAlt, label: 'Location', value: 'Jalgaon, India', href: '#', color: 'text-emerald-400' },
            ].map((contact, i) => (
              <motion.a
                href={contact.href}
                target={contact.label !== 'Location' ? '_blank' : '_self'}
                rel="noreferrer"
                key={contact.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-4 rounded-xl flex items-center gap-4 hover:bg-white/5 transition-colors border-white/5 hover:border-white/20 group"
              >
                <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${contact.color} group-hover:scale-110 transition-transform`}>
                  <contact.icon className="text-xl" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">{contact.label}</div>
                  <div className="text-sm font-medium text-slate-200 truncate">{contact.value}</div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="lg:w-1/2">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-3xl border-t-2 border-accent-cyan/50 relative overflow-hidden"
          >
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-accent-cyan/20 rounded-full blur-[100px] pointer-events-none" />
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-slate-300">Initiate Connection</label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="Your Name"
                  className="w-full bg-brand-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-accent-cyan/50 focus:ring-1 focus:ring-accent-cyan/50 transition-all"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="Your Email Address"
                  className="w-full bg-brand-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-accent-cyan/50 focus:ring-1 focus:ring-accent-cyan/50 transition-all"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Enter transmission..."
                  className="w-full bg-brand-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-accent-cyan/50 focus:ring-1 focus:ring-accent-cyan/50 transition-all resize-none"
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-blue text-brand-900 font-bold text-lg flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all disabled:opacity-70"
              >
                {status === 'idle' && (
                  <>Transmit Message <FaPaperPlane className="text-sm" /></>
                )}
                {status === 'sending' && (
                  <><div className="w-5 h-5 border-2 border-brand-900 border-t-transparent rounded-full animate-spin" /> Transmitting...</>
                )}
                {status === 'success' && (
                  <>Transmission Successful <FaCheckCircle /></>
                )}
                {status === 'error' && 'Transmission Failed. Try Again.'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
