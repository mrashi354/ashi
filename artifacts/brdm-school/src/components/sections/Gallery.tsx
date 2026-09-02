import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight, Instagram, Facebook } from 'lucide-react';

/* ─── Photo data ─────────────────────────────────────────────────────────── */
interface Photo {
  src: string;
  label: string;
  category: string;
  date?: string;
}

const photos: Photo[] = [
  /* Campus Life — real school photos */
  { src: '/gallery/photo-01.png',   label: 'Campus Moment 1',  category: 'Campus Life' },
  { src: '/gallery/photo-02.jpg',   label: 'Campus Moment 2',  category: 'Campus Life' },
  { src: '/gallery/photo-03.jpg',   label: 'Campus Moment 3',  category: 'Campus Life' },
  { src: '/gallery/photo-04.jpg',   label: 'Campus Moment 4',  category: 'Campus Life' },
  { src: '/gallery/photo-05.jpg',   label: 'Campus Moment 5',  category: 'Campus Life' },
  { src: '/gallery/photo-06.jpg',   label: 'Campus Moment 6',  category: 'Campus Life' },
  { src: '/gallery/photo-07.jpg',   label: 'Campus Moment 7',  category: 'Campus Life' },
  { src: '/gallery/photo-08.jpg',   label: 'Campus Moment 8',  category: 'Campus Life' },
  { src: '/gallery/photo-09.jpg',   label: 'Campus Moment 9',  category: 'Campus Life' },
  { src: '/gallery/photo-10.jpg',   label: 'Campus Moment 10',  category: 'Campus Life' },
  { src: '/gallery/photo-11.jpg',   label: 'Campus Moment 11',  category: 'Campus Life' },
  { src: '/gallery/photo-12.jpg',   label: 'Campus Moment 12',  category: 'Campus Life' },
  { src: '/gallery/photo-13.webp',  label: 'Campus Moment 13',  category: 'Campus Life' },
  { src: '/gallery/photo-14.webp',  label: 'Campus Moment 14',  category: 'Campus Life' },
  { src: '/gallery/photo-15.webp',  label: 'Campus Moment 15',  category: 'Campus Life' },
];

const CATEGORIES = ['All', 'Campus Life'];
const PAGE_SIZE = 9;

