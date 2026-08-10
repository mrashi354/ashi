import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    q: 'What is the admission process for BRDM Public School?',
    a: 'Parents need to visit the school office or fill the online enquiry form. After submitting required documents (birth certificate, previous marksheet, address proof), the child may be called for an interaction. Admission is confirmed upon fee payment.',
  },
  {
    q: 'What classes are offered at BRDM Public School?',
    a: 'We offer classes from Play Group (Pre-Nursery) through Class 10, covering all major subjects under a structured curriculum focused on holistic development.',
  },
  {
    q: 'What is the medium of instruction?',
    a: 'The primary medium of instruction is English, with Hindi also taught as a core subject. Teachers are fluent in both languages to ensure students are comfortable.',
  },
  {
    q: 'Does the school provide transportation?',
    a: 'Yes, school bus service is available for various routes within Kaithal. Please contact the school office for route details and transport fee information.',
  },
  {
    q: 'What extracurricular activities are available?',
    a: 'BRDM offers a wide range of activities including sports, drawing & art, music, dance, debate, and science competitions. We believe in developing the whole child beyond academics.',
  },
  {
    q: 'How do I contact the school for more information?',
    a: 'You can reach us at +7404500023 or visit us at Shora Kothi, Jind Rd, Kaithal, Haryana 136027. You can also use the Contact form on our website to send us a message.',
  },
  {
    q: 'Are admissions open right now?',
    a: 'Yes! Admissions for the academic year 2026–2027 are currently open. Seats are limited, so we encourage early applications. Visit the Admissions page to apply.',
  },
];

export function FAQ() {
  return (
    <section className="py-16 sm:py-20 bg-muted/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">FAQ</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-2">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm sm:text-base">
            Everything parents want to know before enrolling their child.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-card border border-border rounded-xl px-5 py-1 shadow-sm"
              >
                <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary transition-colors py-4 text-sm sm:text-base">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
