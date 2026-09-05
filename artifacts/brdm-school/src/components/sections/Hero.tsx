import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles, GraduationCap, Star } from 'lucide-react';
import { useLocation } from 'wouter';

const headlineWords = [
  { text: 'BRDM', gradient: false },
  { text: 'Public', gradient: true },
  { text: 'School', gradient: true },
];

const wordVariants = {
  hidden: { opacity: 0, y: 50, rotateX: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.7, delay: 0.3 + i * 0.15, ease: 'easeOut' as const },
  }),
};

export function Hero() {
  const [, navigate] = useLocation();

  function goToSection(page: string, sectionId: string) {
    navigate(page);
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 350);
  }

  return (
    <section className="relative h-[100dvh] min-h-[560px] w-full flex items-center justify-center overflow-hidden">

      {/* Background — Ken Burns continuous zoom */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-secondary/70 mix-blend-multiply z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/30 to-transparent z-10" />
        <div className="absolute inset-y-0 left-0 w-[50%] bg-gradient-to-r from-secondary via-secondary/85 to-transparent z-10" />
        <motion.img
          src="/school-bg.png"
          alt="BRDM Public School Campus"
          className="w-full h-full object-cover object-center"
          animate={{ scale: [1.05, 1.12, 1.05] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Floating Orbs */}
      <motion.div
        className="absolute top-1/4 left-[10%] w-48 sm:w-72 h-48 sm:h-72 rounded-full bg-primary/25 blur-3xl z-[5] pointer-events-none"
        animate={{ y: [0, -24, 0], x: [0, 12, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-[8%] w-40 sm:w-64 h-40 sm:h-64 rounded-full bg-accent/20 blur-3xl z-[5] pointer-events-none"
        animate={{ y: [0, 20, 0], x: [0, -16, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />
      <motion.div
        className="absolute top-[60%] left-[40%] w-32 sm:w-48 h-32 sm:h-48 rounded-full bg-white/10 blur-2xl z-[5] pointer-events-none"
        animate={{ y: [0, -14, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      />

      {/* Twinkling stars */}
      {[
        { top: '18%', left: '20%', delay: 0 },
        { top: '30%', left: '68%', delay: 0.8 },
        { top: '65%', left: '18%', delay: 1.6 },
        { top: '75%', left: '75%', delay: 0.4 },
        { top: '45%', left: '85%', delay: 2 },
      ].map((s, i) => (
        <motion.span
          key={i}
          className="absolute text-accent z-[6] pointer-events-none"
          style={{ top: s.top, left: s.left }}
          animate={{ opacity: [0, 1, 0], scale: [0.6, 1.2, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
        >
          <Star size={14} fill="currentColor" />
        </motion.span>
      ))}

      {/* Content */}
      <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-12 flex flex-col items-center text-center mt-16 sm:mt-20">

        {/* Badge — pulse animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="hero-badge-pulse inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-white/95 text-xs sm:text-sm font-medium mb-6 sm:mb-8"
        >
          <motion.span
            animate={{ rotate: [0, 12, -12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
          </motion.span>
          Admissions Open for 2026-2027
        </motion.div>

        {/* Headline — word by word with 3D flip */}
        <motion.h1
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-5 sm:mb-6 drop-shadow-2xl px-2"
          style={{ perspective: 800 }}
        >
          <span className="inline-flex flex-wrap justify-center gap-x-4 gap-y-1">
            {headlineWords.map((word, i) => (
              <motion.span
                key={word.text}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className={`inline-block ${word.gradient ? 'text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-accent' : ''}`}
              >
                {word.text}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Subtext — fade in + slide up */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-white/95 max-w-xs sm:max-w-lg md:max-w-2xl font-medium leading-relaxed mb-7 sm:mb-10 drop-shadow-lg"
        >
          A proud neighborhood school in Kaithal, Haryana — shaping bright futures and nurturing
          every child to reach their full potential.
        </motion.p>

        {/* Feature chips — staggered + hover lift */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 1 } } }}
          className="hidden sm:flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-8 sm:mb-10"
        >
          {['Expert Faculty', 'Modern Campus', 'Focus on Values'].map((item) => (
            <motion.span
              key={item}
              variants={{ hidden: { opacity: 0, y: 20, scale: 0.9 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } } }}
              whileHover={{ y: -4, scale: 1.05 }}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs sm:text-sm font-medium transition-shadow hover:shadow-[0_8px_25px_rgba(0,0,0,0.3)]"
            >
              <GraduationCap className="w-3.5 h-3.5 text-accent" />
              {item}
            </motion.span>
          ))}
        </motion.div>

        {/* Buttons — smooth scroll */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none sm:w-auto justify-center"
        >
          <motion.button
            onClick={() => goToSection('/admissions', 'admissions')}
            whileHover={{ y: -3, scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="group px-6 sm:px-9 py-3.5 sm:py-4 rounded-full bg-primary text-primary-foreground font-semibold text-base sm:text-lg shadow-[0_10px_35px_rgb(220,90,30,0.45)] flex items-center justify-center gap-2 cursor-pointer"
          >
            Enroll Your Child
            <motion.span
              className="inline-block"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.span>
          </motion.button>
          <motion.button
            onClick={() => goToSection('/about', 'about')}
            whileHover={{ y: -3, scale: 1.04, backgroundColor: 'rgba(255,255,255,0.2)' }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="px-6 sm:px-9 py-3.5 sm:py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/25 text-white font-semibold text-base sm:text-lg flex items-center justify-center cursor-pointer"
          >
            Discover Our School
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator — continuous bounce */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/70"
      >
        <span className="text-[10px] sm:text-xs tracking-widest uppercase font-semibold">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}