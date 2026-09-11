import { PageBanner } from '@/components/ui/PageBanner';
import { PageIntro } from '@/components/ui/PageIntro';
import { NewsEvents } from '@/components/sections/NewsEvents';

export function NewsPage() {
  return (
    <>
      <PageBanner
        title="News &amp; Events"
        subtitle="Latest notices, circulars, upcoming events, and achievements from BRDM Public School."
      />
      <PageIntro
        title="School News & Events from BRDM Public School, Kaithal"
        text="Stay updated with the latest school news, notices, and events from BRDM Public School, Kaithal. From admissions announcements and fee deadlines to sports day, annual functions, science exhibitions, and Class 10 board results — this is where our school community shares every update."
      />
      <NewsEvents />
    </>
  );
}
