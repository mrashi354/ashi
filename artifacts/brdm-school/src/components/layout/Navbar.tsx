import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'wouter';

const navLinks = [
  { name: 'Home',       href: '/'           },
  { name: 'About',      href: '/about'      },
  { name: 'Academics',  href: '/academics'  },
  { name: 'Gallery',    href: '/gallery'    },
  { name: 'Contact',    href: '/contact'    },
];

export function Navbar() {
  const [isScrolled, setIsScrolled]       = useState(false);
  const [isMobileMenuOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const isActive = (href: string) =>
    href === '/' ? location === '/' : location.startsWith(href);

  const baseText = isScrolled ? 'text-foreground/80' : 'text-white/90';

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-sm py-2 md:py-3'
          : 'bg-transparent py-3 md:py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group min-w-0 no-underline"
        >
          <img
            src="/logo.png"
            alt="BRDM Public School Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain shrink-0 transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col min-w-0">
            <span className={`font-serif font-bold text-base sm:text-xl leading-tight truncate ${
              isScrolled ? 'text-foreground' : 'text-white drop-shadow-sm'
            }`}>
              BRDM Public School
            </span>
            <span className={`text-[10px] sm:text-xs tracking-wider uppercase font-semibold hidden sm:block ${
              isScrolled ? 'text-primary' : 'text-primary/90 drop-shadow-sm'
            }`}>
              Kaithal, Haryana
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative text-sm font-medium transition-colors hover:text-primary pb-1 ${
                isActive(link.href)
                  ? isScrolled ? 'text-primary' : 'text-white'
                  : baseText
              }`}
            >
              {link.name}
              {isActive(link.href) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}

          <Link
            href="/admissions"
            className="px-4 lg:px-5 py-2 lg:py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-sm hover:bg-primary/90 transition-colors"
          >
            Enroll Now
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className={`md:hidden p-2 rounded-md shrink-0 ${isScrolled ? 'text-foreground' : 'text-white'}`}
          onClick={() => setMobileOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full bg-background shadow-lg border-t border-border px-4 py-5 flex flex-col gap-1 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center py-2.5 border-b border-border/50 text-base font-medium transition-colors ${
                  isActive(link.href) ? 'text-primary' : 'text-foreground/80'
                }`}
              >
                {isActive(link.href) && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 shrink-0" />
                )}
                {link.name}
              </Link>
            ))}

            <div className="pt-3 flex flex-col gap-3">
              <a
                href="tel:+7404500023"
                className="flex items-center gap-2 text-foreground/80 text-sm"
              >
                <Phone size={16} className="text-primary" />
                +7404500023
              </a>
              <Link
                href="/admissions"
                className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-center shadow-sm block text-center"
              >
                Enroll Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
