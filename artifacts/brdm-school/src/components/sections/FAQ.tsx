import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export interface FaqItem {
  q: string;
  a: string;
}

export const faqs: FaqItem[] = [
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

export const admissionsFaqs: FaqItem[] = [
  {
    q: 'What is the admission process at BRDM Public School, Kaithal?',
    a: 'Fill in the online enquiry form on the Admissions page or visit the school office. Our admissions team will invite you for a campus tour and a brief, friendly interaction with your child. Once the required documents are verified and the admission fee is paid, your child\'s seat is confirmed.',
  },
  {
    q: 'Which classes and age groups can apply for admission?',
    a: 'We admit students from Play Group to Class 10. As a general age guideline (age as on 31 March): Play Group 2½+, Nursery 3+, Kindergarten 4+, and Class 1 onwards 5+. The child\'s birth certificate is required as proof of age.',
  },
  {
    q: 'What documents are needed for admission?',
    a: 'You will need the child\'s birth certificate, Transfer Certificate (TC) from the previous school (for Class 1+), the latest report card, 4 passport-size photographs, copies of the Aadhar card of the student and parents, and residence proof.',
  },
  {
    q: 'What is the school fee structure?',
    a: 'The school fee depends on the class your child is joining. Please call our office at +91 7404500023 or visit us at Shora Kothi, Jind Road, Kaithal — our team will share the complete fee structure for the 2026–27 session.',
  },
  {
    q: 'Does the school provide transport for students?',
    a: 'Yes, BRDM Public School provides school bus service covering major routes in and around Kaithal. Contact the school office for route details, pick-up points, and transport fees.',
  },
  {
    q: 'Is there an entrance test for admission?',
    a: 'No formal written entrance test is required. Admission is based on a brief informal interaction and, for higher classes, a review of the previous report card to place your child in the right grade.',
  },
  {
    q: 'When do admissions open for the new session?',
    a: 'Admissions generally open in January–February for the academic session beginning in April. Admissions for 2026–27 are open now, and seats are limited — early applications are recommended.',
  },
];

export const academicsFaqs: FaqItem[] = [
  {
    q: 'What curriculum does BRDM Public School follow?',
    a: 'BRDM follows a CBSE-aligned curriculum from Play Group to Class 10. Every stage from early childhood through secondary school is designed to build strong academic foundations and essential life skills.',
  },
  {
    q: 'What subjects are taught at each level?',
    a: 'In Primary school we teach English, Hindi, Mathematics, EVS, Computer, Art & Craft, and General Knowledge. From Middle school onward, students study Science, Social Science, Mathematics, languages, Computer Science, and Physical Education.',
  },
  {
    q: 'What is the medium of instruction?',
    a: 'English is the primary medium of instruction, with Hindi taught as a core subject. Our teachers are fluent in both languages, helping every student become confident and comfortable.',
  },
  {
    q: 'How are students assessed?',
    a: 'Students are assessed through periodic unit tests, half-yearly and annual examinations, and project-based assessments. Detailed report cards are issued twice a year and Parent-Teacher Meetings are held quarterly.',
  },
  {
    q: 'What teaching methods does the school use?',
    a: 'We combine smart classrooms, activity-based learning, and a low student-teacher ratio of 15:1 so every child receives individual attention. Concepts are taught through experiments, projects, and group tasks rather than rote memorisation.',
  },
  {
    q: 'What extracurricular activities are available?',
    a: 'Students enjoy daily sports periods, yoga and physical education, art & craft, music, computer lab sessions, and weekly library periods. We also organise annual sports day, science exhibitions, debates, and cultural functions.',
  },
];

export function FAQ({
  items = faqs,
  eyebrow = 'FAQ',
  title = 'Frequently Asked Questions',
  subtitle = 'Everything parents want to know before enrolling their child.',
}: {
  items?: FaqItem[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="py-16 sm:py-20 bg-muted/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">{eyebrow}</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-2">
            {title}
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm sm:text-base">
            {subtitle}
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
            {items.map((faq, i) => (
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
