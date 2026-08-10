import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sunita Sharma',
    relation: 'Parent of Class 5 Student',
    text: 'BRDM Public School has been a wonderful choice for our daughter. The teachers are caring and highly dedicated. She has grown so much in confidence and academics since joining.',
    initials: 'SS',
  },
  {
    name: 'Rajesh Kumar',
    relation: 'Parent of Class 8 Student',
    text: 'The school provides a great balance of academics and extracurricular activities. My son looks forward to school every day. The staff is approachable and always there to help.',
    initials: 'RK',
  },
  {
    name: 'Priya Devi',
    relation: 'Parent of Class 3 Student',
    text: 'We are extremely happy with the learning environment at BRDM. The school truly lives up to its motto of preparing children for a better future. Highly recommended!',
    initials: 'PD',
  },
  {
    name: 'Anil Verma',
    relation: 'Parent of Class 10 Student',
    text: 'Excellent faculty and infrastructure. The school\'s focus on individual attention and overall development sets it apart. My child\'s board exam results have been outstanding.',
    initials: 'AV',
  },
  {
    name: 'Meena Rani',
    relation: 'Parent of Class 1 Student',
    text: 'From the very first day, our child felt welcome and safe. The teachers are patient, kind, and very skilled at making learning fun for young children.',
    initials: 'MR',
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = useCallback((idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  }, [current]);

  const next = useCallback(() => go((current + 1) % testimonials.length), [current, go]);
  const prev = useCallback(() => go((current - 1 + testimonials.length) % testimonials.length), [current, go]);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -60 }),
  };

  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">What Parents Say</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-2">
            Voices of Our Community
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm sm:text-base">
            Hear from the families who trust BRDM Public School with their children's future.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="relative bg-card rounded-3xl shadow-lg border border-border p-8 sm:p-10 md:p-12 overflow-hidden min-h-[260px] flex items-center">
            {/* decorative quote */}
            <Quote className="absolute top-6 right-8 text-primary/10 w-20 h-20" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="w-full"
              >
                <p className="text-foreground/80 text-base sm:text-lg leading-relaxed mb-8 italic">
                  "{testimonials[current].text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg shrink-0">
                    {testimonials[current].initials}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonials[current].name}</div>
                    <div className="text-sm text-muted-foreground">{testimonials[current].relation}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'w-6 bg-primary' : 'w-2 bg-border'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
