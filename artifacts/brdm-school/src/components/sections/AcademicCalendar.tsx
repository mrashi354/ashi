import { motion } from 'framer-motion';
import { CalendarDays, BookOpen } from 'lucide-react';

const holidays = [
  { date: 'Jan 26', name: 'Republic Day', type: 'national' },
  { date: 'Mar 25', name: 'Holi', type: 'festival' },
  { date: 'Apr 14', name: 'Dr. Ambedkar Jayanti', type: 'national' },
  { date: 'Apr 18', name: 'Good Friday', type: 'festival' },
  { date: 'May 1', name: 'Labour Day', type: 'national' },
  { date: 'Jun – Jul', name: 'Summer Vacation', type: 'vacation' },
  { date: 'Aug 15', name: 'Independence Day', type: 'national' },
  { date: 'Oct 2', name: 'Gandhi Jayanti', type: 'national' },
  { date: 'Oct – Nov', name: 'Dussehra & Diwali Break', type: 'festival' },
  { date: 'Nov 5', name: 'Diwali', type: 'festival' },
  { date: 'Dec 25', name: 'Christmas', type: 'festival' },
  { date: 'Dec 30 – Jan 1', name: 'Winter Break', type: 'vacation' },
];

const examSchedule = [
  { period: 'Unit Test 1', months: 'July', classes: 'All Classes' },
  { period: 'Half Yearly Exams', months: 'September', classes: 'Class 1 – 10' },
  { period: 'Unit Test 2', months: 'November', classes: 'All Classes' },
  { period: 'Annual / Final Exams', months: 'February – March', classes: 'Class 1 – 10' },
  { period: 'Board Examinations', months: 'March', classes: 'Class 10' },
  { period: 'Result Declaration', months: 'April – May', classes: 'All Classes' },
];

const typeColors: Record<string, string> = {
  national: 'bg-blue-100 text-blue-700 border-blue-200',
  festival: 'bg-amber-100 text-amber-700 border-amber-200',
  vacation: 'bg-green-100 text-green-700 border-green-200',
};

export function AcademicCalendar() {
  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Academic Year 2026–27</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-2">
            Academic Calendar
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm sm:text-base">
            Key dates, holidays, and exam schedule for the current academic year.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Holidays */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm"
          >
            <div className="flex items-center gap-3 px-6 py-4 bg-secondary text-white">
              <CalendarDays size={20} />
              <h3 className="font-serif font-semibold text-lg">Holiday List</h3>
            </div>
            <div className="divide-y divide-border">
              {holidays.map((h) => (
                <div key={h.name} className="flex items-center justify-between px-6 py-3">
                  <div>
                    <div className="font-medium text-foreground text-sm">{h.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{h.date}</div>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border capitalize ${typeColors[h.type]}`}>
                    {h.type}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Exam Schedule */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm"
          >
            <div className="flex items-center gap-3 px-6 py-4 bg-primary text-primary-foreground">
              <BookOpen size={20} />
              <h3 className="font-serif font-semibold text-lg">Exam Schedule</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left px-6 py-3 font-semibold text-foreground">Examination</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Month</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Classes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {examSchedule.map((row) => (
                    <tr key={row.period} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-3.5 font-medium text-foreground">{row.period}</td>
                      <td className="px-4 py-3.5 text-muted-foreground">{row.months}</td>
                      <td className="px-4 py-3.5 text-muted-foreground">{row.classes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Legend */}
            <div className="px-6 py-4 border-t border-border bg-muted/20 flex flex-wrap gap-3">
              {Object.entries(typeColors).map(([type, cls]) => (
                <span key={type} className={`text-xs font-semibold px-2.5 py-1 rounded-full border capitalize ${cls}`}>
                  {type}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
