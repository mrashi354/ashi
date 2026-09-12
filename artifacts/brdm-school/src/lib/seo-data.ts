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
  foundingDate: '2008',
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
  {
    '@context': 'https://schema.org',
    '@type': 'School',
    '@id': SITE_URL,
    name: 'BRDM Public School',
    url: SITE_URL,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '5',
      reviewCount: '5',
    },
    review: [
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Sunita Sharma' },
        datePublished: '2026-01-10',
        reviewBody:
          'BRDM Public School has been a wonderful choice for our daughter. The teachers are caring and highly dedicated. She has grown so much in confidence and academics since joining.',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Rajesh Kumar' },
        datePublished: '2026-02-05',
        reviewBody:
          'The school provides a great balance of academics and extracurricular activities. My son looks forward to school every day. The staff is approachable and always there to help.',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Priya Devi' },
        datePublished: '2026-03-02',
        reviewBody:
          'We are extremely happy with the learning environment at BRDM. The school truly lives up to its motto of preparing children for a better future. Highly recommended!',
        reviewRating: { '@type': 'Rating', ratingValue: '4', bestRating: '5' },
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Anil Verma' },
        datePublished: '2026-04-18',
        reviewBody:
          "Excellent faculty and infrastructure. The school's focus on individual attention and overall development sets it apart. My child's board exam results have been outstanding.",
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Meena Rani' },
        datePublished: '2026-05-22',
        reviewBody:
          'From the very first day, our child felt welcome and safe. The teachers are patient, kind, and very skilled at making learning fun for young children.',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      },
    ],
  },
];

export const academicCoursesSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'CBSE Curriculum for Play Group',
    description:
      'Early childhood programme at BRDM Public School, Kaithal covering sensory play, motor skills practice, and guided social interaction for children aged 2½–3 years.',
    courseCode: 'Play Group',
    courseMode: 'Onsite',
    educationalLevel: 'Preschool',
    provider: { '@type': 'School', name: 'BRDM Public School', url: SITE_URL },
    url: `${SITE_URL}/academics`,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Nursery and Kindergarten Curriculum',
    description:
      'Pre-literacy, numeracy foundations, creativity, and confidence building through activity-based learning for children aged 3–6 years at BRDM Public School, Kaithal.',
    courseCode: 'Nursery-KG',
    courseMode: 'Onsite',
    educationalLevel: 'Preschool',
    provider: { '@type': 'School', name: 'BRDM Public School', url: SITE_URL },
    url: `${SITE_URL}/academics`,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Primary School Curriculum (Classes 1–5)',
    description:
      'Core CBSE subjects at BRDM Public School, Kaithal including English, Hindi, Mathematics, EVS, Computer, Art & Craft, and General Knowledge with continuous assessment.',
    courseCode: 'Class 1-5',
    courseMode: 'Onsite',
    educationalLevel: 'Primary',
    provider: { '@type': 'School', name: 'BRDM Public School', url: SITE_URL },
    url: `${SITE_URL}/academics`,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Middle School Curriculum (Classes 6–8)',
    description:
      'In-depth study of Science, Social Science, Mathematics, Computer Science, languages, and Physical Education at BRDM Public School, Kaithal with project-based learning.',
    courseCode: 'Class 6-8',
    courseMode: 'Onsite',
    educationalLevel: 'Middle School',
    provider: { '@type': 'School', name: 'BRDM Public School', url: SITE_URL },
    url: `${SITE_URL}/academics`,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Secondary School Programme (Classes 9–10)',
    description:
      'Board-oriented CBSE programme at BRDM Public School, Kaithal for Classes 9–10 focusing on Science, Mathematics, Social Science, languages, and career guidance with regular assessments.',
    courseCode: 'Class 9-10',
    courseMode: 'Onsite',
    educationalLevel: 'Secondary',
    provider: { '@type': 'School', name: 'BRDM Public School', url: SITE_URL },
    url: `${SITE_URL}/academics`,
  },
];