/* ─── Lightbox ───────────────────────────────────────────────────────────── */
function Lightbox({
  photos, index, onClose, onPrev, onNext,
}: {
  photos: Photo[]; index: number; onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  /* keyboard navigation */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext]);

  const photo = photos[index];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] bg-black/92 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Gallery lightbox — ${photo.label}`}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
        aria-label="Close lightbox"
      >
        <X size={20} />
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-3 sm:left-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
        aria-label="Previous image"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Image + caption */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.25 }}
          className="max-w-5xl w-full flex flex-col items-center gap-4"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={photo.src}
            alt={photo.label}
            className="max-h-[75vh] max-w-full rounded-2xl object-contain shadow-2xl"
          />
          <div className="text-center">
            <p className="text-white font-semibold text-base">{photo.label}</p>
            <div className="flex items-center justify-center gap-3 mt-1">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/80 text-white font-medium">
                {photo.category}
              </span>
              {photo.date && (
                <span className="text-white/50 text-xs">{photo.date}</span>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-3 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
        aria-label="Next image"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dot indicators (max 12 shown) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 flex-wrap justify-center max-w-xs">
        {photos.slice(0, 12).map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); }}
            className={`w-2 h-2 rounded-full transition-all ${i === index ? 'bg-white scale-125' : 'bg-white/35'}`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Main Gallery ───────────────────────────────────────────────────────── */
export function Gallery() {
  const [active, setActive]   = useState('All');
  const [shown, setShown]     = useState(PAGE_SIZE);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered  = active === 'All' ? photos : photos.filter((p) => p.category === active);
  const visible   = filtered.slice(0, shown);
  const hasMore   = shown < filtered.length;

  /* reset pagination when category changes */
  const handleCategory = (cat: string) => {
    setActive(cat);
    setShown(PAGE_SIZE);
    setLightbox(null);
  };

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prevPhoto     = useCallback(() => setLightbox((i) => ((i ?? 0) - 1 + filtered.length) % filtered.length), [filtered.length]);
  const nextPhoto     = useCallback(() => setLightbox((i) => ((i ?? 0) + 1) % filtered.length), [filtered.length]);

  return (
    <>
      <section id="gallery" className="py-14 sm:py-20 md:py-24 bg-muted/30 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">

          {/* Section header */}
          <div className="text-center mb-8 sm:mb-12">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-semibold text-sm uppercase tracking-widest mb-3"
            >
              Our Campus in Pictures
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4"
            >
              Photo Gallery
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto"
            >
              A glimpse into everyday life at BRDM — vibrant, joyful, and full of energy.
            </motion.p>
          </div>

          {/* Filter tabs — horizontally scrollable on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mb-8 sm:mb-12"
          >
            <div className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible no-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategory(cat)}
                  className={`shrink-0 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    active === cat
                      ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                      : 'bg-background border border-border text-muted-foreground hover:border-primary hover:text-primary'
                  }`}
                  aria-pressed={active === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Masonry grid */}
          <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5 space-y-4 sm:space-y-5">
            <AnimatePresence mode="popLayout">
              {visible.map((photo, i) => (
                <motion.div
                  key={photo.src + photo.label}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="break-inside-avoid rounded-2xl overflow-hidden relative group cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300"
                  onClick={() => setLightbox(i)}
                >
                  <img
                    src={photo.src}
                    alt={photo.label}
                    loading="lazy"
                    className="w-full h-auto block object-cover"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                        <ZoomIn size={20} className="text-secondary" aria-hidden="true" />
                      </div>
                    </div>
                  </div>

                  {/* Caption slide-up */}
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-sm font-semibold drop-shadow">{photo.label}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-primary-foreground bg-primary/80 px-2 py-0.5 rounded-full">{photo.category}</span>
                      {photo.date && <span className="text-white/60 text-xs">{photo.date}</span>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Load More */}
          {hasMore && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center mt-10"
            >
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShown((s) => s + PAGE_SIZE)}
                className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-md hover:shadow-lg transition-shadow"
              >
                Load More Photos
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Video Gallery ───────────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">Campus Life</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-2">Video Gallery</h2>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto text-sm sm:text-base">
              Watch moments come alive — events, performances, and everyday magic at BRDM.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { title: 'Annual Day 2025 Highlights',   id: 'dQw4w9WgXcQ' },
              { title: 'Sports Day 2025 — Best Moments', id: 'dQw4w9WgXcQ' },
              { title: 'Cultural Programme — Republic Day', id: 'dQw4w9WgXcQ' },
            ].map(({ title, id }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl overflow-hidden shadow-md border border-border"
              >
                <div className="aspect-video bg-muted">
                  <iframe
                    src={`https://www.youtube.com/embed/${id}`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="w-full h-full"
                  />
                </div>
                <div className="p-3 bg-card">
                  <p className="font-semibold text-foreground text-sm">{title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">BRDM Public School · Kaithal</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social CTA ──────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-secondary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-between gap-6 max-w-3xl mx-auto text-center sm:text-left"
          >
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">Follow Us for More Moments</h3>
              <p className="text-white/70 mt-1 text-sm sm:text-base">
                Stay updated with daily highlights, events, and achievements.
              </p>
            </div>
            <div className="flex gap-4 shrink-0">
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2.5 bg-gradient-to-br from-pink-500 to-orange-400 text-white font-semibold px-5 py-2.5 rounded-full text-sm shadow-md hover:shadow-lg transition-shadow"
                aria-label="Follow BRDM Public School on Instagram"
              >
                <Instagram size={18} aria-hidden="true" />
                Instagram
              </motion.a>
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2.5 bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-full text-sm shadow-md hover:shadow-lg transition-shadow"
                aria-label="Follow BRDM Public School on Facebook"
              >
                <Facebook size={18} aria-hidden="true" />
                Facebook
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox portal */}
      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            photos={visible}
            index={lightbox}
            onClose={closeLightbox}
            onPrev={prevPhoto}
            onNext={nextPhoto}
          />
        )}
      </AnimatePresence>
    </>
  );
}
