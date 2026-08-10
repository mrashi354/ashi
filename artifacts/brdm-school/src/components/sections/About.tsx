import { motion } from 'framer-motion';
import { Link } from 'wouter';
import {
  BookOpen, Users, Sun, Target, Shield, Lightbulb, Heart, Star, Zap,
  Monitor, Bus, FlaskConical, TreePine, Quote, Award, CheckCircle2,
} from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';

/* ─── shared fade-up variant ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.1 } }),
};

/* ─────────────────────────────────────────────────────────────────── */
/* STATS COUNTER                                                       */
/* ─────────────────────────────────────────────────────────────────── */
const stats = [
  { label: 'Student-Teacher Ratio', target: 15, display: (n: number) => `${n}:1` },
  { label: 'Holistic Programs',     target: 10, display: (n: number) => `${n}+`  },
  { label: 'Years of Trust',        target: 15, display: (n: number) => `${n}+`  },
  { label: 'Happy Families',        target: 1000, display: (n: number) => `${n}+` },
];

function StatCounter({ target, display, label, delay }: {
  target: number; display: (n: number) => string; label: string; delay: number;
}) {
  const { count, ref } = useCountUp(target, 2000);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.06 }}
      className="text-center px-2 cursor-default"
    >
      <motion.div
        className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-secondary mb-1 sm:mb-2"
        initial={{ scale: 0.8 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: delay + 0.1, type: 'spring', stiffness: 200 }}
      >
        {display(count)}
      </motion.div>
      <div className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider leading-tight">
        {label}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/* SECTION HEADER helper                                               */
