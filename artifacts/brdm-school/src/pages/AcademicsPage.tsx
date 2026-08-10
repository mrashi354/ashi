import { PageBanner } from '@/components/ui/PageBanner';
import { Features } from '@/components/sections/Features';
import { AcademicsExtra } from '@/components/sections/AcademicsExtra';

export function AcademicsPage() {
  return (
    <>
      <PageBanner
        title="Academics"
        subtitle="A holistic, forward-looking curriculum designed to ignite every student's potential."
      />
      <Features />
      <AcademicsExtra />
    </>
  );
}
