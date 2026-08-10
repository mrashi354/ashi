import { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Sparkles, Brain, Heart, Lightbulb, Compass, MonitorPlay } from 'lucide-react';

const features = [
  { title: "Holistic Development", description: "Education that goes beyond textbooks, focusing on physical, emotional, and intellectual growth.", icon: Heart, color: "bg-rose-100 text-rose-600", glow: "hover:shadow-rose-200" },
  { title: "Modern Infrastructure", description: "Sunlit classrooms and modern facilities designed to inspire curiosity and comfort.", icon: MonitorPlay, color: "bg-blue-100 text-blue-600", glow: "hover:shadow-blue-200" },
  { title: "Dedicated Faculty", description: "Passionate educators who act as mentors, guiding each child's unique journey.", icon: Sparkles, color: "bg-amber-100 text-amber-600", glow: "hover:shadow-amber-200" },
  { title: "Future-Ready Skills", description: "Curriculum integrated with critical thinking, creativity, and technological literacy.", icon: Brain, color: "bg-purple-100 text-purple-600", glow: "hover:shadow-purple-200" },
  { title: "Values & Ethics", description: "Deeply rooted community values that build strong character and moral foundation.", icon: Compass, color: "bg-emerald-100 text-emerald-600", glow: "hover:shadow-emerald-200" },
  { title: "Creative Expression", description: "Dedicated spaces and programs for arts, music, and dramatic exploration.", icon: Lightbulb, color: "bg-orange-100 text-orange-600", glow: "hover:shadow-orange-200" },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const xMV = useMotionValue(0);
  const yMV = useMotionValue(0);
  const rotateX = useSpring(useTransform(yMV, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(xMV, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    xMV.set((e.clientX - rect.left) / rect.width - 0.5);
    yMV.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    xMV.set(0);
    yMV.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`bg-card border border-border p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-2xl ${feature.glow} transition-shadow duration-300 cursor-default`}
    >
      {/* Icon with spin on hover */}
      <motion.div
        whileHover={{ rotate: 360, scale: 1.15 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl ${feature.color} flex items-center justify-center mb-4 sm:mb-6`}
        style={{ transformStyle: 'preserve-3d', translateZ: 20 }}
      >
        <feature.icon size={24} />
      </motion.div>

      <h3
        className="text-lg sm:text-xl font-bold text-card-foreground mb-2 sm:mb-3"
        style={{ transform: 'translateZ(10px)' }}
      >
        {feature.title}
      </h3>
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
        {feature.description}
      </p>

      {/* Shine sweep on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none overflow-hidden"
        initial={false}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 -translate-x-full"
          whileHover={{ translateX: '200%' }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>
    </motion.div>
  );
}

const titleVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const charVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function Features() {
  const title = "Discover the BRDM Difference";

  return (
    <section id="academics" className="py-14 sm:py-20 md:py-24 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 md:mb-20">
          {/* Letter-by-letter heading */}
          <motion.h2
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6 flex flex-wrap justify-center gap-x-[0.25em]"
          >
            {title.split(' ').map((word, wi) => (
              <span key={wi} className="inline-flex">
                {word.split('').map((char, ci) => (
                  <motion.span key={ci} variants={charVariants} className="inline-block">
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-base sm:text-lg text-muted-foreground px-2"
          >
            We don't just teach; we ignite minds. Our comprehensive approach ensures every child finds their passion and builds the confidence to pursue it.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-8 relative">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
