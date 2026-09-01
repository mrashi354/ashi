import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Facebook, Youtube, Instagram, Send, Navigation, ChevronDown, CheckCircle2, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { apiUrl } from '@/lib/api';

const contactInfo = [
  {
    icon: MapPin,
    color: 'bg-rose-100 text-rose-600',
    title: 'Our Address',
    lines: ['BRDM Public School', 'Shora Kothi, Jind Rd', 'Kaithal, Haryana – 136027'],
  },
  {
    icon: Phone,
    color: 'bg-blue-100 text-blue-600',
    title: 'Phone Numbers',
    lines: ['+91 7404500023'],
    links: ['tel:+917404500023'],
  },
  {
    icon: Mail,
    color: 'bg-amber-100 text-amber-600',
    title: 'Email Us',
    lines: ['admin@brdm.com'],
    links: ['mailto:admin@brdm.com'],
  },
  {
    icon: Clock,
    color: 'bg-emerald-100 text-emerald-600',
    title: 'Office Hours',
    lines: ['Mon – Sat: 8:00 AM – 4:00 PM', 'Sunday: Closed'],
  },
];

const faqs = [
  {
    q: 'What documents are needed for admission?',
    a: 'Birth certificate, previous school Transfer Certificate (TC), report card, 4 passport-size photos, Aadhar card of student and parent, and residence proof.',
  },
  {
    q: 'What are the school timings?',
    a: 'School runs from 8:00 AM to 2:30 PM (Monday to Saturday). Office hours are 8:00 AM – 4:00 PM on weekdays.',
  },
  {
    q: 'Do you provide transport facility?',
    a: 'Yes, we provide school bus service covering major areas of Kaithal and surrounding localities. Contact the office for route details and fees.',
  },
  {
    q: 'When do admissions open for the new session?',
    a: 'Admissions typically open in January–February for the upcoming academic session (April start). Walk-in enquiries are welcome throughout the year.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }),
};

function validate(form: { name: string; contact: string; subject: string; message: string }) {
  const errors: Partial<typeof form> = {};
  if (!form.name.trim()) errors.name = 'Name is required.';
  if (!form.contact.trim()) {
    errors.contact = 'Phone or email is required.';
  } else {
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRe = /^[+\d][\d\s\-]{7,}$/;
    if (!emailRe.test(form.contact) && !phoneRe.test(form.contact))
      errors.contact = 'Enter a valid phone number or email address.';
  }
  if (!form.subject) errors.subject = 'Please select a topic.';
  if (!form.message.trim()) errors.message = 'Message cannot be empty.';
  return errors;
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3.5 text-left bg-card hover:bg-muted/50 transition-colors gap-3"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-foreground">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 text-muted-foreground">
          <ChevronDown size={16} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-4 pt-2 text-sm text-muted-foreground leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Contact() {
  const [form, setForm] = useState({ name: '', contact: '', subject: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  function updateField(field: keyof typeof form, value: string) {
    setForm((cur) => ({ ...cur, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
    setServerError(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (honeypot) return; // spam bot caught

    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setIsSubmitting(true);
    setServerError(null);

    try {
      const response = await fetch(apiUrl('/api/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(data.message || 'Could not send your message.');
      setForm({ name: '', contact: '', subject: '', message: '' });
      setErrors({});
      setSubmitted(true);
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-14 sm:py-20 md:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold text-sm uppercase tracking-widest mb-3"
          >
            Get in Touch
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            Contact Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto"
          >
            We'd love to hear from you. Reach out with any questions about admissions, programs, or campus visits.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* Left — Info cards + map + socials */}
          <div className="space-y-5 sm:space-y-6">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              {contactInfo.map((item, i) => (
                <motion.div
                  key={item.title}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.08)' }}
                  className="bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-sm transition-shadow duration-300"
                >
                  <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center mb-3`} aria-hidden="true">
                    <item.icon size={18} />
                  </div>
                  <h3 className="font-bold text-foreground mb-1.5 text-sm sm:text-base">{item.title}</h3>
                  <div className="space-y-0.5">
                    {item.lines.map((line, li) => (
                      item.links?.[li]
                        ? <a key={li} href={item.links[li]} aria-label={`${item.title}: ${line}`}
                            className="block text-xs sm:text-sm text-primary hover:underline font-medium"
                          >{line}</a>
                        : <p key={li} className="text-xs sm:text-sm text-muted-foreground">{line}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Google Map embed */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl overflow-hidden border border-border shadow-md"
            >
              <iframe
                title="BRDM Public School Location — Shora Kothi, Jind Rd, Kaithal, Haryana 136027"
                width="100%"
                height="260"
                style={{ border: 0, display: 'block' }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://maps.google.com/maps?q=Shora+Kothi,+Jind+Rd,+Kaithal,+Haryana+136027&z=15&output=embed"
              />
            </motion.div>

            {/* Get Directions button */}
            <motion.a
              href="https://www.google.com/maps/dir/?api=1&destination=Shora+Kothi,+Jind+Rd,+Kaithal,+Haryana+136027"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Get directions to BRDM Public School on Google Maps"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-md shadow-primary/20 hover:opacity-90 transition-opacity"
            >
              <Navigation size={15} aria-hidden="true" />
              Get Directions
            </motion.a>

            {/* Social media */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3"
            >
              <span className="text-sm font-semibold text-muted-foreground">Follow us:</span>
              {[
                { icon: Facebook,  href: '#', color: 'hover:bg-blue-600',  label: 'Facebook'  },
                { icon: Youtube,   href: '#', color: 'hover:bg-red-600',   label: 'YouTube'   },
                { icon: Instagram, href: '#', color: 'hover:bg-pink-600',  label: 'Instagram' },
              ].map(({ icon: Icon, href, color, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={`Follow BRDM Public School on ${label}`}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground ${color} hover:text-white transition-colors duration-200`}
                >
                  <Icon size={16} aria-hidden="true" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right — form + FAQs */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-lg">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground">Send us a Message</h3>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
                    Usually reply within a few hours
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-6">We read every message and get back to you promptly.</p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-10 text-center gap-3"
                  >
                    <CheckCircle2 size={48} className="text-green-500" aria-hidden="true" />
                    <p className="font-bold text-foreground text-lg">Message Sent!</p>
                    <p className="text-sm text-muted-foreground max-w-xs">Thank you for reaching out. Our team will get back to you within a few hours.</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-2 text-xs text-primary underline hover:opacity-80 transition-opacity"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form className="space-y-4" onSubmit={handleSubmit} noValidate aria-label="Contact form">
                    {/* Honeypot — hidden from real users */}
                    <input
                      type="text"
                      name="website"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      aria-hidden="true"
                      style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
                      autoComplete="off"
                    />

                    {/* Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-sm font-semibold text-foreground">Your Name <span className="text-destructive" aria-hidden="true">*</span></label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        aria-required="true"
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        aria-invalid={!!errors.name}
                        value={form.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-xl border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm ${errors.name ? 'border-destructive focus:ring-destructive' : 'border-border'}`}
                      />
                      {errors.name && <p id="name-error" role="alert" className="text-xs text-destructive">{errors.name}</p>}
                    </div>

                    {/* Phone / Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-contact" className="text-sm font-semibold text-foreground">Phone / Email <span className="text-destructive" aria-hidden="true">*</span></label>
                      <input
                        id="contact-contact"
                        type="text"
                        placeholder="+91 XXXXX or email@example.com"
                        aria-required="true"
                        aria-describedby={errors.contact ? 'contact-error' : undefined}
                        aria-invalid={!!errors.contact}
                        value={form.contact}
                        onChange={(e) => updateField('contact', e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-xl border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm ${errors.contact ? 'border-destructive focus:ring-destructive' : 'border-border'}`}
                      />
                      {errors.contact && <p id="contact-error" role="alert" className="text-xs text-destructive">{errors.contact}</p>}
                    </div>

                    {/* Subject */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-subject" className="text-sm font-semibold text-foreground">Subject <span className="text-destructive" aria-hidden="true">*</span></label>
                      <select
                        id="contact-subject"
                        aria-required="true"
                        aria-describedby={errors.subject ? 'subject-error' : undefined}
                        aria-invalid={!!errors.subject}
                        value={form.subject}
                        onChange={(e) => updateField('subject', e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-xl border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm appearance-none ${errors.subject ? 'border-destructive focus:ring-destructive' : 'border-border'}`}
                      >
                        <option value="" disabled>Select a topic</option>
                        <option>Admission Enquiry</option>
                        <option>Campus Visit</option>
                        <option>Fee Structure</option>
                        <option>General Query</option>
                      </select>
                      {errors.subject && <p id="subject-error" role="alert" className="text-xs text-destructive">{errors.subject}</p>}
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-message" className="text-sm font-semibold text-foreground">Message <span className="text-destructive" aria-hidden="true">*</span></label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        aria-required="true"
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        aria-invalid={!!errors.message}
                        placeholder="Write your message here..."
                        value={form.message}
                        onChange={(e) => updateField('message', e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-xl border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm resize-none ${errors.message ? 'border-destructive focus:ring-destructive' : 'border-border'}`}
                      />
                      {errors.message && <p id="message-error" role="alert" className="text-xs text-destructive">{errors.message}</p>}
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={!isSubmitting ? { scale: 1.02, boxShadow: '0 10px 28px rgba(220,90,30,0.35)' } : {}}
                      whileTap={!isSubmitting ? { scale: 0.97 } : {}}
                      className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-base shadow-md shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transition-opacity"
                      aria-busy={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={16} aria-hidden="true" />
                          Send Message
                        </>
                      )}
                    </motion.button>

                    {serverError && (
                      <p role="alert" className="text-sm font-medium text-destructive">{serverError}</p>
                    )}
                  </form>
                )}
              </div>
            </motion.div>

            {/* Quick FAQs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="font-bold text-foreground text-base mb-3">Quick FAQs</h4>
              <div className="space-y-2">
                {faqs.map((faq) => (
                  <FaqItem key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
