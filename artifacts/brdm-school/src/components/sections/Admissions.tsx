import { motion } from 'framer-motion';
import { ClipboardCheck, FileText, UserCheck, Calendar } from 'lucide-react';
import { useState } from 'react';

const steps = [
  { id: "01", title: "Submit Enquiry", description: "Fill out our simple online form or visit our campus to express your interest.", icon: FileText },
  { id: "02", title: "Campus Tour", description: "Experience our environment first-hand and meet our dedicated faculty.", icon: Calendar },
  { id: "03", title: "Interaction", description: "A brief informal interaction to understand your child's needs and interests.", icon: UserCheck },
  { id: "04", title: "Enrollment", description: "Complete the documentation and welcome to the BRDM family!", icon: ClipboardCheck },
];

const formFieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.1 + i * 0.08, duration: 0.45 } }),
};

export function Admissions() {
  const [form, setForm] = useState({
    parentName: '',
    childName: '',
    phone: '',
    grade: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setStatus(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || 'We could not send your request.');
      }

      setForm({ parentName: '', childName: '', phone: '', grade: '' });
      setStatus({ type: 'success', message: 'Thank you! Your enquiry has been sent.' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="admissions" className="py-14 sm:py-20 md:py-24 bg-secondary text-secondary-foreground relative overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Animated blobs */}
      <motion.div
        className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-10 left-0 w-48 h-48 rounded-full bg-white/5 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.3, 1], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16">

          {/* Steps side */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                Begin Your Journey With Us
              </h2>
              <p className="text-base sm:text-lg text-secondary-foreground/80 mb-8 sm:mb-12 max-w-lg leading-relaxed">
                We're thrilled you're considering BRDM Public School. Our admissions process is designed to be transparent, welcoming, and straightforward.
              </p>
            </motion.div>

            <div className="space-y-0">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12, duration: 0.5 }}
                  className="flex gap-4 sm:gap-6 group"
                >
                  <div className="flex flex-col items-center">
                    <motion.div
                      whileHover={{ scale: 1.15, backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center text-primary bg-white/5 transition-colors duration-300 shrink-0"
                    >
                      <step.icon size={18} />
                    </motion.div>
                    {index !== steps.length - 1 && (
                      <motion.div
                        className="w-px flex-1 bg-white/10 mt-3 mb-3"
                        initial={{ scaleY: 0, originY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.12 + 0.3, duration: 0.4 }}
                      />
                    )}
                  </div>
                  <div className="pb-6 sm:pb-8">
                    <h3 className="text-base sm:text-xl font-bold mb-1 sm:mb-2 flex items-center gap-2 sm:gap-3">
                      <span className="text-white/40 text-xs sm:text-sm font-mono">{step.id}</span>
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-secondary-foreground/70">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Form side */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <motion.div
              whileHover={{ boxShadow: '0 30px 60px -12px rgba(0,0,0,0.3)' }}
              className="bg-card text-card-foreground p-5 sm:p-7 md:p-10 rounded-2xl sm:rounded-3xl shadow-2xl relative"
            >
              {/* Badge */}
              <motion.div
                initial={{ rotate: 12, scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                animate={{ rotate: [12, 16, 12] }}
                className="absolute -top-4 -right-3 sm:-top-5 sm:-right-5 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-accent rounded-full hidden sm:flex items-center justify-center text-accent-foreground font-bold text-center leading-tight shadow-lg text-[10px] sm:text-xs"
              >
                Admissions<br />Open
              </motion.div>

              <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 font-serif">Request Information</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-5 sm:mb-8">Fill out the form and our admissions office will contact you shortly.</p>

              <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
                <motion.div
                  custom={0} variants={formFieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
                >
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold">Parent's Name</label>
                    <input type="text" placeholder="John Doe" required value={form.parentName}
                      onChange={(event) => updateField('parentName', event.target.value)}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm sm:text-base" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold">Child's Name</label>
                    <input type="text" placeholder="Jane Doe" required value={form.childName}
                      onChange={(event) => updateField('childName', event.target.value)}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm sm:text-base" />
                  </div>
                </motion.div>

                {[
                  { i: 1, label: "Phone Number", type: "tel", placeholder: "+91 XXXXX XXXXX" },
                ].map(({ i, label, type, placeholder }) => (
                  <motion.div key={label} custom={i} variants={formFieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-1.5">
                    <label className="text-sm font-semibold">{label}</label>
                    <input type={type} placeholder={placeholder} required value={form.phone}
                      onChange={(event) => updateField('phone', event.target.value)}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm sm:text-base" />
                  </motion.div>
                ))}

                <motion.div custom={2} variants={formFieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-1.5">
                  <label className="text-sm font-semibold">Grade Applying For</label>
                  <select value={form.grade} required onChange={(event) => updateField('grade', event.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none text-sm sm:text-base">
                    <option value="" disabled>Select Grade</option>
                    {['Play Group', 'Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10'].map((g) => (
                      <option key={g} value={g.toLowerCase().replace(' ', '-')}>{g}</option>
                    ))}
                  </select>
                </motion.div>

                <motion.div custom={3} variants={formFieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02, boxShadow: '0 12px 30px rgba(220,90,30,0.4)' }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-3 sm:py-4 rounded-xl bg-primary text-primary-foreground font-bold text-base sm:text-lg shadow-lg shadow-primary/20 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending Request...' : 'Submit Request'}
                  </motion.button>
                </motion.div>
                {status && (
                  <p
                    role="status"
                    className={`text-sm font-medium ${status.type === 'success' ? 'text-green-700' : 'text-destructive'}`}
                  >
                    {status.message}
                  </p>
                )}
              </form>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
