import { motion, type Variants } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'wouter';

const words1 = ['Preparing', 'Your', 'Child'];
const words2 = ['for', 'better', 'Future...'];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
const wordVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: 'easeOut' } },
};
export function Hero() {
  return (
    <section className="relative h-[100dvh] min-h-[560px] w-full flex items-center justify-center overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-secondary/60 mix-blend-multiply z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent z-10" />
        <motion.img
          src="/school-bg.png"
          alt="BRDM Public School Campus"
          className="w-full h-full object-cover object-center"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: 'easeOut' }}
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

      {/* Content */}
      <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-12 flex flex-col items-center text-center mt-16 sm:mt-20">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs sm:text-sm font-medium mb-5 sm:mb-8"
        >
          <motion.span
            className="w-2 h-2 rounded-full bg-primary shrink-0"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          Admissions open for 2026-2027
        </motion.div>

        {/* Headline — word by word */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight mb-4 sm:mb-6 drop-shadow-lg"
        >
          <span className="flex flex-wrap justify-center gap-x-4 gap-y-1 mb-1">
            {words1.map((word) => (
              <motion.span key={word} variants={wordVariants} className="inline-block">
                {word}
              </motion.span>
            ))}
          </span>
          <span className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            {words2.map((word, i) => (
              <motion.span
                key={word}
                variants={wordVariants}
                className={`inline-block ${i === 0 ? '' : 'text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary'}`}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: 'easeOut' }}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-xs sm:max-w-lg md:max-w-2xl font-medium leading-relaxed mb-7 sm:mb-10 drop-shadow-md"
        >
          A proud neighborhood school in Kaithal, Haryana where families trust their children's futures.
          Step into a bright environment full of hope, possibility, and academic excellence.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none sm:w-auto justify-center"
        >
          <Link
            href="/admissions"
            className="group px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-primary text-primary-foreground font-semibold text-base sm:text-lg shadow-[0_8px_30px_rgb(220,90,30,0.35)] flex items-center justify-center gap-2 transition-transform hover:scale-105 hover:-translate-y-0.5 active:scale-95"
          >
            Enroll Your Child
            <motion.span
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.span>
          </Link>
          <Link
            href="/about"
            className="px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-base sm:text-lg flex items-center justify-center transition-transform hover:scale-105 hover:bg-white/20 active:scale-95"
          >
            Discover Our School
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/60"
      >
        <span className="text-[10px] sm:text-xs tracking-widest uppercase font-semibold">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
