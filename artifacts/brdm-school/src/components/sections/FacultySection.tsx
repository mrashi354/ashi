import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

interface FacultyMember {
  name: string;
  designation: string;
  subject: string;
  qualification: string;
  initials: string;
}

const faculty: FacultyMember[] = [
  {
    name: 'Mrs. Anita Sharma',
    designation: 'Senior Teacher',
    subject: 'Mathematics',
    qualification: 'M.Sc. Mathematics, B.Ed.',
    initials: 'AS',
  },
  {
    name: 'Mr. Ramesh Kumar',
    designation: 'Senior Teacher',
    subject: 'Science',
    qualification: 'M.Sc. Physics, B.Ed.',
    initials: 'RK',
  },
  {
    name: 'Mrs. Pooja Gupta',
    designation: 'Teacher',
    subject: 'English',
    qualification: 'M.A. English, B.Ed.',
    initials: 'PG',
  },
  {
    name: 'Mr. Sunil Verma',
    designation: 'Teacher',
    subject: 'Social Studies',
    qualification: 'M.A. History, B.Ed.',
    initials: 'SV',
  },
  {
    name: 'Mrs. Kavita Rani',
    designation: 'Teacher',
    subject: 'Hindi',
    qualification: 'M.A. Hindi, B.Ed.',
    initials: 'KR',
  },
  {
    name: 'Mr. Deepak Malik',
    designation: 'Teacher',
    subject: 'Computer Science',
    qualification: 'B.Tech (CS), B.Ed.',
    initials: 'DM',
  },
  {
    name: 'Mrs. Sunita Devi',
    designation: 'Primary Teacher',
    subject: 'EVS & Art',
    qualification: 'B.A., D.Ed.',
    initials: 'SD',
  },
  {
    name: 'Mr. Ajay Hooda',
    designation: 'Physical Education',
    subject: 'Sports & P.E.',
    qualification: 'B.P.Ed.',
    initials: 'AH',
  },
];

export function FacultySection() {
  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Our Team</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-2">
            Meet Our Faculty
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm sm:text-base">
            Qualified, passionate educators committed to every student's success.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {faculty.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="bg-card rounded-2xl border border-border p-6 text-center hover:shadow-md transition-shadow group"
            >
              {/* Avatar */}
              <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <span className="font-serif font-bold text-primary text-lg">{member.initials}</span>
              </div>

              <div className="font-semibold text-foreground text-sm sm:text-base mb-0.5">{member.name}</div>
              <div className="text-primary text-xs font-semibold mb-1">{member.designation}</div>

              <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mb-2">
                <GraduationCap size={12} className="shrink-0" />
                <span>{member.subject}</span>
              </div>

              <div className="text-xs text-muted-foreground/80 border-t border-border pt-3 mt-2">
                {member.qualification}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground text-sm mt-10"
        >
          Our full team of 30+ educators is dedicated to nurturing every child at BRDM Public School.
        </motion.p>
      </div>
    </section>
  );
}
