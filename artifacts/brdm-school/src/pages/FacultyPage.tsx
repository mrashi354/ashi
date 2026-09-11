import { PageBanner } from '@/components/ui/PageBanner';
import { PageIntro } from '@/components/ui/PageIntro';
import { FacultySection } from '@/components/sections/FacultySection';

export function FacultyPage() {
  return (
    <>
      <PageBanner
        title="Our Faculty at BRDM"
        subtitle="Meet the dedicated educators shaping the future of every student at BRDM Public School."
      />
      <PageIntro
        title="Qualified Faculty at BRDM Public School, Kaithal"
        text={[
          "The faculty at BRDM Public School is one of the strongest reasons parents choose our CBSE school in Kaithal. Our team of 30+ qualified teachers includes M.Sc. and M.A. graduates with B.Ed. training who specialise in subjects like Mathematics, Science, English, Social Studies, Hindi, and Computer Science.",
          "With a student-teacher ratio of 15:1, every child receives the individual attention they deserve — whether it is extra help with a difficult concept, encouragement for a subject they love, or simply a teacher who knows their name.",
        ]}
        points={[
          "30+ qualified teachers (M.Sc., M.A., B.Ed.)",
          "15:1 student-teacher ratio",
          "Expertise across all core subjects",
        ]}
      />
      <FacultySection />
    </>
  );
}
