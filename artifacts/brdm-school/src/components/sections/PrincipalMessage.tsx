import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export function PrincipalMessage() {
  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Photo side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full max-w-sm mx-auto lg:mx-0">
              {/* Decorative frame */}
              <div className="absolute -inset-3 rounded-3xl bg-primary/10 -rotate-2" />
              <div className="absolute -inset-3 rounded-3xl bg-secondary/10 rotate-1" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5]">
                <img
                  src="/logo.png"
                  alt="Principal BRDM Public School"
                  className="w-full h-full object-contain bg-secondary/10 p-12"
                />
              </div>
              {/* Badge */}
              <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground rounded-2xl px-4 py-3 shadow-lg">
                <div className="text-xs font-semibold uppercase tracking-wider">School</div>
                <div className="font-serif font-bold text-base">Principal</div>
              </div>
            </div>
          </motion.div>

          {/* Message side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <span className="text-primary text-sm font-semibold tracking-widest uppercase">From the Desk of</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-2">
                Principal's Message
              </h2>
            </div>

            <div className="relative pl-6 border-l-4 border-primary/30">
              <Quote className="absolute -left-3 -top-2 text-primary w-6 h-6 bg-background" />
              <p className="text-foreground/75 text-base leading-relaxed italic">
                "Education is not just about imparting knowledge; it is about nurturing curious minds, 
                building strong character, and empowering every child to realise their full potential."
              </p>
            </div>

            <div className="space-y-4 text-foreground/75 text-sm sm:text-base leading-relaxed">
              <p>
                Welcome to BRDM Public School — a place where every child is known by name, and every dream 
                is taken seriously. Since our founding, we have been committed to providing quality education 
                that balances academic rigour with the joy of learning.
              </p>
              <p>
                Our dedicated faculty works tirelessly to create a safe, inclusive, and stimulating environment 
                for students from Play Group through Class 10. We believe that true education goes beyond 
                textbooks — it shapes values, fosters creativity, and builds the confidence to face the world.
              </p>
              <p>
                I invite you to explore our school, speak to our teachers, and discover why thousands of 
                families in Kaithal trust BRDM Public School to prepare their children for a better future.
              </p>
            </div>

            <div className="pt-2">
              <div className="font-serif font-bold text-foreground text-lg">School Principal</div>
              <div className="text-primary font-semibold text-sm">BRDM Public School, Kaithal</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
