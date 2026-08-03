import type { Metadata, Viewport } from 'next';
import './globals.css';
import ConditionalLayout from '@/components/layout/ConditionalLayout';
import JsonLd from '@/components/JsonLd';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#020215',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://vaavedigital.com'),
  title: {
    default: 'Vaave Digital | Best AI-Integrated Digital Marketing Agency Chennai',
    template: '%s | Vaave Digital',
  },
  description:
    'Vaave Digital is the best, trusted, and affordable AI-integrated digital marketing agency and customized website development company in Guindy, Chennai, India. Specializing in AI SEO, Meta Ads, Google Ads, Full-Stack Web Development, and Billing Software.',
  keywords: [
    // Short Tail Keywords
    'digital marketing',
    'ai marketing',
    'web development',
    'seo agency',
    'ppc ads',
    'social media marketing',
    'billing software',
    'vaave digital',

    // Mid Tail & Standard Modifier Keywords (Best, Trusted, Affordable)
    'best digital marketing agency',
    'trusted digital marketing company',
    'affordable digital marketing agency',
    'top ai-integrated digital marketing agency',
    'best ai-integrated customized website development',
    'affordable website development company',
    'trusted seo agency',
    'best performance marketing company',
    'affordable meta ads agency',
    'best google ads agency',
    'trusted billing software company',

    // Near Me & Location-Based Keywords (Guindy, Chennai, Tamil Nadu, India)
    'digital marketing near me',
    'digital marketing company near me',
    'digital marketing company in my location',
    'digital marketing agency near me',
    'best digital marketing company in chennai',
    'digital marketing agency in guindy',
    'digital marketing company in guindy chennai',
    'ai-integrated digital marketing agency in chennai',
    'ai-integrated digital marketing agency in guindy chennai',
    'customized website development in chennai',
    'best web development agency in guindy chennai',
    'trusted web development company in chennai india',
    'affordable digital marketing agency in chennai',
    'best seo company in guindy chennai',
    'meta ads agency in chennai',
    'google ads agency in guindy chennai',

    // Conversational & Question-Based (AEO & Voice Search)
    'what is the best digital marketing agency',
    'what is ai-integrated digital marketing',
    'which is the best digital marketing company in chennai',
    'what is customized website development',
    'how to choose the best digital marketing agency',

    // Service + Modifier + Location Combinations
    'best ai seo agency in chennai',
    'affordable social media marketing in guindy',
    'trusted performance marketing agency in chennai india',
    'best clinic billing software in chennai',
    'affordable salon management software in chennai',
    'customized web development company near me',
  ],
  authors: [{ name: 'Vaave Digital', url: 'https://vaavedigital.com' }],
  creator: 'Vaave Digital',
  publisher: 'Vaave Digital',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/image/logo.webp',
    shortcut: '/image/logo.webp',
    apple: '/image/logo.webp',
  },
  openGraph: {
    title: 'Vaave Digital | Best AI-Integrated Digital Marketing Agency Chennai',
    description:
      'The best, trusted, and affordable AI-integrated digital marketing agency and customized web development company in Guindy, Chennai, India.',
    url: 'https://vaavedigital.com',
    siteName: 'Vaave Digital',
    images: [
      {
        url: '/image/vaave-digital.png',
        width: 1200,
        height: 630,
        alt: 'Vaave Digital - Best AI-Integrated Digital Marketing Agency Chennai',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vaave Digital | Best AI-Integrated Digital Marketing Agency',
    description:
      'Best, trusted, and affordable AI-integrated digital marketing & customized website development in Guindy, Chennai, India.',
    images: ['/image/vaave-digital.png'],
    creator: '@vaavedigital',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <JsonLd />
      </head>
      <body className={`${outfit.variable} ${jakarta.variable} bg-[#020215] text-white font-sans antialiased`}>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
