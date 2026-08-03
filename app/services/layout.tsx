import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI SEO & Customized Website Development | Vaave Digital Services',
  description:
    'Explore the best, trusted, and affordable services from Vaave Digital in Guindy, Chennai: AI-Integrated Customized Website Development, AI SEO, Meta & Google Ads PPC Management, UX/UI Design, and Social Media Marketing.',
  keywords: [
    // Service Specific Keywords
    'ai-integrated customized website development',
    'customized website development in chennai',
    'best web development company in guindy chennai',
    'affordable website development near me',
    'ai seo agency in chennai',
    'best performance marketing agency',
    'trusted google ads agency in guindy',
    'affordable meta ads agency in chennai',
    'social media marketing agency near me',

    // Modifiers + Local + Near Me
    'best digital marketing services near me',
    'trusted digital marketing company in my location',
    'affordable digital marketing agency in chennai',
    'top ai-integrated digital marketing services in india',
    'what is ai-integrated digital marketing',
    'digital marketing company in guindy chennai',
  ],
  alternates: {
    canonical: 'https://vaavedigital.com/services',
  },
  openGraph: {
    title: 'AI SEO & Customized Website Development Services | Vaave Digital',
    description:
      'Best, trusted, and affordable AI-integrated customized website development, AI SEO, Meta Ads, and PPC services in Guindy, Chennai, India.',
    url: 'https://vaavedigital.com/services',
    siteName: 'Vaave Digital',
    type: 'website',
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
