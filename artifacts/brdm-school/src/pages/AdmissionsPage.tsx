import { PageBanner } from '@/components/ui/PageBanner';
import { Admissions } from '@/components/sections/Admissions';

export function AdmissionsPage() {
  return (
    <>
      <PageBanner
        title="Admissions"
        subtitle="Begin your child's journey at BRDM Public School — admissions open for 2026–2027."
      />
      <Admissions />
    </>
  );
}
