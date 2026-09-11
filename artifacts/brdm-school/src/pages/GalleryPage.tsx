import { PageBanner } from '@/components/ui/PageBanner';
import { PageIntro } from '@/components/ui/PageIntro';
import { Gallery } from '@/components/sections/Gallery';
import { CrossLinks } from '@/components/ui/CrossLinks';

export function GalleryPage() {
  return (
    <>
      <PageBanner
        title="School Photo Gallery"
        subtitle="Browse campus life at BRDM Public School Kaithal — vibrant, joyful, and full of learning."
        breadcrumb="Gallery"
      />
      <PageIntro
        title="BRDM Public School Campus Photos & Gallery"
        text="Browse the BRDM Public School photo gallery to see everyday life at our CBSE school in Kaithal. Our school photos bring together real pictures of classrooms, the library, the playground, science labs, sports days, and annual functions — giving parents a true feel of the safe, vibrant learning environment we create every day."
        points={[
          "Real campus photos — no stock images",
          "Classrooms, library, labs & playground",
          "Events, sports day & annual celebrations",
        ]}
      />
      <Gallery />
      <CrossLinks
        title="Keep Exploring BRDM Public School Kaithal"
        links={[
          {
            label: 'Explore Academics at BRDM',
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