import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface PageIntroProps {
  eyebrow?: string;
  title: string;
  text: string | string[];
  points?: string[];
}

export function PageIntro({ eyebrow, title, text, points }: PageIntroProps) {
  const paragraphs = Array.isArray(text) ? text : [text];

  return (
    <section className="py-14 sm:py-20 bg-background border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          {eyebrow && (
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">
              {eyebrow}
            </span>
          )}
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-2">
            {title}
          </h2>

          <div className="mt-4 space-y-4">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          {points && points.length > 0 && (
            <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-left max-w-2xl mx-auto">
              {points.map((pt) => (
                <li key={pt} className="flex items-start gap-2 text-sm sm:text-base text-foreground/80">
                  <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </div>
    </section>
  );
}