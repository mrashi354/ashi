import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { Hero }          from '@/components/sections/Hero';
import { Features }      from '@/components/sections/Features';
import { CampusLife }    from '@/components/sections/CampusLife';
import { StatsCounter }  from '@/components/sections/StatsCounter';
import { Testimonials }  from '@/components/sections/Testimonials';
import { FAQ }           from '@/components/sections/FAQ';

export function HomePage() {
  return (
    <>
      <Hero />
      <StatsCounter />
      <Features />
      <CampusLife />
      <Testimonials />
      <FAQ />

      {/* CTA Banner */}
      <section className="py-16 sm:py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.06) 0%, transparent 60%)',
          }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          >
            Ready to Join the BRDM Family?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-primary-foreground/85 text-base sm:text-lg mb-8 max-w-xl mx-auto"
          >
            Admissions open for 2026–2027. Limited seats available — apply today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/admissions"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-primary font-bold text-base shadow-xl hover:shadow-2xl transition-shadow"
            >
              Apply Now <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white/40 text-white font-bold text-base hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
