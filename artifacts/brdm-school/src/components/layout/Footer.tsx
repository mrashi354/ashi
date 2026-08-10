import { MapPin, Phone, Mail, Facebook, Instagram, Star } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground pt-12 sm:pt-16 md:pt-20 pb-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-10 sm:mb-14 md:mb-16">

          {/* Brand */}
          <div className="space-y-5 sm:space-y-6 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="BRDM Public School Logo"
                className="w-12 h-12 object-contain shrink-0"
              />
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg sm:text-xl leading-tight">
                  BRDM Public School
                </span>
                <span className="text-xs text-primary/90 tracking-wider uppercase font-semibold">
                  Kaithal, Haryana
                </span>
              </div>
            </div>
            <p className="text-secondary-foreground/80 text-sm leading-relaxed max-w-xs">
              Preparing Your Child for better Future... A proud neighborhood school where families trust their children's futures.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram size={16} />
              </a>
            </div>

            {/* Rating */}
            <div className="inline-flex flex-col gap-1 p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-1 text-accent">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
                <Star size={14} className="fill-current text-white/20" />
                <span className="ml-1.5 text-white font-bold text-base sm:text-lg">4.4</span>
              </div>
              <span className="text-xs text-white/60">Based on 13 votes on Facebook</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-semibold text-base sm:text-lg mb-4 sm:mb-6">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { label: 'About Us',            href: '/about'      },
                { label: "Principal's Message", href: '/principal'  },
                { label: 'Our Faculty',         href: '/faculty'    },
                { label: 'Academics',           href: '/academics'  },
                { label: 'Academic Calendar',   href: '/calendar'   },
                { label: 'News & Events',       href: '/news'       },
                { label: 'Gallery',             href: '/gallery'    },
                { label: 'Admissions',          href: '/admissions' },
                { label: 'Contact Us',          href: '/contact'    },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-serif font-semibold text-base sm:text-lg mb-4 sm:mb-6">Programs</h3>
            <ul className="space-y-2 sm:space-y-3">
              {['Play Group', 'Primary School', 'Middle School', 'Extracurriculars'].map((link) => (
                <li key={link}>
                  <a href="/academics" className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>

            {/* Contact */}
            <h3 className="font-serif font-semibold text-base sm:text-lg mt-8 mb-4 sm:mb-5">Contact Us</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3 text-sm text-secondary-foreground/80">
                <MapPin size={16} className="text-primary shrink-0 mt-0.5" />
                <span>Shora Kothi, Jind Rd,<br />Kaithal, Haryana 136027</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-secondary-foreground/80">
                <Phone size={16} className="text-primary shrink-0" />
                <a href="tel:+7404500023" className="hover:text-white transition-colors">+7404500023</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-secondary-foreground/80">
                <Mail size={16} className="text-primary shrink-0" />
                <a href="mailto:admin@brdm.com" className="hover:text-white transition-colors break-all">
                  admin@brdm.com
                </a>
              </li>
            </ul>
          </div>

          {/* Google Maps */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-serif font-semibold text-base sm:text-lg mb-4 sm:mb-6">Find Us</h3>
            <div className="rounded-xl overflow-hidden border border-white/10 shadow-sm">
              <iframe
                title="BRDM Public School Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3451.0!2d76.3998!3d29.8014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391226e0d7777777%3A0x0!2sShora+Kothi%2C+Jind+Rd%2C+Kaithal%2C+Haryana+136027!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <a
              href="https://maps.google.com/?q=Shora+Kothi,+Jind+Rd,+Kaithal,+Haryana+136027"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-xs text-primary hover:text-white transition-colors"
            >
              <MapPin size={12} /> Open in Google Maps
            </a>
          </div>

        </div>

        <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs sm:text-sm text-secondary-foreground/60 text-center sm:text-left pb-8 sm:pb-10">
          <p>© {new Date().getFullYear()} BRDM Public School. All rights reserved.</p>
          <div className="flex gap-4 sm:gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
