import { PageBanner } from '@/components/ui/PageBanner';
import { AcademicCalendar } from '@/components/sections/AcademicCalendar';

export function CalendarPage() {
  return (
    <>
      <PageBanner
        title="Academic Calendar"
        subtitle="Key dates, holidays, and exam schedule for the 2026–2027 academic year."
      />
      <AcademicCalendar />
    </>
  );
}
