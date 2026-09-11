import { PageBanner } from '@/components/ui/PageBanner';
import { PageIntro } from '@/components/ui/PageIntro';
import { About } from '@/components/sections/About';
import { CrossLinks } from '@/components/ui/CrossLinks';

export function AboutPage() {
  return (
    <>
      <PageBanner
        title="About BRDM Public School"
        subtitle="A proud neighbourhood CBSE school in Kaithal, Haryana — building futures since 2008."
        breadcrumb="About"
      />
      <PageIntro
        title="Best CBSE School in Kaithal, Haryana"
        text={[
          "BRDM Public School is one of the best CBSE schools in Kaithal, Haryana, serving families from Kaithal and nearby areas including Pehowa, Dhand, and Pundri. Since our founding in 2008, we have grown into a trusted centre of learning recognised for strong academic results, modern classrooms, and a caring 30+ member faculty.",
          "Our school curriculum spans Play Group to Class 10, with transparent school fees, regular assessments, and a student-teacher ratio of 15:1 that ensures every child receives the personal attention they need to thrive.",
        ]}
        points={[
          "15+ years serving Kaithal families",
          "Play Group to Class 10 CBSE curriculum",
          "Student-teacher ratio of 15:1",
          "Smart classrooms, science labs & library",
        ]}
      />
      <About />
      <CrossLinks
        title="Explore More About BRDM Public School"
        links={[
          {
            label: "Read the Principal's Message",
            href: '/principal',
            description:
              'A personal message from our school principal on education, values, and our vision for every child.',
          },
          {
            label: 'Meet Our Faculty',
            href: '/faculty',
            description:
              'Get to know the 30+ qualified, caring teachers who mentor every student at BRDM Public School.',
          },
          {
            label: 'Apply for Admissions',
            href: '/admissions',
            description:
              'Admissions open for 2026–27 across all classes. Start your child\'s journey at BRDM today.',
          },
        ]}
      />
    </>
  );
}