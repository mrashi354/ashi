import { PageBanner } from '@/components/ui/PageBanner';
import { About } from '@/components/sections/About';

export function AboutPage() {
  return (
    <>
      <PageBanner
        title="About BRDM Public School"
        subtitle="A proud neighborhood school in Kaithal, Haryana — building futures since our founding."
      />
      <About />
    </>
  );
}
