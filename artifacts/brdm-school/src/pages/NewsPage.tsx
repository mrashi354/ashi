import { PageBanner } from '@/components/ui/PageBanner';
import { NewsEvents } from '@/components/sections/NewsEvents';

export function NewsPage() {
  return (
    <>
      <PageBanner
        title="News &amp; Events"
        subtitle="Latest notices, circulars, upcoming events, and school achievements."
      />
      <NewsEvents />
    </>
  );
}
