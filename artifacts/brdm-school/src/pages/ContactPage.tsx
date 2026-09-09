import { PageBanner } from '@/components/ui/PageBanner';
import { Contact } from '@/components/sections/Contact';
import { CrossLinks } from '@/components/ui/CrossLinks';

export function ContactPage() {
  return (
    <>
      <PageBanner
        title="Contact Us"
        subtitle="We'd love to hear from you. Reach out with any questions."
        breadcrumb="Contact"
      />
      <Contact />
      <CrossLinks
        title="Explore More About BRDM Public School Kaithal"
        links={[
          {
            label: 'Learn About Our Academics',
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