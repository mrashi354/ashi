import { useLocation } from 'wouter';
import { SEO } from '@/components/ui/SEO';
import { pageJsonLd, homePageJsonLd } from '@/lib/seo-data';

interface PageSEOConfig {
  title: string;
  description: string;
  keywords: string;
  breadcrumb: { name: string; url: string }[];
  ogImage?: string;
}

const seoConfigs: Record<string, PageSEOConfig> = {
  '/': {
    title: 'BRDM Public School Kaithal | Best CBSE School in Haryana',
    description:
      'BRDM Public School, Kaithal — top CBSE school in Haryana with modern infrastructure, expert faculty & holistic education. Admissions open 2026-27. Call +7404500023.',
    keywords:
      'BRDM Public School Kaithal, best school in Kaithal Haryana, CBSE school Kaithal, top school Kaithal, school admissions Kaithal, quality education Haryana, Play Group to Class 10 Kaithal',
    breadcrumb: [{ name: 'Home', url: '/' }],
  },
  '/about': {
    title: 'About BRDM Public School Kaithal | Our History, Mission & Values',
    description:
      'Discover BRDM Public School Kaithal — our mission, vision, core values, infrastructure, and 15+ years of educational excellence in Haryana. Learn about our journey.',
    keywords:
      'about BRDM Public School, school history Kaithal, school mission vision, education values Haryana, school infrastructure Kaithal',
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'About', url: '/about' },
    ],
  },
  '/academics': {
    title: 'Academics | BRDM Public School Kaithal, Haryana',
    description:
      'Explore academics at BRDM Public School Kaithal — Play Group to Class 10 curriculum, smart classrooms, science labs, qualified faculty, and holistic teaching approach.',
    keywords:
      'BRDM academics, school curriculum Kaithal, CBSE syllabus, Play Group Class 10 education, smart classrooms Kaithal, school subjects',
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'Academics', url: '/academics' },
    ],
  },
  '/gallery': {
    title: 'Photo & Video Gallery | BRDM Public School Kaithal Campus Life',
    description:
      'Browse photos and videos of campus life at BRDM Public School Kaithal — classrooms, playground, library, events, sports day, and annual celebrations.',
    keywords:
      'BRDM school gallery, school photos Kaithal, campus life pictures, school events photos, BRDM school videos',
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'Gallery', url: '/gallery' },
    ],
  },
  '/contact': {
    title: 'Contact BRDM Public School Kaithal | Phone, Address & Enquiry',
    description:
      'Contact BRDM Public School Kaithal — call +7404500023, email admin@brdm.com. Visit us at Shora Kothi, Jind Rd, Kaithal, Haryana 136027. Send your enquiry online.',
    keywords:
      'contact BRDM Public School, school phone number Kaithal, school address Kaithal, admission enquiry, school contact details Haryana',
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'Contact', url: '/contact' },
    ],
  },
  '/admissions': {
    title: 'Admissions Open 2026-27 | BRDM Public School Kaithal',
    description:
      'Admissions open for 2026-27 at BRDM Public School Kaithal. Apply now for Play Group to Class 10. Simple process, transparent fees, limited seats available.',
    keywords:
      'BRDM school admissions, school admission Kaithal 2026, Play Group admission, school enrolment Haryana, school fees Kaithal',
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'Admissions', url: '/admissions' },
    ],
  },
  '/principal': {
    title: "Principal's Message | BRDM Public School Kaithal Leadership",
    description:
      "Read the Principal's message at BRDM Public School Kaithal — a vision for quality education, values, and nurturing every child's potential in Haryana.",
    keywords:
      'principal message BRDM, school principal Kaithal, school leadership Haryana, principal vision education',
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'About', url: '/about' },
      { name: "Principal's Message", url: '/principal' },
    ],
  },
  '/faculty': {
    title: 'Our Faculty | BRDM Public School Kaithal, Haryana',
    description:
      'Meet the dedicated faculty at BRDM Public School Kaithal — 30+ qualified teachers committed to academic excellence and holistic student development.',
    keywords:
      'BRDM faculty, school teachers Kaithal, qualified teachers Haryana, school staff, educator team',
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'About', url: '/about' },
      { name: 'Faculty', url: '/faculty' },
    ],
  },
  '/calendar': {
    title: 'Academic Calendar 2026-27 | BRDM Public School Kaithal',
    description:
      'View the academic calendar for 2026-27 at BRDM Public School Kaithal — holidays, exam schedules, half-yearly and annual exams, and important school dates.',
    keywords:
      'BRDM school calendar, academic calendar Kaithal 2026, school holidays Haryana, exam schedule, school dates',
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'Academics', url: '/academics' },
      { name: 'Calendar', url: '/calendar' },
    ],
  },
  '/news': {
    title: 'News & Events | BRDM Public School Kaithal Updates',
    description:
      'Stay updated with the latest news and events at BRDM Public School Kaithal — admissions notices, sports day, annual functions, results, and school achievements.',
    keywords:
      'BRDM school news, school events Kaithal, school notices Haryana, school results, sports day annual day',
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'News & Events', url: '/news' },
    ],
  },
};

export function PageSEO() {
  const [location] = useLocation();

  const path = location.split('?')[0].split('#')[0];
  const config = seoConfigs[path] || seoConfigs['/'];
  const page = path === '/' ? 'home' : path.replace('/', '');

  const jsonLd =
    path === '/'
      ? homePageJsonLd
      : pageJsonLd(
          page,
          config.breadcrumb.map((b) => ({ name: b.name, url: b.url }))
        );

  return (
    <SEO
      title={config.title}
      description={config.description}
      keywords={config.keywords}
      canonical={path}
      ogImage={config.ogImage}
      jsonLd={jsonLd}
    />
  );
}
