import { PageBanner } from '@/components/ui/PageBanner';
import { PrincipalMessage } from '@/components/sections/PrincipalMessage';

export function PrincipalPage() {
  return (
    <>
      <PageBanner
        title="Principal's Message"
        subtitle="A word from our school principal on education, values, and the BRDM vision."
      />
      <PrincipalMessage />
    </>
  );
}
