import { PageBanner } from '@/components/ui/PageBanner';
import { PageIntro } from '@/components/ui/PageIntro';
import { Contact } from '@/components/sections/Contact';
import { CrossLinks } from '@/components/ui/CrossLinks';

export function ContactPage() {
  return (
    <>
      <PageBanner
        title="Contact BRDM Public School"
        subtitle="Get in touch for admissions, school fee details, or to plan a campus visit."
        breadcrumb="Contact"
      />
      <PageIntro
        title="Contact BRDM Public School, Kaithal"
        text={[
          "Contact BRDM Public School, Kaithal, for admission details, school fee structure, or to plan a campus visit. Call us at +91 7404500023, email admin@brdm.com, or visit us at Shora Kothi, Jind Road, Kaithal, Haryana — our office is open Monday to Saturday, 8:00 AM to 4:00 PM.",
          "Our school runs from 8:00 AM to 2:30 PM, Monday to Saturday, and our admissions office is available during those hours to answer any questions about fees, eligibility, or the admission process.",
        ]}
      />
      <Contact />
      <CrossLinks
        title="Explore More About BRDM Public School Kaithal"
        links={[
          {
            label: 'Explore Academics at BRDM',
            href: '/academics',
            description:
              'Discover our curriculum, smart classrooms, science labs, and teaching approach.',
          },
          {
            label: 'Apply for Admissions 2026–27',
            href: '/admissions',
            description:
              'Admissions are open for Play Group to Class 10. Submit your enquiry online.',
          },
          {
            label: "Read the Principal's Message",
            href: '/principal',
            description:
              'A personal welcome and vision from the principal of BRDM Public School.',
          },
        ]}
      />
    </>
  );
}