import { PageBanner } from '@/components/ui/PageBanner';
import { PageIntro } from '@/components/ui/PageIntro';
import { Admissions } from '@/components/sections/Admissions';
import { FAQ, admissionsFaqs } from '@/components/sections/FAQ';
import { CrossLinks } from '@/components/ui/CrossLinks';

export function AdmissionsPage() {
  return (
    <>
      <PageBanner
        title="Admissions 2026–27"
        subtitle="Begin your child's journey at BRDM Public School Kaithal — admissions open for 2026–2027."
        breadcrumb="Admissions"
      />
      <PageIntro
        eyebrow="School Admissions in Haryana"
        title="How to Get Admission at BRDM Public School, Kaithal"
        text={[
          "Admissions in 2026–27 at BRDM Public School, one of the leading CBSE schools in Kaithal, are open for Play Group to Class 10. Seats for each class are limited, so early applications are recommended.",
          "Below you will find the complete admission process, age eligibility for each class, required documents, and information about school fees — so you can plan your child's admission to our school in Kaithal with confidence.",
        ]}
        points={[
          "Play Group to Class 10 — seats limited",
          "Simple online enquiry process",
          "Campus tour + friendly parent interaction",
          "Transport available across Kaithal routes",
        ]}
      />
      <Admissions />
      <FAQ
        items={admissionsFaqs}
        title="Admissions FAQ"
        subtitle="Everything parents in Kaithal need to know about the admission process, eligibility, documents, and fees."
      />
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