export const eventsSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Annual Sports Day',
    description:
      'BRDM Public School Annual Sports Day — students showcase athletics, races, and sports drills. Parents are warmly invited to attend.',
    startDate: '2026-08-10T09:00:00+05:30',
    endDate: '2026-08-10T13:00:00+05:30',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'BRDM Public School Ground',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Shora Kothi, Jind Road',
        addressLocality: 'Kaithal',
        addressRegion: 'Haryana',
        postalCode: '136027',
        addressCountry: 'IN',
      },
    },
    organizer: { '@type': 'Organization', name: 'BRDM Public School', url: SITE_URL },
    url: `${SITE_URL}/news`,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Independence Day Celebration',
    description:
      'Flag hoisting ceremony and cultural programme at BRDM Public School celebrating Independence Day. All students, parents, and staff are invited.',
    startDate: '2026-08-15T08:00:00+05:30',
    endDate: '2026-08-15T09:30:00+05:30',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'BRDM Public School Ground',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Shora Kothi, Jind Road',
        addressLocality: 'Kaithal',
        addressRegion: 'Haryana',
        postalCode: '136027',
        addressCountry: 'IN',
      },
    },
    organizer: { '@type': 'Organization', name: 'BRDM Public School', url: SITE_URL },
    url: `${SITE_URL}/news`,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Science Exhibition 2026',
    description:
      'Annual Science Exhibition at BRDM Public School for students of Classes 6–10 to showcase science models, experiments, and innovations.',
    startDate: '2026-09-25T10:00:00+05:30',
    endDate: '2026-09-25T14:00:00+05:30',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'BRDM Public School Ground',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Shora Kothi, Jind Road',
        addressLocality: 'Kaithal',
        addressRegion: 'Haryana',
        postalCode: '136027',
        addressCountry: 'IN',
      },
    },
    organizer: { '@type': 'Organization', name: 'BRDM Public School', url: SITE_URL },
    url: `${SITE_URL}/news`,
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
            name: 'What curriculum does BRDM Public School follow?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'BRDM follows a CBSE-aligned curriculum from Play Group to Class 10. Every stage from early childhood through secondary school is designed to build strong academic foundations and essential life skills.',
            },
          },
          {
            '@type': 'Question',
            name: 'What subjects are taught at each level?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In Primary school we teach English, Hindi, Mathematics, EVS, Computer, Art & Craft, and General Knowledge. From Middle school onward, students study Science, Social Science, Mathematics, languages, Computer Science, and Physical Education.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the medium of instruction?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'English is the primary medium of instruction, with Hindi taught as a core subject. Our teachers are fluent in both languages, helping every student become confident and comfortable.',
            },
          },
          {
            '@type': 'Question',
            name: 'How are students assessed?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Students are assessed through periodic unit tests, half-yearly and annual examinations, and project-based assessments. Detailed report cards are issued twice a year and Parent-Teacher Meetings are held quarterly.',
            },
          },
          {
            '@type': 'Question',
            name: 'What teaching methods does the school use?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We combine smart classrooms, activity-based learning, and a low student-teacher ratio of 15:1 so every child receives individual attention. Concepts are taught through experiments, projects, and group tasks rather than rote memorisation.',
            },
          },
          {
            '@type': 'Question',
            name: 'What extracurricular activities are available?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Students enjoy daily sports periods, yoga and physical education, art & craft, music, computer lab sessions, and weekly library periods. We also organise annual sports day, science exhibitions, debates, and cultural functions.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are the school timings?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'School runs from 8:00 AM to 2:30 PM, Monday to Saturday. The school office is open from 8:00 AM to 4:00 PM on weekdays for admissions, fee queries, and other assistance.',
            },
          },
        ],
      },
      ...academicCoursesSchema,
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
    admissions: [
      schoolJsonLd,
      breadcrumbJsonLd(breadcrumbItems),
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the admission process at BRDM Public School, Kaithal?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Fill in the online enquiry form on the Admissions page or visit the school office. Our admissions team will invite you for a campus tour and a brief, friendly interaction with your child. Once the required documents are verified and the admission fee is paid, your child\'s seat is confirmed.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which classes and age groups can apply for admission?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We admit students from Play Group to Class 10. As a general age guideline (age as on 31 March): Play Group 2½+, Nursery 3+, Kindergarten 4+, and Class 1 onwards 5+. The child\'s birth certificate is required as proof of age.',
            },
          },
          {
            '@type': 'Question',
            name: 'What documents are needed for admission?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'You will need the child\'s birth certificate, Transfer Certificate (TC) from the previous school (for Class 1+), the latest report card, 4 passport-size photographs, copies of the Aadhar card of the student and parents, and residence proof.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the school fee structure?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The school fee depends on the class your child is joining. Please call our office at +91 7404500023 or visit us at Shora Kothi, Jind Road, Kaithal — our team will share the complete fee structure for the 2026–27 session.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does the school provide transport for students?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, BRDM Public School provides school bus service covering major routes in and around Kaithal. Contact the school office for route details, pick-up points, and transport fees.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are the school timings?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'School runs from 8:00 AM to 2:30 PM, Monday to Saturday. The school office is open from 8:00 AM to 4:00 PM on weekdays for admissions, fee queries, and other assistance.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is there an entrance test for admission?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No formal written entrance test is required. Admission is based on a brief informal interaction and, for higher classes, a review of the previous report card to place your child in the right grade.',
            },
          },
          {
            '@type': 'Question',
            name: 'When do admissions open for the new session?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Admissions generally open in January–February for the academic session beginning in April. Admissions for 2026–27 are open now, and seats are limited — early applications are recommended.',
            },
          },
        ],
      },
    ],
    principal: [schoolJsonLd, breadcrumbJsonLd(breadcrumbItems)],
    faculty: [schoolJsonLd, breadcrumbJsonLd(breadcrumbItems)],
    calendar: [schoolJsonLd, breadcrumbJsonLd(breadcrumbItems)],
    news: [schoolJsonLd, breadcrumbJsonLd(breadcrumbItems), ...eventsSchema],
  };

  return schemas[page] || [schoolJsonLd, breadcrumbJsonLd(breadcrumbItems)];
}
