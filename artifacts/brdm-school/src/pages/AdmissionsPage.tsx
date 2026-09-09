import { PageBanner } from '@/components/ui/PageBanner';
import { Admissions } from '@/components/sections/Admissions';
import { CrossLinks } from '@/components/ui/CrossLinks';

export function AdmissionsPage() {
  return (
    <>
      <PageBanner
        title="Admissions"
        subtitle="Begin your child's journey at BRDM Public School — admissions open for 2026–2027."
        breadcrumb="Admissions"
      />
      <Admissions />
      <CrossLinks
        title="Ready to Know More?"
        links={[
          {
            label: 'Explore Our Academics',
            href: '/academics',
            description:
              'Understand our curriculum from Play Group to Class 10 and our teaching methodology.',
          },
          {
            label: 'Discover Campus Life',
            href: '/gallery',
            description:
              'See classrooms, facilities, events, and everyday moments at BRDM in our photo gallery.',
          },
          {
            label: 'Contact the Admissions Office',
            href: '/contact',
            description:
              'Call +91 7404500023 or visit Shora Kothi, Jind Rd, Kaithal for admission guidance.',
          },
        ]}
      />
    </>
  );
}