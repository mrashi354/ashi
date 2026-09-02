import { motion, type Variants } from 'framer-motion';

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
};

interface GalleryCardProps {
  src: string;
  alt: string;
  label: string;
  className?: string;
  i: number;
  objectPos?: string;
}

function GalleryCard({ src, alt, label, className = '', i, objectPos = 'object-center' }: GalleryCardProps) {
  return (
    <motion.div
      custom={i}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`rounded-3xl overflow-hidden relative group ${className}`}
    >
      {/* Dark overlay fades out on hover */}
      <motion.div
        className="absolute inset-0 bg-black/30 z-10 transition-colors duration-500"
        whileHover={{ backgroundColor: 'rgba(0,0,0,0)' }}
      />

      {/* Image zooms on hover */}
      <motion.img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${objectPos}`}
        whileHover={{ scale: 1.07 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />

      {/* Label slides up from bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-20 p-4 sm:p-6 flex items-end"
        initial={false}
      >
        <motion.span
          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/90 backdrop-blur-sm text-secondary font-bold text-xs sm:text-sm rounded-full shadow-lg"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15 + 0.3, duration: 0.4 }}
          whileHover={{ scale: 1.05 }}
        >
          {label}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

export function CampusLife() {
  return (
    <section id="campus-life" className="py-14 sm:py-20 md:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-14 md:mb-16">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-6"
            >
              Vibrant Campus Life
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base sm:text-lg text-muted-foreground"
            >
              Our campus is alive with energy. From sunlit libraries to joyful courtyards, every space is designed to foster learning, friendship, and memorable experiences.
            </motion.p>
          </div>
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-full hover:bg-muted transition-colors font-medium text-foreground whitespace-nowrap self-start md:self-auto"
          >
            View Full Gallery
          </motion.a>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
          <GalleryCard
            src="/gallery/photo-02.jpg"
            alt="BRDM Public School campus moment"
            label="Campus Moment"
            className="md:col-span-8 h-64 sm:h-80 md:h-[360px]"
            i={0}
            objectPos="object-center"
          />
          <GalleryCard
            src="/gallery/photo-04.jpg"
            alt="BRDM Public School campus moment"
            label="Campus Moment"
            className="md:col-span-4 h-64 sm:h-80 md:h-[360px]"
            i={1}
          />
          {/* Admission banner — natural height, no crop */}
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:col-span-12 rounded-3xl overflow-hidden relative group bg-[#0a1a4a]"
          >
            <motion.img
              src="/gallery/photo-01.png"
              alt="BRDM Public School campus moment"
              className="w-full h-auto block object-contain"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div className="absolute bottom-4 left-4 z-20">
              <motion.span
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/90 backdrop-blur-sm text-secondary font-bold text-xs sm:text-sm rounded-full shadow-lg inline-block"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                Campus Moment
              </motion.span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
