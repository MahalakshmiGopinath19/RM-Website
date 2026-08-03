import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Best AI-Integrated Digital Marketing Agency Chennai',
  description:
    'Learn about Vaave Digital — the best, trusted, and affordable AI-integrated digital marketing agency and customized website development company in Guindy, Chennai, Tamil Nadu, India.',
  keywords: [
    'about vaave digital',
    'best digital marketing agency in chennai',
    'trusted ai digital marketing company in guindy',
    'affordable digital marketing agency near me',
    'top ai-integrated digital marketing agency',
    'best customized website development company',
    'digital marketing company in my location',
    'what is the best digital marketing agency',
    'what is ai-integrated digital marketing',
    'digital marketing agency in guindy chennai india',
    'trusted marketing team in chennai',
  ],
  alternates: {
    canonical: 'https://vaavedigital.com/about',
  },
  openGraph: {
    title: 'About Us | Vaave Digital - Best AI-Integrated Agency Chennai',
    description:
      'The best, trusted, and affordable AI-integrated digital marketing agency in Guindy, Chennai, India.',
    url: 'https://vaavedigital.com/about',
    siteName: 'Vaave Digital',
    type: 'website',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
