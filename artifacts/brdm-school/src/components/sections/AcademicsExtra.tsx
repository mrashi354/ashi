import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import {
  GraduationCap, BookOpen, Monitor, Users, ClipboardList,
  Music, Dumbbell, Palette, TreePine, CheckCircle2, Award,
  Brain, Lightbulb, MessageSquare, ChevronDown,
} from 'lucide-react';

/* ── shared helpers ── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1 },
  }),
};

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

/* ─────────────────────────────────────────────────────────── */
/* 1. CLASS-WISE STRUCTURE                                     */
/* ─────────────────────────────────────────────────────────── */
const levels = [
  {
    stage: 'Play Group',
    range: 'Ages 2½ – 3',
    focus: 'Sensory play, motor skills, and social interaction through guided play activities.',
    color: 'bg-pink-50 border-pink-200 text-pink-700',
    dot: 'bg-pink-500',
  },
  {
    stage: 'Nursery / KG',
    range: 'Ages 3 – 6',
    focus: 'Pre-literacy, numeracy foundations, creativity, and building confidence through activity-based learning.',
    color: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    dot: 'bg-yellow-500',
  },
  {
    stage: 'Primary',
    range: 'Class 1 – 5',
    focus: 'Core subjects including English, Hindi, Mathematics, EVS, Computer, Art & GK with continuous assessment.',
    color: 'bg-blue-50 border-blue-200 text-blue-700',
    dot: 'bg-blue-500',
  },
  {
    stage: 'Middle School',
    range: 'Class 6 – 8',
    focus: 'In-depth study of Sciences, Social Science, Mathematics, Languages, and Computer Science.',
    color: 'bg-purple-50 border-purple-200 text-purple-700',
    dot: 'bg-purple-500',
  },
  {
    stage: 'Secondary',
    range: 'Class 9 – 10',
    focus: 'Board-oriented academics with subject specialisation, lab practicals, and career counselling.',
    color: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    dot: 'bg-emerald-500',
  },
];

