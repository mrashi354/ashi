const SITE_URL = 'https://brdmpublicschool.in';

export const schoolJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'School',
  name: 'BRDM Public School',
  alternateName: 'BRDM Public School Kaithal',
  description:
    'BRDM Public School is a leading CBSE-affiliated school in Kaithal, Haryana, offering quality education from Play Group to Class 10 with modern infrastructure and dedicated faculty.',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/school-bg.webp`,
  telephone: '+91-7404500023',
  email: 'admin@brdm.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Shora Kothi, Jind Road',
    addressLocality: 'Kaithal',
    addressRegion: 'Haryana',
    postalCode: '136027',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 29.8014,
    longitude: 76.3998,
  },
  sameAs: [
    'https://www.facebook.com/brdmpublicschool',
    'https://www.instagram.com/brdmpublicschool',
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '14:30',
    },
  ],
  priceRange: '$$',
  areaServed: {
    '@type': 'City',
    name: 'Kaithal',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'School Programs',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'EducationalOccupationalProgram',
          name: 'Play Group',
          description: 'Early childhood education program for children aged 2.5 to 3 years.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'EducationalOccupationalProgram',
          name: 'Primary School',
          description: 'Classes 1 to 5 with comprehensive curriculum covering all major subjects.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'EducationalOccupationalProgram',
          name: 'Middle School',
          description: 'Classes 6 to 8 with in-depth study of Sciences, Mathematics, and Languages.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'EducationalOccupationalProgram',
          name: 'Secondary School',
          description: 'Classes 9 to 10 with board-oriented academics and career counselling.',
        },
      },
    ],
  },
};

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export const homePageJsonLd = [
  schoolJsonLd,
  breadcrumbJsonLd([{ name: 'Home', url: '/' }]),
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the admission process for BRDM Public School?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Parents need to visit the school office or fill the online enquiry form. After submitting required documents (birth certificate, previous marksheet, address proof), the child may be called for an interaction. Admission is confirmed upon fee payment.',
        },
      },
      {
        '@type': 'Question',
        name: 'What classes are offered at BRDM Public School?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We offer classes from Play Group (Pre-Nursery) through Class 10, covering all major subjects under a structured curriculum focused on holistic development.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does BRDM Public School provide transportation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, school bus service is available for various routes within Kaithal. Please contact the school office for route details and transport fee information.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are admissions open right now at BRDM Public School?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Admissions for the academic year 2026-2027 are currently open. Seats are limited, so we encourage early applications. Visit the Admissions page to apply.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the medium of instruction at BRDM Public School?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The primary medium of instruction is English, with Hindi also taught as a core subject. Teachers are fluent in both languages to ensure students are comfortable.',
        },
      },
      {
        '@type': 'Question',
        name: 'What extracurricular activities are available at BRDM Public School?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'BRDM offers a wide range of activities including sports, drawing and art, music, dance, debate, and science competitions. We believe in developing the whole child beyond academics.',
        },
      },
    ],
  },
];

export function pageJsonLd(page: string, breadcrumbItems: { name: string; url: string }[]) {
  const schemas: Record<string, any[]> = {
    about: [schoolJsonLd, breadcrumbJsonLd(breadcrumbItems)],
    academics: [
      schoolJsonLd,
      breadcrumbJsonLd(breadcrumbItems),
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What classes are offered at BRDM Public School?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We offer classes from Play Group (Pre-Nursery) through Class 10, covering all major subjects under a structured curriculum focused on holistic development.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the medium of instruction at BRDM Public School?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The primary medium of instruction is English, with Hindi also taught as a core subject. Teachers are fluent in both languages.',
            },
          },
          {
            '@type': 'Question',
            name: 'What extracurricular activities are available?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'BRDM offers sports, art, music, dance, debate, and science competitions — developing the whole child beyond academics.',
            },
          },
        ],
      },
    ],
    gallery: [schoolJsonLd, breadcrumbJsonLd(breadcrumbItems)],
    contact: [
      schoolJsonLd,
      breadcrumbJsonLd(breadcrumbItems),
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What documents are needed for admission at BRDM Public School?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Birth certificate, previous school Transfer Certificate (TC), report card, 4 passport-size photos, Aadhar card of student and parent, and residence proof.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are the school timings at BRDM Public School?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'School runs from 8:00 AM to 2:30 PM (Monday to Saturday). Office hours are 8:00 AM to 4:00 PM on weekdays.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do you provide transport facility at BRDM Public School?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, we provide school bus service covering major areas of Kaithal and surrounding localities. Contact the office for route details and fees.',
            },
          },
          {
            '@type': 'Question',
            name: 'When do admissions open for the new session at BRDM Public School?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Admissions typically open in January-February for the upcoming academic session (April start). Walk-in enquiries are welcome throughout the year.',
            },
          },
        ],
      },
    ],
    admissions: [schoolJsonLd, breadcrumbJsonLd(breadcrumbItems)],
    principal: [schoolJsonLd, breadcrumbJsonLd(breadcrumbItems)],
    faculty: [schoolJsonLd, breadcrumbJsonLd(breadcrumbItems)],
    calendar: [schoolJsonLd, breadcrumbJsonLd(breadcrumbItems)],
    news: [schoolJsonLd, breadcrumbJsonLd(breadcrumbItems)],
  };

  return schemas[page] || [schoolJsonLd, breadcrumbJsonLd(breadcrumbItems)];
}
