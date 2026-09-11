import { PageBanner } from '@/components/ui/PageBanner';
import { PageIntro } from '@/components/ui/PageIntro';
import { AcademicCalendar } from '@/components/sections/AcademicCalendar';

export function CalendarPage() {
  return (
    <>
      <PageBanner
        title="Academic Calendar 2026–27"
        subtitle="Plan your year with BRDM Public School — holidays, exams, and important dates for the current session."
      />
      <PageIntro
        title="BRDM Public School Academic Calendar"
        text="Plan your year with the BRDM Public School academic calendar for 2026–27. This page lists school holidays, festival breaks, unit tests, half-yearly and annual examinations, and the Class 10 board exams — so parents and students in Kaithal always know what's coming next."
        points={[
          "School holidays & festival breaks",
          "Unit test & half-yearly exam dates",
          "Annual exams & Class 10 board exams",
          "Result declaration schedule",
        ]}
      />
      <AcademicCalendar />
    </>
  );
}