function ClassStructure() {
  return (
    <section className="py-16 sm:py-20 bg-muted/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <SectionHeader
          eyebrow="Academic Levels"
          title="Class-wise Structure"
          subtitle="A carefully designed progression from early childhood to secondary education — every stage purposeful."
        />

        {/* Desktop: horizontal steps */}
        <div className="hidden md:flex items-stretch gap-0 max-w-5xl mx-auto">
          {levels.map((lvl, i) => (
            <motion.div
              key={lvl.stage}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="flex-1 relative"
            >
              {/* connector line */}
              {i < levels.length - 1 && (
                <div className="absolute top-8 right-0 w-full h-0.5 bg-border z-0 translate-x-1/2" aria-hidden="true" />
              )}

              <div className={`relative z-10 mx-2 border-2 ${lvl.color} rounded-2xl p-5 h-full flex flex-col gap-3 bg-white shadow-sm`}>
                <div className={`w-4 h-4 rounded-full ${lvl.dot} mx-auto mb-1`} aria-hidden="true" />
                <div className="text-center">
                  <p className="font-bold text-foreground text-sm">{lvl.stage}</p>
                  <p className="text-xs text-muted-foreground">{lvl.range}</p>
                </div>
                <p className="text-xs text-muted-foreground leading-snug text-center">{lvl.focus}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: vertical stack */}
        <div className="md:hidden space-y-4 max-w-lg mx-auto">
          {levels.map((lvl, i) => (
            <motion.div
              key={lvl.stage}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className={`border-2 ${lvl.color} rounded-2xl p-5 bg-white shadow-sm flex gap-4 items-start`}
            >
              <div className={`w-3 h-3 rounded-full ${lvl.dot} mt-1.5 shrink-0`} aria-hidden="true" />
              <div>
                <p className="font-bold text-foreground text-sm">{lvl.stage}
                  <span className="ml-2 font-normal text-muted-foreground text-xs">{lvl.range}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1 leading-snug">{lvl.focus}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* 2. BOARD AFFILIATION                                        */
/* ─────────────────────────────────────────────────────────── */
function BoardAffiliation() {
  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <SectionHeader
          eyebrow="Credentials"
          title="Board Affiliation & Recognition"
          subtitle="Academically anchored to national standards and officially recognised."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {[
            {
              icon: Award,
              title: 'Board Affiliation',
              desc: 'Affiliated to [Board Name] · Affiliation No: XXXXX · School Code: XXXXX. Curriculum, examinations, and standards follow board guidelines.',
            },
            {
              icon: BookOpen,
              title: 'Medium of Instruction',
              desc: 'English and Hindi are the mediums of instruction, ensuring strong bilingual communication skills from an early age.',
            },
            {
              icon: CheckCircle2,
              title: 'Recognised School',
              desc: 'Recognised by the State Education Department, Haryana. Committed to quality, transparency, and student welfare.',
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
  );
}

/* ─────────────────────────────────────────────────────────── */
/* 3. SUBJECTS & CURRICULUM (tabs)                             */
/* ─────────────────────────────────────────────────────────── */
const curriculum: Record<string, { subject: string; icon: string }[]> = {
  Primary: [
    { subject: 'English', icon: '📖' },
    { subject: 'Hindi', icon: '📝' },
    { subject: 'Mathematics', icon: '🔢' },
    { subject: 'EVS', icon: '🌿' },
    { subject: 'Computer', icon: '💻' },
    { subject: 'Art & Craft', icon: '🎨' },
    { subject: 'General Knowledge', icon: '🌍' },
  ],
  Middle: [
    { subject: 'English', icon: '📖' },
    { subject: 'Hindi', icon: '📝' },
    { subject: 'Mathematics', icon: '🔢' },
    { subject: 'Science', icon: '🔬' },
    { subject: 'Social Science', icon: '🗺️' },
    { subject: 'Sanskrit / 3rd Lang', icon: '🕉️' },
    { subject: 'Computer Science', icon: '💻' },
  ],
  Secondary: [
    { subject: 'English', icon: '📖' },
    { subject: 'Hindi', icon: '📝' },
    { subject: 'Mathematics', icon: '🔢' },
    { subject: 'Science', icon: '🔬' },
    { subject: 'Social Science', icon: '🗺️' },
    { subject: 'Computer / IT', icon: '💻' },
    { subject: 'Physical Education', icon: '🏃' },
  ],
};

const tabLabels = ['Primary', 'Middle', 'Secondary'] as const;

function SubjectsCurriculum() {
  const [active, setActive] = useState<typeof tabLabels[number]>('Primary');

  return (
    <section className="py-16 sm:py-20 bg-muted/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <SectionHeader
          eyebrow="What We Teach"
          title="Subjects & Curriculum"
          subtitle="A rich, balanced curriculum at every stage — preparing students for both exams and life."
        />

        {/* Tab buttons */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {tabLabels.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                active === tab
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-card border border-border text-muted-foreground hover:border-primary hover:text-primary'
              }`}
              aria-pressed={active === tab}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Subject cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {curriculum[active].map(({ subject, icon }, i) => (
              <motion.div
                key={subject}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="bg-card border border-border rounded-2xl p-4 flex flex-col items-center gap-2 shadow-sm text-center"
              >
                <span className="text-3xl" role="img" aria-label={subject}>{icon}</span>
                <p className="font-semibold text-foreground text-xs sm:text-sm">{subject}</p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* 4. TEACHING METHODOLOGY                                     */
/* ─────────────────────────────────────────────────────────── */
function TeachingMethodology() {
  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <SectionHeader
          eyebrow="How We Teach"
          title="Teaching Methodology"
          subtitle="Modern, proven approaches that make learning engaging, meaningful, and effective."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {[
            {
              icon: Monitor,
              color: 'bg-blue-50 text-blue-600',
              title: 'Smart Classrooms',
              desc: 'Interactive digital boards and multimedia content make abstract concepts visual and easy to grasp.',
            },
            {
              icon: Brain,
              color: 'bg-purple-50 text-purple-600',
              title: 'Activity-Based Learning',
              desc: 'Hands-on experiments, projects, and group tasks build deeper understanding beyond rote memorisation.',
            },
            {
              icon: ClipboardList,
              color: 'bg-amber-50 text-amber-600',
              title: 'Regular Assessments',
              desc: 'Periodic tests, assignments, and project evaluations provide timely feedback to students and parents.',
            },
            {
              icon: Users,
              color: 'bg-emerald-50 text-emerald-600',
              title: 'Individual Attention',
              desc: 'Our low student-teacher ratio ensures every child receives personalised guidance and support.',
            },
          ].map(({ icon: Icon, color, title, desc }, i) => (
            <motion.div
              key={title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col gap-4"
            >
              <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
                <Icon size={22} aria-hidden="true" />
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
  );
}

/* ─────────────────────────────────────────────────────────── */
/* 5. BEYOND THE CLASSROOM                                     */
/* ─────────────────────────────────────────────────────────── */
function BeyondClassroom() {
  return (
    <section className="py-16 sm:py-20 bg-secondary text-white relative overflow-hidden">
      <motion.div
        className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-primary/20 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <SectionHeader
          eyebrow="Co-Curricular"
          title="Beyond the Classroom"
          subtitle="Education at BRDM extends far beyond textbooks — nurturing talent, wellness, and creativity every day."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {[
            { icon: Dumbbell,     label: 'Sports Periods',        desc: 'Daily physical activity and team sports.' },
            { icon: TreePine,     label: 'Yoga & PE',             desc: 'Mindfulness and physical education sessions.' },
            { icon: Palette,      label: 'Art & Craft',           desc: 'Creative expression through visual arts.' },
            { icon: Music,        label: 'Music',                 desc: 'Vocal and instrument exploration.' },
            { icon: Monitor,      label: 'Computer Lab',          desc: 'Structured digital literacy sessions.' },
            { icon: BookOpen,     label: 'Library Periods',       desc: 'Reading habit cultivation every week.' },
          ].map(({ icon: Icon, label, desc }, i) => (
            <motion.div
              key={label}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.04 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 flex flex-col items-center text-center gap-3"
            >
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
                <Icon size={20} aria-label={label} />
              </div>
              <p className="font-bold text-sm">{label}</p>
              <p className="text-white/70 text-xs leading-snug">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* 6. ASSESSMENT & EVALUATION (accordion)                      */
/* ─────────────────────────────────────────────────────────── */
const assessments = [
  {
    title: 'Periodic Tests',
    detail: 'Conducted every 4–6 weeks per subject, covering recent topics. Results are shared with parents to track progress and address weak areas promptly.',
  },
  {
    title: 'Half-Yearly Examinations',
    detail: 'Comprehensive exams held mid-session covering the full syllabus taught so far. Formal report cards are issued following these exams.',
  },
  {
    title: 'Annual Examinations',
    detail: 'End-of-year exams covering the complete annual syllabus. Performance determines promotion to the next class and carries significant weight.',
  },
  {
    title: 'Project-Based Assessment',
    detail: 'Subject projects, group assignments, and presentations are assessed throughout the year to evaluate research, creativity, and collaborative skills.',
  },
  {
    title: 'Report Cards & Parent Meetings',
    detail: 'Detailed report cards are issued twice a year. Parent-Teacher Meetings are held quarterly to ensure continuous home-school collaboration.',
  },
];

function AssessmentEvaluation() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <SectionHeader
          eyebrow="Evaluation"
          title="Assessment & Evaluation"
          subtitle="Fair, transparent, and continuous assessment that reflects every student's true growth."
        />

        <div className="max-w-3xl mx-auto space-y-3">
          {assessments.map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm"
            >
              <button
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Lightbulb size={16} aria-hidden="true" />
                  </div>
                  <span className="font-semibold text-foreground text-sm sm:text-base">{item.title}</span>
                </div>
                <motion.span
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="shrink-0 text-muted-foreground"
                  aria-hidden="true"
                >
                  <ChevronDown size={18} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                      {item.detail}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* 7. CTA BANNER                                               */
/* ─────────────────────────────────────────────────────────── */
function AcademicsCTA() {
  return (
    <section className="py-16 sm:py-20 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="acad-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#acad-grid)" />
        </svg>
      </div>
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
          <div className="flex items-center justify-center gap-2 mb-2">
            <GraduationCap size={28} aria-hidden="true" />
            <MessageSquare size={24} className="opacity-70" aria-hidden="true" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Curious About Our Curriculum?
          </h2>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed">
            Download our school prospectus for a complete overview of our academic programme, facilities, and admission process — or apply directly today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block bg-white/20 border border-white/40 text-white font-bold px-7 py-3.5 rounded-full hover:bg-white/30 transition-colors text-sm sm:text-base"
              aria-label="Download school prospectus (PDF)"
            >
              Download Prospectus
            </motion.a>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/admissions"
                className="inline-block bg-white text-primary font-bold px-7 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-shadow text-sm sm:text-base"
                aria-label="Enroll now at BRDM Public School"
              >
                Enroll Now →
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* EXPORT: all new sections combined                           */
/* ─────────────────────────────────────────────────────────── */
export function AcademicsExtra() {
  return (
    <>
      <ClassStructure />
      <BoardAffiliation />
      <SubjectsCurriculum />
      <TeachingMethodology />
      <BeyondClassroom />
      <AssessmentEvaluation />
      <AcademicsCTA />
    </>
  );
}
