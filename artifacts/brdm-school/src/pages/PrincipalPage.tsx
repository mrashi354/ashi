import { PageBanner } from '@/components/ui/PageBanner';
import { PageIntro } from '@/components/ui/PageIntro';
import { PrincipalMessage } from '@/components/sections/PrincipalMessage';

export function PrincipalPage() {
  return (
    <>
      <PageBanner
        title="Principal's Message"
        subtitle="A message from our school principal on education, leadership, and the vision behind BRDM."
      />
      <PageIntro
        title="Principal's Message – BRDM Public School, Kaithal"
        text="A message from the Principal of BRDM Public School, Kaithal — our leadership on education, values, and the vision that shapes daily life at our CBSE school. Learn what guides our faculty, our students, and every family who trusts us with their child's future."
        points={[
          "A vision rooted in values and academic rigour",
          "Safe, inclusive learning environment",
          "Strong parent-school partnership",
        ]}
      />
      <PrincipalMessage />
    </>
  );
}
