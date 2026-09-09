import { PageBanner } from '@/components/ui/PageBanner';
import { Features } from '@/components/sections/Features';
import { AcademicsExtra } from '@/components/sections/AcademicsExtra';
import { CrossLinks } from '@/components/ui/CrossLinks';

export function AcademicsPage() {
  return (
    <>
      <PageBanner
        title="Academics"
        subtitle="A holistic, forward-looking curriculum designed to ignite every student's potential."
        breadcrumb="Academics"
      />
      <Features />
      <AcademicsExtra />
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