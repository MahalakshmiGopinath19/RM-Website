export default function JsonLd() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://vaavedigital.com/#organization',
    name: 'Vaave Digital',
    legalName: 'Vaave Digital',
    url: 'https://vaavedigital.com',
    logo: 'https://vaavedigital.com/image/logo.webp',
    image: 'https://vaavedigital.com/image/vaave-digital.png',
    description:
      'Vaave Digital is an AI-Integrated Digital Marketing Agency based in Guindy, Chennai, specializing in AI-driven SEO, Next.js Web Development, Social Media Marketing, Performance Ads, and Billing Software.',
    telephone: '+917305821333',
    email: 'info@vaavedigital.com',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Guindy',
      addressLocality: 'Chennai',
      addressRegion: 'Tamil Nadu',
      postalCode: '600032',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '13.0067',
      longitude: '80.2020',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    sameAs: [
      'https://www.instagram.com/vaavedigital',
      'https://www.facebook.com/vaavedigital',
      'https://www.linkedin.com/company/vaavedigital',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AI Digital Marketing & Technology Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI-Integrated SEO & Local Ranking',
            description: 'Advanced local & global search engine optimization powered by artificial intelligence.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Full Stack Web & Mobile App Development',
            description: 'Custom Next.js 16, React 19, and Node.js digital platforms built for maximum conversion.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Performance Ad Management',
            description: 'Data-driven Meta & Google Ads optimization for maximum return on ad spend (ROAS).',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Billing & POS Software Solutions',
            description: 'Automated clinic, salon, and retail billing platforms.',
          },
        },
      ],
    },
  };

  const techArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': 'https://vaavedigital.com/#ai-framework',
    headline: 'Vaave Digital AI Marketing & IT Service Framework',
    description:
      'Executive summary of Vaave Digital’s proprietary AI-driven digital marketing and full-stack web engineering methodologies using Next.js 16, React 19, Python automation, and Meta/Google APIs.',
    author: {
      '@id': 'https://vaavedigital.com/#organization',
    },
    publisher: {
      '@id': 'https://vaavedigital.com/#organization',
    },
    dependencies: 'Next.js 16, React 19, Tailwind CSS, Python, Node.js, Meta Ads API, Google Ads API',
    proficiencyLevel: 'Expert',
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://vaavedigital.com/#website',
    url: 'https://vaavedigital.com',
    name: 'Vaave Digital',
    publisher: {
      '@id': 'https://vaavedigital.com/#organization',
    },
    inLanguage: 'en-US',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
