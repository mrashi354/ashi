import { PageBanner } from '@/components/ui/PageBanner';
import { About } from '@/components/sections/About';
import { CrossLinks } from '@/components/ui/CrossLinks';

export function AboutPage() {
  return (
    <>
      <PageBanner
        title="About BRDM Public School"
        subtitle="A proud neighborhood school in Kaithal, Haryana — building futures since our founding."
        breadcrumb="About"
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