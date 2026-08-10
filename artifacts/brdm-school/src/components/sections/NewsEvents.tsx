import { motion } from 'framer-motion';
import { Bell, Calendar, ChevronRight } from 'lucide-react';

interface NewsItem {
  id: number;
  type: 'notice' | 'event' | 'result';
  title: string;
  date: string;
  description: string;
  badge: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    type: 'notice',
    title: 'Admissions Open for 2026–2027',
    date: 'July 15, 2026',
    badge: 'Notice',
    description: 'Applications are now being accepted for all classes from Play Group to Class 10. Limited seats available. Visit the Admissions page to apply online.',
  },
  {
    id: 2,
    type: 'event',
    title: 'Annual Sports Day – August 10, 2026',
    date: 'July 20, 2026',
    badge: 'Event',
    description: 'We are excited to announce our Annual Sports Day on August 10, 2026. Students are requested to start practice sessions. Parents are warmly invited to attend.',
  },
  {
    id: 3,
    type: 'result',
    title: 'Class 10 Board Results 2025–26',
    date: 'June 5, 2026',
    badge: 'Result',
    description: 'Congratulations to all Class 10 students! BRDM Public School achieved a 98% pass percentage in the board examinations. We are proud of every student.',
  },
  {
    id: 4,
    type: 'event',
    title: 'Independence Day Celebration – August 15',
    date: 'July 25, 2026',
    badge: 'Event',
    description: 'Join us on August 15 for our Independence Day celebration. All students, parents, and staff are invited for the flag hoisting ceremony at 8:00 AM.',
  },
  {
    id: 5,
    type: 'notice',
    title: 'Fee Submission Reminder – Last Date July 31',
    date: 'July 10, 2026',
    badge: 'Notice',
    description: 'Parents are reminded that the last date for fee submission for the current term is July 31, 2026. Please submit fees at the school office during school hours.',
  },
  {
    id: 6,
    type: 'event',
    title: 'Science Exhibition – September 2026',
    date: 'July 28, 2026',
    badge: 'Event',
    description: 'Students of Class 6–10 are invited to participate in the annual Science Exhibition. Registration deadline is August 25. Contact your class teacher for details.',
  },
];

const badgeColors: Record<string, string> = {
  Notice: 'bg-blue-100 text-blue-700 border-blue-200',
  Event: 'bg-green-100 text-green-700 border-green-200',
  Result: 'bg-amber-100 text-amber-700 border-amber-200',
};

export function NewsEvents() {
  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
        >
          <div>
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">Latest Updates</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-2">
              News &amp; Events
            </h2>
          </div>
          <p className="text-muted-foreground text-sm max-w-xs sm:text-right">
            Stay updated with school notices, upcoming events, and achievements.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {newsItems.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="bg-card rounded-2xl border border-border p-5 hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${badgeColors[item.badge]}`}>
                  {item.badge}
                </span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                  <Calendar size={11} />
                  {item.date}
                </div>
              </div>

              <h3 className="font-semibold text-foreground text-sm sm:text-base mb-2 leading-snug">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed flex-1">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>

        {/* Notice board footer */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 flex items-center justify-center gap-2 text-muted-foreground text-sm"
        >
          <Bell size={15} className="text-primary" />
          <span>For more information, please <a href="/contact" className="text-primary font-medium hover:underline">contact the school office</a>.</span>
        </motion.div>
      </div>
    </section>
  );
}
