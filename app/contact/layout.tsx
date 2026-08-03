import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Best AI-Integrated Digital Marketing Agency Chennai',
  description:
    'Contact Vaave Digital — the best, trusted, and affordable AI-integrated digital marketing agency and customized web development company in Guindy, Chennai, India. Get a free AI SEO audit or contact our team via WhatsApp.',
  keywords: [
    'contact vaave digital',
    'digital marketing agency near me',
    'digital marketing company in my location',
    'digital marketing office in guindy chennai',
    'best digital marketing agency contact number in chennai',
    'affordable seo audit in chennai',
    'trusted web development company address in guindy',
    'vaave digital whatsapp contact',
  ],
  alternates: {
    canonical: 'https://vaavedigital.com/contact',
  },
  openGraph: {
    title: 'Contact Us | Vaave Digital Agency Guindy Chennai',
    description:
      'Contact the best, trusted, and affordable AI-integrated digital marketing agency in Guindy, Chennai, India.',
    url: 'https://vaavedigital.com/contact',
    siteName: 'Vaave Digital',
    type: 'website',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
