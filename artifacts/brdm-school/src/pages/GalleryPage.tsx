import { PageBanner } from '@/components/ui/PageBanner';
import { Gallery } from '@/components/sections/Gallery';

export function GalleryPage() {
  return (
    <>
      <PageBanner
        title="Photo Gallery"
        subtitle="A glimpse into everyday life at BRDM — vibrant, joyful, and full of energy."
      />
      <Gallery />
    </>
  );
}
