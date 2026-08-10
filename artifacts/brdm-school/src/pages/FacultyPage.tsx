import { PageBanner } from '@/components/ui/PageBanner';
import { FacultySection } from '@/components/sections/FacultySection';

export function FacultyPage() {
  return (
    <>
      <PageBanner
        title="Our Faculty"
        subtitle="Meet the dedicated educators shaping the future of every student at BRDM Public School."
      />
      <FacultySection />
    </>
  );
}
