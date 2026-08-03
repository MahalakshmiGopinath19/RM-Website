import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers & Job Openings | Join Vaave Digital Chennai',
  description:
    'Explore current career opportunities at Vaave Digital in Guindy, Chennai. Hiring Social Media Interns, Telecallers, Social Media Managers, Creative Designers, Video Editors, and Ads Managers.',
  keywords: [
    'Digital Marketing Jobs Chennai',
    'Social Media Intern Hiring',
    'Telecaller Openings Guindy',
    'Video Editor Jobs Chennai',
    'Creative Designer Careers',
    'Vaave Digital Careers',
  ],
  alternates: {
    canonical: 'https://vaavedigital.com/career',
  },
  openGraph: {
    title: 'Careers & Openings | Vaave Digital',
    description:
      'Build your career with Chennai’s leading AI-integrated digital marketing agency. Direct walk-in interviews Mon-Fri 11 AM - 5 PM.',
    url: 'https://vaavedigital.com/career',
    siteName: 'Vaave Digital',
    type: 'website',
  },
};

export default function CareerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
