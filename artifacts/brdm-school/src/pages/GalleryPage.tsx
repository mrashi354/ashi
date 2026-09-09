import { PageBanner } from '@/components/ui/PageBanner';
import { Gallery } from '@/components/sections/Gallery';
import { CrossLinks } from '@/components/ui/CrossLinks';

export function GalleryPage() {
  return (
    <>
      <PageBanner
        title="Photo Gallery"
        subtitle="A glimpse into everyday life at BRDM — vibrant, joyful, and full of energy."
        breadcrumb="Gallery"
      />
      <Gallery />
      <CrossLinks
        title="Keep Exploring BRDM Public School Kaithal"
        links={[
          {
            label: 'Explore Our Academics',
            href: '/academics',
            description:
              'Learn about our curriculum, teaching methodology, and programs from Play Group to Class 10.',
          },
          {
            label: 'Admissions Open for 2026–27',
            href: '/admissions',
            description:
              'Ready to give your child the best start? Apply to BRDM Public School today.',
          },
          {
            label: 'Contact Us for a Campus Visit',
            href: '/contact',
            description:
              'Experience our campus firsthand — call, email, or send us a message to plan a visit.',
          },
        ]}
      />
    </>
  );
}