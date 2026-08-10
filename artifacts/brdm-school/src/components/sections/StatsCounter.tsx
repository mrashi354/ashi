import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, GraduationCap, Award, TrendingUp } from 'lucide-react';

interface StatItem {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  color: string;
}

function Counter({ target, suffix, duration = 2 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const start = 0;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(target);
    };
    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats: StatItem[] = [
  {
    icon: <Users size={28} />,
    value: 500,
    suffix: '+',
    label: 'Total Students',
    color: 'text-primary',
  },
  {
    icon: <GraduationCap size={28} />,
    value: 30,
    suffix: '+',
    label: 'Qualified Teachers',
    color: 'text-accent',
  },
  {
    icon: <Award size={28} />,
    value: 15,
    suffix: '+',
    label: 'Years of Excellence',
    color: 'text-yellow-400',
  },
  {
    icon: <TrendingUp size={28} />,
    value: 98,
    suffix: '%',
    label: 'Pass Percentage',
    color: 'text-primary',
  },
];

export function StatsCounter() {
  return (
    <section className="py-14 sm:py-16 bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="stat-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stat-grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Our Achievements</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2">
            Numbers That Speak
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className={`mb-3 ${stat.color}`}>{stat.icon}</div>
              <div className="font-serif text-4xl sm:text-5xl font-bold mb-1 text-white">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-white/70 text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
