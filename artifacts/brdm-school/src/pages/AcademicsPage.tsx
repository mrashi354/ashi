import { PageBanner } from '@/components/ui/PageBanner';
import { PageIntro } from '@/components/ui/PageIntro';
import { Features } from '@/components/sections/Features';
import { AcademicsExtra } from '@/components/sections/AcademicsExtra';
import { FAQ, academicsFaqs } from '@/components/sections/FAQ';
import { CrossLinks } from '@/components/ui/CrossLinks';

export function AcademicsPage() {
  return (
    <>
      <PageBanner
        title="Academics at BRDM Public School"
        subtitle="A holistic CBSE curriculum from Play Group to Class 10, designed to ignite every student's potential."
        breadcrumb="Academics"
      />
      <PageIntro
        eyebrow="School Curriculum Kaithal"
        title="CBSE Curriculum & Teaching at BRDM Public School"
        text={[
          "At BRDM Public School, our CBSE curriculum in Kaithal is carefully planned from Play Group to Class 10. Each stage builds strong foundations in English, Hindi, Mathematics, Science, and Social Science, alongside computer education, art, and physical education.",
          "Our teaching methodology combines smart classrooms and activity-based learning with regular assessments, so children understand concepts deeply rather than just memorise. The 2026–27 syllabus follows CBSE-prescribed guidelines, and students also enjoy library periods, sports, music, and other extracurricular activities every week.",
        ]}
        points={[
          "English & Hindi medium from Play Group",
          "Science labs & smart classrooms",
          "Activity-based learning, not rote memorisation",
          "Weekly sports, art, music & library periods",
        ]}
      />
      <Features />
      <AcademicsExtra />
      <FAQ
        items={academicsFaqs}
        title="Academics & Curriculum FAQ"
        subtitle="Common questions from parents about the curriculum, subjects, and teaching methods at BRDM Public School."
      />
      <CrossLinks
        title="Discover More About Learning at BRDM"
        links={[
          {
            label: 'View Academic Calendar',
            href: '/calendar',
            description:
              'Check important dates, school holidays, and the full exam schedule for 2026–27.',
          },
          {
            label: 'See Campus Life in Our Gallery',
            href: '/gallery',
            description:
              'Browse photos of our classrooms, library, playground, events, and everyday school life.',
          },
          {
            label: 'Learn More About Our Faculty',
            href: '/faculty',
            description:
              'Meet the expert educators who bring our curriculum to life with care and dedication.',
          },
        ]}
      />
    </>
  );
}