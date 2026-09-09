import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface Props {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
  breadcrumbs?: BreadcrumbItem[];
}

export function PageBanner({ title, subtitle, breadcrumb, breadcrumbs }: Props) {
  const crumbs = breadcrumbs || [
    { name: 'Home', href: '/' },
    { name: breadcrumb || title, href: '#' },
  ];

  return (
    <section className="relative bg-secondary text-white pt-28 sm:pt-32 pb-12 sm:pb-16 overflow-hidden">
      {/* grid pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="pg" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pg)" />
        </svg>
      </div>

      <motion.div
        className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary/20 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Breadcrumb navigation */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          aria-label="Breadcrumb"
          className="mb-4"
        >
          <ol className="flex items-center gap-1.5 text-sm text-white/60">
            {crumbs.map((crumb, i) => {
              const isLast = i === crumbs.length - 1;
              return (
                <li key={crumb.name} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight size={13} aria-hidden="true" />}
                  {isLast ? (
                    <span className="text-white/90 font-medium" aria-current="page">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="flex items-center gap-1 hover:text-white transition-colors"
                    >
                      {i === 0 && <Home size={13} aria-hidden="true" />}
                      {crumb.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </motion.nav>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-3"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="text-white/75 text-base sm:text-lg max-w-xl"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
