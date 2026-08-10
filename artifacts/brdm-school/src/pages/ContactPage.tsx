import { PageBanner } from '@/components/ui/PageBanner';
import { Contact } from '@/components/sections/Contact';

export function ContactPage() {
  return (
    <>
      <PageBanner
        title="Contact Us"
        subtitle="We'd love to hear from you. Reach out with any questions."
      />
      <Contact />
    </>
  );
}