/* ─────────────────────────────────────────────────────────────────── */
function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-12"
    >
      <span className="text-primary text-sm font-semibold tracking-widest uppercase">{eyebrow}</span>
      <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-2">{title}</h2>
      {subtitle && (
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm sm:text-base">{subtitle}</p>
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/* 1. HERO / INTRO (existing)                                          */
/* ─────────────────────────────────────────────────────────────────── */
export function About() {
  return (
    <>
      {/* ── INTRO ── */}
      <section id="about" className="py-14 sm:py-20 md:py-24 bg-background relative overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-[300px] sm:w-[500px] lg:w-[700px] h-[300px] sm:h-[500px] lg:h-[700px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
              className="space-y-5 sm:space-y-8 order-2 lg:order-1"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm"
              >
                <motion.span animate={{ rotate: [0, 20, -20, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
                  <Sun size={14} aria-hidden="true" />
                </motion.span>
                <span>Welcome to BRDM</span>
              </motion.div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
                A Foundation of Trust,{' '}
                <br />A Future of{' '}
                <motion.span
                  className="text-primary italic inline-block"
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  Possibility.
                </motion.span>
              </h2>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Like sunlight streaming through a classroom window, education at BRDM Public School is bright, warm, and full of life. We are more than an institution; we are a community deeply rooted in Kaithal, dedicated to nurturing the next generation.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 pt-2">
                {[
                  { icon: Target, bg: 'bg-accent/20 text-accent-foreground', title: 'Our Mission', text: 'To provide holistic, forward-looking education that empowers students.' },
                  { icon: BookOpen, bg: 'bg-secondary/10 text-secondary', title: 'Our Approach', text: 'Combining modern teaching methodologies with deep-rooted values.' },
                ].map(({ icon: Icon, bg, title, text }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="flex gap-3 sm:gap-4"
                  >
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${bg} flex items-center justify-center shrink-0`}
                    >
                      <Icon size={20} aria-hidden="true" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1 text-sm sm:text-base">{title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">{text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
              className="relative order-1 lg:order-2"
            >
              <motion.div
                initial={{ clipPath: 'inset(0 100% 0 0 round 24px)' }}
                whileInView={{ clipPath: 'inset(0 0% 0 0 round 24px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: 'easeInOut', delay: 0.2 }}
                className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl relative z-10 w-full max-h-[340px] sm:max-h-[420px] lg:max-h-none lg:aspect-[4/5]"
              >
                <motion.img
                  src="/principal.png"
                  alt="Principal addressing students and parents at BRDM Public School"
                  className="w-full h-full object-cover object-top"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                  <p className="font-serif text-base sm:text-lg font-semibold drop-shadow">Principal, BRDM Public School</p>
                  <p className="text-xs sm:text-sm text-white/80 drop-shadow">Kaithal, Haryana</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="absolute -bottom-8 -left-4 lg:-left-8 bg-white p-4 lg:p-6 rounded-2xl shadow-xl z-20 max-w-[160px] lg:max-w-[200px] border border-border hidden lg:block"
              >
                <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-3">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary"
                  >
                    <Users size={18} aria-hidden="true" />
                  </motion.div>
                  <div className="font-bold text-xl lg:text-2xl text-foreground">1k+</div>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">Families trust us with their children's future.</p>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-12 sm:mt-16 md:mt-24 pt-8 sm:pt-12 border-t border-border">
            {stats.map((stat, index) => (
              <StatCounter key={index} target={stat.target} display={stat.display} label={stat.label} delay={index * 0.12} />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────── */}
      {/* 2. SCHOOL HISTORY / JOURNEY TIMELINE        */}
      {/* ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-muted/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <SectionHeader
            eyebrow="Our Story"
            title="The BRDM Journey"
            subtitle="From humble beginnings to a thriving centre of learning — a legacy built milestone by milestone."
          />

          <div className="relative max-w-3xl mx-auto">
            {/* vertical line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden sm:block" aria-hidden="true" />

            {[
              { year: '2008', title: 'School Founded', desc: 'BRDM Public School opened its doors in Kaithal, Haryana, with a vision to provide quality education to every child in the community.' },
              { year: '2011', title: 'First Board Results', desc: 'Our inaugural batch appeared in board examinations with outstanding results, establishing BRDM as a trusted name in academics.' },
              { year: '2015', title: 'Infrastructure Expansion', desc: 'New science labs, a computer centre, and a modern library were inaugurated, dramatically upgrading the learning environment.' },
              { year: '2018', title: 'Smart Classrooms Introduced', desc: 'Digital smart boards were installed in every classroom, blending technology with traditional teaching for 21st-century learning.' },
              { year: '2022', title: 'Sports & Cultural Centre', desc: 'A dedicated sports ground and cultural activity hall were added, supporting holistic student development beyond academics.' },
              { year: '2024', title: 'Serving 1000+ Families', desc: 'BRDM now proudly serves over a thousand families across Kaithal, recognised for academic excellence and nurturing values.' },
            ].map((item, i) => (
              <motion.div
                key={item.year}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className={`relative flex flex-col sm:flex-row gap-4 sm:gap-8 mb-10 last:mb-0 ${
                  i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Year bubble */}
                <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-primary text-primary-foreground font-bold text-sm items-center justify-center shadow-lg z-10 shrink-0">
                  {item.year}
                </div>

                {/* Card */}
                <div className={`sm:w-[calc(50%-3rem)] ${i % 2 === 0 ? 'sm:mr-auto sm:text-right' : 'sm:ml-auto'}`}>
                  {/* Mobile year label */}
                  <div className="sm:hidden inline-block mb-2 px-3 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    {item.year}
                  </div>
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="bg-card border border-border rounded-2xl p-5 shadow-sm"
                  >
                    <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────── */}
      {/* 3. PRINCIPAL'S MESSAGE                      */}
      {/* ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <SectionHeader
            eyebrow="Leadership"
            title="Principal's Message"
            subtitle="A word from the heart of our school."
          />

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-3xl shadow-lg p-8 sm:p-10 md:p-12 relative overflow-hidden"
            >
              {/* decorative quote */}
              <Quote className="absolute top-6 right-8 text-primary/8 w-24 h-24" aria-hidden="true" />

              <div className="flex flex-col sm:flex-row gap-8 items-start">
                {/* Avatar */}
                <div className="shrink-0 flex flex-col items-center gap-3">
                  <div
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-secondary/10 border-4 border-primary/20 flex items-center justify-center text-secondary font-serif text-4xl font-bold select-none"
                    aria-label="Principal's photo placeholder"
                  >
                    P
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-foreground text-sm">Mr. / Mrs. [Principal Name]</p>
                    <p className="text-xs text-muted-foreground">Principal, BRDM Public School</p>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
                  <p>
                    Dear Students, Parents, and Well-wishers, it gives me immense pride and joy to welcome you to BRDM Public School — a place where young minds are nurtured with care, compassion, and a deep commitment to excellence. Since our founding, we have strived to build an institution that goes far beyond academics, one that shapes character and instils lifelong values.
                  </p>
                  <p>
                    At BRDM, we believe every child is unique, talented, and capable of achieving greatness. Our dedicated faculty works tirelessly to create a stimulating and inclusive environment where curiosity is celebrated, creativity is encouraged, and every student feels seen and heard. We blend modern teaching methods with timeless human values to prepare our students for the challenges of tomorrow.
                  </p>
                  <p>
                    We consider parents our most important partners. Your trust in us is not taken lightly. Together, through open communication and shared goals, we ensure that each child receives the guidance, support, and opportunities they deserve to grow into confident, responsible, and compassionate individuals.
                  </p>
                  <p className="italic text-foreground/70">
                    "Education is not the filling of a bucket, but the lighting of a fire." Let us keep that fire burning brightly in every child at BRDM Public School.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────── */}
      {/* 4. VISION & MISSION                         */}
      {/* ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-secondary text-white relative overflow-hidden">
        <motion.div
          className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-primary/20 blur-3xl pointer-events-none"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <SectionHeader
            eyebrow="Who We Are"
            title="Vision & Mission"
            subtitle="The principles that guide every decision we make, every class we teach, and every child we nurture."
          />

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                label: 'Our Vision',
                icon: Star,
                text: 'To be the most trusted centre of learning in Kaithal — a school where every student discovers their potential, grows with confidence, and becomes a thoughtful and responsible global citizen. We envision a future where education transcends boundaries of background and circumstance, and every child has an equal opportunity to shine.',
              },
              {
                label: 'Our Mission',
                icon: Target,
                text: "To deliver holistic, student-centred education that integrates academic rigour with moral development, creative thinking, and life skills. We commit to providing a safe, inclusive, and inspiring environment, equipping students with the knowledge, values, and resilience to face life's opportunities and challenges with integrity and excellence.",
              },
            ].map(({ label, icon: Icon, text }, i) => (
              <motion.div
                key={label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-7 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-primary/30 flex items-center justify-center">
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl font-bold">{label}</h3>
                </div>
                <p className="text-white/80 text-sm sm:text-base leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────── */}
      {/* 5. CORE VALUES                              */}
      {/* ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-muted/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <SectionHeader
            eyebrow="What We Stand For"
            title="Our Core Values"
            subtitle="Six pillars that form the foundation of every interaction, lesson, and relationship at BRDM."
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
            {[
              { icon: Shield,   color: 'bg-blue-50 text-blue-600',   label: 'Discipline',  desc: 'Self-regulation and purposeful action in all endeavours.' },
              { icon: Lightbulb,color: 'bg-yellow-50 text-yellow-600',label: 'Creativity',  desc: 'Encouraging original thinking and imaginative expression.' },
              { icon: Heart,    color: 'bg-rose-50 text-rose-600',    label: 'Respect',     desc: 'Honouring every individual regardless of background.' },
              { icon: Star,     color: 'bg-purple-50 text-purple-600',label: 'Excellence',  desc: 'Striving for the highest standard in all pursuits.' },
              { icon: Zap,      color: 'bg-orange-50 text-orange-600',label: 'Innovation',  desc: 'Embracing new ideas and approaches to learning.' },
              { icon: Users,    color: 'bg-green-50 text-green-600',  label: 'Community',   desc: 'Building bonds of care, service, and belonging.' },
            ].map(({ icon: Icon, color, label, desc }, i) => (
              <motion.div
                key={label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="bg-card border border-border rounded-2xl p-5 flex flex-col items-center text-center gap-3 shadow-sm cursor-default"
              >
                <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center shrink-0`}>
                  <Icon size={22} aria-label={label} />
                </div>
                <h3 className="font-bold text-foreground text-sm">{label}</h3>
                <p className="text-xs text-muted-foreground leading-snug">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────── */}
      {/* 6. INFRASTRUCTURE & FACILITIES              */}
      {/* ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <SectionHeader
            eyebrow="Campus"
            title="Infrastructure & Facilities"
            subtitle="Modern amenities and a safe, vibrant campus designed to support every aspect of student life."
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {[
              { icon: BookOpen,     label: 'Library',             desc: 'A rich collection of books, journals, and digital resources for curious minds.' },
              { icon: FlaskConical, label: 'Science Labs',        desc: 'Fully equipped Physics, Chemistry, and Biology labs for hands-on experiments.' },
              { icon: Monitor,      label: 'Computer Lab',        desc: 'Modern computers with internet access for digital literacy and coding.' },
              { icon: Monitor,      label: 'Smart Classrooms',    desc: 'Interactive smart boards making every lesson engaging and technology-driven.' },
              { icon: TreePine,     label: 'Playground',          desc: 'Spacious outdoor ground for sports, physical education, and free play.' },
              { icon: Bus,          label: 'Transport',           desc: 'Safe and reliable school bus service covering major routes around Kaithal.' },
              { icon: Shield,       label: 'Safety & Security',   desc: '24/7 CCTV surveillance and trained security staff ensuring campus safety.' },
              { icon: Users,        label: 'Activity Hall',       desc: 'A dedicated space for cultural events, debates, drama, and annual functions.' },
            ].map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-3 shadow-sm"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm mb-1">{label}</h3>
                  <p className="text-xs text-muted-foreground leading-snug">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────── */}
      {/* 7. AFFILIATION & RECOGNITION                */}
      {/* ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-muted/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <SectionHeader
            eyebrow="Credentials"
            title="Affiliation & Recognition"
            subtitle="Officially recognised and affiliated — committed to the highest academic standards."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              {
                icon: CheckCircle2,
                title: 'Board Affiliation',
                desc: 'Affiliated to [Board Name], Affiliation No: XXXXX. Our curriculum strictly follows the prescribed syllabus and examination guidelines ensuring national-standard education.',
              },
              {
                icon: Award,
                title: 'Best School Award',
                desc: 'Recognised as one of the leading schools in Kaithal district for academic excellence, infrastructure, and student welfare initiatives.',
              },
              {
                icon: Star,
                title: 'Community Trust Award',
                desc: 'Honoured by the local community for over a decade of dedicated service, transparent governance, and consistently outstanding board results.',
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="bg-card border border-border rounded-2xl p-6 shadow-sm flex gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0 mt-0.5">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────── */}
      {/* 8. PARENT TESTIMONIALS                      */}
      {/* ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <SectionHeader
            eyebrow="What Parents Say"
            title="Voices of Our Community"
            subtitle="Hear from the families who trust BRDM Public School with their children's brightest years."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              {
                initials: 'SS',
                name: 'Sunita Sharma',
                relation: 'Parent of Class 5 Student',
                quote: 'BRDM has been a wonderful choice for our daughter. The teachers are caring and deeply dedicated. She has grown so much in confidence and academic ability since joining.',
                color: 'bg-primary',
              },
              {
                initials: 'RK',
                name: 'Rajesh Kumar',
                relation: 'Parent of Class 8 Student',
                quote: 'The school provides a great balance of academics and extracurricular activities. My son looks forward to school every day. The staff is approachable and always ready to help.',
                color: 'bg-secondary',
              },
              {
                initials: 'PD',
                name: 'Priya Devi',
                relation: 'Parent of Class 3 Student',
                quote: 'We are extremely happy with the learning environment at BRDM. The school truly lives up to its motto of preparing children for a better future. Highly recommended!',
                color: 'bg-accent',
              },
            ].map(({ initials, name, relation, quote, color }, i) => (
              <motion.div
                key={name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="bg-card border border-border rounded-3xl p-7 shadow-sm relative overflow-hidden"
              >
                <Quote className="absolute top-5 right-5 text-primary/8 w-14 h-14" aria-hidden="true" />
                <p className="text-muted-foreground text-sm leading-relaxed italic mb-6">"{quote}"</p>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-full ${color} text-white font-bold text-sm flex items-center justify-center shrink-0`}
                    aria-label={`${name}'s initials avatar`}
                  >
                    {initials}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{name}</p>
                    <p className="text-xs text-muted-foreground">{relation}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────── */}
      {/* 9. CALL-TO-ACTION BANNER                    */}
      {/* ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-primary relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-10 pointer-events-none"
          aria-hidden="true"
        >
          <svg width="100%" height="100%">
            <defs>
              <pattern id="cta-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-grid)" />
          </svg>
        </motion.div>
        <motion.div
          className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Give Your Child the Best Start
            </h2>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed">
              Join the BRDM family and give your child an education rooted in values, driven by excellence, and full of possibilities. Admissions for 2026–27 are open now.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/admissions"
                className="inline-block bg-white text-primary font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-shadow text-sm sm:text-base"
                aria-label="Apply for admissions at BRDM Public School"
              >
                Apply for Admissions →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
